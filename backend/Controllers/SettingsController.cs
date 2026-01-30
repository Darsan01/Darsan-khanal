using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DarsanPortfolioAPI.DTOs;
using DarsanPortfolioAPI.Data;
using DarsanPortfolioAPI.Models;

namespace DarsanPortfolioAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SettingsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SettingsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Get App Settings
    [HttpGet]
    public async Task<IActionResult> GetSettings()
    {
        var settings = await _context.AppSettings.FirstOrDefaultAsync();
        if (settings == null)
            return NotFound();
        return Ok(settings);
    }

    // Update App Settings (Admin only)
    [Authorize(Roles = "admin")]
    [HttpPut]
    public async Task<IActionResult> UpdateSettings([FromBody] UpdateAppSettingsDto dto)
    {
        var settings = await _context.AppSettings.FirstOrDefaultAsync();
        if (settings == null)
        {
            settings = new AppSettings();
            _context.AppSettings.Add(settings);
        }

        settings.AppName = dto.AppName;
        settings.AppTagline = dto.AppTagline;
        settings.ProfileImage = dto.ProfileImage;
        settings.CvPath = dto.CvPath;
        settings.AboutMe = dto.AboutMe;
        settings.ContactEmail = dto.ContactEmail;
        settings.ContactPhone = dto.ContactPhone;
        settings.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return Ok(settings);
    }
}

[ApiController]
[Route("api/[controller]")]
public class SocialLinksController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SocialLinksController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetSocialLinks()
    {
        var links = await _context.SocialLinks
            .Where(s => s.Visible)
            .OrderBy(s => s.Order)
            .ToListAsync();
        return Ok(links);
    }

    [Authorize(Roles = "admin")]
    [HttpPost]
    public async Task<IActionResult> CreateSocialLink([FromBody] CreateSocialLinkDto dto)
    {
        var link = new SocialLink
        {
            Platform = dto.Platform,
            Url = dto.Url,
            Icon = dto.Icon,
            Order = dto.Order
        };
        _context.SocialLinks.Add(link);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetSocialLinks), new { id = link.Id }, link);
    }

    [Authorize(Roles = "admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSocialLink(int id, [FromBody] CreateSocialLinkDto dto)
    {
        var link = await _context.SocialLinks.FindAsync(id);
        if (link == null)
            return NotFound();

        link.Platform = dto.Platform;
        link.Url = dto.Url;
        link.Icon = dto.Icon;
        link.Order = dto.Order;

        await _context.SaveChangesAsync();
        return Ok(link);
    }

    [Authorize(Roles = "admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSocialLink(int id)
    {
        var link = await _context.SocialLinks.FindAsync(id);
        if (link == null)
            return NotFound();

        _context.SocialLinks.Remove(link);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Social link deleted" });
    }
}

[ApiController]
[Route("api/[controller]")]
public class NavController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public NavController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetNavItems()
    {
        var items = await _context.NavItems
            .Where(n => n.Visible)
            .OrderBy(n => n.Order)
            .ToListAsync();
        return Ok(items);
    }

    [Authorize(Roles = "admin")]
    [HttpPost]
    public async Task<IActionResult> CreateNavItem([FromBody] CreateNavItemDto dto)
    {
        var item = new NavItem
        {
            Label = dto.Label,
            Url = dto.Url,
            Order = dto.Order
        };
        _context.NavItems.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetNavItems), new { id = item.Id }, item);
    }

    [Authorize(Roles = "admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNavItem(int id, [FromBody] CreateNavItemDto dto)
    {
        var item = await _context.NavItems.FindAsync(id);
        if (item == null)
            return NotFound();

        item.Label = dto.Label;
        item.Url = dto.Url;
        item.Order = dto.Order;

        await _context.SaveChangesAsync();
        return Ok(item);
    }

    [Authorize(Roles = "admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNavItem(int id)
    {
        var item = await _context.NavItems.FindAsync(id);
        if (item == null)
            return NotFound();

        _context.NavItems.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Nav item deleted" });
    }
}

[ApiController]
[Route("api/[controller]")]
public class FooterController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FooterController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetFooter()
    {
        var footer = await _context.FooterContents.FirstOrDefaultAsync();
        if (footer == null)
            return NotFound();
        return Ok(footer);
    }

    [Authorize(Roles = "admin")]
    [HttpPut]
    public async Task<IActionResult> UpdateFooter([FromBody] UpdateFooterDto dto)
    {
        var footer = await _context.FooterContents.FirstOrDefaultAsync();
        if (footer == null)
        {
            footer = new FooterContent();
            _context.FooterContents.Add(footer);
        }

        footer.CompanyName = dto.CompanyName;
        footer.Description = dto.Description;
        footer.CopyRight = dto.CopyRight;
        footer.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return Ok(footer);
    }
}

[ApiController]
[Route("api/[controller]")]
public class CertificatesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CertificatesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetCertificates()
    {
        var certs = await _context.Certificates
            .Where(c => c.Visible)
            .OrderByDescending(c => c.IssuedDate)
            .ToListAsync();
        return Ok(certs);
    }

    [Authorize(Roles = "admin")]
    [HttpPost]
    public async Task<IActionResult> CreateCertificate([FromBody] CreateCertificateDto dto)
    {
        var cert = new Certificate
        {
            Title = dto.Title,
            Issuer = dto.Issuer,
            ImagePath = dto.ImagePath,
            CredentialUrl = dto.CredentialUrl,
            IssuedDate = dto.IssuedDate,
            ExpiryDate = dto.ExpiryDate
        };
        _context.Certificates.Add(cert);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCertificates), new { id = cert.Id }, cert);
    }

    [Authorize(Roles = "admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCertificate(int id, [FromBody] CreateCertificateDto dto)
    {
        var cert = await _context.Certificates.FindAsync(id);
        if (cert == null)
            return NotFound();

        cert.Title = dto.Title;
        cert.Issuer = dto.Issuer;
        cert.ImagePath = dto.ImagePath;
        cert.CredentialUrl = dto.CredentialUrl;
        cert.IssuedDate = dto.IssuedDate;
        cert.ExpiryDate = dto.ExpiryDate;

        await _context.SaveChangesAsync();
        return Ok(cert);
    }

    [Authorize(Roles = "admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCertificate(int id)
    {
        var cert = await _context.Certificates.FindAsync(id);
        if (cert == null)
            return NotFound();

        _context.Certificates.Remove(cert);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Certificate deleted" });
    }
}

[ApiController]
[Route("api/[controller]")]
public class AchievementsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AchievementsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAchievements()
    {
        var achievements = await _context.Achievements
            .Where(a => a.Visible)
            .OrderByDescending(a => a.Featured)
            .ThenByDescending(a => a.AchievedDate)
            .ToListAsync();
        return Ok(achievements);
    }

    [Authorize(Roles = "admin")]
    [HttpPost]
    public async Task<IActionResult> CreateAchievement([FromBody] CreateAchievementDto dto)
    {
        var achievement = new Achievement
        {
            Title = dto.Title,
            Description = dto.Description,
            BadgeImage = dto.BadgeImage,
            AchievedDate = dto.AchievedDate,
            Featured = dto.Featured
        };
        _context.Achievements.Add(achievement);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAchievements), new { id = achievement.Id }, achievement);
    }

    [Authorize(Roles = "admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAchievement(int id, [FromBody] CreateAchievementDto dto)
    {
        var achievement = await _context.Achievements.FindAsync(id);
        if (achievement == null)
            return NotFound();

        achievement.Title = dto.Title;
        achievement.Description = dto.Description;
        achievement.BadgeImage = dto.BadgeImage;
        achievement.AchievedDate = dto.AchievedDate;
        achievement.Featured = dto.Featured;

        await _context.SaveChangesAsync();
        return Ok(achievement);
    }

    [Authorize(Roles = "admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAchievement(int id)
    {
        var achievement = await _context.Achievements.FindAsync(id);
        if (achievement == null)
            return NotFound();

        _context.Achievements.Remove(achievement);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Achievement deleted" });
    }
}
