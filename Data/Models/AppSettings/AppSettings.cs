namespace App.Data.Models.AppSettings
{
    public class AppSettings
    {
        public string Domain { get; set; }
        public int HttpsPort { get; set; }
        public string Name { get; set; }
        public string ProxyUrl { get; set; }
        public string SupportEmail { get; set; }
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
        public string DataSource { get; set; }
        public string InitialCatalog { get; set; }
        public bool IntegratedSecurity { get; set; }
        public bool MultipleActiveResultSets { get; set; }
        public string Password { get; set; }
        public string UserID { get; set; }
    }
}