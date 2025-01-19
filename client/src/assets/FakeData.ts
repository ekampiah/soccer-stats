import { TeamInfo } from "../model/TeamInfo";
import { TeamStats } from "../model/TeamStats";

export const fakeChartData = [
  new TeamStats(
    {
      played: { home: 10, away: 10, total: 20 },
      wins: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
      draws: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
      loses: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
    },
    {
      for: {
        total: {
          home: Math.floor(Math.random() * 30),
          away: Math.floor(Math.random() * 30),
          total: Math.floor(Math.random() * 60),
        },
      },
      against: {
        total: {
          home: Math.floor(Math.random() * 30),
          away: Math.floor(Math.random() * 30),
          total: Math.floor(Math.random() * 60),
        },
      },
    },
    { id: 5, name: "Manchester United" }
  ),
  new TeamStats(
    {
      played: { home: 10, away: 10, total: 20 },
      wins: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
      draws: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
      loses: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
    },
    {
      for: {
        total: {
          home: Math.floor(Math.random() * 30),
          away: Math.floor(Math.random() * 30),
          total: Math.floor(Math.random() * 60),
        },
      },
      against: {
        total: {
          home: Math.floor(Math.random() * 30),
          away: Math.floor(Math.random() * 30),
          total: Math.floor(Math.random() * 60),
        },
      },
    },
    { id: 1, name: "Arsenal" }
  ),
  new TeamStats(
    {
      played: { home: 10, away: 10, total: 20 },
      wins: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
      draws: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
      loses: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
    },
    {
      for: {
        total: {
          home: Math.floor(Math.random() * 30),
          away: Math.floor(Math.random() * 30),
          total: Math.floor(Math.random() * 60),
        },
      },
      against: {
        total: {
          home: Math.floor(Math.random() * 30),
          away: Math.floor(Math.random() * 30),
          total: Math.floor(Math.random() * 60),
        },
      },
    },
    { id: 2, name: "Chelsea" }
  ),
  new TeamStats(
    {
      played: { home: 10, away: 10, total: 20 },
      wins: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
      draws: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
      loses: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
    },
    {
      for: {
        total: {
          home: Math.floor(Math.random() * 30),
          away: Math.floor(Math.random() * 30),
          total: Math.floor(Math.random() * 60),
        },
      },
      against: {
        total: {
          home: Math.floor(Math.random() * 30),
          away: Math.floor(Math.random() * 30),
          total: Math.floor(Math.random() * 60),
        },
      },
    },
    { id: 3, name: "Liverpool" }
  ),
  new TeamStats(
    {
      played: { home: 10, away: 10, total: 20 },
      wins: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
      draws: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
      loses: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
    },
    {
      for: {
        total: {
          home: Math.floor(Math.random() * 30),
          away: Math.floor(Math.random() * 30),
          total: Math.floor(Math.random() * 60),
        },
      },
      against: {
        total: {
          home: Math.floor(Math.random() * 30),
          away: Math.floor(Math.random() * 30),
          total: Math.floor(Math.random() * 60),
        },
      },
    },
    { id: 4, name: "Manchester City" }
  ),
  new TeamStats(
    {
      played: { home: 10, away: 10, total: 20 },
      wins: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
      draws: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
      loses: {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10),
        total: Math.floor(Math.random() * 20),
      },
    },
    {
      for: {
        total: {
          home: Math.floor(Math.random() * 30),
          away: Math.floor(Math.random() * 30),
          total: Math.floor(Math.random() * 60),
        },
      },
      against: {
        total: {
          home: Math.floor(Math.random() * 30),
          away: Math.floor(Math.random() * 30),
          total: Math.floor(Math.random() * 60),
        },
      },
    },
    { id: 6, name: "Tottenham Hotspur" }
  ),
];

export const fakeTeams = [
  new TeamInfo({ id: 1, name: "Arsenal" }, {}),
  new TeamInfo({ id: 2, name: "Chelsea" }, {}),
  new TeamInfo({ id: 3, name: "Liverpool" }, {}),
  new TeamInfo({ id: 4, name: "Manchester City" }, {}),
  new TeamInfo({ id: 5, name: "Manchester United" }, {}),
  new TeamInfo({ id: 6, name: "Tottenham Hotspur" }, {}),
];
