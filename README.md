[README.md](https://github.com/user-attachments/files/29199666/README.md)
# Café Coco Website

A beautiful, responsive website for Café Coco - a cozy coffee shop in Kaunas, Lithuania.

## 🌐 Live Website
**Domain:** [kavinecoco.com](http://kavinecoco.com)

## 📁 Project Structure
```
kavinecoco/
├── index.html          # Homepage
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── script.js       # JavaScript functionality
├── images/             # Images directory (placeholder images used)
└── README.md           # This file
```

## 🎨 Brand Assets
- **Primary Color:** #244f26 (Deep Green)
- **Secondary Color:** #d19900 (Golden Yellow)
- **Dark Color:** #34252f (Dark Plum)
- **Accent Color:** #00888c (Teal)
- **Soft Color:** #c4848b (Soft Pink)

## ✨ Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Hero slider with auto-advancing images
- ✅ Smooth scroll navigation
- ✅ Interactive menu cards with hover effects
- ✅ Contact section with social media links
- ✅ Back-to-top button
- ✅ Mobile hamburger menu
- ✅ Google Fonts integration
- ✅ Font Awesome icons

## 📱 Social Media
- **Instagram:** [@coco_cafe_lt](https://www.instagram.com/coco_cafe_lt)
- **TikTok:** [@cocoscafekaunas](https://www.tiktok.com/@cocoscafekaunas)

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - Easiest)
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Add New" → "Project"
3. Drag & drop the `kavinecoco` folder
4. Your site will be live at a `.vercel.app` URL
5. Later, connect your custom domain `kavinecoco.com`

### Option 2: Netlify
1. Go to [netlify.com](https://www.netlify.com) and sign up
2. Drag & drop the `kavinecoco` folder
3. Your site will be live at a `.netlify.app` URL

### Option 3: GitHub + Vercel
1. Create a GitHub repository
2. Upload this folder to the repository
3. Connect the repo to Vercel for automatic deployments

## 🔧 Local Development
To preview the website locally:

### Option 1: Open Directly
Simply double-click `index.html` to open in your browser.

### Option 2: VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

### Option 3: Python HTTP Server
```bash
# Navigate to project folder
cd kavinecoco

# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

### Option 4: Node.js http-server
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

## 📝 Customization

### Adding Your Logo
Replace the text logo in `index.html` with an image:
```html
<a href="#" class="logo">
    <img src="images/your-logo.png" alt="Café Coco" height="50">
</a>
```

### Adding Real Images
1. Replace Unsplash URLs in `index.html` with your own image paths
2. Example: Change `src="https://images.unsplash.com/..."` to `src="images/your-image.jpg"`

### Updating Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary: #YOUR_COLOR;
    /* ... */
}
```

### Updating Content
Edit the text in `index.html` to match your café's information.

## 🔒 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License
This project is created for Café Coco. All rights reserved.

---

Made with ☕ by Café Coco | kavinecoco.com
