import { TeamInfo } from "./model/TeamInfo";
import { useCallback, useEffect, useState } from "react";
import { TeamStats } from "./model/TeamStats";
import agent from "./API/agent";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { Button, Loader, MultiSelect, Select } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { fakeTeams } from "./assets/FakeData";

interface Stat {
  key: string;
  label: string;
}

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

  useEffect(() => {
    if (teams.length) return;
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
    setChartData([]);
    if (selectedTeams.length === 0) {
      alert("Select teams to fetch stats");
      return;
    }
    setLoading(true);

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
  }, [selectedTeams, loading]);

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
      {loading ? (
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
              name:
                stats.find((stat) => stat.label === selectedStat)?.key || "",
              color: "blue.9",
            },
          ]}
        />
      )}
    </div>
  );
}

export default App;
