import MeetingModel from "../../../Models/MeetingModel";
import "./MeetingCard.css";

interface MeetingCardProps {
    meeting: MeetingModel;
    onDelete: (id: number) => void
}

function MeetingCard({ meeting, onDelete }: MeetingCardProps): JSX.Element {
    
    return (
        <div className="MeetingCard">
            <div className="card-details">
                <p className="text-title">{meeting.teamName}</p>
                <p className="text-body">From: {meeting.startTime}</p>
                <p className="text-body">To: {meeting.endTime}</p>
                <p className="text-body">Description: <br/> {meeting.description}</p>
                <p className="text-body">Meeting Room: {meeting.meetingRoom}</p>
            </div>
            <button className="card-button" onClick={() => onDelete(meeting.meetingId)}>🚮</button>
        </div>
    );
}

export default MeetingCard;
