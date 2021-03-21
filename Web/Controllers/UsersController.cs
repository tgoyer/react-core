using App.Data.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace App.Web.Controllers
{
    public class UsersController : BaseController<UsersController>
    {
        private IUserService userService;

        public UsersController(
            ILogger<UsersController> logger,
            IUserService userService
        ) : base(logger)
        {
            this.userService = userService;
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetUser()
        {
            return Ok(await AccountTools.GetUser());
        }

        [HttpGet("{login}")]
        public async Task<IActionResult> GetUserByLogin(string login)
        {
            return Ok(await AccountTools.GetUser(login));
        }

        [HttpPost("reset-user")]
        public async Task<IActionResult> ResetUserCache(string login)
        {
            return Ok(await AccountTools.ResetUser(login));
        }
    }
}