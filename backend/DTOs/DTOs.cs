namespace DarsanPortfolioAPI.DTOs;

// AUTH DTOs
public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LoginResponse
{
    public string Token { get; set; } = string.Empty;
    public UserDto User { get; set; } = new();
}

public class UserDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}

// APP SETTINGS DTOs
public class UpdateAppSettingsDto
{
    public string AppName { get; set; } = string.Empty;
    public string AppTagline { get; set; } = string.Empty;
    public string ProfileImage { get; set; } = string.Empty;
    public string CvPath { get; set; } = string.Empty;
    public string AboutMe { get; set; } = string.Empty;
    public string ContactEmail { get; set; } = string.Empty;
    public string ContactPhone { get; set; } = string.Empty;
}

public class AppSettingsDto
{
    public int Id { get; set; }
    public string AppName { get; set; } = string.Empty;
    public string AppTagline { get; set; } = string.Empty;
    public string ProfileImage { get; set; } = string.Empty;
    public string CvPath { get; set; } = string.Empty;
    public string AboutMe { get; set; } = string.Empty;
    public string ContactEmail { get; set; } = string.Empty;
    public string ContactPhone { get; set; } = string.Empty;
}

// SOCIAL LINKS DTOs
public class CreateSocialLinkDto
{
    public string Platform { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public int Order { get; set; }
}

// NAVIGATION DTOs
public class CreateNavItemDto
{
    public string Label { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public int Order { get; set; }
}

// FOOTER DTOs
public class UpdateFooterDto
{
    public string CompanyName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string CopyRight { get; set; } = string.Empty;
}

// PROJECT DTOs
public class CreateProjectDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public List<string> Technologies { get; set; } = new();
    public string? GitHub { get; set; }
    public string? LiveDemo { get; set; }
    public bool Featured { get; set; }
}

// SKILL DTOs
public class CreateSkillDto
{
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public int Proficiency { get; set; } = 80;
}

// EXPERIENCE DTOs
public class CreateExperienceDto
{
    public string Company { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public List<string> Highlights { get; set; } = new();
    public List<string> Technologies { get; set; } = new();
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}

// CERTIFICATE DTOs
public class CreateCertificateDto
{
    public string Title { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string ImagePath { get; set; } = string.Empty;
    public string CredentialUrl { get; set; } = string.Empty;
    public DateTime IssuedDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
}

public class CertificateDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string ImagePath { get; set; } = string.Empty;
    public string CredentialUrl { get; set; } = string.Empty;
    public DateTime IssuedDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public bool Visible { get; set; }
}

// ACHIEVEMENT DTOs
public class CreateAchievementDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string BadgeImage { get; set; } = string.Empty;
    public DateTime AchievedDate { get; set; }
    public bool Featured { get; set; }
}

public class AchievementDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string BadgeImage { get; set; } = string.Empty;
    public DateTime AchievedDate { get; set; }
    public bool Featured { get; set; }
    public bool Visible { get; set; }
}

// MESSAGE DTOs
public class CreateMessageDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}

public class MessageDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public bool Read { get; set; }
    public DateTime CreatedAt { get; set; }
}

