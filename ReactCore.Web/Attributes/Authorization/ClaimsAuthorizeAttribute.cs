using System;

using Microsoft.AspNetCore.Authorization;

namespace ReactCore.Web.Attributes.Authorization
{
    internal class ClaimsAuthorizeAttribute: AuthorizeAttribute
    {
        public ClaimsAuthorizeAttribute(string claimName) => Claim = claimName;

        public string Claim {
            get {
                return Policy;
            }

            set {
                if (!string.IsNullOrEmpty(value) && value.StartsWith(ClaimsAuthorizationConstants.ClaimPrefix, StringComparison.OrdinalIgnoreCase))
                {
                    Policy = value;
                }
            }
        }
    }
}
