using System.Collections.Generic;
using System.Security.Claims;

namespace ReactCore.Web.Attributes.Authorization
{
    public static class ClaimsAuthorizationRoleMapping
    {
        public static IEnumerable<Claim> GetClaims(string role)
        {
            List<Claim> claims = new List<Claim>();

            switch (role) {
                case ClaimsAuthorizationConstants.Roles.Read:
                    claims.AddRange(new[] {
                        new Claim(ClaimTypes.Role, ClaimsAuthorizationConstants.Claims.Read)
                    });
                    break;
                case ClaimsAuthorizationConstants.Roles.Write:
                    claims.AddRange(new[] {
                        new Claim(ClaimTypes.Role, ClaimsAuthorizationConstants.Claims.Read),
                        new Claim(ClaimTypes.Role, ClaimsAuthorizationConstants.Claims.Write)
                    });
                    break;
                case ClaimsAuthorizationConstants.Roles.SysAdmin:
                    claims.AddRange(new[] {
                        new Claim(ClaimTypes.Role, ClaimsAuthorizationConstants.Claims.Read),
                        new Claim(ClaimTypes.Role, ClaimsAuthorizationConstants.Claims.Write),
                        new Claim(ClaimTypes.Role, ClaimsAuthorizationConstants.Claims.ResetUser)
                    });
                    break;
            }

            return claims;
        }
    }
}
