export interface Played {
  home: number;
  away: number;
  total: number;
}

export interface Wins {
  home: number;
  away: number;
  total: number;
}

export interface Draws {
  home: number;
  away: number;
  total: number;
}

export interface Loses {
  home: number;
  away: number;
  total: number;
}

export interface Goals {
  for: { total: { home: number; away: number; total: number } };
  against: { total: { home: number; away: number; total: number } };
}

export class TeamStats {
  constructor(
    public fixtures: { played: Played; wins: Wins; draws: Draws; loses: Loses },
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
