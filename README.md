# QR Business Card Generator v4.0

A modern, fully-featured React application for creating professional digital business cards with QR codes, custom themes, and image uploads. Generate high-quality PNG/PDF downloads and scannable QR codes for seamless contact sharing.

## ✨ Features

### 🎨 **Professional Themes**
- **6 Beautiful Themes**: Blue Gradient, Dark Professional, Green Nature, Purple Creative, Orange Energy, and Minimal White
- **Live Theme Preview**: See changes instantly as you switch themes
- **Theme-Aware Downloads**: All exports maintain your selected theme colors

### 🖼️ **Image Integration**
- **Profile Picture Upload**: Add professional headshots with circular cropping
- **Company Logo Upload**: Brand your cards with company logos
- **Smart Layout**: Text automatically adjusts around uploaded images
- **Drag & Drop Support**: Easy file uploads with visual feedback

### 📱 **Real QR Code Generation**
- **Industry-Standard QR Codes**: Uses QRious library for professional-quality codes
- **vCard Format**: QR codes contain contact info that phones automatically recognize
- **Instant Contact Adding**: Scan with any smartphone camera to add contact
- **High-Quality Output**: Sharp, scannable codes at any size

### 💾 **Multiple Download Formats**
- **PNG Downloads**: High-resolution business cards (1050x600px at 300 DPI)
- **PDF Downloads**: Print-ready format with standard business card dimensions (3.5" x 2")
- **QR Code Export**: Standalone QR code PNG files for versatile use
- **Batch Processing**: Generate all formats with images included

### 📝 **Complete Contact Management**
- **8 Contact Fields**: Name, Job Title, Company, Email, Phone, Website, LinkedIn, GitHub
- **Real-Time Preview**: See your card update as you type
- **Validation**: Built-in field validation for proper formatting
- **Auto-Save**: Form state persists during session

### 📱 **Responsive Design**
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Easy interaction on tablets and phones
- **Progressive Layout**: Adapts from 1-column mobile to 3-column desktop
- **Cross-Browser**: Works on Chrome, Firefox, Safari, and Edge

## 🚀 Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: TailwindCSS for responsive, utility-first design
- **QR Generation**: QRious library via CDN for real QR codes
- **Image Processing**: HTML5 Canvas API for high-quality rendering
- **File Handling**: FileReader API for image uploads
- **Build Tool**: Vite for lightning-fast development
- **Icons**: Lucide React for modern, consistent iconography

## 📋 Prerequisites

- **Node.js**: Version 16.0 or higher
- **npm**: Version 7.0 or higher (comes with Node.js)
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

## ⚡ Quick Start

### 1. **Clone or Download Project**
```bash
# Option A: If you have the repository
git clone <repository-url>
cd qr-business-card-generator

# Option B: Create project folder and add files manually
mkdir qr-business-card-generator
cd qr-business-card-generator
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Start Development Server**
```bash
npm run dev
```

### 4. **Open in Browser**
Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 📁 Project Structure

```
qr-business-card-generator/
├── public/
│   └── (static assets)
├── src/
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles + TailwindCSS
├── package.json             # Dependencies and scripts
├── index.html               # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── .eslintrc.cjs           # ESLint configuration
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🎯 How to Use

### **Step 1: Choose Your Theme**
- Select from 6 professional themes in the theme selector
- See live preview of colors and gradients
- Theme applies to both preview and downloads

### **Step 2: Add Images (Optional)**
- **Profile Picture**: Click upload area, select image, see circular preview
- **Company Logo**: Click upload area, select logo, see top-right placement
- **Remove**: Click X button on any uploaded image
- **Supported Formats**: JPG, PNG, GIF (recommended max 5MB)

### **Step 3: Fill Contact Details**
- **Required Fields**: Name, Job Title, Company
- **Optional Fields**: Email, Phone, Website, LinkedIn, GitHub
- **Real-Time Preview**: Card updates as you type
- **Field Validation**: Automatic formatting hints

### **Step 4: Generate QR Code**
- QR code generates automatically with your contact info
- Contains vCard data for universal phone compatibility
- **Test Scanning**: Use your phone camera to verify

### **Step 5: Download Your Cards**
- **PNG**: High-resolution image for digital sharing
- **PDF**: Print-ready format for physical cards
- **QR Code**: Standalone QR code for separate use
- **All formats include your uploaded images**

## 💡 Pro Tips

### **For Best Image Results:**
- **Profile Photos**: Use square, well-lit professional headshots
- **Company Logos**: PNG with transparent backgrounds work best
- **File Size**: Keep under 2MB for faster processing
- **Resolution**: 400x400px minimum for profile photos

### **For Professional Cards:**
- **Complete All Fields**: More info = more professional appearance
- **Consistent Branding**: Use company colors in logo and theme selection
- **Test QR Codes**: Always scan your QR code before printing
- **High-Quality Printing**: Use 300 DPI PDF output for best print results

### **For Digital Sharing:**
- **PNG Format**: Best for websites, emails, social media
- **Consistent Sizing**: Cards maintain professional proportions
- **Social Media**: Cards are optimized for LinkedIn, Twitter headers
- **Email Signatures**: PNG format works in most email clients

## 🛠 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run preview      # Preview production build locally

# Production
npm run build        # Build optimized production files
npm run lint         # Check code quality with ESLint

# Deployment
npm run deploy       # Deploy to GitHub Pages (if configured)
```

## 🚀 Deployment Options

### **Option 1: Vercel (Recommended)**
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and sign up
3. Import your repository
4. **Automatic deployment** with every push
5. **Custom domain support** available

### **Option 2: Netlify**
1. Build your project: `npm run build`
2. Visit [netlify.com](https://netlify.com) and sign up
3. Drag & drop the `dist/` folder
4. **Instant deployment** with custom URL
5. **Form handling and serverless functions** available

### **Option 3: GitHub Pages**
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Add homepage: `"homepage": "https://yourusername.github.io/qr-business-card-generator"`
4. Run: `npm run build && npm run deploy`
5. **Free hosting** for public repositories

### **Option 4: Traditional Web Hosting**
1. Run: `npm run build`
2. Upload contents of `dist/` folder to your web server
3. **Works on any static hosting** (cPanel, FTP, etc.)

## 🔧 Customization

### **Adding New Themes**
Edit the `cardThemes` object in `src/App.jsx`:
```javascript
const cardThemes = {
  yourTheme: {
    name: 'Your Theme Name',
    background: 'linear-gradient(135deg, #color1, #color2)',
    textColor: '#ffffff',
    accentColor: '#color3',
    companyColor: '#color4'
  }
  // ... existing themes
};
```

### **Modifying Card Layout**
Edit the `CardPreview` component in `src/App.jsx`:
- Adjust spacing, sizing, and positioning
- Add new elements or sections
- Modify typography and styling

### **Adding New Contact Fields**
1. Update `contactData` state in main App component
2. Add new `FormInput` component in `BusinessCardForm`
3. Include field in vCard generation
4. Update card preview layout

### **Changing Download Settings**
Modify canvas dimensions in download functions:
```javascript
// For different business card sizes
canvas.width = 1050;  // 3.5" at 300 DPI
canvas.height = 600;  // 2" at 300 DPI
```

## 🐛 Troubleshooting

### **Common Issues:**

#### **"npm install" fails**
- **Solution**: Ensure Node.js 16+ is installed
- **Check**: Run `node --version` and `npm --version`
- **Fix**: Download latest Node.js from [nodejs.org](https://nodejs.org)

#### **"Port 5173 is already in use"**
- **Solution**: Kill existing processes or change port
- **Change Port**: Modify `vite.config.js` server.port setting
- **Kill Process**: `npx kill-port 5173`

#### **QR Code not scanning**
- **Check**: Ensure contact details are filled out
- **Verify**: QR code should load after entering contact info
- **Test**: Try scanning with multiple devices/apps

#### **Downloads not working**
- **Browser**: Ensure pop-ups are not blocked
- **Content**: Fill out contact information first
- **Permissions**: Allow file downloads in browser settings

#### **Images not uploading**
- **File Size**: Ensure images are under 5MB
- **Format**: Use JPG, PNG, or GIF formats
- **Permissions**: Allow file access in browser

#### **Layout issues on mobile**
- **Zoom**: Ensure browser zoom is at 100%
- **Viewport**: Check responsive design in dev tools
- **Cache**: Clear browser cache and reload

### **Performance Tips:**
- **Image Optimization**: Compress large images before upload
- **Browser Cache**: Hard refresh (Ctrl+F5) if changes don't appear
- **Memory**: Close other tabs when processing large images
- **Network**: Ensure stable internet for CDN resources

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### **Development Setup**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

### **Contribution Guidelines**
- **Follow existing code style** and formatting
- **Test all features** before submitting
- **Update documentation** for new features
- **Add comments** for complex functionality

## 📄 License


### **What this means:**
- ✅ **Commercial use allowed**
- ✅ **Modification allowed**  
- ✅ **Distribution allowed**
- ✅ **Private use allowed**
- ❌ **No warranty provided**

## 🆘 Support

### **Getting Help:**
- 🐛 **Bug Reports**: Open an issue on GitHub
- 💡 **Feature Requests**: Open an issue with the "enhancement" label  
- 📚 **Documentation**: Check this README and code comments
- 💬 **Community**: Join discussions in GitHub issues

### **Quick Links:**
- 📖 **Documentation**: This README
- 🐛 **Issue Tracker**: GitHub Issues
- 🔄 **Updates**: Check GitHub releases
- 📧 **Contact**: Open an issue for direct support

## 🎉 Acknowledgments

- **React Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **QRious**: For reliable QR code generation
- **Lucide**: For beautiful, consistent icons
- **Vite**: For lightning-fast development experience
- **Open Source Community**: For inspiration and contributions

## 📈 Version History

### **v4.0** (Current) - Full Feature Release
- ✅ 6 professional themes with live preview
- ✅ Profile picture and company logo uploads
- ✅ Real QR code generation with vCard format
- ✅ High-quality PNG and PDF downloads
- ✅ Responsive design for all devices
- ✅ Complete contact field management
- ✅ Smart layout with image integration

### **v3.0** - Theme and Download System
- ✅ Multiple theme support
- ✅ Working PNG/PDF downloads
- ✅ Enhanced UI/UX

### **v2.0** - QR Code Integration
- ✅ Real QR code generation
- ✅ vCard format support
- ✅ Mobile scanning compatibility

### **v1.0** - Initial Release
- ✅ Basic business card generation
- ✅ Contact form
- ✅ Live preview

---

**🚀 Ready to create professional business cards? Start with `npm run dev` and build something amazing!**
