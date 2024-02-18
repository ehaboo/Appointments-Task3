import express, { Request, Response, NextFunction } from "express"
import dataService from "../5-services/data-service";
import MeetingModel from "../2-models/meetings-model";

const router = express.Router();

router.get("/teams", async (request: Request, response: Response, next: NextFunction ) => {
    try {
        const teams = await dataService.getAllTeams();
        response.json(teams)
    } catch (error) {
        next(error)
    }
});

router.get("/meetings-by-team/:teamId", async (request: Request, response: Response, next: NextFunction ) => {
    try {
        const teamId = +request.params.teamId;
        const meetings = await dataService.getMeetingsByTeams(teamId);
        response.json(meetings)
    } catch (error) {
        next(error)
    }
});

router.post("/meetings", async (request: Request, response: Response, next: NextFunction) => {
    try{
        const meeting = new MeetingModel(request.body);
        const addedMeeting = await dataService.addMeeting(meeting);
        return response.status(201).json(addedMeeting);
    }
    catch(err: any) {
        next(err);
    }
});

router.delete("/meetings/:meetingId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const meetingId = +request.params.meetingId;
        await dataService.deleteMeeting(meetingId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});


router.get("/meetings-in-range", async (request: Request, response: Response, next: NextFunction ) => {
    try {
        const start = request.query.start as string; 
        const end = request.query.end as string; 
        const teamId = +request.query.teamId; 

        const meetings = await dataService.getMeetingsInTimeRange(start,end,teamId);
        response.json(meetings)
    } catch (error) {
        next(error)
    }
});




export default router;