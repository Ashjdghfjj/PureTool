import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Palette, Copy } from 'lucide-react';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import SEO from '@/components/SEO';

extend([namesPlugin]);

export default function ColorConverter() {
  const { t } = useTranslation();
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState('');
  const [hsl, setHsl] = useState('');
  const [previewStyle, setPreviewStyle] = useState({});

  useEffect(() => {
    updateColors(hex);
  }, []);

  const updateColors = (color: string) => {
    const c = colord(color);
    if (c.isValid()) {
      setHex(c.toHex());
      setRgb(c.toRgbString());
      setHsl(c.toHslString());
      setPreviewStyle({ backgroundColor: c.toHex() });
    }
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHex(val);
    if (colord(val).isValid()) {
      updateColors(val);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 flex flex-col items-center">
      <SEO 
        title={t('color.title')}
        description={t('color.desc')}
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <Palette className="h-8 w-8 text-primary" />
          {t('color.title')}
        </h1>
        <p className="text-muted-foreground">{t('color.desc')}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 w-full max-w-2xl">
        {/* Preview */}
        <div className="flex flex-col gap-4">
          <div 
            className="w-full aspect-square rounded-2xl shadow-lg border transition-all duration-300"
            style={previewStyle}
          />
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-6 justify-center">
          {/* HEX */}
          <div className="space-y-2">
            <label className="text-sm font-medium">HEX</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={hex}
                onChange={handleHexChange}
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <button 
                onClick={() => copyToClipboard(hex)}
                className="px-3 border rounded-md hover:bg-muted"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* RGB */}
          <div className="space-y-2">
            <label className="text-sm font-medium">RGB</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={rgb}
                readOnly
                className="flex-1 rounded-md border border-input bg-muted px-3 py-2 text-sm"
              />
              <button 
                onClick={() => copyToClipboard(rgb)}
                className="px-3 border rounded-md hover:bg-muted"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* HSL */}
          <div className="space-y-2">
            <label className="text-sm font-medium">HSL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={hsl}
                readOnly
                className="flex-1 rounded-md border border-input bg-muted px-3 py-2 text-sm"
              />
              <button 
                onClick={() => copyToClipboard(hsl)}
                className="px-3 border rounded-md hover:bg-muted"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
