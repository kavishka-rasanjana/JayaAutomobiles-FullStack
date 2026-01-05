using JayaAutomobiles_API.Services;

var builder = WebApplication.CreateBuilder(args);

// --- Services Register කිරීම ---
builder.Services.AddSingleton<CarService>();
builder.Services.AddSingleton<UserService>(); // User Service එක
builder.Services.AddControllers();

// 1. CORS Service එක Add කිරීම (Frontend - Port 3000 ට අවසර දීම)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "http://localhost:3001") // React දුවන Port එක
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 2. වැදගත්ම තැන: මේ පේළිය අනිවාර්යයෙන්ම UseAuthorization වලට උඩින් තියෙන්න ඕන
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();