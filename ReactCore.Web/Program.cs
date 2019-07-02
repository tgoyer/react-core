using System;
using System.IO;

using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

using Serilog;
using Serilog.Events;

namespace ReactCore.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
               .MinimumLevel.Information()
               .Enrich.FromLogContext()
               .CreateLogger();

            try
            {
                Log.Information("Starting web host");
                BuildWebHost(args).Run();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIIS()
                .UseKestrel()
                .ConfigureAppConfiguration((context, config) => {
                    IHostingEnvironment env = context.HostingEnvironment;

                    config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                        .AddJsonFile("appsettings.environment.json", optional: true, reloadOnChange: true);
                })
                .UseIISIntegration()
                .UseSerilog((context, loggerConfiguration) => {
                    loggerConfiguration
                        .ReadFrom.Configuration(context.Configuration)
                        .Enrich.FromLogContext()
                        .Enrich.WithEnvironmentUserName()
                        .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                        .MinimumLevel.Override("System", LogEventLevel.Warning)
                        .WriteTo.Console()
                        .WriteTo.File(
                            $"./Logs/{typeof(Program).Namespace}_.txt",
                            rollingInterval: RollingInterval.Day,
                            rollOnFileSizeLimit: true,
                            outputTemplate: "[{Timestamp:dd-MMM-yyyy HH:mm:ss} {UserLoginName} {Level}] {Message:lj}{NewLine}{Exception}"
                        );
                })
                .UseStartup<Startup>()
                .Build();
    }
}
