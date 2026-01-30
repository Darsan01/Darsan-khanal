# Installation & Setup Guide

## Quick Start (5 minutes)

### 1. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:3000

### 2. Backend Setup

#### Option A: Using SQL Server (Recommended)

1. Create database:
```sql
CREATE DATABASE DarsanPortfolio;
```

2. Update `backend/appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=DarsanPortfolio;User Id=sa;Password=YourPassword123!;"
}
```

3. Run:
```bash
cd backend
dotnet run
```

#### Option B: Using LocalDB (Windows)

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=DarsanPortfolio;Integrated Security=true;"
}
```

#### Option C: Docker

```bash
docker pull mcr.microsoft.com/mssql/server:2022-latest
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourPassword123!" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

## Configuration

### Backend Configuration (appsettings.json)

```json
{
  "JwtSettings": {
    "SecretKey": "change-this-to-a-long-random-string-at-least-32-chars",
    "ExpiresInHours": 24,
    "Issuer": "DarsanPortfolio",
    "Audience": "DarsanPortfolioUsers"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=DarsanPortfolio;User Id=sa;Password=YOUR_PASSWORD;"
  }
}
```

### Frontend Environment

**.env.development** (for local development)
```
VITE_API_URL=http://localhost:5000/api
```

**.env.production** (for production)
```
VITE_API_URL=https://your-api-domain.com/api
```

## First Time Admin Setup

The system automatically creates an admin user on first run:
- Email: `admin@darsan.dev`
- Password: `admin123`

### Change Admin Password

1. Login to admin panel
2. Go to `/admin`
3. Or update directly in database:

```sql
-- Update admin password (hash password with BCrypt first)
UPDATE Users SET PasswordHash = 'new_hashed_password' 
WHERE Email = 'admin@darsan.dev';
```

## Database Initialization

The database is automatically created and seeded with sample data on first run. To manually create it:

```bash
cd backend
dotnet ef database update
```

To create migrations:
```bash
dotnet ef migrations add InitialCreate
```

## Troubleshooting

### Port Already in Use

**Frontend (Port 3000)**:
```bash
npm run dev -- --port 3001
```

**Backend (Port 5000)**:
```bash
dotnet run --urls "https://localhost:5001;http://localhost:5001"
```

### Database Connection Issues

1. Check connection string
2. Verify SQL Server is running
3. Check firewall settings
4. Test with SQL Server Management Studio

### CORS Errors

Update `Program.cs` in backend:
```csharp
.WithOrigins("http://localhost:3000", "http://localhost:3001")
```

### JWT Token Issues

1. Make sure secret key is set in appsettings.json
2. Check token expiration time
3. Verify Authorization header format: `Bearer YOUR_TOKEN`

## Common Commands

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
dotnet run                    # Run development
dotnet run --no-build        # Run without rebuild
dotnet watch run              # Watch for changes and restart
dotnet publish -c Release     # Build for deployment
```

## Next Steps

1. ✅ Update portfolio content
2. ✅ Change admin credentials
3. ✅ Update JWT secret key
4. ✅ Configure CORS origins
5. ✅ Set up email notifications
6. ✅ Deploy to production

## Support

For issues or questions, check:
- Backend logs: `backend/logs/`
- Browser console: F12 → Console tab
- API documentation: http://localhost:5000/swagger
