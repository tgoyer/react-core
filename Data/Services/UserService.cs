using App.Data.Models.User;
using App.Data.Models.AppSettings;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace App.Data.Services
{
    public interface IUserService
    {
        Task<User> GetUser(int? ID = null, string userName = null);
    }

    public class UserService : BaseService<UserService>, IUserService
    {
        public UserService(ILogger<UserService> logger, IOptions<AppSettings> settings)
            : base(logger, settings)
        {
        }

        public async Task<User> GetUser(int? ID = null, string userName = null)
        {
            var user = await GetUserRecord(ID, userName);
            if (user?.UserId != null) {
                user.Claims = await GetUserPermissionRecords(user.UserId.Value);
            }
            return user;
        }

        private async Task<User> GetUserRecord(int? ID = null, string userName = null)
        {
            return await DbFactory.ExecuteSingleAsync<User>(
                @"
                    select UserId, Email, FirstName, LastName, UserName 
                    from Users
                    where UserId = @Id
                        or UserName = @UserName
                ",
                new { Id = ID, UserName = userName }
            );
        }

        private async Task<IEnumerable<UserClaim>> GetUserPermissionRecords(int ID)
        {
            return await DbFactory.ExecuteListAsync<UserClaim>(
                @"
                    select uc.UserId, uc.ClaimId, c.Name, c.Description
                    from UserClaims uc
                    inner join Claims c
                        on uc.ClaimId = c.ClaimId
                    where uc.UserId = @Id
                ",
                new { Id = ID }
            );
        }
    }
}