using System.Collections.Generic;
using ReactCore.Data.Models.User;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ReactCore.Data.Services
{
    public class UserService: BaseService<UserService>
    {
        public UserService(ILogger<UserService> logger, IConfiguration configuration) : base(logger, configuration) { }

        public User GetUser(string domainLogin)
        {
            return new User {
                UserID = 1,
                UserName = domainLogin,
                FirstName = "Login",
                LastName = "User",
                EmailAddress = $"{domainLogin.Replace("AC\\", "")}@spiffdog.com",
                IsAuthorised = false
            };
        }

        public IEnumerable<Role> GetUserPermissions(string login)
        {
            return new List<Role>
            {
                //new Role { ID = 1, Name = "Read" },
                //new Role { ID = 2, Name = "Write" },
                new Role { ID = 3, Name = "SysAdmin" }
            };
        }
    }
}
