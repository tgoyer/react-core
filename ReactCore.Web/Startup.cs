using System;
using System.IO;
using System.Net;
using System.Reflection;
using System.Text;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Newtonsoft.Json.Serialization;
using Serilog;
using Serilog.Core.Enrichers;
using Serilog.Enrichers.AspNetCore.HttpContext;
using Swashbuckle.AspNetCore.SwaggerGen;

using ReactCore.Data.Services;
using ReactCore.Web.Attributes.Authorization;
using ReactCore.Web.Attributes.Version;
using ReactCore.Web.Middleware;
using ReactCore.Web.Swagger;
using ReactCore.Web.Utilities;
using ReactCore.Web.ViewModels;

namespace ReactCore.Web
{
    public class Startup
    {
        private readonly Microsoft.Extensions.Logging.ILogger logger;

        public Startup(IConfiguration configuration, ILogger<Startup> logger)
        {
            Configuration = configuration;
            this.logger = logger;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Register the User Claims processor.
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IAuthorizationPolicyProvider, ClaimsPolicyProvider>();
            services.AddSingleton<IAuthorizationHandler, ClaimsAuthorizationHandler>();
            services.AddTransient<IClaimsTransformation, ClaimsTransformer>();

            // Register Account lookup tooling.
            services.AddTransient<AccountTools>();

            // Register ReactCore.Data injectable services
            services.AddTransient<DataGridService>();
            services.AddTransient<UserService>();

            // Register Swagger configuration
            services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();

            // Enable automatic Windows Authentication for NTLM creditials
            services.Configure<IISOptions>(options => options.AutomaticAuthentication = true);
            services.AddAuthentication(IISDefaults.AuthenticationScheme);

            services.AddCors(o => {
                o.AddPolicy("CorsPolicy", builder => {
                    builder.SetIsOriginAllowedToAllowWildcardSubdomains();

                    builder
                        .WithOrigins("http://*.com")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
                o.AddPolicy("DevCorsPolicy", builder => {
                    builder
                        .WithOrigins(
                            "http://localhost:3000"
                        )
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            // Configure https redirection
            services.AddHttpsRedirection(options =>
            {
                options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
                options.HttpsPort = Configuration.GetValue("AppSettings:HttpsPort", 443);
            });

            // Configurure MVC container.
            services
                .AddMvc(options => {
                    var policy = new AuthorizationPolicyBuilder()
                        .RequireAuthenticatedUser()
                        .Build();

                    options.Filters.Add(new AuthorizeFilter(policy));
                    options.EnableEndpointRouting = true;
                    options.UseGeneralRoutePrefix("api/v{version:apiVersion}");
                })
                .SetCompatibilityVersion(CompatibilityVersion.Latest)
                .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            // Add versioning support
            services.AddApiVersioning(options => {
                // reporting api versions will return the headers "api-supported-versions" and "api-deprecated-versions"
                options.ReportApiVersions = true;
            });

            services.AddVersionedApiExplorer(options => {
                options.AssumeDefaultVersionWhenUnspecified = true;
                options.DefaultApiVersion = new ApiVersion(1, 0);

                // add the versioned api explorer, which also adds IApiVersionDescriptionProvider service
                // note: the specified format code will format the version as "'v'major[.minor][-status]"
                options.GroupNameFormat = "'v'VVVV";

                // note: this option is only necessary when versioning by url segment. the SubstitutionFormat
                // can also be used to control the format of the API version in route templates
                options.SubstituteApiVersionInUrl = true;
            });

            // Setup Swashbuckle's Swagger generation configuration.
            services.AddSwaggerGen(c => {
                // add a custom operation filter which sets default values
                c.OperationFilter<SwaggerDefaultValues>();

                // Set the XML comments path for building the Swagger JSON 
                // and Swashbuckle UI auto-documentation.
                c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, $"{typeof(Startup).Namespace}.xml"));
            });

            // Wire up React client support
            services.AddSpaStaticFiles(configuration => configuration.RootPath = "Client/build");
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IApiVersionDescriptionProvider apiVersionDescriptionProvider)
        {
            loggerFactory.AddSerilog();

            app.UseSerilogLogContext(options => {
                options.EnrichersForContextFactory = context => new[] {
                    new PropertyEnricher("UserLoginName", context.User.Identity.Name)
                };
            });

            //app.UseHttpsRedirection();
            app.UseMiddleware<SerilogHttpMiddleware>();
            app.UseAuthentication();

            app.UseSwagger();
            app.UseSwaggerUI(c => {
                // build a swagger endpoint for each discovered API version
                foreach (var description in apiVersionDescriptionProvider.ApiVersionDescriptions) {
                    c.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", description.GroupName.ToUpperInvariant());
                }

                c.IndexStream = () => GetType().GetTypeInfo().Assembly.GetManifestResourceStream($"{typeof(Startup).Namespace}.Swagger.SwaggerUI.theme.html");
            });

            if (env.IsDevelopment())
            {
                app.UseCors("DevCorsPolicy");
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseCors("CorsPolicy");
                app.UseExceptionHandler(options => options.Run(
                    async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        context.Response.ContentType = "application/json";

                        var ex = context.Features.Get<IExceptionHandlerFeature>();
                        if (ex != null)
                        {
                            logger.Log(LogLevel.Error, ex.Error, "Unhandled exception occured.");

                            var err = new Error()
                            {
                                Message = ex.Error.Message,
                                Code = (int)HttpStatusCode.InternalServerError
                            };
                            var responseBody = Encoding.ASCII.GetBytes(err.ToString());
                            await context.Response.Body.WriteAsync(responseBody, 0, responseBody.Length);
                        }
                    }
                ));
            }

            app.UseMvc(routes => routes.MapRoute(name: "default", template: "{controller}/{action=Index}/{id?}"));

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "Client";
                if (env.IsDevelopment()) 
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
                }
            });
        }
    }
}
