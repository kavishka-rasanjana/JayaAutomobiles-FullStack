using JayaAutomobiles_API.Dtos;
using JayaAutomobiles_API.Models;
using JayaAutomobiles_API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JayaAutomobiles_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly IConfiguration _configuration;

        // Constructor to inject dependencies (UserService and Configuration)
        public AuthController(UserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        // Endpoint: api/Auth/register
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            // 1. Create a new user object
            // Trimming ensures no accidental spaces are saved (e.g., "admin " -> "admin")
            var user = new User
            {
                Username = request.Username.Trim(),
                Password = request.Password.Trim(), // Note: In a real app, hash this password before saving!
                Role = "Admin" // Assigning default role
            };

            // 2. Save the user to the database using UserService
            await _userService.CreateAsync(user);

            return Ok("User registered successfully!");
        }

        // Endpoint: api/Auth/login
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto request)
        {
            // 1. Search for the user in the database by Username
            var user = await _userService.GetByUsernameAsync(request.Username);

            // 2. Check if the user exists
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            // 3. Verify the password
            // Note: Since we are using plain text for this project, we compare strings directly.
            // In a production app, we would verify the password hash here.
            if (user.Password != request.Password)
            {
                return BadRequest("Wrong password.");
            }

            // 4. If credentials are valid, generate and return a JWT Token
            string token = CreateToken(user);
            return Ok(token);
        }

        // Helper method to generate the JWT Token
        private string CreateToken(User user)
        {
            // A. Define Claims: Information we want to store inside the token (Username, Role)
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            // B. Get the Secret Key from appsettings.json
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("JwtSettings:SecretKey").Value!));

            // C. Sign the token using HMAC SHA512 algorithm for security
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // D. Create the Token object with expiration time (1 day)
            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

            // E. Write the token as a string and return it
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}