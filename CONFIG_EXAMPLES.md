// Environment Variables Configuration Examples

// ============================================
// Frontend Configuration (.env files)
// ============================================

// .env.development - Development environment
VITE_API_URL=http://localhost:5000/api

// .env.production - Production environment  
VITE_API_URL=https://your-api-domain.com/api


// ============================================
// Backend Configuration (appsettings.json)
// ============================================

{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "JwtSettings": {
    "SecretKey": "your-very-long-secret-key-minimum-32-characters-change-in-production",
    "ExpiresInHours": 24,
    "Issuer": "DarsanPortfolio",
    "Audience": "DarsanPortfolioUsers"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=DarsanPortfolio;User Id=sa;Password=YourPassword123!;"
  },
  "AllowedHosts": "*"
}


// ============================================
// Production Configuration (appsettings.Production.json)
// ============================================

{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Warning"
    }
  },
  "JwtSettings": {
    "SecretKey": "your-production-secret-key-very-long-and-secure-change-immediately",
    "ExpiresInHours": 24,
    "Issuer": "DarsanPortfolio",
    "Audience": "DarsanPortfolioUsers"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=your-production-server.database.windows.net;Database=DarsanPortfolio;User Id=admin;Password=YourSecurePassword123!;Encrypt=true;Connection Timeout=30;"
  },
  "AllowedHosts": "your-domain.com,www.your-domain.com"
}


// ============================================
// Database Connection Strings
// ============================================

// Local SQL Server
Server=localhost;Database=DarsanPortfolio;User Id=sa;Password=YourPassword123!;

// SQL Server Express (Windows)
Server=.\SQLEXPRESS;Database=DarsanPortfolio;Integrated Security=true;

// LocalDB (Windows)
Server=(localdb)\mssqllocaldb;Database=DarsanPortfolio;Integrated Security=true;

// Azure SQL Database
Server=tcp:yourserver.database.windows.net,1433;Initial Catalog=DarsanPortfolio;Persist Security Info=False;User ID=admin;Password=YourPassword123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;

// AWS RDS SQL Server
Server=darsan-portfolio.xxxxxxx.us-east-1.rds.amazonaws.com;Database=DarsanPortfolio;User Id=admin;Password=YourPassword123!;


// ============================================
// Docker Configuration (docker-compose.yml)
// ============================================

version: '3.8'

services:
  database:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      SA_PASSWORD: YourPassword123!
      ACCEPT_EULA: Y
    ports:
      - "1433:1433"
    volumes:
      - sql_data:/var/opt/mssql

  api:
    build: ./backend
    depends_on:
      - database
    environment:
      ConnectionStrings__DefaultConnection: "Server=database;Database=DarsanPortfolio;User Id=sa;Password=YourPassword123!;"
      JwtSettings__SecretKey: "your-secret-key-here"
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/app

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      VITE_API_URL: http://api:5000/api
    depends_on:
      - api

volumes:
  sql_data:


// ============================================
// GitHub Actions CI/CD (.github/workflows/deploy.yml)
// ============================================

name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    # Build Backend
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '8.0.x'
    
    - name: Build Backend
      run: |
        cd backend
        dotnet build
        dotnet publish -c Release
    
    # Build Frontend
    - name: Setup Node
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Build Frontend
      run: |
        cd frontend
        npm install
        npm run build
    
    # Deploy to Azure
    - name: Deploy to Azure
      env:
        AZURE_APP_NAME: darsan-portfolio
        AZURE_RESOURCE_GROUP: darsan-rg
      run: |
        az webapp deployment source config-zip \
          --resource-group $AZURE_RESOURCE_GROUP \
          --name $AZURE_APP_NAME \
          --src backend/publish.zip


// ============================================
// Nginx Configuration (nginx.conf)
// ============================================

upstream backend {
    server localhost:5000;
}

server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    # Frontend
    root /var/www/portfolio/dist;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://backend/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/json application/javascript;
    gzip_min_length 1000;
}


// ============================================
// IIS Configuration (web.config)
// ============================================

<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchList" trackAllCaptures="false">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
    <staticContent>
      <mimeMap fileExtension=".json" mimeType="application/json" />
      <mimeMap fileExtension=".woff" mimeType="application/font-woff" />
      <mimeMap fileExtension=".woff2" mimeType="application/font-woff2" />
    </staticContent>
    <compression>
      <scheme name="gzip" dll="%Windir%\system32\inetsrv\gzip.dll" staticCompressionLevel="9" />
      <dynamicTypes>
        <add mimeType="text/plain" enabled="true" />
        <add mimeType="application/json" enabled="true" />
        <add mimeType="text/javascript" enabled="true" />
      </dynamicTypes>
    </compression>
  </system.webServer>
</configuration>


// ============================================
// Vercel Configuration (vercel.json)
// ============================================

{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@api_url"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-api-domain.com/api/$1"
    }
  ]
}


// ============================================
// Tailwind Configuration (tailwind.config.js)
// ============================================

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c2d4f'
        },
        dark: {
          bg: '#0f172a',
          surface: '#1a2332',
          border: '#334155'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }
    }
  },
  plugins: []
}


// ============================================
// Vite Configuration (vite.config.js)
// ============================================

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
})


// ============================================
// Notes
// ============================================

/**
 * IMPORTANT SECURITY NOTES:
 * 
 * 1. Change all default values before production
 * 2. Generate strong secret keys (32+ characters)
 * 3. Use HTTPS in production
 * 4. Enable CORS only for your domain
 * 5. Keep dependencies updated
 * 6. Regularly backup your database
 * 7. Monitor logs for suspicious activity
 * 8. Use environment variables for secrets
 * 9. Implement rate limiting
 * 10. Regular security audits
 */
