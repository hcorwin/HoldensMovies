using Microsoft.EntityFrameworkCore;
using ResultsApi;
using ResultsApi.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.RegisterDependencies();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.RoutePrefix = string.Empty;
});

app.UseCors("cors");

await using var scope = app.Services.CreateAsyncScope();
var db = scope.ServiceProvider.GetRequiredService<ResultsContext>();
await db.Database.MigrateAsync();
await db.Seed();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program{}
