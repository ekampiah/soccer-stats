import axios, { AxiosResponse } from "axios";
import { TeamInfo } from "../model/TeamInfo";
import { APIResponse } from "./APIResponse";
import { TeamStats } from "../model/TeamStats";

axios.defaults.baseURL = "https://api-football-v1.p.rapidapi.com/v3";

axios.interceptors.request.use((config) => {
  config.headers["x-rapidapi-key"] =
    "af8922a1a0msheb2867aee7c1922p1e6125jsnb48ed673fbed";
  return config;
});

const responseBody = <T>(response: AxiosResponse<APIResponse<T>>) => response.data.response;

const requests = {
    get: <T>(url: string) => axios.get<APIResponse<T>>(url).then(responseBody),
}

const API = {
  Teams: () => requests.get<TeamInfo[]>("/teams?league=39&season=2024"),
  Stats: (teamId: number) => requests.get<TeamStats>(`/teams/statistics?team=${teamId}&league=39&season=2024`),
}

const agent = {
  API,
};

export default agent;