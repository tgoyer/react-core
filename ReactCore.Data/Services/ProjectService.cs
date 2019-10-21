using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using ReactCore.Data.Models.ToDo;

namespace ReactCore.Data.Services
{
    public class ProjectService: 
        BaseService<ProjectService>,
        IService, 
        IReadableService<Project>,
        IRemovableService<Project>,
        IWritableService<Project>
    {
        public ProjectService(ILogger<ProjectService> logger, IConfiguration configuration) : base(logger, configuration) { }
    }
}
