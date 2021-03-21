using App.Data.Models.AppSettings;
using App.Data.Services;
using App.Web.Utilities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;

namespace App.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var appSettings = new AppSettings();
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            appSettingsSection.Bind(appSettings);

            services.AddLogging();

            services.AddControllers(options =>
            {
                options.Conventions.Add(new RouteTokenTransformerConvention(new SlugifyParameterTransformer()));
            });

            services.AddCors(config =>
            {
                config.AddDefaultPolicy(options =>
                {
                    string[] exposedHeaders = new string[] { "Content-Range", "Content-Encoding" };
                    options
                        .SetIsOriginAllowed(origin =>
                        {
                            var host = origin == "null" ? null : new Uri(origin).Host;
                            var domainUri = new Uri(appSettings.Domain).Host;
                            return host == null || host == "localhost" || host.EndsWith(domainUri);
                        })
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .WithExposedHeaders(exposedHeaders);
                });
            });

            services.Configure<IISOptions>(options => options.AutomaticAuthentication = true);
            services.AddAuthentication(IISDefaults.AuthenticationScheme);
            //services.AddAuthentication(NegotiateDefaults.AuthenticationScheme)
            //    .AddNegotiate();

            // Inject data services.
            services.AddSingleton<IUserService, UserService>();

            // Inject controller dependencies
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IMemoryCache, MemoryCache>();
            services.AddSingleton<IAccountTools, AccountTools>();

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(config =>
            {
                config.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = $"{appSettings.Name} API",
                    Description = $"{appSettings.Name} Data API",
                    Contact = new OpenApiContact
                    {
                        Name = appSettings.Name,
                        Email = appSettings.SupportEmail,
                        Url = new Uri(appSettings.Domain),
                    }
                });
            });

            services.AddHttpsRedirection(options =>
            {
                options.RedirectStatusCode = StatusCodes.Status301MovedPermanently;
                options.HttpsPort = appSettings.HttpsPort;
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "Client/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var appSettings = new AppSettings();
            var appSettingsSection = Configuration.GetSection("AppSettings");
            appSettingsSection.Bind(appSettings);

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", $"{appSettings.Name} API V1");
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseCors();

            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller:slugify}/{action:slugify?}/{id:slugify?}"
                );
                endpoints.MapFallbackToFile("/index.html");
            });

            app.UseSpa(spa =>
            {
                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
                }
            });
        }
    }
}