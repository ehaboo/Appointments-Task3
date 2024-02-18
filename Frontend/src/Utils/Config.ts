class Config{

    public teamsUrl = "http://localhost:4000/api/teams/";
    public meetingsByTeamUrl = "http://localhost:4000/api/meetings-by-team/";
    public meetingsUrl = "http://localhost:4000/api/meetings/";
    public meetingsInRangeUrl = "http://localhost:4000/api/meetings-in-range/";
    
}
const appConfig = new Config();
export default appConfig;