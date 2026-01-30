# Darsan Khanal - Personal Portfolio Website

## Project Overview

A modern, fully dynamic single-page portfolio website for **Darsan Khanal**, a Full-Stack Developer from Nepal. Built with cutting-edge technologies, the site features a responsive design, smooth animations, and a complete admin dashboard for content management.

---

## 🎯 Project Goals Achieved

✅ **Ultra-Modern Design**
- Glassmorphism UI with gradient effects
- Dark/Light theme toggle
- Smooth animations with Framer Motion & GSAP
- Professional developer aesthetic

✅ **Fully Dynamic Content**
- Backend API for all content management
- Admin panel for CRUD operations
- Database-driven content

✅ **Responsive & Accessible**
- Mobile-first design
- Tablet and desktop optimization
- Semantic HTML
- Keyboard navigation

✅ **Secure Authentication**
- JWT token-based auth
- Role-based access control
- Password hashing with BCrypt
- Admin-only operations

✅ **Production Ready**
- Clean, scalable code architecture
- Error handling
- API documentation with Swagger
- Database indexing and optimization

---

## 📁 Project Structure

```
Personal portfolio/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── HeroSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── SkillsSection.jsx
│   │   │   ├── ProjectsSection.jsx
│   │   │   ├── ExperienceSection.jsx
│   │   │   ├── ContactSection.jsx
│   │   │   ├── Navigation.jsx
│   │   │   └── Footer.jsx
│   │   ├── admin/           # Admin panel
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── store/           # Zustand stores
│   │   ├── utils/           # API utilities
│   │   ├── App.jsx          # Router setup
│   │   └── index.css        # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env.development
│   ├── .env.production
│   ├── index.html
│   └── FRONTEND_README.md
│
├── backend/                 # ASP.NET Core API
│   ├── Controllers/        # API endpoints
│   │   └── ApiControllers.cs
│   ├── Models/            # Entity classes
│   │   └── Entities.cs
│   ├── Data/              # EF Core DbContext
│   │   └── ApplicationDbContext.cs
│   ├── Services/          # Business logic
│   │   └── AuthService.cs
│   ├── DTOs/              # Data transfer objects
│   │   └── DTOs.cs
│   ├── Program.cs         # App configuration
│   ├── appsettings.json
│   ├── database-schema.sql
│   ├── DarsanPortfolioAPI.csproj
│   └── BACKEND_README.md
│
├── README.md              # Main documentation
├── SETUP_GUIDE.md         # Setup instructions
├── DEPLOYMENT_GUIDE.md    # Deployment guide
├── start.sh              # Quick start (Linux/Mac)
├── start.bat            # Quick start (Windows)
└── PROJECT_STRUCTURE.md  # This file
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI library | 18.2.0 |
| **Vite** | Build tool | 5.0.0 |
| **Tailwind CSS** | Styling | 3.3.5 |
| **Framer Motion** | Animations | 10.16.0 |
| **GSAP** | Advanced animations | 3.12.2 |
| **React Router** | Client-side routing | 6.18.0 |
| **Axios** | HTTP client | 1.6.0 |
| **Zustand** | State management | 4.4.1 |
| **React Icons** | Icon library | 4.12.0 |

### Backend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **.NET Core** | Framework | 8.0 |
| **ASP.NET Core** | Web API framework | 8.0.0 |
| **Entity Framework Core** | ORM | 8.0.0 |
| **SQL Server** | Database | 2022 |
| **JWT** | Authentication | 7.0.0 |
| **BCrypt** | Password hashing | 1.6.0 |
| **Swagger/OpenAPI** | API documentation | 6.5.0 |

### Deployment & DevOps
| Tool | Purpose |
|------|---------|
| **GitHub** | Version control |
| **Docker** | Containerization |
| **AWS / Azure** | Cloud hosting |
| **Vercel / Netlify** | Frontend deployment |
| **SQL Server** | Database hosting |

---

## 📊 Database Schema

### Tables

**Users**
```sql
- Id (PK)
- Name
- Email (Unique)
- PasswordHash
- Role (admin/user)
- CreatedAt
- UpdatedAt
```

**Projects**
```sql
- Id (PK)
- Title
- Description
- Image
- Technologies (JSON)
- GitHub (URL)
- LiveDemo (URL)
- Featured (Boolean)
- CreatedAt
- UpdatedAt
```

**Skills**
```sql
- Id (PK)
- Name
- Category
- Proficiency (0-100)
- CreatedAt
```

**Experiences**
```sql
- Id (PK)
- Company
- Position
- Description
- Duration
- Highlights (JSON)
- Technologies (JSON)
- StartDate
- EndDate
- CreatedAt
```

**Messages**
```sql
- Id (PK)
- Name
- Email
- Subject
- MessageContent
- Read (Boolean)
- CreatedAt
```

---

## 🔌 API Endpoints

### Authentication (Public)
```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login (returns JWT)
```

### Projects (Public read, Admin write)
```
GET    /api/projects             - List all projects
GET    /api/projects/{id}        - Get project details
POST   /api/projects             - Create (admin only)
PUT    /api/projects/{id}        - Update (admin only)
DELETE /api/projects/{id}        - Delete (admin only)
```

### Skills (Public read, Admin write)
```
GET    /api/skills               - List all skills
POST   /api/skills               - Create (admin only)
PUT    /api/skills/{id}          - Update (admin only)
DELETE /api/skills/{id}          - Delete (admin only)
```

### Experience (Public read, Admin write)
```
GET    /api/experience           - List all experience
POST   /api/experience           - Create (admin only)
PUT    /api/experience/{id}      - Update (admin only)
DELETE /api/experience/{id}      - Delete (admin only)
```

### Messages (Public create, Admin read)
```
GET    /api/messages             - List all (admin only)
POST   /api/messages             - Create (public)
PUT    /api/messages/{id}/read   - Mark as read (admin only)
DELETE /api/messages/{id}        - Delete (admin only)
```

---

## 🎨 Design Features

### Hero Section
- Large animated name and title
- Animated gradient background with floating particles
- Call-to-action buttons (View Projects, Download CV)
- Stats display (projects, years, tech stack)
- Smooth scroll indicator

### About Section
- Professional introduction
- Location and contact info
- Education and certifications
- Experience highlights

### Skills Section
- Skill categories (Backend, Frontend, Mobile, Database, Tools)
- Animated skill cards with hover effects
- Proficiency bars with animation
- Color-coded categories

### Projects Section
- Featured projects showcase
- Project cards with images
- Technology tags
- GitHub and live demo links
- Hover overlay with links

### Experience Section
- Work experience timeline
- Key responsibilities and achievements
- Technology stack used
- Certifications and awards
- Professional highlights

### Contact Section
- Contact form with validation
- Contact information cards
- Social media links
- Form submission handling
- Success/error messages

### Navigation
- Fixed responsive navbar
- Theme toggle (dark/light)
- Mobile hamburger menu
- Smooth scrolling
- CTA button

### Footer
- Social links
- Quick navigation
- Copyright and credit

---

## 🔐 Security Features

✅ **Authentication**
- JWT token-based authentication
- Secure password hashing (BCrypt)
- Token expiration and refresh

✅ **Authorization**
- Role-based access control (Admin/User)
- Protected API endpoints
- Admin-only operations

✅ **Data Protection**
- SQL injection prevention (EF Core)
- XSS protection
- CORS configuration
- Input validation

✅ **Infrastructure**
- HTTPS/TLS encryption
- Secure headers
- Rate limiting (configurable)
- Audit logging

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Features
- Touch-friendly buttons and links
- Responsive grid layouts
- Adaptive typography
- Mobile hamburger menu
- Optimized images

---

## ⚡ Performance Optimizations

### Frontend
- ✅ Code splitting with React.lazy
- ✅ Image lazy loading
- ✅ CSS minification and compression
- ✅ Gzip compression
- ✅ Vite build optimization
- ✅ Tree shaking of unused code

### Backend
- ✅ Database query optimization
- ✅ Connection pooling
- ✅ Response caching
- ✅ Async/await for I/O operations
- ✅ Entity Framework lazy loading prevention
- ✅ Indexed database columns

### Database
- ✅ Proper indexing strategy
- ✅ Query optimization
- ✅ Data normalization
- ✅ Partitioning for large tables

---

## 🚀 Deployment Ready

### Frontend Deployment Options
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Self-hosted (Nginx/Apache)**

### Backend Deployment Options
- **Azure App Service** (recommended)
- **AWS EC2 / Elastic Beanstalk**
- **Railway.app**
- **Heroku**
- **Docker containers**

### Database Deployment Options
- **Azure SQL Database** (recommended)
- **AWS RDS**
- **Self-hosted SQL Server**
- **DigitalOcean**

---

## 📖 Documentation

### Main Documentation
- **README.md** - Project overview and features
- **SETUP_GUIDE.md** - Installation and configuration
- **DEPLOYMENT_GUIDE.md** - Deployment instructions
- **FRONTEND_README.md** - Frontend structure and guide
- **BACKEND_README.md** - Backend structure and guide

### Quick Start
```bash
# Windows
start.bat

# Linux/Mac
chmod +x start.sh
./start.sh
```

---

## 👤 Admin Credentials

**Default Admin Account:**
- Email: `admin@darsan.dev`
- Password: `admin123`

⚠️ **Change immediately in production!**

Access admin panel: `http://localhost:3000/admin`

---

## 📝 Content Included

### Portfolio Content
- ✅ Hero section with branding
- ✅ About section with background
- ✅ 10+ skills in 5 categories
- ✅ 4 featured projects
- ✅ 1 work experience entry
- ✅ 3 certifications
- ✅ Contact form with email

### Projects Included
1. **EduFlow** - School Management System (Laravel)
2. **BookHive** - Library Inventory App (.NET MVC)
3. **Expense Tracker** - Mobile App (.NET MAUI)
4. **Tinjure Tea** - E-commerce Demo

### Skills Included
- Backend: C#, .NET 8, ASP.NET Core, Web API, Laravel
- Frontend: React, HTML5, CSS3, Bootstrap, JavaScript
- Mobile: .NET MAUI
- Database: MySQL, SQL, SQLite
- Tools: Git, GitHub, Agile/Scrum, Stripe, AWS

---

## 🔄 Workflow

### User Flow
1. User visits portfolio
2. Explores sections
3. Submits contact form
4. Message stored in database

### Admin Flow
1. Admin logs in with credentials
2. Accesses admin dashboard
3. Performs CRUD operations on:
   - Projects
   - Skills
   - Experience
   - View messages

### API Flow
1. Frontend makes HTTP request
2. Backend validates JWT token
3. Checks role-based access
4. Performs database operation
5. Returns JSON response

---

## 🛡️ Quality Assurance

### Code Quality
- ✅ Clean code principles
- ✅ DRY (Don't Repeat Yourself)
- ✅ SOLID principles
- ✅ Proper error handling
- ✅ Input validation
- ✅ Consistent naming conventions

### Testing (Ready for)
- Unit tests
- Integration tests
- E2E tests with Cypress
- API testing with Postman

---

## 📈 Future Enhancements

### Potential Features
- Blog section
- Social media feed integration
- Analytics dashboard
- Email notifications
- File upload (resume, projects)
- Testimonials section
- Newsletter subscription
- Search functionality
- Multi-language support
- PWA offline support

---

## 📞 Support & Maintenance

### Regular Maintenance
- Keep dependencies updated
- Monitor performance
- Review and optimize queries
- Update security patches
- Backup databases regularly

### Troubleshooting Guide
See **SETUP_GUIDE.md** and **DEPLOYMENT_GUIDE.md** for common issues and solutions.

---

## 📜 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Created By

**Darsan Khanal**
- Full-Stack Developer from Nepal
- Email: contact@darsan.dev
- GitHub: [Darsan01](https://github.com/Darsan01)
- Location: Ilam, Nepal

---

## 🙏 Acknowledgments

Built with:
- React.js team
- ASP.NET Core team
- Tailwind CSS
- Framer Motion
- GSAP
- And many other amazing open-source libraries

---

## 📝 Version History

**v1.0.0** (January 30, 2026)
- Initial release
- Complete portfolio website
- Admin panel
- Full authentication
- Database integration

---

**Last Updated**: January 30, 2026  
**Status**: Production Ready ✅
