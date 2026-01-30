# Deployment Guide

## Table of Contents
1. [Development Setup](#development-setup)
2. [Production Build](#production-build)
3. [Frontend Deployment](#frontend-deployment)
4. [Backend Deployment](#backend-deployment)
5. [Database Setup](#database-setup)
6. [Environment Configuration](#environment-configuration)
7. [Post-Deployment](#post-deployment)

---

## Development Setup

### Quick Start

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

### Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
dotnet run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## Production Build

### Frontend Build

```bash
cd frontend
npm install
npm run build
```

Output: `frontend/dist/`

### Backend Build

```bash
cd backend
dotnet publish -c Release -o ./publish
```

Output: `backend/publish/`

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI
```bash
npm install -g vercel
```

2. Deploy from frontend directory
```bash
cd frontend
vercel
```

3. Configure environment variables in Vercel dashboard
```
VITE_API_URL=https://your-api-domain.com/api
```

### Option 2: Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variable: `VITE_API_URL`

### Option 3: Self-Hosted

1. Build the project
```bash
npm run build
```

2. Upload `dist` folder to your server
3. Configure web server (Nginx/Apache)
4. Set up SSL certificate

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/portfolio/dist;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Backend Deployment

### Option 1: Azure App Service

1. Create App Service
```bash
az appservice plan create --name DarsanPortfolioPlan --resource-group myResourceGroup --sku B1
az webapp create --resource-group myResourceGroup --plan DarsanPortfolioPlan --name DarsanPortfolioAPI
```

2. Deploy
```bash
cd backend
dotnet publish -c Release
az webapp deployment source config-zip --resource-group myResourceGroup --name DarsanPortfolioAPI --src publish.zip
```

3. Configure connection string in App Service settings

### Option 2: AWS (EC2)

1. Create EC2 instance with .NET runtime
2. Install dependencies:
```bash
sudo apt update
sudo apt install -y dotnet-sdk-8.0
sudo apt install -y mssql-server
```

3. Upload published files
```bash
scp -r backend/publish/* ubuntu@your-ec2-ip:/app
```

4. Run as service (systemd)
```bash
sudo tee /etc/systemd/system/darsan-portfolio.service > /dev/null << EOF
[Unit]
Description=Darsan Portfolio API
After=network.target

[Service]
Type=notify
User=ubuntu
WorkingDirectory=/app
ExecStart=/usr/bin/dotnet DarsanPortfolioAPI.dll
Environment="ASPNETCORE_ENVIRONMENT=Production"
Environment="ASPNETCORE_URLS=http://0.0.0.0:5000"

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable darsan-portfolio
sudo systemctl start darsan-portfolio
```

### Option 3: Docker

Create `Dockerfile`:
```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
COPY . .
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 5000
ENTRYPOINT ["dotnet", "DarsanPortfolioAPI.dll"]
```

Build and run:
```bash
docker build -t darsan-portfolio:latest .
docker run -p 5000:5000 -e ConnectionStrings__DefaultConnection="..." darsan-portfolio:latest
```

### Option 4: Railway.app

1. Connect GitHub repository
2. Select .NET as build (auto-detected)
3. Add environment variables:
```
ConnectionStrings__DefaultConnection=...
JwtSettings__SecretKey=...
ASPNETCORE_ENVIRONMENT=Production
```

4. Deploy (automatic on push)

---

## Database Setup

### Azure SQL Database

1. Create SQL Server:
```bash
az sql server create --resource-group myResourceGroup --name darsan-db-server --admin-user dbadmin --admin-password YourPassword123!
```

2. Create database:
```bash
az sql db create --resource-group myResourceGroup --server darsan-db-server --name DarsanPortfolio
```

3. Get connection string and update `appsettings.json`

4. Run migrations:
```bash
dotnet ef database update --connection "Server=darsan-db-server.database.windows.net;Database=DarsanPortfolio;User Id=dbadmin;Password=YourPassword123!;"
```

### AWS RDS

1. Create RDS instance (SQL Server)
2. Get endpoint and credentials
3. Update connection string
4. Run migrations

### Local SQL Server

```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourPassword123!" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

---

## Environment Configuration

### Backend (appsettings.Production.json)

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft": "Warning"
    }
  },
  "JwtSettings": {
    "SecretKey": "your-production-secret-key-very-long-and-secure",
    "ExpiresInHours": 24,
    "Issuer": "DarsanPortfolio",
    "Audience": "DarsanPortfolioUsers"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=your-db-server;Database=DarsanPortfolio;User Id=sa;Password=YourPassword123!;"
  }
}
```

### Frontend (.env.production)

```
VITE_API_URL=https://your-api-domain.com/api
```

### Secrets Management

**Azure Key Vault:**
```bash
az keyvault secret set --vault-name myKeyVault --name DbConnectionString --value "connection-string"
```

**GitHub Secrets:**
```bash
gh secret set DATABASE_URL -b "connection-string"
gh secret set JWT_SECRET -b "your-secret-key"
```

---

## Post-Deployment

### 1. Verify Services

```bash
# Check backend
curl https://your-api-domain.com/swagger

# Check frontend
curl https://your-domain.com
```

### 2. Run Migrations

```bash
dotnet ef database update --connection "your-production-connection-string"
```

### 3. Seed Admin User

If not automatically seeded, create manually:

```bash
dotnet run -- seed-admin --email admin@darsan.dev --password YourSecurePassword123!
```

### 4. Set CORS Origins

Update `Program.cs`:
```csharp
.WithOrigins("https://your-domain.com")
```

### 5. Configure SSL/TLS

**Let's Encrypt (Free)**

*For Nginx:*
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your-domain.com
```

*For IIS:*
```bash
certbot certonly --standalone -d your-domain.com
```

### 6. Set Up Monitoring

**Application Insights:**
```bash
dotnet add package Microsoft.ApplicationInsights.AspNetCore
```

**Uptime Monitoring:**
- Use Pingdom, UptimeRobot, or similar services

### 7. Enable Backups

**Database Backup:**
```bash
# SQL Server automated backups (configured in cloud provider)
# Local manual backup:
BACKUP DATABASE DarsanPortfolio TO DISK = 'D:\Backups\DarsanPortfolio.bak'
```

### 8. Configure Email Notifications

Update `ContactSection.jsx` and `MessagesController.cs` to send emails:

```csharp
// In MessagesController.cs
using SendGrid;
using SendGrid.Helpers.Mail;

var msg = new SendGridMessage()
{
    From = new EmailAddress("noreply@darsan.dev", "Darsan Portfolio"),
    Subject = "New Contact Form Submission",
    PlainTextContent = messageContent,
    HtmlContent = htmlContent
};

await new SendGridClient(apiKey).SendEmailAsync(msg);
```

---

## Troubleshooting

### Backend not connecting
- Check CORS configuration
- Verify connection string
- Check firewall rules
- Review application logs

### Database connection errors
- Verify server is running
- Check credentials
- Test connection string with SSMS
- Check firewall/security groups

### SSL/TLS certificate errors
- Renew certificate if expired
- Check certificate path configuration
- Verify domain name in certificate

### High load/Performance issues
- Enable caching
- Optimize database queries
- Use CDN for static assets
- Enable gzip compression

---

## Security Checklist

- [ ] Change default admin credentials
- [ ] Update JWT secret key
- [ ] Enable HTTPS
- [ ] Configure CORS for specific domains
- [ ] Set up firewall rules
- [ ] Enable database encryption
- [ ] Configure API rate limiting
- [ ] Set up Web Application Firewall (WAF)
- [ ] Enable audit logging
- [ ] Regular security updates

---

## Performance Optimization

### Frontend
- Enable gzip compression
- Use CDN (CloudFront, Cloudflare)
- Optimize images
- Minify CSS/JS
- Enable caching headers

### Backend
- Enable response caching
- Optimize database queries
- Use connection pooling
- Enable compression
- Monitor and log performance

### Database
- Add indexes
- Partition large tables
- Optimize queries
- Regular maintenance
- Backup strategy

---

## Support

For deployment issues:
1. Check application logs
2. Review error messages
3. Test API endpoints with Postman
4. Verify environment variables
5. Check database connectivity

Contact: contact@darsan.dev
