using App.Data.Models.AppSettings;
using App.Data.Models.User;
using App.Data.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;

namespace App.Web.Utilities
{
    public interface IAccountTools
    {
        string GetDomainUserName();
        Task<User> GetUser();
        Task<User> GetUser(string domainName);
        Task<User> ResetUser(string userKey);
    }

    public class AccountTools : IAccountTools
    {
        private string accountCachePrefix = "AccountCache";
        private string domainPrefix = "AC\\";

        private AppSettings appSettings;
        private IHttpContextAccessor httpContextAccessor;
        private IMemoryCache memoryCache;
        private IUserService userService;

        public AccountTools(
            IOptions<AppSettings> settings,
            IMemoryCache memoryCache,
            IHttpContextAccessor httpContextAccessor,
            IUserService userService
        )
        {
            appSettings = settings.Value;

            this.httpContextAccessor = httpContextAccessor;
            this.memoryCache = memoryCache;
            this.userService = userService;
        }

        public string GetDomainUserName()
        {
            return httpContextAccessor.HttpContext?.User?.Identity?.Name;
        }

        public async Task<User> GetUser()
        {
            return await GetUser(GetDomainUserName());
        }

        public async Task<User> GetUser(string userName)
        {
            if (string.IsNullOrEmpty(userName))
            {
                return null;
            }

            if (!userName.StartsWith(domainPrefix))
            {
                userName = $"{domainPrefix}{userName}";
            }

            string cacheKey = $"{accountCachePrefix}::{userName}";
            if (!memoryCache.TryGetValue(cacheKey, out User user))
            {
                user = await userService.GetUser(null, userName);
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromSeconds(appSettings.Cache.SlidingTimeout))
                    .SetAbsoluteExpiration(TimeSpan.FromSeconds(appSettings.Cache.AbsoluteTimeout));

                memoryCache.Set(cacheKey, user, cacheEntryOptions);
            }

            return user;
        }

        public async Task<User> GetUser(int userID)
        {
            string cacheKey = $"{accountCachePrefix}::{userID}";
            if (!memoryCache.TryGetValue(cacheKey, out User user))
            {
                user = await userService.GetUser(userID, null);
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromSeconds(appSettings.Cache.SlidingTimeout))
                    .SetAbsoluteExpiration(TimeSpan.FromSeconds(appSettings.Cache.AbsoluteTimeout));

                memoryCache.Set(cacheKey, user, cacheEntryOptions);
            }

            return user;
        }

        public async Task<User> ResetUser(string userName)
        {
            string cacheKey = $"{accountCachePrefix}::{userName}";
            memoryCache.Remove(cacheKey);
            return await GetUser(userName);
        }
    }
}