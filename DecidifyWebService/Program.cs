using Decidify.Repository;
using Decidify.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using MySql.EntityFrameworkCore.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

// Configure the connection string.
var connection = new MySqlConnectionString();
var connectionString = connection.ConnectionString;

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Configure Repository
builder.Services.AddTransient<IPollRepository, PollRepository>();

//Configure DbContext 
/*builder.Services.AddEntityFrameworkMySQL().AddDbContext<PollContext>(options =>
                options.UseMySQL(builder.Configuration.GetConnectionString("DecidifyDBConnectionString")));*/
builder.Services.AddEntityFrameworkMySQL().AddDbContext<PollContext>(options =>
                options.UseMySQL(connectionString));

// Configure Cors
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000"));

app.UseAuthorization();

app.MapControllers();

app.Run();
