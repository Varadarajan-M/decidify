namespace Decidify.Repository
{
    public class MySqlConnectionString
    {
        public string ConnectionString { get; }

        public MySqlConnectionString()
        {
            var root = Directory.GetCurrentDirectory();
            var dotenv = Path.Combine(root, ".env");
            DotNetEnv.Load(dotenv);
            var env = Environment.GetEnvironmentVariables();
            var host = env["MYSQL_HOST"];
            var port = env["MYSQL_PORT"];
            var database = env["MYSQL_DATABASE"];
            var username = env["MYSQL_USERNAME"];
            var password = env["MYSQL_PASSWORD"];

            ConnectionString = $"server={host};port={port};database={database};user={username};password={password}";
        }
    }
}
