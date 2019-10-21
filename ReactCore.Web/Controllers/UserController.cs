using System.Linq;

using Microsoft.AspNetCore.Mvc;

using ReactCore.Data.Extensions;
using ReactCore.Data.Models.User;
using ReactCore.Data.Services;
using ReactCore.Web.Attributes.Authorization;
using ReactCore.Web.Utilities;

namespace ReactCore.Web.Controllers
{
    [ApiVersion("1.0")]
    [Route("users")]
    public class UserController: BaseController<UserController>
    {
        UserService userService;

        public UserController(UserService userService) {
            this.userService = userService;
        }

        /// <summary>
        /// Retrieve all active users.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.Read"/> claim.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Read)]
        [HttpGet()]
        [MapToApiVersion("1.0")]
        public dynamic GetUsers()
        {
            return userService.SelectAll();
        }

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
                user.Id,
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

        /// <summary>
        /// Reset user info in security cache
        /// </summary>
        /// <param name="userKey">The cache key for the user to reset.  This is typically their AB domain login.</param>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.ResetUser"/> claim.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.ResetUser)]
        [HttpGet("{userKey}/reset")]
        [MapToApiVersion("1.0")]
        public dynamic ResetUser(string userKey)
        {
            if (!userKey.StartsWith("AC\\"))
            {
                userKey = $"AC\\{userKey}";
            }

            User user = AccountTools.ResetUser(userKey);

            return user != null
                ? new
                {
                    user.Id,
                    user.EmailAddress,
                    user.FirstName,
                    user.FullName,
                    user.LastName,
                    user.UserName,
                    Permissions = user.Claims
                        .Where(c => c.Type.EndsWith("/identity/claims/role"))
                        .Select(c => new ClientPermissions { Type = c.Type, Value = c.Value })
                } : null;
        }

        private struct ClientPermissions
        {
            public string Type { get; set; }
            public string Value { get; set; }
        }
    }
}
