using System.Collections.Generic;
using System.Linq;

using Microsoft.AspNetCore.Authorization;

namespace ReactCore.Web.Attributes.Authorization
{
    internal class ClaimsRequirement : IAuthorizationRequirement
    {
        public List<string> Claims { get; set; }

        public ClaimsRequirement(string claim)
        {
            Claims = new List<string> { claim };
        }

        public ClaimsRequirement(string[] claims)
        {
            Claims = claims.ToList();
        }
    }
}
