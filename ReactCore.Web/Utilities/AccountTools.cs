using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;

using ReactCore.Data.Models.User;
using ReactCore.Data.Services;
using ReactCore.Web.Attributes.Authorization;

namespace ReactCore.Web.Utilities
{
    public class AccountTools
    {
        string accountCachePrefix = "AccountCache";
        IConfiguration configuration;
        IHttpContextAccessor httpContextAccessor;
        IMemoryCache memoryCache;
        UserService userService;
        private object cacheLock = new object();

        public AccountTools(
            IConfiguration configuration,
            IMemoryCache memoryCache, 
            IHttpContextAccessor httpContextAccessor, 
            UserService userService
        ) {
            this.configuration = configuration;
            this.httpContextAccessor = httpContextAccessor;
            this.memoryCache = memoryCache;
            this.userService = userService;
        }

        public string GetDomainUserName()
        {
            return httpContextAccessor.HttpContext.User.Identity.Name;
        }

        public User GetUser()
        {
            return GetUser(GetDomainUserName());
        }

        public User GetUser(string domainName)
        {
            string cacheKey = $"{accountCachePrefix}::{domainName}";
            DateTime cacheEntry;

            if (!memoryCache.TryGetValue(cacheKey, out User user))
            {
                lock (cacheLock)
                {
                    user = userService.GetUser(domainName);
                    var roles = userService.GetUserPermissions(domainName);

                    if (user != null)
                    {
                        user.Claims = new List<Claim> { new Claim(ClaimTypes.Name, domainName) };

                        if (roles != null)
                        {
                            var roleClaimsLists = roles.Select(r => ClaimsAuthorizationRoleMapping.GetClaims(r.Name));

                            user.Claims.AddRange(
                                roleClaimsLists
                                    .SelectMany(c => c) // Flatten the lists if there are multiple assigned roles.
                                    .GroupBy(c => c.Value) // Retrieve the unique claims by grouping by claim value...
                                    .Select(g => g.First()) // ...and grabbing the first claim from each grouping.
                            );
                        }
                    }

                    // Key not in cache, so get data.
                    cacheEntry = DateTime.Now;

                    // Set cache options.
                    var cacheTimeout = configuration.GetValue<int>("AppSettings:CacheTimeoutSeconds");
                    var cacheEntryOptions = new MemoryCacheEntryOptions()
                        .SetSlidingExpiration(TimeSpan.FromSeconds(cacheTimeout)); // Keep in cache for this time, reset time if accessed.

                    memoryCache.Set(cacheKey, user, cacheEntryOptions);
                }
            }

            return user;
        }

        public bool HasPermission()
        {
            var user = GetUser();
            return user != null
                ? user.Claims.Any(c => ClaimsAuthorizationConstants.GetAllClaims().Contains(c.Value))
                : false;
        }

        public User ResetUser(string userKey)
        {
            string cacheKey = $"{accountCachePrefix}::{userKey}";
            memoryCache.Remove(cacheKey);
            return GetUser(userKey);
        }
    }
}
