class AppConfig{

    public port = 4000;
    public serverUrl = "http://localhost:" + this.port;

    public mySqlHost = "localhost";
    public mySqlDataBase = "appointments";
    public mySqlUser = "root";
    public mySqlPassword = "";

}

const appConfig = new AppConfig();
export default appConfig;