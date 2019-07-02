using System.Collections.Generic;
using System.Linq;

namespace ReactCore.Web.Attributes.Authorization
{
    public static class ClaimsAuthorizationConstants
    {
        public const string ClaimPrefix = "ReactCore.";
        public const string RolePrefix = "";

        public struct Roles
        {
            public const string Read = RolePrefix + "Read";
            public const string Write = RolePrefix + "Write";
            public const string SysAdmin = RolePrefix + "SysAdmin";
        }

        public struct Claims
        {
            public const string Read = ClaimPrefix + "Read";
            public const string Write = ClaimPrefix + "Write";
            public const string ResetUser = ClaimPrefix + "ResetUser";
        }

        public static IEnumerable<string> GetAllClaims()
        {
            return typeof(Claims)
                .GetFields(System.Reflection.BindingFlags.Public)
                .ToList()
                .Select(f => f.Name);
        }
    }
}
