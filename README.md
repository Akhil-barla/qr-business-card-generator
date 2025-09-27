# QR Business Card Generator

A modern, responsive web application for creating digital business cards with QR codes. Users can input their contact details, preview their business card in real-time, and download both the card and QR code.

## Features

- **Real-time Preview**: Live preview of business card as you type
- **QR Code Generation**: Automatically generates QR codes in vCard format
- **Multiple Download Options**: Download business card as PNG/PDF and QR code as PNG
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Professional Templates**: Clean, modern business card designs
- **Contact Integration**: QR codes add contacts directly to phone address books

## Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: TailwindCSS for responsive, utility-first styling
- **QR Code**: qrcode.react for QR code generation
- **Downloads**: html2canvas and jspdf for image/PDF generation
- **Icons**: Lucide React for modern icons
- **Build Tool**: Vite for fast development and building

## Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd qr-business-card-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
qr-business-card-generator/
├── src/
│ ├── App.jsx             # Main React component with QR card logic
│ ├── main.jsx            # React entry point
│ └── index.css           # Global styles
├── public/               # Public assets (like favicon)
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
├── vite.config.js        # Vite config
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS config
├── .eslintrc.cjs         # ESLint config
├── .gitignore            # Files to ignore in Git
├── index.html            # App HTML template
└── node_modules/         # Installed dependencies (after npm install)

```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Or connect your GitHub repository for automatic deployments

### Manual Deployment
1. Run `npm run build`
2. Upload the contents of the `dist` folder to your web server

## Usage

1. **Fill in your details** in the form on the left side
2. **Preview your card** in real-time on the right side  
3. **Download options**:
   - Business card as PNG image
   - Business card as PDF document  
   - QR code as PNG image
4. **Share your QR code** - when scanned, it automatically adds your contact to the user's phone

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.