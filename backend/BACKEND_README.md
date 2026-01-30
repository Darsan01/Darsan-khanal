# Backend README

## Backend Structure

```
backend/
├── Controllers/
│   └── ApiControllers.cs    # All API endpoints
│
├── Models/
│   └── Entities.cs         # Entity classes (User, Project, Skill, etc.)
│
├── Data/
│   └── ApplicationDbContext.cs   # EF Core DbContext
│
├── Services/
│   └── AuthService.cs      # Authentication and JWT services
│
├── DTOs/
│   └── DTOs.cs            # Data transfer objects
│
├── Program.cs             # ASP.NET Core app configuration
├── appsettings.json       # Configuration
├── appsettings.Development.json
└── DarsanPortfolioAPI.csproj
```

## Setup

### Prerequisites
- .NET 8 SDK
- SQL Server (or LocalDB)

### Installation

1. **Restore dependencies**
```bash
dotnet restore
```

2. **Update database connection** in `appsettings.json`

3. **Create database**
```bash
dotnet ef database update
```

4. **Run**
```bash
dotnet run
```

API will be available at `http://localhost:5000`

## Configuration

### appsettings.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  },
  "JwtSettings": {
    "SecretKey": "your-very-long-secret-key-at-least-32-characters",
    "ExpiresInHours": 24,
    "Issuer": "DarsanPortfolio",
    "Audience": "DarsanPortfolioUsers"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=DarsanPortfolio;User Id=sa;Password=YOUR_PASSWORD;"
  }
}
```

## Database

### Connection Strings

**SQL Server**
```
Server=localhost;Database=DarsanPortfolio;User Id=sa;Password=YourPassword123!;
```

**LocalDB (Windows)**
```
Server=(localdb)\mssqllocaldb;Database=DarsanPortfolio;Integrated Security=true;
```

**Azure SQL**
```
Server=tcp:yourserver.database.windows.net,1433;Initial Catalog=DarsanPortfolio;Persist Security Info=False;User ID=admin;Password=YourPassword123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```

### Tables

- `Users` - User accounts (admin, users)
- `Projects` - Portfolio projects
- `Skills` - Technical skills
- `Experiences` - Work experience
- `Messages` - Contact form messages

### Migrations

```bash
# Create migration
dotnet ef migrations add MigrationName

# Update database
dotnet ef database update

# Revert migration
dotnet ef database update PreviousMigrationName

# Remove migration
dotnet ef migrations remove
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register
  - Body: `{ email, password }`
- `POST /api/auth/login` - Login
  - Body: `{ email, password }`
  - Response: `{ token, user }`
- `POST /api/auth/logout` - Logout (requires auth)

### Projects
- `GET /api/projects` - List all
- `GET /api/projects/{id}` - Get by ID
- `POST /api/projects` - Create (admin)
- `PUT /api/projects/{id}` - Update (admin)
- `DELETE /api/projects/{id}` - Delete (admin)

### Skills
- `GET /api/skills` - List all
- `POST /api/skills` - Create (admin)
- `PUT /api/skills/{id}` - Update (admin)
- `DELETE /api/skills/{id}` - Delete (admin)

### Experience
- `GET /api/experience` - List all
- `POST /api/experience` - Create (admin)
- `PUT /api/experience/{id}` - Update (admin)
- `DELETE /api/experience/{id}` - Delete (admin)

### Messages
- `GET /api/messages` - List all (admin)
- `POST /api/messages` - Create (public)
- `PUT /api/messages/{id}/read` - Mark read (admin)
- `DELETE /api/messages/{id}` - Delete (admin)

## Authentication

### JWT Token Flow

1. User sends credentials to `/api/auth/login`
2. Server validates and returns JWT token
3. Client stores token in localStorage
4. Client includes token in Authorization header for protected endpoints
5. Server validates token and returns requested resource

### Token Format

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Claims

```csharp
new Claim("id", user.Id.ToString())
new Claim("email", user.Email)
new Claim("role", user.Role) // "admin" or "user"
```

## Models

### User
```csharp
public class User {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Role { get; set; } // "admin" or "user"
    public DateTime CreatedAt { get; set; }
}
```

### Project
```csharp
public class Project {
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public List<string> Technologies { get; set; }
    public string GitHub { get; set; }
    public string LiveDemo { get; set; }
    public bool Featured { get; set; }
}
```

## Middleware

### Authentication
JWT Bearer token validation on protected endpoints

### CORS
Configured in Program.cs to allow requests from frontend

### Exception Handling
Global error handling with appropriate HTTP status codes

## Services

### AuthService
- User registration
- Login with password verification
- Role-based access control

### TokenService
- JWT token generation
- Token expiration management
- Claims creation

## Deployment

### Azure App Service
```bash
dotnet publish -c Release -o ./publish
```

### Docker
```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
COPY . .
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "DarsanPortfolioAPI.dll"]
```

### Environment Variables

```bash
# Set via CI/CD or deployment platform
ConnectionStrings__DefaultConnection=...
JwtSettings__SecretKey=...
JwtSettings__ExpiresInHours=24
```

## Security

- ✅ Password hashing with BCrypt
- ✅ JWT authentication
- ✅ CORS configuration
- ✅ SQL injection protection (EF Core)
- ✅ Input validation
- ✅ Role-based access control
- ✅ HTTPS in production

## Performance

- ✅ Database indexing
- ✅ Async/await for IO operations
- ✅ Entity Framework Core optimization
- ✅ Connection pooling
- ✅ Swagger caching

## Logging

Configure in appsettings.json:
```json
"Logging": {
  "LogLevel": {
    "Default": "Information",
    "Microsoft": "Warning"
  }
}
```

## Troubleshooting

### Port already in use
```bash
dotnet run --urls "https://localhost:5001;http://localhost:5001"
```

### Database connection failed
- Check connection string
- Verify SQL Server is running
- Check firewall
- Test with SSMS

### JWT validation failed
- Verify secret key matches
- Check token expiration
- Validate authorization header format

### CORS errors
Update origins in Program.cs:
```csharp
.WithOrigins("http://localhost:3000", "your-frontend-url")
```

## Testing

Use Swagger UI: `http://localhost:5000/swagger`

Or use Postman:
1. POST to `/api/auth/login`
2. Copy token from response
3. Add to Authorization header: `Bearer {token}`
4. Make protected requests

## Next Steps

1. Change JWT secret key
2. Update database connection string
3. Configure CORS for production domain
4. Set up email notifications for messages
5. Deploy to cloud platform
