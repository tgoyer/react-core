using App.Data.Services;
using App.Web.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace App.Web.Controllers
{
    [Authorize]
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]", Name = "[controller]_[action]")]
    public class BaseController<T> : ControllerBase
    {
        private IAccountTools accountTools;
        private IUserService userService;

        public BaseController(ILogger<T> logger)
        {
            Logger = logger;
        }

        public ILogger<T> Logger { get; init; }

        public IAccountTools AccountTools => accountTools ?? (accountTools = (IAccountTools)HttpContext?.RequestServices.GetService(typeof(IAccountTools)));
        public IUserService UserService => userService ?? (userService = (IUserService)HttpContext?.RequestServices.GetService(typeof(IUserService)));
    }
}