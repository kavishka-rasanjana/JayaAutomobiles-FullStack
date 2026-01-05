using JayaAutomobiles_API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ==========================================
// 1. REGISTER SERVICES (DEPENDENCY INJECTION)
// ==========================================

// Register MongoDB Services as Singleton
// Singleton: Created once and reused throughout the application lifetime.
builder.Services.AddSingleton<CarService>();
builder.Services.AddSingleton<UserService>();

builder.Services.AddControllers();

// Configure CORS (Cross-Origin Resource Sharing)
// This allows the React Frontend (running on different ports) to communicate with this Backend.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "http://localhost:3001") // Allow React Frontend
                  .AllowAnyMethod()  // Allow GET, POST, PUT, DELETE
                  .AllowAnyHeader(); // Allow all headers (Authorization, Content-Type)
        });
});

// ==========================================
// 2. CONFIGURE JWT AUTHENTICATION (New Added)
// ==========================================
// This section tells the API how to validate the token sent by the frontend.
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            builder.Configuration.GetSection("JwtSettings:SecretKey").Value!)),
        ValidateIssuer = false, // In a real app, set these to true
        ValidateAudience = false
    };
});

// Swagger Configuration (For API Documentation)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ==========================================
// 3. CONFIGURE MIDDLEWARE PIPELINE
// ==========================================

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// IMPORTANT: Middleware Order Matters!
// 1. CORS must be before Authorization
app.UseCors("AllowReactApp");

// 2. Authentication (Who are you?) - NEW
app.UseAuthentication();

// 3. Authorization (What are you allowed to do?)
app.UseAuthorization();

app.MapControllers();

app.Run();