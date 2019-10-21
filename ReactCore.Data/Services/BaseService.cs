using System.IO;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using JsonFlatFileDataStore;

using ReactCore.Data.Utils;

namespace ReactCore.Data.Services
{
    public abstract class BaseService<TService> where TService : BaseService<TService>
    {
        public BaseService(ILogger<TService> logger, IConfiguration configuration) {
            var type = Path.GetExtension(typeof(TService).FullName).Replace(".", "");
            string jsonPath = Path.Combine(configuration.GetConnectionString("JsonFlatFile"), type + ".json");
            bool storeExists = File.Exists(jsonPath);
            var store = new DataStore(jsonPath, true, "Id", true);

            if (!storeExists)
            {
                MockData.LoadMockData(store, type);
            }

            Logger = logger;
            Configuration = configuration;
            DataStore = store;
        }

        public DataStore DataStore { get; set; }

        public IConfiguration Configuration { get; set; }

        public ILogger<TService> Logger { get; set; }
    }
}
