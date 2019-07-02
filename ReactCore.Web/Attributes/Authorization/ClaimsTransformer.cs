using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authentication;

using ReactCore.Web.Utilities;

namespace ReactCore.Web.Attributes.Authorization
{
    public class ClaimsTransformer : IClaimsTransformation
    {
        AccountTools accountTools;

        public ClaimsTransformer(AccountTools accountTools)
        {
            this.accountTools = accountTools;
        }

        public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
        {
            var nameKey = principal.Identity.Name;
            var user = accountTools.GetUser(nameKey);

            if (user != null) {
                var idClaims = ((ClaimsIdentity)principal.Identity).Claims;

                if (user.Claims != null && user.Claims.Count > 0) {
                    ((ClaimsIdentity)principal.Identity).AddClaims(
                        user.Claims.Where(c => !idClaims.Any(idc => idc.Type == c.Type && idc.Value == c.Value))
                    );
                }
            }

            return Task.FromResult(principal);
        }
    }
}
