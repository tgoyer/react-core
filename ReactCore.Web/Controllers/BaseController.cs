using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using ReactCore.Web.Utilities;

namespace ReactCore.Web.Controllers
{
    [ApiController]
    public abstract class BaseController<T> : ControllerBase where T : BaseController<T>
    {
        private IConfiguration configuration;
        private IHostingEnvironment hostingEnvironment;
        private ILogger<T> logger;
        private AccountTools accountTools;

        protected IConfiguration Configuration => configuration ?? (configuration = HttpContext?.RequestServices.GetService<IConfiguration>());
        protected IHostingEnvironment HostingEnvironment => hostingEnvironment ?? (hostingEnvironment = HttpContext?.RequestServices.GetService<IHostingEnvironment>());
        protected ILogger<T> Logger => logger ?? (logger = HttpContext?.RequestServices.GetService<ILogger<T>>());
        protected AccountTools AccountTools => accountTools ?? (accountTools = HttpContext?.RequestServices.GetService<AccountTools>());
    }
}
