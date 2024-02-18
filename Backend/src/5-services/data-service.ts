import { OkPacket } from "mysql";
import { ResourceNotFoundError } from "../2-models/client-errors";
import MeetingModel from "../2-models/meetings-model";
import TeamModel from "../2-models/teams-model";
import dal from "../4-utils/dal";


async function getAllTeams():Promise<TeamModel[]>{

    const sql = "SELECT * FROM teams";
    const teams = await dal.execute(sql);
    return teams;

}

async function getMeetingsByTeams(teamId:number):Promise<MeetingModel[]>{

    const sql = `SELECT 
                    meetingId,
                    M.teamId,
                    DATE_FORMAT(startTime, '%d/%m/%Y %T') AS startTime,
                    DATE_FORMAT(endTime, '%d/%m/%Y %T') AS endTime,
                    description,
                    meetingRoom,
                    T.teamName        
                    FROM meetings AS M
                    JOIN teams AS T
                    ON M.teamId = T.teamId
                WHERE M.teamId = ?`;

    const meetings = await dal.execute(sql, [teamId]);

    return meetings;

}

async function addMeeting(meeting: MeetingModel): Promise<MeetingModel> {
    meeting.validate();
    const sql = `INSERT INTO meetings VALUES(DEFAULT, ?, ?, ?, ?, ? )`;
    const result:OkPacket = await dal.execute(sql, [meeting.teamId, meeting.startTime, meeting.endTime, meeting.description, meeting.meetingRoom]);
    meeting.meetingId = result.insertId;
    return meeting;
}

async function deleteMeeting(meetingId: number): Promise<void> {
    const sql = `DELETE FROM meetings WHERE meetingId = ?`;
    const result: OkPacket = await dal.execute(sql, [meetingId]);
    if (!result.affectedRows) throw new ResourceNotFoundError(meetingId);
}


async function getMeetingsInTimeRange(startTime:string, endTime:string,teamId:number):Promise<MeetingModel[]>{

    const sql = `SELECT DISTINCT (startTime >= ? && startTime <= ?) 
    OR (endTime >= ? && endTime <= ?) AS AppEx FROM meetings
    WHERE teamId= ?;`;

    const meetings = await dal.execute(sql, [startTime,endTime,startTime,endTime, teamId]);

    return meetings;

}


export default {
    getAllTeams,
    getMeetingsByTeams, 
    addMeeting,
    deleteMeeting,
    getMeetingsInTimeRange
}