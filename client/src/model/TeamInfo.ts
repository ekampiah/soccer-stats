import { Team } from "./Team";

export class TeamInfo{
    constructor(public team: Team, public venue: object) {
        this.team = team;
        this.venue = venue;
    }
}