using JayaAutomobiles_API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// 1. MongoDB Service එක (අපි කලින් දාපු එක)
builder.Services.AddSingleton<CarService>();

// 2. Controllers Service එක
builder.Services.AddControllers();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") 
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();