import axios from "axios";
import "./App.css";
import { TeamsInfoResponse } from "./model/TeamsInfoResponse";
import { TeamInfo } from "./model/TeamInfo";
import { useEffect, useState } from "react";

function App() {
  const [teams, setTeams] = useState<TeamInfo[]>([]);

  useEffect(() => {
    if (teams.length) return;
    axios
      .get<TeamsInfoResponse>(
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

  return (
    <>
      <form>
        <label htmlFor="teams">Select a team:</label>
        <select name="teams" id="teams">
          {teams
            .sort((a, b) => a.team.name.localeCompare(b.team.name))
            .map((teamInfo) => {
              return (
                <option key={teamInfo.team.id} value={teamInfo.team.id}>
                  {teamInfo.team.name}
                </option>
              );
            })}
        </select>
      </form>
    </>
  );
}

export default App;
