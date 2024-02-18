import Joi from "joi";
import { ValidationError } from "./client-errors";


class MeetingModel {
    public meetingId: number;
    public teamId: number;
    public startTime: string;
    public endTime: string;
    public description: string;
    public meetingRoom: string;
    public teamName:string; 

    public constructor( meeting: MeetingModel) {
        this.meetingId = meeting.meetingId;
        this.teamId = meeting.teamId;
        this.startTime = meeting.startTime;
        this.endTime = meeting.endTime;
        this.description = meeting.description;
        this.meetingRoom = meeting.meetingRoom;
    }

    public static ValidationSchema = Joi.object({
        meetingId:Joi.number().integer().positive().optional(),
        teamId:Joi.number().required().positive(), 
        startTime:Joi.date().required(), 
        endTime:Joi.date().required(),
        description:Joi.string().required().min(5).max(300),
        meetingRoom: Joi.string().min(2).max(50)
    })

    public validate():void{        
        const result = MeetingModel.ValidationSchema.validate(this);        
        if (result.error) throw new ValidationError(result.error.message); 
    }
}

export default MeetingModel;