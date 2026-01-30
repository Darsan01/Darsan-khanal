using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DarsanPortfolioAPI.DTOs;
using DarsanPortfolioAPI.Services;
using DarsanPortfolioAPI.Data;
using DarsanPortfolioAPI.Models;

namespace DarsanPortfolioAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] LoginRequest request)
    {
        if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            return BadRequest("Email and password are required");

        var (success, message) = await _authService.RegisterAsync(
            request.Email.Split('@')[0],
            request.Email,
            request.Password);

        if (!success)
            return BadRequest(new { message });

        return Ok(new { message });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            return BadRequest("Email and password are required");

        var (success, response, message) = await _authService.LoginAsync(request.Email, request.Password);

        if (!success)
            return Unauthorized(new { message });

        return Ok(response);
    }

    [Authorize]
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        return Ok(new { message = "Logout successful" });
    }
}

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProjectsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetProjects()
    {
        var projects = await _context.Projects.ToListAsync();
        return Ok(projects);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProject(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound();

        return Ok(project);
    }

    [Authorize(Roles = "admin")]
    [HttpPost]
    public async Task<IActionResult> CreateProject([FromBody] CreateProjectDto dto)
    {
        var project = new Project
        {
            Title = dto.Title,
            Description = dto.Description,
            Image = dto.Image,
            Technologies = dto.Technologies,
            GitHub = dto.GitHub,
            LiveDemo = dto.LiveDemo,
            Featured = dto.Featured
        };

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
    }

    [Authorize(Roles = "admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProject(int id, [FromBody] CreateProjectDto dto)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound();

        project.Title = dto.Title;
        project.Description = dto.Description;
        project.Image = dto.Image;
        project.Technologies = dto.Technologies;
        project.GitHub = dto.GitHub;
        project.LiveDemo = dto.LiveDemo;
        project.Featured = dto.Featured;
        project.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return Ok(project);
    }

    [Authorize(Roles = "admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound();

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Project deleted successfully" });
    }
}

[ApiController]
[Route("api/[controller]")]
public class SkillsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SkillsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetSkills()
    {
        var skills = await _context.Skills.ToListAsync();
        // Group by category
        var grouped = skills.GroupBy(s => s.Category)
            .Select(g => new
            {
                category = g.Key,
                items = g.Select(s => new { id = s.Id, name = s.Name, proficiency = s.Proficiency }).ToList()
            }).ToList();

        return Ok(grouped);
    }

    [Authorize(Roles = "admin")]
    [HttpPost]
    public async Task<IActionResult> CreateSkill([FromBody] CreateSkillDto dto)
    {
        var skill = new Skill
        {
            Name = dto.Name,
            Category = dto.Category,
            Proficiency = dto.Proficiency
        };

        _context.Skills.Add(skill);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSkills), new { id = skill.Id }, skill);
    }

    [Authorize(Roles = "admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSkill(int id, [FromBody] CreateSkillDto dto)
    {
        var skill = await _context.Skills.FindAsync(id);
        if (skill == null)
            return NotFound();

        skill.Name = dto.Name;
        skill.Category = dto.Category;
        skill.Proficiency = dto.Proficiency;

        await _context.SaveChangesAsync();
        return Ok(skill);
    }

    [Authorize(Roles = "admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSkill(int id)
    {
        var skill = await _context.Skills.FindAsync(id);
        if (skill == null)
            return NotFound();

        _context.Skills.Remove(skill);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Skill deleted successfully" });
    }
}

[ApiController]
[Route("api/[controller]")]
public class ExperienceController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ExperienceController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetExperience()
    {
        var experience = await _context.Experiences.OrderByDescending(e => e.StartDate).ToListAsync();
        return Ok(experience);
    }

    [Authorize(Roles = "admin")]
    [HttpPost]
    public async Task<IActionResult> CreateExperience([FromBody] CreateExperienceDto dto)
    {
        var exp = new Experience
        {
            Company = dto.Company,
            Position = dto.Position,
            Description = dto.Description,
            Duration = dto.Duration,
            Highlights = dto.Highlights,
            Technologies = dto.Technologies,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate
        };

        _context.Experiences.Add(exp);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetExperience), new { id = exp.Id }, exp);
    }

    [Authorize(Roles = "admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateExperience(int id, [FromBody] CreateExperienceDto dto)
    {
        var exp = await _context.Experiences.FindAsync(id);
        if (exp == null)
            return NotFound();

        exp.Company = dto.Company;
        exp.Position = dto.Position;
        exp.Description = dto.Description;
        exp.Duration = dto.Duration;
        exp.Highlights = dto.Highlights;
        exp.Technologies = dto.Technologies;
        exp.StartDate = dto.StartDate;
        exp.EndDate = dto.EndDate;

        await _context.SaveChangesAsync();
        return Ok(exp);
    }

    [Authorize(Roles = "admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteExperience(int id)
    {
        var exp = await _context.Experiences.FindAsync(id);
        if (exp == null)
            return NotFound();

        _context.Experiences.Remove(exp);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Experience deleted successfully" });
    }
}

[ApiController]
[Route("api/[controller]")]
public class MessagesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public MessagesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [Authorize(Roles = "admin")]
    [HttpGet]
    public async Task<IActionResult> GetMessages()
    {
        var messages = await _context.Messages.OrderByDescending(m => m.CreatedAt).ToListAsync();
        return Ok(messages.Select(m => new MessageDto
        {
            Id = m.Id,
            Name = m.Name,
            Email = m.Email,
            Subject = m.Subject,
            Message = m.MessageContent,
            Read = m.Read,
            CreatedAt = m.CreatedAt
        }).ToList());
    }

    [HttpPost]
    public async Task<IActionResult> CreateMessage([FromBody] CreateMessageDto dto)
    {
        var message = new Message
        {
            Name = dto.Name,
            Email = dto.Email,
            Subject = dto.Subject,
            MessageContent = dto.Message
        };

        _context.Messages.Add(message);
        await _context.SaveChangesAsync();

        // TODO: Send email notification

        return Ok(new { message = "Message sent successfully" });
    }

    [Authorize(Roles = "admin")]
    [HttpPut("{id}/read")]
    public async Task<IActionResult> MarkAsRead(int id)
    {
        var message = await _context.Messages.FindAsync(id);
        if (message == null)
            return NotFound();

        message.Read = true;
        await _context.SaveChangesAsync();

        return Ok(message);
    }

    [Authorize(Roles = "admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMessage(int id)
    {
        var message = await _context.Messages.FindAsync(id);
        if (message == null)
            return NotFound();

        _context.Messages.Remove(message);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Message deleted successfully" });
    }
}
