import "./App.css";
import { TeamInfo } from "./model/TeamInfo";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Button, Dropdown, Header } from "semantic-ui-react";
import { TeamStats } from "./model/TeamStats";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import agent from "./API/agent";

interface Stat {
  key: string;
  label: string;
}

function App() {
  const [teams, setTeams] = useState<TeamInfo[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<TeamInfo[]>([]);
  const [selectedStat, setSelectedStat] = useState<Stat>();
  const stats = [
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

  useEffect(() => {
    if (teams.length) return;
    agent.API.Teams()
      .then((teams) => {
        setTeams(teams);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [teams]);

  const submit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (selectedTeams.length === 0) {
        console.log("Please select teams");

        return;
      }

      var promises: Promise<TeamStats>[] = [];
      for (var team of selectedTeams) {
        promises.push(agent.API.Stats(team.team.id));
      }

      var data: TeamStats[] = [];
      Promise.all(promises).then((res) => {
        for (var stat of res) {
          data.push(new TeamStats(stat.fixtures, stat.goals, stat.team));
        }
        setChartData(data);
      });
    },
    [selectedTeams]
  );

  return (
    <>
      <form onSubmit={submit}>
        <Dropdown
          placeholder="Select up to 5 teams"
          fluid
          multiple
          selection
          value={selectedTeams.map((team) => team.team.id)}
          onChange={(_, data) => {
            if ((data.value as []).length > 5) {
              alert("You can only select up to 5 teams");
              return;
            }

            setSelectedTeams(
              (data.value as [])
                .map((id: number) =>
                  teams.filter((team) => team.team.id === id)
                )
                .flat()
            );
          }}
          options={teams
            .sort((a, b) => a.team.name.localeCompare(b.team.name))
            .map((team) => {
              return {
                key: team.team.id,
                text: team.team.name,
                value: team.team.id,
              };
            })}
        />
        <Dropdown
          placeholder="Select a stat"
          fluid
          selection
          value={selectedStat?.key}
          onChange={(_, data) => {
            setSelectedStat(stats.find((stat) => stat.key === data.value));
          }}
          options={stats.map((stat) => {
            return {
              key: stat.key,
              text: stat.label,
              value: stat.key,
            };
          })}
        />
        <Button type="submit">Submit</Button>
      </form>
      {chartData.length > 0 && (
        <div>
          <Header as="h2">Team Stats - {selectedStat?.label}</Header>
          <BarChart width={800} height={450} data={chartData}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey={selectedStat?.key || ""}
              fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            />
          </BarChart>
        </div>
      )}
    </>
  );
}

export default App;
