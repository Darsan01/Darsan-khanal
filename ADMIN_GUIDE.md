# Admin Dashboard Quick Reference Guide

## 🔐 Login
**URL**: http://localhost:3001/admin/login
- **Email**: admin@darsan.dev
- **Password**: admin123

---

## 📊 Dashboard Tabs & Features

### 1️⃣ Projects
Manage your portfolio projects

**Fields:**
- Title: Project name
- Description: Detailed project description
- Technologies: Comma-separated tech stack
- GitHub: Repository URL
- Live Demo: Live project URL
- Image: Upload or paste image URL
- Featured: Toggle to highlight on homepage

**Actions**: Add ➕ | Edit ✏️ | Delete 🗑️

---

### 2️⃣ Skills
Track your technical skills

**Fields:**
- Skill Name: e.g., "React", "Python"
- Category: e.g., "Frontend", "Backend", "DevOps"
- Proficiency: 1-5 scale

**Tip**: Group by category for better organization

---

### 3️⃣ Experience
Showcase your work history

**Fields:**
- Position: Job title
- Company: Company name
- Description: Responsibilities and achievements
- Start Date: When you started
- End Date: When you left (optional for current)
- Duration: e.g., "Jan 2022 - Dec 2023"
- Highlights: Key accomplishments
- Technologies: Skills used

---

### 4️⃣ Certificates
Display professional credentials

**Fields:**
- Title: Certification name
- Issuer: Organization that issued
- Issued Date: Date of certification
- Expiry Date: (Optional) if certificate expires
- Credential URL: Link to verify certificate
- Certificate Image: **Upload badge/diploma image**
- Visible: Toggle to show/hide

**Pro Tip**: Upload certificate badge images for visual impact

---

### 5️⃣ Achievements
Highlight personal wins

**Fields:**
- Title: Achievement name
- Description: What you achieved
- Achieved Date: When it happened
- Badge Image: Visual representation
- Featured: Pin to top of achievements section
- Visible: Toggle visibility

---

### 6️⃣ Navigation
Customize your site menu

**Fields:**
- Label: Menu item text (e.g., "About")
- URL: Where it links (#about, /contact, etc.)
- Order: Display sequence (1, 2, 3...)
- Visible: Show/hide from menu

**Example Setup:**
1. Home → #home
2. About → #about
3. Projects → #projects
4. Contact → #contact

---

### 7️⃣ Social Links
Manage your social presence

**Fields:**
- Platform: e.g., "GitHub", "LinkedIn", "Twitter"
- URL: Link to your profile
- Icon: Icon name (github, linkedin, twitter, etc.)
- Order: Display sequence
- Visible: Toggle visibility

---

### 8️⃣ Settings
Configure app-wide settings

**Fields:**
- App Name: Your portfolio site title
- App Tagline: Your professional tagline
- About Me: Bio/introduction (appears on hero section)
- Contact Email: Email for inquiries
- Contact Phone: Optional phone number
- Profile Image: **Upload your photo**
- CV/Resume: **Upload your resume PDF**

**This is where you control:**
- Site title and branding
- Main introduction text
- Contact information
- Profile picture
- Downloadable resume

---

### 9️⃣ Footer
Customize footer content

**Fields:**
- Company Name: Business/personal name
- Description: About your business
- Copyright: Copyright text (e.g., "© 2024 Darsan Khanal")

---

### 🔟 Messages
View contact form submissions (Read-Only)

**Shows:**
- Name: Sender's name
- Email: Sender's email
- Subject: Message subject
- Message: Full message content
- Date: When message was sent

**Note**: Messages are archived but not deletable here

---

## 📤 File Upload Features

### Where You Can Upload:
1. **Settings** → Profile Image
2. **Settings** → CV/Resume (PDF, DOC, DOCX)
3. **Certificates** → Certificate Image
4. **Achievements** → Badge Image
5. **Projects** → Project Image

### Upload Guidelines:
- **Max File Size**: 10 MB
- **Allowed Image Types**: JPG, JPEG, PNG, GIF
- **Allowed Document Types**: PDF, DOC, DOCX
- **Auto-Generated Names**: Files get unique names
- **Auto-Hosted**: Files stored on your server

### How to Upload:
1. Click **[Upload]** button in the form
2. Select file from your computer
3. Wait for "✓ Upload complete" message
4. File URL auto-fills in the field
5. Save the form

---

## 💾 How to Save Changes

1. Fill in all required fields (marked with *)
2. Click **Save** button
3. Wait for success message
4. Changes appear on live site immediately
5. For deletions, confirm the warning

---

## 🎯 Common Tasks

### Update Your Bio
1. Go to **Settings** tab
2. Edit "About Me" section
3. Click Save

### Add New Project
1. Click "Add New" button in **Projects** tab
2. Fill all fields
3. Click Save
4. Project appears on homepage

### Change Profile Picture
1. Go to **Settings** tab
2. Click "Upload Image" under Profile Image
3. Select your new photo
4. Click Save

### Add Certificate
1. Go to **Certificates** tab
2. Click "Add New"
3. Fill certificate details
4. Upload certificate badge
5. Click Save

### Manage Navigation
1. Go to **Navigation** tab
2. Adjust order numbers to reorder menu
3. Toggle "Visible" to show/hide items
4. Save changes
5. Menu updates on site immediately

### Add Social Link
1. Go to **Social Links** tab
2. Click "Add New"
3. Enter platform, URL, and icon
4. Save
5. Link appears in footer and hero section

---

## ⚙️ Settings Priority Order

**Update these first:**
1. ✅ App Name
2. ✅ Profile Image
3. ✅ About Me
4. ✅ CV/Resume

**Then add:**
1. ✅ Social Links
2. ✅ Navigation Items
3. ✅ Projects
4. ✅ Skills
5. ✅ Experience
6. ✅ Certificates
7. ✅ Achievements

---

## 🔍 Tips & Tricks

### ✅ DO:
- Upload professional high-quality images
- Keep descriptions concise and impactful
- Use consistent date formats
- Set featured items for top projects
- Reorder items by changing "Order" number
- Hide work-in-progress items with toggle

### ❌ DON'T:
- Upload images larger than 10MB
- Leave required fields empty (marked with *)
- Use special characters in URLs
- Forget to click Save after editing
- Delete certificates you want to display

---

## 🆘 Troubleshooting

### File Won't Upload
- Check file size (max 10MB)
- Try a different file format
- Clear browser cache
- Reload the page

### Changes Not Showing
- Click Save button (don't just close modal)
- Refresh the website in another tab
- Check if item is marked "Visible"

### Can't Login
- Clear browser cookies/cache
- Check email: admin@darsan.dev
- Password: admin123
- Use incognito/private window

### Missing API Data
- Ensure backend is running (port 5000)
- Check network tab in browser DevTools
- Verify API URL in .env.development

---

## 📱 Responsive Design

Your portfolio automatically adjusts to:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktops
- 🖥️ Large monitors

No special configuration needed!

---

## 🎨 Frontend Preview

Changes you make in the admin panel appear immediately on:
- http://localhost:3001 (Full portfolio)
- All sections update dynamically
- No page refresh needed
- Real-time updates for visitors

---

## 🚀 Going Live

When you're ready to deploy:

1. **Test Everything** ✅
2. **Upload Final Images** ✅
3. **Set Correct Contact Info** ✅
4. **Review All Content** ✅
5. **Deploy Backend** (Azure/Heroku)
6. **Deploy Frontend** (Vercel/Netlify)
7. **Update Configuration** (URLs, CORS, etc.)

---

**Happy Updating! 🎉**

Questions? Check the main FINAL_SUMMARY.md for technical details.
