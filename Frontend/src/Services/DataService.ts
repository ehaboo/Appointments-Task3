import axios from "axios";
import appConfig from "../Utils/Config";
import TeamModel from "../Models/TeamModel";
import MeetingModel from "../Models/MeetingModel";


interface AppEx{
    AppEX:number
}

class DataService{

    public async getAllTeams():Promise<TeamModel[]>{
        const response = await axios.get<TeamModel[]>( appConfig.teamsUrl);
        const teams = response.data;
        return teams;
    }
    
    public async getMeetingsByTeam(teamId:number):Promise<MeetingModel[]>{
        const response = await axios.get<MeetingModel[]>( appConfig.meetingsByTeamUrl + teamId );
        const meetings = response.data;
        return meetings;
    }

    public async addMeeting(meeting:MeetingModel):Promise<MeetingModel>{
        const response = await axios.post<MeetingModel>( appConfig.meetingsUrl, meeting );
        const addedMeeting = response.data;
        return addedMeeting;
    }

    public async deleteMeeting(id:number):Promise<void>{
        await axios.delete<MeetingModel>( appConfig.meetingsUrl + id );
    }
    
    public async getMeetingsInTimeRange(startTime:string, endTime:string,teamId:number):Promise<AppEx[]>{
        const response = await axios.get<AppEx[]>( appConfig.meetingsInRangeUrl, { params: { start:startTime ,end:endTime,teamId:teamId} });
        const meetings = response.data;
        return meetings;
    }

}
const dataService = new DataService();
export default dataService;