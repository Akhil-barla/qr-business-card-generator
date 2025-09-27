import React, { useState, useRef, useEffect } from 'react';
import { Download, QrCode, User, Mail, Phone, Globe, Linkedin, Github, Building, Briefcase } from 'lucide-react';

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

// Simple QR Code placeholder while we load the real one
const QRPlaceholder = ({ value }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    // Try to load and use QRious from CDN
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
        console.log('QR library not loaded, showing placeholder');
      }
    };
    
    if (value) {
      loadQR();
    }
  }, [value]);
  
  return <canvas ref={canvasRef} className="border border-gray-300 rounded" />;
};

// Reusable Form Input Component
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
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    />
  </div>
);

// Business Card Preview Component
const CardPreview = React.forwardRef(({ contactData }, ref) => (
  <div ref={ref} className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 rounded-xl shadow-2xl text-white max-w-md mx-auto">
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-1">{contactData.name || 'Your Name'}</h2>
      <p className="text-blue-200 text-lg">{contactData.jobTitle || 'Job Title'}</p>
    </div>
    
    <div className="mb-6">
      <p className="text-blue-100 font-medium">{contactData.company || 'Company Name'}</p>
    </div>
    
    <div className="space-y-2 text-sm">
      {contactData.email && (
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-2" />
          <span>{contactData.email}</span>
        </div>
      )}
      {contactData.phone && (
        <div className="flex items-center">
          <Phone className="w-4 h-4 mr-2" />
          <span>{contactData.phone}</span>
        </div>
      )}
      {contactData.website && (
        <div className="flex items-center">
          <Globe className="w-4 h-4 mr-2" />
          <span>{contactData.website}</span>
        </div>
      )}
    </div>
    
    <div className="mt-6 pt-4 border-t border-blue-300">
      <p className="text-xs text-blue-200">Scan QR code to add contact</p>
    </div>
  </div>
));

// QR Code Generator Component
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

// Download Buttons Component
const DownloadButtons = ({ cardRef, contactData }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadCardAsPNG = async () => {
    if (!cardRef.current) return;
    
    setIsDownloading(true);
    try {
      // Create a canvas to draw the business card
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size (business card dimensions)
      canvas.width = 800;
      canvas.height = 500;
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 800, 500);
      gradient.addColorStop(0, '#2563eb'); // blue-600
      gradient.addColorStop(1, '#7c3aed'); // purple-700
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 500);
      
      // Add rounded corners effect
      ctx.save();
      ctx.globalCompositeOperation = 'destination-in';
      ctx.beginPath();
      ctx.roundRect(0, 0, 800, 500, 20);
      ctx.fill();
      ctx.restore();
      
      // Set text properties
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      
      // Draw name
      ctx.font = 'bold 48px Arial, sans-serif';
      ctx.fillText(contactData.name || 'Your Name', 60, 100);
      
      // Draw job title
      ctx.font = '32px Arial, sans-serif';
      ctx.fillStyle = '#c7d2fe'; // blue-200
      ctx.fillText(contactData.jobTitle || 'Job Title', 60, 150);
      
      // Draw company
      ctx.font = '28px Arial, sans-serif';
      ctx.fillStyle = '#ddd6fe'; // purple-200
      ctx.fillText(contactData.company || 'Company Name', 60, 200);
      
      // Draw contact info
      ctx.font = '24px Arial, sans-serif';
      ctx.fillStyle = 'white';
      let yPos = 280;
      
      if (contactData.email) {
        ctx.fillText(`📧 ${contactData.email}`, 60, yPos);
        yPos += 35;
      }
      if (contactData.phone) {
        ctx.fillText(`📞 ${contactData.phone}`, 60, yPos);
        yPos += 35;
      }
      if (contactData.website) {
        ctx.fillText(`🌐 ${contactData.website}`, 60, yPos);
        yPos += 35;
      }
      
      // Add bottom text
      ctx.font = '18px Arial, sans-serif';
      ctx.fillStyle = '#c7d2fe';
      ctx.fillText('Scan QR code to add contact', 60, 450);
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `business-card-${(contactData.name || 'card').replace(/\s+/g, '-').toLowerCase()}.png`;
        link.click();
        URL.revokeObjectURL(url);
      }, 'image/png');
      
    } catch (error) {
      console.error('Error generating PNG:', error);
      alert('Error generating PNG. Please try again.');
    }
    setIsDownloading(false);
  };

  const downloadCardAsPDF = async () => {
    setIsDownloading(true);
    try {
      // First create the PNG
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = 800;
      canvas.height = 500;
      
      // Create the same design as PNG
      const gradient = ctx.createLinearGradient(0, 0, 800, 500);
      gradient.addColorStop(0, '#2563eb');
      gradient.addColorStop(1, '#7c3aed');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 500);
      
      ctx.fillStyle = 'white';
      ctx.font = 'bold 48px Arial, sans-serif';
      ctx.fillText(contactData.name || 'Your Name', 60, 100);
      
      ctx.font = '32px Arial, sans-serif';
      ctx.fillStyle = '#c7d2fe';
      ctx.fillText(contactData.jobTitle || 'Job Title', 60, 150);
      
      ctx.font = '28px Arial, sans-serif';
      ctx.fillStyle = '#ddd6fe';
      ctx.fillText(contactData.company || 'Company Name', 60, 200);
      
      ctx.font = '24px Arial, sans-serif';
      ctx.fillStyle = 'white';
      let yPos = 280;
      
      if (contactData.email) {
        ctx.fillText(`📧 ${contactData.email}`, 60, yPos);
        yPos += 35;
      }
      if (contactData.phone) {
        ctx.fillText(`📞 ${contactData.phone}`, 60, yPos);
        yPos += 35;
      }
      if (contactData.website) {
        ctx.fillText(`🌐 ${contactData.website}`, 60, yPos);
      }
      
      ctx.font = '18px Arial, sans-serif';
      ctx.fillStyle = '#c7d2fe';
      ctx.fillText('Scan QR code to add contact', 60, 450);
      
      // Convert canvas to image and create PDF using print
      const imgDataUrl = canvas.toDataURL('image/png');
      
      // Create a new window for PDF generation
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Business Card - ${contactData.name || 'Card'}</title>
            <style>
              body { 
                margin: 0; 
                padding: 20px; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                min-height: 100vh;
                font-family: Arial, sans-serif;
              }
              .card { 
                width: 3.5in; 
                height: 2in; 
                border: 1px solid #ccc;
              }
              img { 
                width: 100%; 
                height: 100%; 
                object-fit: cover;
              }
              @media print { 
                body { margin: 0; padding: 0; }
                .card { border: none; }
              }
            </style>
          </head>
          <body>
            <div class="card">
              <img src="${imgDataUrl}" alt="Business Card" />
            </div>
            <script>
              window.onload = () => {
                setTimeout(() => {
                  window.print();
                  setTimeout(() => window.close(), 1000);
                }, 500);
              };
            </script>
          </body>
        </html>
      `);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
    setIsDownloading(false);
  };

  const downloadQRCode = () => {
    try {
      // Find the QR code canvas
      const qrCanvas = document.querySelector('canvas');
      if (qrCanvas) {
        // Create download link
        qrCanvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `qr-code-${(contactData.name || 'contact').replace(/\s+/g, '-').toLowerCase()}.png`;
          link.click();
          URL.revokeObjectURL(url);
        }, 'image/png');
      } else {
        alert('QR code not found. Please wait for it to load and try again.');
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
      alert('Error downloading QR code. Please try again.');
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={downloadCardAsPNG}
        disabled={isDownloading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-200"
      >
        <Download className="w-4 h-4 mr-2" />
        {isDownloading ? 'Generating...' : 'Download Card (PNG)'}
      </button>
      
      <button
        onClick={downloadCardAsPDF}
        disabled={isDownloading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-200"
      >
        <Download className="w-4 h-4 mr-2" />
        {isDownloading ? 'Generating...' : 'Download Card (PDF)'}
      </button>
      
      <button
        onClick={downloadQRCode}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-200"
      >
        <QrCode className="w-4 h-4 mr-2" />
        Download QR Code
      </button>
    </div>
  );
};

// Main Business Card Form Component
const BusinessCardForm = ({ contactData, setContactData }) => {
  const handleInputChange = (field, value) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Details</h2>
      
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

// Main App Component
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

  const cardRef = useRef(null);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            QR Business Card Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create professional digital business cards with QR codes for easy sharing and contact management
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <BusinessCardForm 
              contactData={contactData} 
              setContactData={setContactData} 
            />
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Card Preview</h3>
              <CardPreview ref={cardRef} contactData={contactData} />
            </div>
          </div>

          {/* QR Code and Download Section */}
          <div className="lg:col-span-1 space-y-6">
            <QRCodeGenerator contactData={contactData} />
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Downloads</h3>
              <DownloadButtons cardRef={cardRef} contactData={contactData} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p>&copy; 2024 QR Business Card Generator. Create professional digital cards with ease.</p>
        </div>
      </div>
    </div>
  );
};

export default App;