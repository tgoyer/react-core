using App.Data.Models.AppSettings;
using App.Data.Utilities;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace App.Data.Services
{
    public class BaseService<T>
    {
        public BaseService(ILogger<T> logger, IOptions<AppSettings> appSettings)
        {
            AppSettings = appSettings.Value;
            DbFactory = new DbFactory<T>(logger, appSettings);
        }

        public AppSettings AppSettings { get; set; }
        public DbFactory<T> DbFactory { get; set; }
    }
}