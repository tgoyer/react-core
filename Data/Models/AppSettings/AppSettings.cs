namespace App.Data.Models.AppSettings
{
    public class AppSettings
    {
        public string Domain { get; set; }
        public int HttpsPort { get; set; }
        public string Name { get; set; }
        public string ProxyUrl { get; set; }
        public string SupportEmail { get; set; }
        public string SpaUrl { get; set; }

        public Cache Cache { get; set; }
        public Database Database { get; set; }
    }

    public class Cache
    {
        public int AbsoluteTimeout { get; set; }
        public int SlidingTimeout { get; set; }
    }

    public class Database
    {
        public string ConnectionString { get; set; }
        public int Timeout { get; set; }
    }
}