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
    [Route("projects")]
    public class ProjectController : BaseController<ProjectController>
    {
        private ProjectService projectService;
        private TaskService taskService;

        public ProjectController(ProjectService projectService, TaskService taskService) {
            this.projectService = projectService;
            this.taskService = taskService;
        }

        /// <summary>
        /// Retrieve all projects.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.Read"/> claim.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Read)]
        [HttpGet()]
        [MapToApiVersion("1.0")]
        public dynamic GetProjects()
        {
            return projectService.SelectAll();
        }

        /// <summary>
        /// Retrieve projects for logged in user.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.Read"/> claim.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Read)]
        [HttpGet("mine")]
        [MapToApiVersion("1.0")]
        public dynamic GetMyProjects()
        {
            User user = AccountTools.GetUser();
            return projectService.SelectMany(p => p.UserId == user.Id);
        }

        /// <summary>
        /// Retrieve a project by id.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.Read"/> claim.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Read)]
        [HttpGet("{projectId}")]
        [MapToApiVersion("1.0")]
        public dynamic GetProject(int projectId)
        {
            User user = AccountTools.GetUser();
            return projectService.SelectFirst(p => p.Id == projectId && p.UserId == user.Id);
        }

        /// <summary>
        /// Retrieve tasks for a project.
        /// </summary>
        /// <param name="projectId">The id of the project.</param>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.Read"/> claim.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Read)]
        [HttpGet("{projectId}/tasks")]
        [MapToApiVersion("1.0")]
        public dynamic GetTasks(int projectId)
        {
            return taskService.SelectMany(t => t.ProjectId == projectId);
        }

        /// <summary>
        /// Insert a project data row.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.Read"/> and  <see cref="ClaimsAuthorizationConstants.Claims.Write"/> claims.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Read)]
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Write)]
        [HttpPut()]
        [MapToApiVersion("1.0")]
        public bool SaveProject(Project item)
        {
            return projectService.InsertOne(item);
        }

        /// <summary>
        /// Update a project data row.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.Read"/> and  <see cref="ClaimsAuthorizationConstants.Claims.Write"/> claims.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Read)]
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Write)]
        [HttpPost()]
        [MapToApiVersion("1.0")]
        public bool UpdateProject(Project item)
        {
            return projectService.UpdateOne(item);
        }

        /// <summary>
        /// Delete a project data row.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.Read"/> and  <see cref="ClaimsAuthorizationConstants.Claims.Write"/> claims.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Read)]
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Write)]
        [HttpDelete("{projectId}")]
        [MapToApiVersion("1.0")]
        public bool DeleteProject(int projectId)
        {
            return projectService.RemoveOne(projectId);
        }
    }
}
