import { TeamInfo } from "./TeamInfo";

export class TeamsInfoResponse{
    constructor(public response: TeamInfo[]){
        this.response = response;
    }
}