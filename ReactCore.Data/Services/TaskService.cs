using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using ReactCore.Data.Models.ToDo;

namespace ReactCore.Data.Services
{
    public class TaskService : 
        BaseService<TaskService>,
        IService, 
        IReadableService<Task>,
        IRemovableService<Task>,
        IWritableService<Task>
    {
        public TaskService(ILogger<TaskService> logger, IConfiguration configuration) : base(logger, configuration) { }
    }
}
