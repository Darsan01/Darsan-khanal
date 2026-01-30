# 🚀 Quick Start Guide - Full Dynamic Portfolio

## 5-Minute Setup

### Prerequisites
- Node.js 18+ and npm
- .NET 8 SDK
- Git (optional)

### Step 1: Start Backend (Terminal 1)
```bash
cd backend
dotnet run
```
✅ Wait until you see: "Application started. Now listening on: http://localhost:5000"

### Step 2: Start Frontend (Terminal 2)
```bash
cd frontend
npm install  # First time only
npm run dev
```
✅ Wait until you see: "Local: http://localhost:3001/"

### Step 3: Login to Admin
1. Open browser: http://localhost:3001/admin/login
2. **Email**: `admin@darsan.dev`
3. **Password**: `admin123`
4. ✅ You're in the admin dashboard!

---

## 🎯 First 10 Minutes: Essential Setup

### 1. Update Your Info (Settings Tab)
```
• App Name: Your name/title
• Tagline: Your professional tagline
• About Me: Your bio/introduction
• Contact Email: your@email.com
• Contact Phone: +1-234-567-8900
```
→ **Upload** your profile photo and resume

### 2. Add Social Links (Social Links Tab)
```
GitHub → https://github.com/yourprofile
LinkedIn → https://linkedin.com/in/yourprofile
Email → your@email.com
Twitter → https://twitter.com/yourhandle
```

### 3. Customize Navigation (Navigation Tab)
```
Order 1: Home → #home (Visible ✓)
Order 2: About → #about (Visible ✓)
Order 3: Projects → #projects (Visible ✓)
Order 4: Contact → #contact (Visible ✓)
```

### 4. Set Footer (Footer Tab)
```
Company Name: Your Name/Business
Description: What you do
Copyright: © 2024 Your Name
```

---

## 📝 Next 20 Minutes: Add Content

### Add 3 Featured Projects
```
Tab: Projects → Click "Add New"

1. Project Name
   • Title: Describe the project
   • Description: What problem it solves
   • Technologies: React, Node.js, etc.
   • GitHub: Link to repository
   • Image: Upload screenshot
   • Live Demo: Link if available
   → Save
```

### Add Your Skills
```
Tab: Skills → Click "Add New"

Examples:
• Frontend | React | Proficiency: 5
• Backend | Node.js | Proficiency: 4
• Database | PostgreSQL | Proficiency: 4
• DevOps | Docker | Proficiency: 3
```

### Add Work Experience
```
Tab: Experience → Click "Add New"

• Position: Senior Developer
• Company: Acme Corp
• Start Date: Jan 2022
• End Date: Dec 2023
• Description: What you did
• Duration: 2 years
→ Save
```

---

## 🏆 Bonus: Show Off (10 Minutes)

### Add Certificates
```
Tab: Certificates → Click "Add New"

• Title: AWS Solutions Architect
• Issuer: Amazon Web Services
• Issued Date: June 2023
• Upload Certificate Image
• Make Visible ✓
→ Save
```

### Add Achievements
```
Tab: Achievements → Click "Add New"

• Title: Built 50+ Projects
• Description: Full-stack applications
• Achieved Date: 2024
• Featured: ✓ (pins to top)
→ Save
```

---

## ✨ See It Live

### View Your Portfolio
Open: **http://localhost:3001**

Everything you entered now appears:
- ✅ Your info in the hero section
- ✅ Your projects showcase
- ✅ Your skills by category
- ✅ Your experience timeline
- ✅ Your certificates with badges
- ✅ Your achievements
- ✅ Social links in footer
- ✅ Custom navigation menu

**No rebuild needed! Changes appear instantly.**

---

## 🔧 Common Operations

### Change Profile Picture
1. Settings tab
2. Click "Upload Image"
3. Select your photo
4. Save form

### Add Another Project
1. Projects tab
2. "Add New" button
3. Fill form
4. Upload project image
5. Save

### Hide Something
1. Find the item in any tab
2. Click "Edit"
3. Uncheck "Visible" checkbox
4. Save
5. Item hidden from frontend

### Reorder Navigation
1. Navigation tab
2. Edit each item
3. Change "Order" number (1, 2, 3...)
4. Save
5. Menu reorganizes automatically

### Update Social Links
1. Social Links tab
2. Edit each link
3. Change URL as needed
4. Save
5. Footer updates automatically

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Try a different port in launchSettings.json
# Or kill the process using port 5000
```

### Frontend shows "Cannot GET"
- Wait for Vite to finish starting
- Check backend is running (see terminal output)
- Try http://localhost:3001 again
- Clear browser cache (Ctrl+Shift+Delete)

### Admin login fails
- Check credentials: `admin@darsan.dev` / `admin123`
- Clear localStorage: F12 → Application → Clear
- Try incognito/private window
- Restart both servers

### Changes not showing on frontend
- Click "Save" button (don't just close modal)
- Refresh the portfolio page
- Check if item is marked "Visible"
- Check browser console for errors (F12)

### File upload fails
- File must be < 10MB
- Image types: JPG, PNG, GIF
- Document types: PDF, DOC, DOCX
- Try a different file
- Check /backend/wwwroot/uploads folder exists

---

## 📱 Testing on Other Devices

### Same Network (Laptop, Phone, etc.)
```bash
# Find your computer's IP (e.g., 192.168.1.100)
ipconfig

# Access on phone:
http://192.168.1.100:3001
```

### Mobile Device
1. Connect to same WiFi
2. Get your IP address
3. Type: `http://YOUR_IP:3001`
4. Portfolio works on mobile!

---

## 🚀 Deploy to Internet

### Backend Options
- **Azure**: Free tier available
- **Heroku**: Deploying .NET Core
- **Railway**: Simple deployment
- **AWS**: EC2 instance

### Frontend Options
- **Vercel**: Connected to GitHub
- **Netlify**: Drag & drop deploy
- **GitHub Pages**: Free static hosting
- **Cloudflare Pages**: Fast deployment

### Basic Deployment Steps
1. Push code to GitHub
2. Connect repository to hosting
3. Add environment variables
4. Deploy with one click
5. Update API URL in `.env`

---

## 📚 Learning Resources

### Frontend
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

### Backend
- [ASP.NET Core Docs](https://learn.microsoft.com/en-us/aspnet/core/)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
- [JWT Authentication](https://tools.ietf.org/html/rfc7519)

### Database
- [SQLite](https://www.sqlite.org/docs.html)
- [SQL Tutorial](https://www.w3schools.com/sql/)

---

## 🎓 Next Steps

1. ✅ Get everything running locally
2. ✅ Add your personal information
3. ✅ Add 3-5 projects
4. ✅ Add skills and experience
5. ✅ Add certificates/achievements
6. ✅ Test all features (see TESTING_CHECKLIST.md)
7. ✅ Deploy to live server
8. ✅ Add custom domain
9. ✅ Set up email notifications
10. ✅ Monitor analytics

---

## 💡 Pro Tips

### Data Entry
- Use rich descriptions for projects
- Keep skills organized by category
- Add dates to everything for timeline view
- Use professional photos

### File Uploads
- Resize images to ~500x500px before upload
- Compress PDFs to < 5MB
- Use high-quality certificate images
- Test file uploads in incognito mode

### Performance
- Optimize images before upload
- Keep descriptions concise
- Limit projects to 10-15 featured items
- Use CDN for file delivery (production)

### SEO
- Use descriptive project titles
- Add detailed descriptions
- Include relevant keywords
- Update your bio frequently

---

## 🆘 Still Need Help?

### Check Documentation
- [FINAL_SUMMARY.md](./FINAL_SUMMARY.md) - Technical details
- [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) - Admin features
- [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) - Test everything

### Common Issues
See error message? Search in docs:
- Authentication issues
- File upload problems
- API connection errors
- Styling problems

---

## 🎉 You're All Set!

Your dynamic portfolio is ready to:
- ✅ Showcase your work
- ✅ Tell your story
- ✅ Connect with opportunities
- ✅ Keep content updated easily

**Time to update your portfolio and start impressing people!** 🚀

---

**Happy building!**

For more detailed information, see the ADMIN_GUIDE.md and FINAL_SUMMARY.md files.
