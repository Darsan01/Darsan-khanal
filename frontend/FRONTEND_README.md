# Frontend README

## Frontend Structure

```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── HeroSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── SkillsSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── ExperienceSection.jsx
│   │   ├── ContactSection.jsx
│   │   ├── Navigation.jsx
│   │   └── Footer.jsx
│   │
│   ├── admin/               # Admin panel components
│   │   ├── AdminLogin.jsx
│   │   └── AdminDashboard.jsx
│   │
│   ├── pages/               # Full page components
│   │
│   ├── store/               # Zustand state management
│   │   └── index.js         # Auth, Portfolio, Theme stores
│   │
│   ├── utils/               # Utility functions
│   │   └── api.js          # Axios instance with interceptors
│   │
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
│
├── public/                  # Static assets
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.development        # Dev environment variables
├── .env.production         # Prod environment variables
└── index.html
```

## Setup

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

## Key Features

### Authentication
- JWT token stored in localStorage
- Automatic token refresh on unauthorized responses
- Protected admin routes

### Styling
- Tailwind CSS for utility-based styling
- Dark mode support with automatic detection
- Glassmorphism effects
- Custom animations

### State Management (Zustand)
```javascript
// Auth Store
useAuthStore() // user, token, isAuthenticated, setAuth, logout

// Portfolio Store
usePortfolioStore() // projects, skills, experience, loading, error

// Theme Store
useThemeStore() // isDark, toggleTheme
```

### API Integration
- Centralized axios instance in `utils/api.js`
- Automatic Authorization header injection
- Global error handling

## Components

### HeroSection
- Animated hero with gradient text
- Floating particles background
- CTA buttons
- Scroll indicator

### AboutSection
- Professional introduction
- Contact information
- Education and certifications

### SkillsSection
- Skill categories (Backend, Frontend, Mobile, Database, Tools)
- Animated skill cards
- Proficiency bars with animation

### ProjectsSection
- Featured projects showcase
- Technology tags
- GitHub and Live demo links
- Hover effects with overlay

### ExperienceSection
- Work experience timeline
- Key highlights
- Certifications and achievements

### ContactSection
- Contact form with validation
- Contact information cards
- Social media links
- Form submission handling

### Navigation
- Fixed responsive navbar
- Theme toggle
- Mobile hamburger menu
- CTA button

### Footer
- Social links
- Quick navigation
- Copyright info

## Customization

### Update Content
Edit content directly in components or connect to backend API.

### Change Colors
Update `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#YOUR_COLOR'
  }
}
```

### Add Animations
Define keyframes in `tailwind.config.js`:
```javascript
keyframes: {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' }
  }
}
```

### Modify Styles
Global styles in `index.css`
Component-specific in each JSX file with Tailwind classes

## Environment Variables

Create `.env.development` and `.env.production`:
```
VITE_API_URL=http://localhost:5000/api
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

## Performance Tips

1. Use React.lazy() for large components
2. Implement route-based code splitting
3. Optimize images
4. Enable gzip compression in server
5. Use production build for deployment

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Common Issues

### Vite not starting
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### CSS not applying
- Check Tailwind config includes all file paths
- Restart dev server after config changes
- Clear browser cache

### API calls failing
- Check backend is running
- Verify .env variable is set
- Check CORS configuration in backend

## Next Steps

1. Deploy frontend to Vercel/Netlify
2. Connect to production backend
3. Set up custom domain
4. Enable HTTPS
5. Set up CI/CD pipeline
