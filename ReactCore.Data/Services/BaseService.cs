using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ReactCore.Data.Services
{
    public abstract class BaseService<T> where T : BaseService<T>
    {
        public BaseService(ILogger<T> logger, IConfiguration configuration) {
            Logger = logger;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; set; }

        public ILogger<T> Logger { get; set; }
    }
}
