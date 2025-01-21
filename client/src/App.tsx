import { TeamInfo } from "./model/TeamInfo";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TeamStats } from "./model/TeamStats";
import agent from "./API/agent";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import {
  ActionIcon,
  Button,
  Loader,
  MultiSelect,
  Select,
  TextInput,
} from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { fakeChartData, fakeTeams } from "./assets/FakeData";
import { IconSend, IconX } from "@tabler/icons-react";
import useWebSocket from "react-use-websocket";
import ChatMessageListComponent from "./components/ChatMessageListComponent";

interface Stat {
  key: string;
  label: string;
}

export interface ChatMessage {
  username: string;
  message: string;
  time: string;
}

const WS_URL = "ws://172.208.50.48:8000";

function App() {
  const [teams, setTeams] = useState<TeamInfo[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedStat, setSelectedStat] = useState<string | null>();
  const stats: Stat[] = [
    {
      key: "wins",
      label: "Wins",
    },
    {
      key: "draws",
      label: "Draws",
    },
    {
      key: "loses",
      label: "Loses",
    },
    {
      key: "goalsFor",
      label: "Goals For",
    },
    {
      key: "goalsAgainst",
      label: "Goals Against",
    },
    {
      key: "points",
      label: "Points",
    },
  ];
  const [chartData, setChartData] = useState<TeamStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingApp, setLoadingApp] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
  });

  const useFakeData = false;

  useEffect(() => {
    if (teams.length) return;
    if (useFakeData) {
      setTeams(fakeTeams);
      setLoadingApp(false);
      return;
    }

    agent.API.Teams()
      .then((teams) => {
        setTeams(teams);
        setLoadingApp(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [teams, loadingApp]);

  const submit = useCallback(() => {
    setLoading(true);
    if (useFakeData) {
      setChartData(
        fakeChartData.filter((data) => selectedTeams.includes(data.name))
      );
      setLoading(chartData.length === 0);
      return;
    }

    setChartData([]);
    if (selectedTeams.length === 0) {
      alert("Select teams to fetch stats");
      setLoading(false);
      return;
    }

    var promises: Promise<TeamStats>[] = [];
    for (var team of selectedTeams) {
      promises.push(
        agent.API.Stats(teams.find((t) => t.team.name === team)!.team.id)
      );
    }

    var data: TeamStats[] = [];
    Promise.all(promises).then((res) => {
      for (var stat of res) {
        data.push(new TeamStats(stat.fixtures, stat.goals, stat.team));
      }

      setChartData(data);
      setLoading(false);
    });
  }, [selectedTeams, loading, teams, chartData]);

  const sendChatMessage = useCallback(() => {
    if (chatMessage) {
      sendJsonMessage(chatMessage);
      setChatMessage("");
    }
  }, [chatMessage]);

  useEffect(() => {
    if (!lastJsonMessage) return;
    console.log(lastJsonMessage);

    if (typeof lastJsonMessage === "string") {
      console.log(lastJsonMessage);

      setUsername(lastJsonMessage.split("Joined chat as")[1]);
      return;
    }

    if (typeof lastJsonMessage === "object") {
      let message: ChatMessage = lastJsonMessage as ChatMessage;
      setChatMessages((prev) => [
        ...prev,
        {
          username: message.username,
          message: message.message,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }
  }, [lastJsonMessage]);

  const chart = useMemo(() => {
    return loading ? (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    ) : chartData.length == 0 ? (
      <></>
    ) : (
      <BarChart
        className="text-black bg-white p-5 rounded-lg shadow-lg"
        h={600}
        data={chartData}
        dataKey="name"
        tickLine="y"
        series={[
          {
            name: stats.find((stat) => stat.label === selectedStat)?.key || "",
            color: "blue.9",
          },
        ]}
      />
    );
  }, [loading, chartData, selectedStat]);

  const chat = useMemo(() => {
    if (!chatOpen)
      return (
        <div className="flex justify-around p-5 md:fixed md:bottom-0 md:right-0 md:z-20">
          <Button onClick={() => setChatOpen(true)}>Click to open chat</Button>
        </div>
      );

    return (
      <div className="flex flex-col gap-5 p-5 mt-5 border border-solid border-black rounded-lg bg-white md:fixed md:bottom-0 md:right-0 md:h-[50%] md:w-[40%] md:z-20">
        <ActionIcon onClick={() => setChatOpen(false)}>
          <IconX />
        </ActionIcon>
        <ChatMessageListComponent messages={chatMessages} />
        <div className="flex gap-2 items-end md:absolute md:bottom-0 md:right-0 md:m-5 md:w-[90%]">
          <TextInput
            className="w-full"
            label={username || "Username"}
            placeholder="Free your mind. Respectfully"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.currentTarget.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") sendChatMessage();
            }}
          />
          <ActionIcon onClick={sendChatMessage}>
            <IconSend />
          </ActionIcon>
        </div>
      </div>
    );
  }, [chatOpen, username, chatMessage, chatMessages]);

  if (loadingApp) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="m-10">
      <div className="md:grid md:grid-cols-12 md:items-end flex flex-col gap-5 mb-10 bg-white p-5 rounded-lg shadow-lg">
        <MultiSelect
          classNames={{ inputField: "inputField" }}
          className="md:col-span-6 inputField text-black"
          label="Teams"
          placeholder="Select up to 5 teams"
          maxValues={5}
          value={selectedTeams}
          onChange={setSelectedTeams}
          data={teams
            .sort((a, b) => a.team.name.localeCompare(b.team.name))
            .map((team) => team.team.name)}
        />
        <Select
          className="md:col-span-4 text-black"
          label="Statistic"
          placeholder="Pick one"
          onChange={setSelectedStat}
          data={stats.map((stat) => stat.label)}
        />
        <Button className="md:col-span-2" onClick={submit}>
          Submit
        </Button>
      </div>
      {chart}
      {chat}
    </div>
  );
}

export default App;
