namespace DarsanPortfolioAPI.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "user"; // admin, user
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

// SETTINGS - App configuration
public class AppSettings
{
    public int Id { get; set; }
    public string AppName { get; set; } = "Darsan Portfolio";
    public string AppTagline { get; set; } = "Full-Stack Developer";
    public string ProfileImage { get; set; } = string.Empty;
    public string CvPath { get; set; } = string.Empty; // Path to CV file
    public string AboutMe { get; set; } = string.Empty;
    public string ContactEmail { get; set; } = string.Empty;
    public string ContactPhone { get; set; } = string.Empty;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

// SOCIAL LINKS
public class SocialLink
{
    public int Id { get; set; }
    public string Platform { get; set; } = string.Empty; // GitHub, LinkedIn, Twitter, etc.
    public string Url { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty; // Icon name or emoji
    public int Order { get; set; }
    public bool Visible { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// NAVIGATION ITEMS - Dynamic navbar
public class NavItem
{
    public int Id { get; set; }
    public string Label { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public int Order { get; set; }
    public bool Visible { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// FOOTER CONTENT
public class FooterContent
{
    public int Id { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string CopyRight { get; set; } = string.Empty;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class Project
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public List<string> Technologies { get; set; } = new();
    public string? GitHub { get; set; }
    public string? LiveDemo { get; set; }
    public bool Featured { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class Skill
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public int Proficiency { get; set; } = 80; // 0-100
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Experience
{
    public int Id { get; set; }
    public string Company { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public List<string> Highlights { get; set; } = new();
    public List<string> Technologies { get; set; } = new();
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// CERTIFICATES
public class Certificate
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string ImagePath { get; set; } = string.Empty; // Certificate image
    public string CredentialUrl { get; set; } = string.Empty;
    public DateTime IssuedDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public bool Visible { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// ACHIEVEMENTS & BADGES
public class Achievement
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string BadgeImage { get; set; } = string.Empty; // Badge/icon image
    public DateTime AchievedDate { get; set; }
    public bool Featured { get; set; }
    public bool Visible { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Message
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string MessageContent { get; set; } = string.Empty;
    public bool Read { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
