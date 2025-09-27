import React, { useState, useRef, useEffect } from 'react';
import { Download, QrCode, User, Mail, Phone, Globe, Linkedin, Github, Building, Briefcase, Palette, Upload, X } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Card themes configuration
const cardThemes = {
  gradient: {
    name: 'Blue Gradient',
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    textColor: '#ffffff',
    accentColor: '#c7d2fe',
    companyColor: '#ddd6fe'
  },
  dark: {
    name: 'Dark Professional',
    background: 'linear-gradient(135deg, #1f2937, #374151)',
    textColor: '#ffffff',
    accentColor: '#9ca3af',
    companyColor: '#d1d5db'
  },
  green: {
    name: 'Green Nature',
    background: 'linear-gradient(135deg, #059669, #10b981)',
    textColor: '#ffffff',
    accentColor: '#a7f3d0',
    companyColor: '#d1fae5'
  },
  purple: {
    name: 'Purple Creative',
    background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    textColor: '#ffffff',
    accentColor: '#ddd6fe',
    companyColor: '#e9d5ff'
  },
  orange: {
    name: 'Orange Energy',
    background: 'linear-gradient(135deg, #ea580c, #f97316)',
    textColor: '#ffffff',
    accentColor: '#fed7aa',
    companyColor: '#ffedd5'
  },
  minimal: {
    name: 'Minimal White',
    background: '#ffffff',
    textColor: '#1f2937',
    accentColor: '#6b7280',
    companyColor: '#9ca3af'
  }
};

// Utility function to generate vCard format
const generateVCard = (contactData) => {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${contactData.name || ''}`,
    `ORG:${contactData.company || ''}`,
    `TITLE:${contactData.jobTitle || ''}`,
    `EMAIL:${contactData.email || ''}`,
    `TEL:${contactData.phone || ''}`,
    `URL:${contactData.website || ''}`,
    'END:VCARD'
  ].join('\n');

  return vcard;
};

// QR Code Component
const QRPlaceholder = ({ value }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadQR = async () => {
      try {
        if (!window.QRious) {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js';
          document.head.appendChild(script);

          script.onload = () => {
            if (canvasRef.current && window.QRious) {
              new window.QRious({
                element: canvasRef.current,
                value: value,
                size: 200,
                level: 'M'
              });
            }
          };
        } else {
          if (canvasRef.current) {
            new window.QRious({
              element: canvasRef.current,
              value: value,
              size: 200,
              level: 'M'
            });
          }
        }
      } catch (error) {
        console.log('QR library not loaded');
      }
    };

    if (value) {
      loadQR();
    }
  }, [value]);

  return <canvas ref={canvasRef} className="border border-gray-300 rounded" />;
};

// Image Upload Component
const ImageUpload = ({ label, image, onImageChange, onImageRemove, icon: Icon }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <Icon className="inline w-4 h-4 mr-2" />
        {label}
      </label>

      {!image ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
        >
          <div className="text-center">
            <Upload className="w-6 h-6 mx-auto text-gray-400 mb-1" />
            <p className="text-sm text-gray-500">Click to upload</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={image}
            alt={label}
            className="w-full h-24 object-cover rounded-lg border border-gray-300"
          />
          <button
            onClick={onImageRemove}
            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

// Theme Selector
const ThemeSelector = ({ selectedTheme, onThemeChange }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-3">
      <Palette className="inline w-4 h-4 mr-2" />
      Card Theme
    </label>
    <div className="grid grid-cols-2 gap-2">
      {Object.entries(cardThemes).map(([key, theme]) => (
        <button
          key={key}
          onClick={() => onThemeChange(key)}
          className={`p-3 rounded-lg border text-sm font-medium transition-all ${selectedTheme === key
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
        >
          <div
            className="w-full h-8 rounded mb-2"
            style={{ background: theme.background }}
          ></div>
          {theme.name}
        </button>
      ))}
    </div>
  </div>
);

// Form Input Component
const FormInput = ({ label, type, value, onChange, placeholder, icon: Icon }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      <Icon className="inline w-4 h-4 mr-2" />
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

// Business Card Preview
const CardPreview = React.forwardRef(({ contactData, theme, profileImage, companyLogo }, ref) => {
  const themeConfig = cardThemes[theme];

  return (
    <div
      ref={ref}
      className="p-8 rounded-xl shadow-2xl max-w-md mx-auto relative"
      style={{
        background: themeConfig.background,
        color: themeConfig.textColor,
        border: theme === 'minimal' ? '2px solid #e5e7eb' : 'none'
      }}
    >
      {companyLogo && (
        <div className="absolute top-4 right-4">
          <img
            src={companyLogo}
            alt="Logo"
            className="w-12 h-12 object-contain rounded"
          />
        </div>
      )}

      <div className="flex items-start gap-4 mb-6">
        {profileImage && (
          <div className="flex-shrink-0">
            <img
              src={profileImage}
              alt="Profile"
              className="w-20 h-20 object-cover rounded-full border-2 border-white shadow-lg"
            />
          </div>
        )}

        <div className={profileImage ? 'flex-1' : 'w-full'}>
          <h2 className="text-2xl font-bold mb-1" style={{ color: themeConfig.textColor }}>
            {contactData.name || 'Your Name'}
          </h2>
          <p className="text-lg" style={{ color: themeConfig.accentColor }}>
            {contactData.jobTitle || 'Job Title'}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <p className="font-medium" style={{ color: themeConfig.companyColor }}>
          {contactData.company || 'Company Name'}
        </p>
      </div>

      <div className="space-y-2 text-sm">
        {contactData.email && (
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{contactData.email}</span>
          </div>
        )}
        {contactData.phone && (
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{contactData.phone}</span>
          </div>
        )}
        {contactData.website && (
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{contactData.website}</span>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t" style={{ borderColor: themeConfig.accentColor }}>
        <p className="text-xs" style={{ color: themeConfig.accentColor }}>
          Scan QR code to add contact
        </p>
      </div>
    </div>
  );
});

// QR Code Generator
const QRCodeGenerator = ({ contactData }) => {
  const vCardData = generateVCard(contactData);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-center">QR Code</h3>
      <div className="flex justify-center">
        <QRPlaceholder value={vCardData} />
      </div>
      <p className="text-xs text-gray-600 text-center mt-3">
        Scan to add contact to phone
      </p>
    </div>
  );
};

// Download Buttons



// ... (keep your other components like cardThemes, generateVCard, etc.)

// Download Buttons (Updated)
// Download Buttons (Corrected and Complete)
const DownloadButtons = ({ contactData, theme, profileImage, companyLogo, cardRef }) => {
  const [isPngDownloading, setIsPngDownloading] = useState(false);
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);
  const themeConfig = cardThemes[theme];

  // Helper functions for drawing on the canvas (restored from your original code)
  const createBackground = (ctx, width, height, background) => {
    if (background.startsWith('linear-gradient')) {
      const colors = background.match(/#[0-9a-fA-F]{6}/g);
      if (colors && colors.length >= 2) {
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(1, colors[1]);
        return gradient;
      }
    }
    return background;
  };

  const loadImage = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  };

  const drawRoundedImage = (ctx, img, x, y, width, height, radius = 0) => {
    ctx.save();
    ctx.beginPath();
    if (radius > 0) {
      ctx.arc(x + width / 2, y + height / 2, width / 2, 0, Math.PI * 2);
    } else {
        // A simple rectangle fallback if roundRect is not supported
        ctx.rect(x, y, width, height);
    }
    ctx.clip();
    ctx.drawImage(img, x, y, width, height);
    ctx.restore();
  };

  // --- RESTORED LOGIC FOR PNG DOWNLOAD ---
  const downloadCardAsPNG = async () => {
    setIsPngDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = 1050;
      canvas.height = 600;
      
      const backgroundStyle = createBackground(ctx, canvas.width, canvas.height, themeConfig.background);
      ctx.fillStyle = backgroundStyle;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      if (theme === 'minimal') {
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
      }

      const profileImg = profileImage ? await loadImage(profileImage) : null;
      const logoImg = companyLogo ? await loadImage(companyLogo) : null;

      if (logoImg) {
        const logoSize = 80;
        drawRoundedImage(ctx, logoImg, canvas.width - logoSize - 40, 40, logoSize, logoSize, 8);
      }

      let textStartX = 80;
      const profileSize = 120;
      
      if (profileImg) {
        drawRoundedImage(ctx, profileImg, 80, 80, profileSize, profileSize, profileSize / 2);
        textStartX = 80 + profileSize + 30;
      }
      
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      
      ctx.font = 'bold 64px Arial';
      ctx.fillStyle = themeConfig.textColor;
      ctx.fillText(contactData.name || 'Your Name', textStartX, 80);
      
      ctx.font = '42px Arial';
      ctx.fillStyle = themeConfig.accentColor;
      ctx.fillText(contactData.jobTitle || 'Job Title', textStartX, 160);
      
      ctx.font = '36px Arial';
      ctx.fillStyle = themeConfig.companyColor;
      ctx.fillText(contactData.company || 'Company Name', textStartX, 220);
      
      const contactStartY = profileImg ? Math.max(280, 80 + profileSize + 20) : 320;
      ctx.font = '28px Arial';
      ctx.fillStyle = themeConfig.textColor;
      let yPos = contactStartY;
      
      if (contactData.email) {
        ctx.fillText(`📧 ${contactData.email}`, 80, yPos);
        yPos += 45;
      }
      if (contactData.phone) {
        ctx.fillText(`📞 ${contactData.phone}`, 80, yPos);
        yPos += 45;
      }
      if (contactData.website) {
        ctx.fillText(`🌐 ${contactData.website}`, 80, yPos);
      }
      
      ctx.strokeStyle = themeConfig.accentColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(80, 520);
      ctx.lineTo(970, 520);
      ctx.stroke();
      
      ctx.font = '24px Arial';
      ctx.fillStyle = themeConfig.accentColor;
      ctx.fillText('Scan QR code to add contact', 80, 540);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `business-card-${(contactData.name || 'card').replace(/\s+/g, '-')}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      });
      
    } catch (error) {
      console.error('PNG Error:', error);
      alert('Error generating PNG');
    }
    setIsPngDownloading(false);
  };

  // Your working PDF download function
  const downloadCardAsPDF = async () => {
    const cardElement = cardRef.current;
    if (!cardElement) {
      alert('Could not find the card element.');
      return;
    }
    setIsPdfDownloading(true);
    try {
      const canvas = await html2canvas(cardElement, {
        scale: 2,
        useCORS: true,
      });
      const imageData = canvas.toDataURL('image/png');
      const cardWidthMM = 88.9;
      const cardHeightMM = 50.8;
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [cardWidthMM, cardHeightMM],
      });
      pdf.addImage(imageData, 'PNG', 0, 0, cardWidthMM, cardHeightMM);
      pdf.save(`business-card-${(contactData.name || 'card').replace(/\s+/g, '-')}.pdf`);
    } catch (error) {
      console.error('PDF Error:', error);
      alert('An error occurred while generating the PDF.');
    }
    setIsPdfDownloading(false);
  };

  // --- RESTORED LOGIC FOR QR CODE DOWNLOAD ---
  const downloadQRCode = () => {
    try {
      const qrCanvas = document.querySelector('.flex.justify-center canvas');
      if (qrCanvas) {
        qrCanvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `qr-code-${(contactData.name || 'contact').replace(/\s+/g, '-')}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }
        });
      }
    } catch (error) {
      alert('Error downloading QR code');
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={downloadCardAsPNG}
        disabled={isPngDownloading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg flex items-center justify-center"
      >
        <Download className="w-4 h-4 mr-2" />
        {isPngDownloading ? 'Generating...' : 'Download PNG'}
      </button>

      <button
        onClick={downloadCardAsPDF}
        disabled={isPdfDownloading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-2 px-4 rounded-lg flex items-center justify-center"
      >
        <Download className="w-4 h-4 mr-2" />
        {isPdfDownloading ? 'Generating...' : 'Download PDF'}
      </button>

      <button
        onClick={downloadQRCode}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
      >
        <QrCode className="w-4 h-4 mr-2" />
        Download QR Code
      </button>
    </div>
  );
};

// Main Form Component
const BusinessCardForm = ({ contactData, setContactData, selectedTheme, onThemeChange, profileImage, setProfileImage, companyLogo, setCompanyLogo }) => {
  const handleInputChange = (field, value) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Details</h2>

      <ThemeSelector selectedTheme={selectedTheme} onThemeChange={onThemeChange} />

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Images</h3>
        <div className="space-y-4">
          <ImageUpload
            label="Profile Picture"
            image={profileImage}
            onImageChange={setProfileImage}
            onImageRemove={() => setProfileImage(null)}
            icon={User}
          />
          <ImageUpload
            label="Company Logo"
            image={companyLogo}
            onImageChange={setCompanyLogo}
            onImageRemove={() => setCompanyLogo(null)}
            icon={Building}
          />
        </div>
      </div>

      <FormInput
        label="Full Name"
        type="text"
        value={contactData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        placeholder="John Doe"
        icon={User}
      />

      <FormInput
        label="Job Title"
        type="text"
        value={contactData.jobTitle}
        onChange={(e) => handleInputChange('jobTitle', e.target.value)}
        placeholder="Software Developer"
        icon={Briefcase}
      />

      <FormInput
        label="Company"
        type="text"
        value={contactData.company}
        onChange={(e) => handleInputChange('company', e.target.value)}
        placeholder="Tech Corp"
        icon={Building}
      />

      <FormInput
        label="Email"
        type="email"
        value={contactData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        placeholder="john@example.com"
        icon={Mail}
      />

      <FormInput
        label="Phone"
        type="tel"
        value={contactData.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
        placeholder="+1 (555) 123-4567"
        icon={Phone}
      />

      <FormInput
        label="Website"
        type="url"
        value={contactData.website}
        onChange={(e) => handleInputChange('website', e.target.value)}
        placeholder="https://johndoe.com"
        icon={Globe}
      />

      <FormInput
        label="LinkedIn"
        type="url"
        value={contactData.linkedin}
        onChange={(e) => handleInputChange('linkedin', e.target.value)}
        placeholder="https://linkedin.com/in/johndoe"
        icon={Linkedin}
      />

      <FormInput
        label="GitHub"
        type="url"
        value={contactData.github}
        onChange={(e) => handleInputChange('github', e.target.value)}
        placeholder="https://github.com/johndoe"
        icon={Github}
      />
    </div>
  );
};

// Main App
const App = () => {
  const [contactData, setContactData] = useState({
    name: '',
    jobTitle: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    linkedin: '',
    github: ''
  });

  const [selectedTheme, setSelectedTheme] = useState('gradient');
  const [profileImage, setProfileImage] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const cardRef = useRef(null);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            QR Business Card Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create professional digital business cards with QR codes, themes, and images
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="w-full">
            <BusinessCardForm
              contactData={contactData}
              setContactData={setContactData}
              selectedTheme={selectedTheme}
              onThemeChange={setSelectedTheme}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              companyLogo={companyLogo}
              setCompanyLogo={setCompanyLogo}
            />
          </div>

          <div className="w-full space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Card Preview</h3>
              <CardPreview
                ref={cardRef}
                contactData={contactData}
                theme={selectedTheme}
                profileImage={profileImage}
                companyLogo={companyLogo}
              />
            </div>
          </div>

          <div className="w-full space-y-6">
            <QRCodeGenerator contactData={contactData} />
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Downloads</h3>
              

              <DownloadButtons
                cardRef={cardRef} // <-- ADD THIS LINE
                contactData={contactData}
                theme={selectedTheme}
                profileImage={profileImage}
                companyLogo={companyLogo}
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-gray-600">
          <p>&copy; 2024 QR Business Card Generator v4.0</p>
        </div>
      </div>
    </div>
  );
};

export default App;