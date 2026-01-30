# Darsan Khanal - Personal Portfolio

A modern, fully dynamic single-page portfolio website built with React, Tailwind CSS, Framer Motion for the frontend and ASP.NET Core Web API for the backend.

## Features

✨ **Modern Design**
- Glassmorphism UI with smooth animations
- Dark/Light theme toggle
- Fully responsive (mobile, tablet, desktop)
- High performance & SEO optimized

🎨 **Sections**
- Hero section with animated background
- About me with location and certifications
- Technical skills with proficiency levels
- Featured projects showcase
- Work experience timeline
- Contact form with email integration
- Social media links

🔐 **Authentication & Admin Panel**
- JWT-based authentication
- Role-based access control (Admin/User)
- Secure admin dashboard
- CRUD operations for projects, skills, and experience

## Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** & **GSAP** for animations
- **Axios** for API calls
- **React Router** for routing
- **Zustand** for state management

### Backend
- **ASP.NET Core 8** Web API
- **Entity Framework Core** for data access
- **JWT** authentication
- **SQL Server** database
- **Swagger/OpenAPI** documentation

## Project Structure

```
Personal portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── admin/          # Admin panel
│   │   ├── store/          # Zustand stores
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── backend/
│   ├── Controllers/        # API controllers
│   ├── Models/             # Entity models
│   ├── Data/               # DbContext
│   ├── Services/           # Business logic
│   ├── DTOs/               # Data transfer objects
│   ├── Program.cs          # App configuration
│   ├── appsettings.json    # Settings
│   └── DarsanPortfolioAPI.csproj
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- .NET 8 SDK
- SQL Server (or SQL Server Express)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000`

### Backend Setup

1. **Update connection string** in `backend/appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=DarsanPortfolio;User Id=sa;Password=YOUR_PASSWORD;"
}
```

2. **Update JWT secret key** in `appsettings.json`:
```json
"JwtSettings": {
  "SecretKey": "your-super-secret-key-minimum-32-characters-long"
}
```

3. **Run migrations** (or DB will be seeded on first run):
```bash
cd backend
dotnet ef database update
```

4. **Run the API**:
```bash
dotnet run
```

API runs on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout (requires auth)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get project by ID
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/{id}` - Update project (admin only)
- `DELETE /api/projects/{id}` - Delete project (admin only)

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill (admin only)
- `PUT /api/skills/{id}` - Update skill (admin only)
- `DELETE /api/skills/{id}` - Delete skill (admin only)

### Experience
- `GET /api/experience` - Get all experience
- `POST /api/experience` - Create experience (admin only)
- `PUT /api/experience/{id}` - Update experience (admin only)
- `DELETE /api/experience/{id}` - Delete experience (admin only)

### Messages
- `GET /api/messages` - Get all messages (admin only)
- `POST /api/messages` - Send contact message
- `PUT /api/messages/{id}/read` - Mark as read (admin only)
- `DELETE /api/messages/{id}` - Delete message (admin only)

## Admin Access

Default admin credentials:
- **Email**: `admin@darsan.dev`
- **Password**: `admin123`

**Change these immediately in production!**

Admin panel: `/admin`

## Environment Variables

### Frontend (.env.development / .env.production)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (appsettings.json)
```json
{
  "JwtSettings": {
    "SecretKey": "your-secret-key-here",
    "ExpiresInHours": 24,
    "Issuer": "DarsanPortfolio",
    "Audience": "DarsanPortfolioUsers"
  }
}
```

## Customization

### Update Portfolio Content

1. **About Section**: Modify `frontend/src/components/AboutSection.jsx`
2. **Skills**: Add/edit in admin panel or directly in database
3. **Projects**: Add/edit in admin panel or `backend/Data/ApplicationDbContext.cs`
4. **Experience**: Add/edit in admin panel
5. **Contact**: Update email in `frontend/src/components/ContactSection.jsx`

### Styling

- Colors and themes: `frontend/tailwind.config.js`
- Global styles: `frontend/src/index.css`
- Component styles: Inline Tailwind classes

### Animations

- Configure in `tailwind.config.js` under `keyframes`
- Framer Motion variants: Each component section

## Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Upload 'dist' folder to hosting
```

### Backend (Azure/AWS/VPS)
```bash
dotnet publish -c Release
# Deploy to your server
```

## Performance Optimization

- ✅ Code splitting with React.lazy
- ✅ Image optimization
- ✅ CSS compression
- ✅ Database query optimization
- ✅ JWT token caching
- ✅ Lazy loading for components

## Security

- ✅ JWT authentication
- ✅ Password hashing (BCrypt)
- ✅ Role-based access control
- ✅ CORS configuration
- ✅ SQL injection protection (EF Core)
- ✅ XSS protection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Improvements and suggestions are welcome! Feel free to open issues or pull requests.

## License

This project is open source and available under the MIT License.

## Contact

- Email: contact@darsan.dev
- GitHub: [Darsan01](https://github.com/Darsan01)
- Portfolio: [darsan.dev](https://darsan.dev)

---

Built with ❤️ by Darsan Khanal
