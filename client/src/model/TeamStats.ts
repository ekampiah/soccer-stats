export interface HomeAwayStat {
  home: number;
  away: number;
  total: number;
}

export interface Goals {
  for: { total: HomeAwayStat };
  against: { total: HomeAwayStat };
}

export class TeamStats {
  constructor(
    public fixtures: {
      played: HomeAwayStat;
      wins: HomeAwayStat;
      draws: HomeAwayStat;
      loses: HomeAwayStat;
    },
    public goals: Goals,
    public team: { id: number; name: string }
  ) {}

  get points() {
    return (
      this.fixtures.wins.home * 3 +
      this.fixtures.draws.home +
      (this.fixtures.wins.away * 3 + this.fixtures.draws.away)
    );
  }

  get goalsFor() {
    return this.goals.for.total.home + this.goals.for.total.away;
  }

  get goalsAgainst() {
    return this.goals.against.total.home + this.goals.against.total.away;
  }

  get wins() {
    return this.fixtures.wins.total;
  }

  get draws() {
    return this.fixtures.draws.total;
  }

  get loses() {
    return this.fixtures.loses.total;
  }

  get name() {
    return this.team.name;
  }
}
