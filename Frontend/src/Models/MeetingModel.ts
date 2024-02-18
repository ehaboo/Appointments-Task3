
class MeetingModel {
    public meetingId: number;
    public teamId: number;
    public startTime: string;
    public endTime: string;
    public description: string;
    public meetingRoom: string;
    public teamName:string; 

    
    public static teamValidation = { 
        required: {value: true, message: "Choose Team Please" }
    }

    public static dateValidation = { 
        required: {value: true, message: "Missing Date" }, 
        min: {value: new Date().toLocaleString(), message: "Date Must be greater than today"}
    }

    public static descriptionValidation = { 
        required: {value: true, message: "Missing Description" },
        minLength: { value: 5, message: "Description too short" },
        maxLength: { value: 300, message: "Description too Long" }
    }

    public static roomValidation = { 
        required: {value: true, message: "Missing Meeting Room" },
        minLength: { value: 2, message: "Name too short" },
        maxLength: { value: 50, message: "Description too Long" }
    }


}

export default MeetingModel;