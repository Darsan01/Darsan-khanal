using Microsoft.EntityFrameworkCore;
using DarsanPortfolioAPI.Models;

namespace DarsanPortfolioAPI.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; } = null!;
    public DbSet<AppSettings> AppSettings { get; set; } = null!;
    public DbSet<SocialLink> SocialLinks { get; set; } = null!;
    public DbSet<NavItem> NavItems { get; set; } = null!;
    public DbSet<FooterContent> FooterContents { get; set; } = null!;
    public DbSet<Project> Projects { get; set; } = null!;
    public DbSet<Skill> Skills { get; set; } = null!;
    public DbSet<Experience> Experiences { get; set; } = null!;
    public DbSet<Certificate> Certificates { get; set; } = null!;
    public DbSet<Achievement> Achievements { get; set; } = null!;
    public DbSet<Message> Messages { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User configuration
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // Project configuration
        modelBuilder.Entity<Project>()
            .Property(p => p.Technologies)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());

        // Experience configuration
        modelBuilder.Entity<Experience>()
            .Property(e => e.Highlights)
            .HasConversion(
                v => string.Join('|', v),
                v => v.Split('|', StringSplitOptions.RemoveEmptyEntries).ToList());

        modelBuilder.Entity<Experience>()
            .Property(e => e.Technologies)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());
    }
}

public static class DbSeeder
{
    public static void Seed(ApplicationDbContext context)
    {
        if (context.Users.Any())
            return;

        // Seed admin user
        var adminUser = new User
        {
            Name = "Darsan Khanal",
            Email = "admin@darsan.dev",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
            Role = "admin"
        };

        context.Users.Add(adminUser);

        // Seed projects
        var projects = new List<Project>
        {
            new Project
            {
                Title = "EduFlow",
                Description = "A comprehensive school management system built with Laravel. Features include student enrollment, attendance tracking, grade management, and parent-teacher communication.",
                Image = "https://via.placeholder.com/400x250?text=EduFlow",
                Technologies = new List<string> { "Laravel", "MySQL", "Bootstrap", "PHP" },
                GitHub = "https://github.com/Darsan01/eduflow",
                LiveDemo = "https://eduflow-demo.com",
                Featured = true
            },
            new Project
            {
                Title = "BookHive",
                Description = "Library management system built with .NET MVC and SQL Server. Includes book cataloging, member management, lending system, and reporting features.",
                Image = "https://via.placeholder.com/400x250?text=BookHive",
                Technologies = new List<string> { "ASP.NET Core", "MVC", "SQL Server", "C#" },
                GitHub = "https://github.com/Darsan01/bookhive",
                Featured = true
            },
            new Project
            {
                Title = "Expense Tracker App",
                Description = "Cross-platform mobile expense tracking application built with .NET MAUI. Features include transaction logging, categorization, analytics, and data export.",
                Image = "https://via.placeholder.com/400x250?text=ExpenseTracker",
                Technologies = new List<string> { ".NET MAUI", "SQLite", "C#", "XAML" },
                GitHub = "https://github.com/Darsan01/expense-tracker",
                Featured = true
            }
        };

        context.Projects.AddRange(projects);

        // Seed skills
        var skills = new List<Skill>
        {
            new Skill { Name = "C#", Category = "Backend", Proficiency = 95 },
            new Skill { Name = ".NET 8", Category = "Backend", Proficiency = 95 },
            new Skill { Name = "ASP.NET Core", Category = "Backend", Proficiency = 90 },
            new Skill { Name = "Laravel", Category = "Backend", Proficiency = 85 },
            new Skill { Name = "React", Category = "Frontend", Proficiency = 90 },
            new Skill { Name = "JavaScript", Category = "Frontend", Proficiency = 90 },
            new Skill { Name = "HTML5/CSS3", Category = "Frontend", Proficiency = 95 },
            new Skill { Name = "MySQL", Category = "Database", Proficiency = 88 },
            new Skill { Name = ".NET MAUI", Category = "Mobile", Proficiency = 80 },
            new Skill { Name = "AWS", Category = "Cloud", Proficiency = 80 }
        };

        context.Skills.AddRange(skills);

        // Seed experience
        var experience = new List<Experience>
        {
            new Experience
            {
                Company = "Webbank Nepal",
                Position = "Full-Stack Developer (Intern)",
                Description = "Developed e-commerce features using Laravel, integrated Stripe payment gateway, optimized database queries for 40% performance improvement.",
                Duration = "6 months",
                Highlights = new List<string>
                {
                    "Laravel e-commerce development",
                    "Stripe payment integration",
                    "Performance optimization (40% improvement)",
                    "Database query optimization"
                },
                Technologies = new List<string> { "Laravel", "MySQL", "Stripe", "PHP" },
                StartDate = new DateTime(2024, 1, 1),
                EndDate = new DateTime(2024, 6, 30)
            }
        };

        context.Experiences.AddRange(experience);

        // Seed App Settings
        var appSettings = new AppSettings
        {
            AppName = "Darsan Khanal",
            AppTagline = "Full-Stack Developer from Nepal",
            ProfileImage = "https://via.placeholder.com/200x200?text=Darsan",
            AboutMe = "Passionate full-stack developer with expertise in .NET, Laravel, and React. Building amazing applications for web and mobile.",
            ContactEmail = "darsan@example.com",
            ContactPhone = "+977-1234567890"
        };
        context.AppSettings.Add(appSettings);

        // Seed Social Links
        var socialLinks = new List<SocialLink>
        {
            new SocialLink { Platform = "GitHub", Url = "https://github.com/Darsan01", Icon = "github", Order = 1, Visible = true },
            new SocialLink { Platform = "LinkedIn", Url = "https://linkedin.com/in/darsan", Icon = "linkedin", Order = 2, Visible = true },
            new SocialLink { Platform = "Twitter", Url = "https://twitter.com/darsan", Icon = "twitter", Order = 3, Visible = true },
            new SocialLink { Platform = "Email", Url = "mailto:darsan@example.com", Icon = "mail", Order = 4, Visible = true }
        };
        context.SocialLinks.AddRange(socialLinks);

        // Seed Navigation Items
        var navItems = new List<NavItem>
        {
            new NavItem { Label = "Home", Url = "/", Order = 1, Visible = true },
            new NavItem { Label = "About", Url = "#about", Order = 2, Visible = true },
            new NavItem { Label = "Skills", Url = "#skills", Order = 3, Visible = true },
            new NavItem { Label = "Projects", Url = "#projects", Order = 4, Visible = true },
            new NavItem { Label = "Experience", Url = "#experience", Order = 5, Visible = true },
            new NavItem { Label = "Contact", Url = "#contact", Order = 6, Visible = true }
        };
        context.NavItems.AddRange(navItems);

        // Seed Footer Content
        var footerContent = new FooterContent
        {
            CompanyName = "Darsan Khanal",
            Description = "Full-Stack Developer | Building Amazing Digital Solutions",
            CopyRight = $"© {DateTime.Now.Year} Darsan Khanal. All rights reserved."
        };
        context.FooterContents.Add(footerContent);

        // Seed Certificates
        var certificates = new List<Certificate>
        {
            new Certificate
            {
                Title = "ASP.NET Core Developer",
                Issuer = "Microsoft",
                CredentialUrl = "https://example.com/cert1",
                IssuedDate = new DateTime(2024, 6, 15),
                Visible = true
            },
            new Certificate
            {
                Title = "React.js Specialist",
                Issuer = "Udemy",
                CredentialUrl = "https://example.com/cert2",
                IssuedDate = new DateTime(2024, 5, 20),
                Visible = true
            }
        };
        context.Certificates.AddRange(certificates);

        // Seed Achievements
        var achievements = new List<Achievement>
        {
            new Achievement
            {
                Title = "10+ Projects Delivered",
                Description = "Successfully completed and deployed 10+ full-stack applications",
                AchievedDate = new DateTime(2024, 6, 1),
                Featured = true,
                Visible = true
            },
            new Achievement
            {
                Title = "Open Source Contributor",
                Description = "Contributing to multiple open source projects",
                AchievedDate = new DateTime(2024, 1, 15),
                Featured = true,
                Visible = true
            }
        };
        context.Achievements.AddRange(achievements);

        context.SaveChanges();
    }
}
