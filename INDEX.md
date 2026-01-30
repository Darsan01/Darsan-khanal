# 📚 Darsan Portfolio - Complete Documentation Index

## Quick Navigation

### 🚀 Getting Started
1. **[README.md](./README.md)** - Project overview and main documentation
2. **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Installation and configuration instructions
3. **[start.bat](./start.bat)** (Windows) / **[start.sh](./start.sh)** (Linux/Mac) - Quick start script

### 📖 Detailed Documentation
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Complete project structure and features
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Deployment instructions for production

### 💻 Frontend Documentation
- **[frontend/FRONTEND_README.md](./frontend/FRONTEND_README.md)** - Frontend structure and development guide
- **[frontend/package.json](./frontend/package.json)** - Dependencies and scripts

### 🔧 Backend Documentation
- **[backend/BACKEND_README.md](./backend/BACKEND_README.md)** - Backend structure and API guide
- **[backend/appsettings.json](./backend/appsettings.json)** - Configuration settings
- **[backend/database-schema.sql](./backend/database-schema.sql)** - Database schema

---

## 📋 File Structure Overview

```
Personal portfolio/
├── 📄 README.md                    ← Start here!
├── 📄 SETUP_GUIDE.md              ← Installation instructions
├── 📄 DEPLOYMENT_GUIDE.md         ← Deploy to production
├── 📄 PROJECT_STRUCTURE.md        ← Detailed project info
├── 🚀 start.bat                   ← Quick start (Windows)
├── 🚀 start.sh                    ← Quick start (Linux/Mac)
│
├── 📁 frontend/                   ← React + Vite application
│   ├── 📄 FRONTEND_README.md
│   ├── 📄 package.json
│   ├── 📄 vite.config.js
│   ├── 📄 tailwind.config.js
│   ├── 📄 postcss.config.js
│   ├── 📄 .env.development
│   ├── 📄 .env.production
│   ├── 📄 index.html
│   └── 📁 src/
│       ├── 📄 App.jsx             ← Main app with routing
│       ├── 📄 main.jsx            ← Entry point
│       ├── 📄 index.css           ← Global styles
│       │
│       ├── 📁 components/         ← React components
│       │   ├── HeroSection.jsx
│       │   ├── AboutSection.jsx
│       │   ├── SkillsSection.jsx
│       │   ├── ProjectsSection.jsx
│       │   ├── ExperienceSection.jsx
│       │   ├── ContactSection.jsx
│       │   ├── Navigation.jsx
│       │   └── Footer.jsx
│       │
│       ├── 📁 admin/              ← Admin panel
│       │   ├── AdminLogin.jsx
│       │   └── AdminDashboard.jsx
│       │
│       ├── 📁 store/              ← State management
│       │   └── index.js           (Zustand stores)
│       │
│       ├── 📁 utils/              ← Utilities
│       │   └── api.js             (Axios setup)
│       │
│       ├── 📁 pages/              ← Page components
│       │
│       └── 📁 hooks/              ← Custom hooks
│
└── 📁 backend/                    ← ASP.NET Core API
    ├── 📄 BACKEND_README.md
    ├── 📄 Program.cs              ← App configuration
    ├── 📄 appsettings.json        ← Settings
    ├── 📄 DarsanPortfolioAPI.csproj
    ├── 📄 database-schema.sql
    │
    ├── 📁 Controllers/            ← API endpoints
    │   └── ApiControllers.cs
    │
    ├── 📁 Models/                 ← Entity classes
    │   └── Entities.cs
    │
    ├── 📁 Data/                   ← Database context
    │   └── ApplicationDbContext.cs
    │
    ├── 📁 Services/               ← Business logic
    │   └── AuthService.cs
    │
    └── 📁 DTOs/                   ← Data transfer objects
        └── DTOs.cs
```

---

## 🎯 Getting Started (Quick Steps)

### Option 1: Automatic (Recommended)
```bash
# Windows
start.bat

# Linux/Mac
chmod +x start.sh
./start.sh
```

### Option 2: Manual

**Terminal 1 - Backend:**
```bash
cd backend
dotnet run
# API runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Swagger Docs**: http://localhost:5000/swagger
- **Admin Panel**: http://localhost:3000/admin

### Default Credentials
- **Email**: admin@darsan.dev
- **Password**: admin123

---

## 📦 Tech Stack At A Glance

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend Framework** | React | 18.2.0 |
| **Build Tool** | Vite | 5.0.0 |
| **Styling** | Tailwind CSS | 3.3.5 |
| **Animations** | Framer Motion | 10.16.0 |
| **State Management** | Zustand | 4.4.1 |
| **HTTP Client** | Axios | 1.6.0 |
| **Backend Framework** | ASP.NET Core | 8.0 |
| **ORM** | Entity Framework Core | 8.0.0 |
| **Authentication** | JWT | 7.0.0 |
| **Password Hashing** | BCrypt | 1.6.0 |
| **Database** | SQL Server | 2022 |

---

## 🔄 Common Workflows

### 1. Running Locally
```bash
# Start both services
start.bat          # Windows
./start.sh         # Linux/Mac
```

### 2. Building for Production
```bash
# Frontend
cd frontend
npm run build      # Creates dist/

# Backend
cd backend
dotnet publish -c Release -o ./publish
```

### 3. Deploying
See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for:
- Frontend deployment (Vercel, Netlify)
- Backend deployment (Azure, AWS, Railway)
- Database setup (Azure SQL, RDS)
- Environment configuration

### 4. Updating Content
1. Login to admin panel: `/admin`
2. Manage Projects, Skills, Experience
3. View contact messages

### 5. Customizing
- **Content**: Edit in admin panel or database
- **Colors**: Update `tailwind.config.js`
- **Animations**: Edit component files
- **Styles**: Modify `index.css` or Tailwind classes

---

## 🐛 Troubleshooting

### Frontend won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend won't start
```bash
cd backend
dotnet restore
dotnet run
```

### Port already in use
```bash
# Change frontend port
npm run dev -- --port 3001

# Change backend port
dotnet run --urls "http://localhost:5001"
```

### Database connection errors
- Check connection string in `appsettings.json`
- Verify SQL Server is running
- Test connection with SQL Server Management Studio

### API calls failing
- Check both frontend and backend are running
- Verify `.env` variables are set correctly
- Check CORS configuration in `Program.cs`

See **[SETUP_GUIDE.md](./SETUP_GUIDE.md#troubleshooting)** for more troubleshooting tips.

---

## 🔐 Security Setup

### Change Default Credentials (Important!)
```bash
# Update admin password in database or change at login
```

### Update JWT Secret Key
1. Generate a new secret (32+ characters)
2. Update in `backend/appsettings.json`:
```json
"JwtSettings": {
  "SecretKey": "your-new-secret-key-here"
}
```

### Configure CORS for Production
Edit `backend/Program.cs`:
```csharp
.WithOrigins("https://your-domain.com")
```

### Enable HTTPS
Update connection strings and deployment configuration for HTTPS.

---

## 📊 API Reference

### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Projects
```
GET    /api/projects
GET    /api/projects/{id}
POST   /api/projects           (admin)
PUT    /api/projects/{id}      (admin)
DELETE /api/projects/{id}      (admin)
```

### Skills
```
GET    /api/skills
POST   /api/skills             (admin)
PUT    /api/skills/{id}        (admin)
DELETE /api/skills/{id}        (admin)
```

### Experience
```
GET    /api/experience
POST   /api/experience         (admin)
PUT    /api/experience/{id}    (admin)
DELETE /api/experience/{id}    (admin)
```

### Messages
```
GET    /api/messages           (admin)
POST   /api/messages
PUT    /api/messages/{id}/read (admin)
DELETE /api/messages/{id}      (admin)
```

Full API docs available at: http://localhost:5000/swagger

---

## 🎨 Customization Guide

### Update Portfolio Content
1. Edit components in `frontend/src/components/`
2. Or use admin panel for dynamic content
3. Rebuild frontend with `npm run build`

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#YOUR_COLOR'
  }
}
```

### Add New Sections
1. Create component in `frontend/src/components/`
2. Import and use in `frontend/src/App.jsx`
3. Style with Tailwind CSS

### Modify Database
1. Update models in `backend/Models/Entities.cs`
2. Create migration: `dotnet ef migrations add MigrationName`
3. Update database: `dotnet ef database update`

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are fully responsive!

---

## ⚡ Performance Features

✅ Code splitting  
✅ Image lazy loading  
✅ CSS minification  
✅ Database query optimization  
✅ Response caching  
✅ Connection pooling  
✅ Gzip compression  

---

## 📚 Additional Resources

### Frontend
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Framer Motion Documentation](https://www.framer.com/motion/)

### Backend
- [ASP.NET Core Documentation](https://learn.microsoft.com/aspnet/core)
- [Entity Framework Core](https://learn.microsoft.com/ef/core)
- [JWT in .NET](https://learn.microsoft.com/dotnet/api/system.identitymodel.tokens.jwt)

### Deployment
- [Vercel Docs](https://vercel.com/docs)
- [Azure App Service](https://learn.microsoft.com/azure/app-service)
- [Railway.app Docs](https://docs.railway.app)

---

## 🤝 Support

### Documentation
- README.md - Start here
- SETUP_GUIDE.md - Installation help
- DEPLOYMENT_GUIDE.md - Production deployment
- PROJECT_STRUCTURE.md - Detailed overview
- Frontend/FRONTEND_README.md - Frontend details
- Backend/BACKEND_README.md - Backend details

### Contact
- Email: contact@darsan.dev
- GitHub: [Darsan01](https://github.com/Darsan01)

---

## 📜 License

MIT License - Feel free to use for personal and commercial projects.

---

## ✅ Checklist Before Production

- [ ] Change admin credentials
- [ ] Update JWT secret key
- [ ] Configure CORS origins
- [ ] Set up HTTPS/SSL
- [ ] Configure database backups
- [ ] Set up monitoring
- [ ] Update environment variables
- [ ] Test all features
- [ ] Optimize images
- [ ] Run lighthouse audit
- [ ] Set up CI/CD pipeline
- [ ] Deploy to production

---

## 🎉 You're All Set!

This is a **production-ready** portfolio website with:
- ✅ Modern, responsive design
- ✅ Complete admin dashboard
- ✅ Secure authentication
- ✅ Database integration
- ✅ Clean, scalable code
- ✅ Full documentation

**Next Steps:**
1. Review [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup
2. Run the quick start script
3. Login to admin panel and customize content
4. Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) to deploy

**Questions?** Check the relevant README files or contact support.

---

**Last Updated**: January 30, 2026  
**Status**: ✅ Production Ready  
**Version**: 1.0.0
