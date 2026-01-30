using DarsanPortfolioAPI.DTOs;
using DarsanPortfolioAPI.Models;
using DarsanPortfolioAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace DarsanPortfolioAPI.Services;

public interface IAuthService
{
    Task<(bool Success, string Message)> RegisterAsync(string name, string email, string password);
    Task<(bool Success, LoginResponse? Response, string Message)> LoginAsync(string email, string password);
}

public interface ITokenService
{
    string GenerateToken(User user);
}

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly ITokenService _tokenService;

    public AuthService(ApplicationDbContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    public async Task<(bool Success, string Message)> RegisterAsync(string name, string email, string password)
    {
        if (await _context.Users.AnyAsync(u => u.Email == email))
            return (false, "Email already exists");

        var user = new User
        {
            Name = name,
            Email = email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            Role = "user"
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return (true, "Registration successful");
    }

    public async Task<(bool Success, LoginResponse? Response, string Message)> LoginAsync(string email, string password)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
            return (false, null, "Invalid email or password");

        if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            return (false, null, "Invalid email or password");

        var token = _tokenService.GenerateToken(user);
        var response = new LoginResponse
        {
            Token = token,
            User = new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role
            }
        };

        return (true, response, "Login successful");
    }
}

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(User user)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var key = new System.Text.UTF8Encoding().GetBytes(
            jwtSettings["SecretKey"] ?? "your-super-secret-key-that-should-be-very-long-and-secure");

        var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
        var tokenDescriptor = new Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor
        {
            Subject = new System.Security.Claims.ClaimsIdentity(new[]
            {
                new System.Security.Claims.Claim("id", user.Id.ToString()),
                new System.Security.Claims.Claim("email", user.Email),
                new System.Security.Claims.Claim("role", user.Role)
            }),
            Expires = DateTime.UtcNow.AddHours(int.Parse(jwtSettings["ExpiresInHours"] ?? "24")),
            Issuer = jwtSettings["Issuer"],
            Audience = jwtSettings["Audience"],
            SigningCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(
                new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(key),
                Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
