import { useState, useEffect } from "react";
import MeetingModel from "../../../Models/MeetingModel";
import TeamModel from "../../../Models/TeamModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./List.css";
import MeetingCard from "../MeetingCard/MeetingCard";

function List(): JSX.Element {

    const [teams, setTeams] = useState<TeamModel[]>([])
    const [meetings, setMeetings] = useState<MeetingModel[]>([])

    useEffect(() => {
        dataService.getAllTeams()
            .then(setTeams)
            .catch(err => notifyService.error(err));
    },[]);


    const getMeetings = (id: number) => {
        if (!id) return;
        dataService.getMeetingsByTeam(id)
            .then(setMeetings)
            .catch(err => notifyService.error(err));
    }


    const deleteMovie = async (id: number) => {
        try {
            await dataService.deleteMeeting(id);
            notifyService.success("Meeting Deleted")
            const newMeetings = meetings.filter(m => m.meetingId !== id);
            setMeetings(newMeetings);
        } catch (error) {
            notifyService.error(error)
        }

    }

    return (
        <div className="List">
			 <div className="select-wrap">
                        <select className="input" onChange={e => getMeetings(+e.target.value)}>
                            <option value=""> --- Choose Team --- </option>
                            {teams.map(t => <option key={t.teamId} value={t.teamId}>{t.teamName}</option>)}
                        </select>
                    </div>

                    <div className="flex">
                        {meetings.map(m => <MeetingCard key={m.meetingId} meeting={m} onDelete={deleteMovie} />)}
                    </div>
        </div>
    );
}

export default List;
