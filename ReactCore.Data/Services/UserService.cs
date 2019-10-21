using System.Collections.Generic;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using ReactCore.Data.Extensions;
using ReactCore.Data.Models.User;

namespace ReactCore.Data.Services
{
    public class UserService: 
        BaseService<UserService>,
        IService, IReadableService<User>
    {
        public UserService(ILogger<UserService> logger, IConfiguration configuration) : base(logger, configuration) { }

        public User SelectUser(string domainLogin)
        {
            User user = this.SelectFirst(e => true);

            user.UserName = domainLogin;
            user.EmailAddress = $"{domainLogin.Replace("AC\\", "")}@alliancebernstein.com";

            return user;
        }

        public IEnumerable<Role> SelectUserPermissions(string domainLogin)
        {
            return new List<Role>
            {
                //new Role { Id = 1, Name = "Read", UserName = domainLogin },
                //new Role { Id = 2, Name = "Write", UserName = domainLogin },
                new Role { Id = 3, Name = "SysAdmin", UserName = domainLogin }
            };
        }
    }
}
