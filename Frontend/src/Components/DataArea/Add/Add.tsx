import { useNavigate } from "react-router-dom";
import "./Add.css";
import { useState, useEffect } from "react";
import MeetingModel from "../../../Models/MeetingModel";
import TeamModel from "../../../Models/TeamModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import { useForm } from "react-hook-form";

function Add(): JSX.Element {

    const navigate = useNavigate(); 
    const {register, handleSubmit, formState} = useForm<MeetingModel>();
    const [teams, setTeams] = useState<TeamModel[]>([])


    useEffect(() => {
        dataService.getAllTeams()
            .then(setTeams)
                .catch(err => notifyService.error(err));
    },[]);
    


    const isTeamHaveMeeting =  async (meeting:MeetingModel) => {
         const meetingsEx = await dataService.getMeetingsInTimeRange(meeting.startTime, meeting.endTime, meeting.teamId)
            console.log(meetingsEx);
            for (const m of meetingsEx) {
                if(m.AppEX === 1) throw notifyService.error(`${meeting.teamName} have a meeting in this time!`)
                return; 
            }
    }

    const saveMeeting = async (meeting:MeetingModel) => {

        if (meeting.startTime > meeting.endTime){
            notifyService.error("End time have to be greater than Start time"); 
            return;
        } 
        isTeamHaveMeeting(meeting)


                
        try {
            await dataService.addMeeting(meeting); 
            notifyService.success(`Good Luck - You added a New Meeting`)
            navigate("/list")
        } catch (error) {
            notifyService.error(error)
        }
}


    return (
        <div className="Add">
			  <form className="form card" onSubmit={handleSubmit(saveMeeting)}>
                <div className="card_header">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path fill="currentColor" d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"></path>
                    </svg>
                    <h1 className="form_heading">Add Meeting</h1>
                </div>

                <div className="field">
                    <label>Team: </label>
                    <select className="input" {...register("teamId", MeetingModel.teamValidation)} >
                        <option value=""> --- Choose Team --- </option>
                        {teams.map(t => <option key={t.teamId} value={t.teamId}>{t.teamName}</option>)}
                    </select>
                    <span className="err">{formState.errors.teamId?.message}</span>
                </div>

                <div className="field">
                    <label>From: </label>
                    <input className="input" type="datetime-local" {...register("startTime", MeetingModel.dateValidation)}/>
                    <span className="err">{formState.errors.startTime?.message}</span>
                </div>

                <div className="field">
                    <label>To: </label>
                    <input className="input"  type="datetime-local" {...register("endTime", MeetingModel.dateValidation)}/>
                    <span className="err">{formState.errors.endTime?.message}</span>
                </div>

                <div className="field">
                    <label>Description: </label>
                    <input type="text" className="input" placeholder="Description" {...register("description", MeetingModel.descriptionValidation)}/>
                    <span className="err">{formState.errors.description?.message}</span>
                </div>

                <div className="field">
                    <label>Meeting Room: </label>
                    <input type="text" className="input" placeholder="Meeting Room" {...register("meetingRoom", MeetingModel.roomValidation)}/>
                    <span className="err">{formState.errors.meetingRoom?.message}</span>
                </div>
                <div className="field">
                    <button className="button">Add Meeting</button>
                </div>
            </form>
        </div>
    );
}

export default Add;
