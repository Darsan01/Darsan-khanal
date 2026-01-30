-- Database Schema for Darsan Portfolio

CREATE TABLE [Users] (
    [Id] INT PRIMARY KEY IDENTITY(1,1),
    [Name] NVARCHAR(MAX) NOT NULL,
    [Email] NVARCHAR(255) NOT NULL UNIQUE,
    [PasswordHash] NVARCHAR(MAX) NOT NULL,
    [Role] NVARCHAR(50) NOT NULL DEFAULT 'user',
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

CREATE TABLE [Projects] (
    [Id] INT PRIMARY KEY IDENTITY(1,1),
    [Title] NVARCHAR(MAX) NOT NULL,
    [Description] NVARCHAR(MAX) NOT NULL,
    [Image] NVARCHAR(MAX),
    [Technologies] NVARCHAR(MAX),
    [GitHub] NVARCHAR(MAX),
    [LiveDemo] NVARCHAR(MAX),
    [Featured] BIT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

CREATE TABLE [Skills] (
    [Id] INT PRIMARY KEY IDENTITY(1,1),
    [Name] NVARCHAR(MAX) NOT NULL,
    [Category] NVARCHAR(MAX) NOT NULL,
    [Proficiency] INT NOT NULL DEFAULT 80,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

CREATE TABLE [Experiences] (
    [Id] INT PRIMARY KEY IDENTITY(1,1),
    [Company] NVARCHAR(MAX) NOT NULL,
    [Position] NVARCHAR(MAX) NOT NULL,
    [Description] NVARCHAR(MAX),
    [Duration] NVARCHAR(MAX),
    [Highlights] NVARCHAR(MAX),
    [Technologies] NVARCHAR(MAX),
    [StartDate] DATETIME2 NOT NULL,
    [EndDate] DATETIME2,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

CREATE TABLE [Messages] (
    [Id] INT PRIMARY KEY IDENTITY(1,1),
    [Name] NVARCHAR(MAX) NOT NULL,
    [Email] NVARCHAR(255) NOT NULL,
    [Subject] NVARCHAR(MAX) NOT NULL,
    [MessageContent] NVARCHAR(MAX) NOT NULL,
    [Read] BIT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- Create indexes for better query performance
CREATE INDEX idx_users_email ON [Users]([Email]);
CREATE INDEX idx_projects_featured ON [Projects]([Featured]);
CREATE INDEX idx_messages_read ON [Messages]([Read]);
CREATE INDEX idx_experiences_startdate ON [Experiences]([StartDate]);
