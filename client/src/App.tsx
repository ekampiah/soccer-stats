import axios, { AxiosResponse } from "axios";
import "./App.css";
import { TeamInfo } from "./model/TeamInfo";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Button, Dropdown } from "semantic-ui-react";
import { APIResponse } from "./model/APIResponse";
import { TeamStats } from "./model/TeamStats";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function App() {
  const [teams, setTeams] = useState<TeamInfo[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<TeamInfo[]>([]);
  const [selectedStat, setSelectedStat] = useState<string>("");
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
    axios
      .get<APIResponse<TeamInfo[]>>(
        "https://api-football-v1.p.rapidapi.com/v3/teams?league=39&season=2024",
        {
          headers: {
            "x-rapidapi-key":
              "af8922a1a0msheb2867aee7c1922p1e6125jsnb48ed673fbed",
          },
        }
      )
      .then((res) => {
        setTeams(res.data.response);
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

      var promises: Promise<AxiosResponse<APIResponse<TeamStats>>>[] = [];
      for (var team of selectedTeams) {
        promises.push(
          axios.get<APIResponse<TeamStats>>(
            `https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=39&season=2024&team=${team.team.id}`,
            {
              headers: {
                "x-rapidapi-key":
                  "af8922a1a0msheb2867aee7c1922p1e6125jsnb48ed673fbed",
              },
            }
          )
        );
      }

      var data: TeamStats[] = [];
      Promise.all(promises).then((res) => {
        for (var stat of res) {
          data.push(
            new TeamStats(
              stat.data.response.fixtures,
              stat.data.response.goals,
              stat.data.response.team
            )
          );
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
          onChange={(e, data) => {
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
          value={selectedStat}
          onChange={(e, data) => {
            setSelectedStat(data.value as string);
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
          <BarChart width={800} height={450} data={chartData}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey={selectedStat}
              fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            />
          </BarChart>
        </div>
      )}
    </>
  );
}

export default App;
