using Microsoft.AspNetCore.Mvc;

using ReactCore.Data.Extensions;
using ReactCore.Data.Models.ToDo;
using ReactCore.Data.Models.User;
using ReactCore.Data.Services;
using ReactCore.Web.Attributes.Authorization;
using ReactCore.Web.Utilities;

namespace ReactCore.Web.Controllers
{
    [ApiVersion("1.0")]
    [Route("tasks")]
    public class TaskController : BaseController<TaskController>
    {
        private TaskService taskService;

        public TaskController(TaskService taskService) {
            this.taskService = taskService;
        }

        /// <summary>
        /// Retrieve all tasks.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.Read"/> claim.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Read)]
        [HttpGet()]
        [MapToApiVersion("1.0")]
        public dynamic GetTasks()
        {
            return taskService.SelectAll();
        }

        /// <summary>
        /// Retrieve a task by id.
        /// </summary>
        /// <param name="taskId">The id of the task.</param>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.Read"/> claim.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Read)]
        [HttpGet("mine")]
        [MapToApiVersion("1.0")]
        public dynamic GetMyTasks()
        {
            User user = AccountTools.GetUser();
            return taskService.SelectMany(t => t.UserId == user.Id);
        }

        /// <summary>
        /// Retrieve a task by id.
        /// </summary>
        /// <param name="taskId">The id of the task.</param>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.Read"/> claim.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Read)]
        [HttpGet("{taskId}")]
        [MapToApiVersion("1.0")]
        public dynamic GetTask(int taskId)
        {
            User user = AccountTools.GetUser();
            return taskService.SelectFirst(t => t.Id == taskId);
        }

        /// <summary>
        /// Insert a task data row.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.Read"/> and  <see cref="ClaimsAuthorizationConstants.Claims.Write"/> claims.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Read)]
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Write)]
        [HttpPut()]
        [MapToApiVersion("1.0")]
        public bool SaveTask(Task item)
        {
            return taskService.InsertOne(item);
        }

        /// <summary>
        /// Update a task data row.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.Read"/> and  <see cref="ClaimsAuthorizationConstants.Claims.Write"/> claims.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Read)]
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Write)]
        [HttpPost()]
        [MapToApiVersion("1.0")]
        public bool UpdateTask(Task item)
        {
            return taskService.UpdateOne(item);
        }

        /// <summary>
        /// Delete a project data row.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.Read"/> and  <see cref="ClaimsAuthorizationConstants.Claims.Write"/> claims.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Read)]
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Write)]
        [HttpDelete("{taskId}")]
        [MapToApiVersion("1.0")]
        public bool DeleteTask(int taskId)
        {
            return taskService.RemoveOne(taskId);
        }
    }
}
