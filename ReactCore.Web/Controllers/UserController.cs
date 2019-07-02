using System.Linq;

using Microsoft.AspNetCore.Mvc;

using ReactCore.Data.Models.User;
using ReactCore.Web.Attributes.Authorization;
using ReactCore.Web.Utilities;

namespace ReactCore.Web.Controllers
{
    [ApiVersion("1.0")]
    [Route("users")]
    public class UserController: BaseController<UserController>
    {
        public UserController() {}

        /// <summary>
        /// Retrieve current user information
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpGet("me")]
        [MapToApiVersion("1.0")]
        public dynamic GetUserInfo()
        {
            User user = AccountTools.GetUser();

            return new
            {
                user.UserID,
                user.EmailAddress,
                user.FirstName,
                user.FullName,
                user.LastName,
                user.UserName,
                Permissions = user.Claims
                    .Where(c => c.Type.EndsWith("/identity/claims/role"))
                    .Select(c => new ClientPermissions { Type = c.Type, Value = c.Value })
            };
        }

        private struct ClientPermissions
        {
            public string Type { get; set; }
            public string Value { get; set; }
        }
    }
}
