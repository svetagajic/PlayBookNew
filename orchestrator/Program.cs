using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Orchestrator.Data;

namespace Orchestrator
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            // Initialize and seed the database if needed
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var dbContext = services.GetRequiredService<OrchestratorDbContext>();
                    dbContext.Database.Migrate(); 
                    // Apply any pending migrations
                    // Optionally, seed the database with initial data
                    // DbInitializer.Initialize(dbContext);
                }
                catch (System.Exception ex)
                {
                    // Log the error or handle as needed
                    throw;
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureServices(services =>
                    {
                        services.AddControllers()
                        .AddJsonOptions(options =>
                        {
                            options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
                        }); // Add this line to configure controller services

                        services.AddDbContext<OrchestratorDbContext>(options =>
                        {
                            var configuration = new ConfigurationBuilder()
                                .AddJsonFile("appsettings.json")
                                .Build();

                            var connectionString = configuration.GetConnectionString("DefaultConnection");
                            options.UseNpgsql(connectionString, builder =>
                                {
                                    builder.EnableRetryOnFailure(3, TimeSpan.FromSeconds(5), null);
                                });
                        });
                    });

                    webBuilder.Configure(app =>
                    {
                        app.UseRouting();
                        app.UseEndpoints(endpoints =>
                        {
                            endpoints.MapControllers(); // Add this line to map controllers
                        });
                    });
                });
    }
}
