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

        public AuthController(UserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            // Register වෙද්දී හිස්තැන් (Spaces) අයින් කරනවා (Trim)
            var user = new User
            {
                Username = request.Username.Trim(),
                Password = request.Password.Trim(),
                Role = "Admin"
            };

            await _userService.CreateAsync(user);
            return Ok("User registered successfully!");
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto request)
        {
            Console.WriteLine($"\n--- LOGIN ATTEMPT ---");
            Console.WriteLine($"Trying to login with Username: '{request.Username}'");
            Console.WriteLine($"Trying to login with Password: '{request.Password}'");

            // Database එකෙන් User හොයනවා
            var user = await _userService.GetByUsernameAsync(request.Username);

            if (user == null)
            {
                Console.WriteLine($"❌ ERROR: User '{request.Username}' not found in Database!");
                return BadRequest("User not found.");
            }

            Console.WriteLine($"✅ User Found! DB Password is: '{user.Password}'");

            // Password Check කිරීම
            if (user.Password != request.Password)
            {
                Console.WriteLine($"❌ ERROR: Password Mismatch!");
                Console.WriteLine($"Input: '{request.Password}' vs DB: '{user.Password}'");
                return BadRequest("Wrong password.");
            }

            // ඔක්කොම හරි නම් Token එක හදනවා
            string token = CreateToken(user);
            Console.WriteLine($"🎉 SUCCESS: Token Generated!");
            return Ok(token);
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("JwtSettings:SecretKey").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}