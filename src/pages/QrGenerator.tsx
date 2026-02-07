import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Link as LinkIcon } from 'lucide-react';
import SEO from '@/components/SEO';

export default function QrGenerator() {
  const [text, setText] = useState('https://puretool.app');
  const [size, setSize] = useState(256);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#000000');
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 space-y-8 flex flex-col items-center">
      <SEO 
        title="QR Code Generator" 
        description="Free online QR Code Generator. Create custom QR codes for URLs, text, and more. Download as PNG. Privacy-first, no server tracking." 
      />
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">QR Code Generator</h1>
        <p className="text-muted-foreground">
          Create permanent, tracking-free QR codes instantly.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 w-full">
        {/* Settings */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <LinkIcon className="w-4 h-4" /> Content (URL or Text)
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[100px] p-3 rounded-md border bg-background resize-y focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Enter text or URL here..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-sm font-medium">Background Color</label>
                <div className="flex items-center gap-2">
                    <input 
                        type="color" 
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-10 w-20 p-1 rounded border bg-background cursor-pointer"
                    />
                    <span className="text-sm font-mono text-muted-foreground">{bgColor}</span>
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Foreground Color</label>
                <div className="flex items-center gap-2">
                    <input 
                        type="color" 
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="h-10 w-20 p-1 rounded border bg-background cursor-pointer"
                    />
                    <span className="text-sm font-mono text-muted-foreground">{fgColor}</span>
                </div>
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-sm font-medium flex items-center justify-between">
                <span>Size</span>
                <span className="text-muted-foreground">{size}px</span>
             </label>
             <input
                type="range"
                min="128"
                max="1024"
                step="32"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
             />
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-xl border border-dashed">
            <div 
                ref={qrRef}
                className="p-4 bg-white rounded-lg shadow-sm"
                style={{ background: 'white' }} 
            >
                <QRCodeCanvas
                    value={text}
                    size={size}
                    bgColor={bgColor}
                    fgColor={fgColor}
                    level="H"
                    includeMargin={true}
                    style={{ width: '100%', height: 'auto', maxWidth: '300px' }}
                />
            </div>
            
            <div className="mt-8 flex gap-4">
                <button
                    onClick={handleDownload}
                    className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
