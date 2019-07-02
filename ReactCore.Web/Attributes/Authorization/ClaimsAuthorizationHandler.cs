using System;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace ReactCore.Web.Attributes.Authorization
{
    internal class ClaimsAuthorizationHandler : AuthorizationHandler<ClaimsRequirement>
    {
        private readonly ILogger<ClaimsAuthorizationHandler> _logger;

        public ClaimsAuthorizationHandler(ILogger<ClaimsAuthorizationHandler> logger)
        {
            _logger = logger;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ClaimsRequirement requirement)
        {
            _logger.LogDebug($"Evaluating claims for access: {string.Join(", ", requirement.Claims)}");

            var userClaims = context.User.Claims.ToList();
            var hasPassed = requirement.Claims.All((c) => userClaims.Select(uc => uc.Value).Contains(c));

            if (hasPassed)
            {
                _logger.LogDebug("Claims check has passed.");
                context.Succeed(requirement);
            }
            else
            {
                _logger.LogWarning($"Claims check has failed.  User claims: {string.Join(", ", userClaims)}.");
                context.Fail();
            }

            return Task.CompletedTask;
        }
    }
}
