using System.Threading.Channels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using ResultsApi.Authentication;
using ResultsApi.Data;
using ResultsApi.ErrorHandling;
using ResultsApi.Logging;
using ResultsApi.Models;
using ResultsApi.OptionsSetup;
using ResultsApi.Services;

namespace ResultsApi;

internal static class DiHelper
{
    public static void RegisterDependencies(this IServiceCollection services)
    {
        var config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

        services.AddSingleton<IConfiguration>(config);

        services.AddControllers(o =>
            o.Filters.Add(typeof(ApiExceptionFilter)));
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.RegisterDb(config);

        services.RegisterLogging();

        services.AddScoped<PasswordEncryptionService>();

        services.RegisterJwt();

        services.AddCors(options =>
        {
            options.AddPolicy("cors", policy =>
            {
                policy.WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });
    }

    private static void RegisterDb(this IServiceCollection serviceCollection, IConfigurationRoot config)
    {
        serviceCollection.AddDbContextFactory<ResultsContext>(options =>
            options.UseSqlServer(config.GetConnectionString("ResultsConnectionString")));
        serviceCollection.AddDbContext<IResultsContext, ResultsContext>(options =>
            options.UseSqlServer(config.GetConnectionString("ResultsConnectionString")));
    }

    private static void RegisterLogging(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddSingleton(Channel.CreateUnbounded<Log>(new UnboundedChannelOptions { SingleReader = true }));
        serviceCollection.AddSingleton(x => x.GetRequiredService<Channel<Log>>().Reader);
        serviceCollection.AddSingleton(x => x.GetRequiredService<Channel<Log>>().Writer);
        serviceCollection.AddSingleton<ILogWriter, LogWriter>();
        serviceCollection.AddHostedService<LoggingService>();
    }

    private static void RegisterJwt(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<IJwtProvider, JwtProvider>();

        serviceCollection.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer();
        serviceCollection.ConfigureOptions<JwtOptionsSetup>();
        serviceCollection.ConfigureOptions<JwtBearerOptionsSetup>();
    }
}

