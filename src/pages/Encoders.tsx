import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Code2, Copy, Trash2 } from 'lucide-react';
import SEO from '@/components/SEO';

type Mode = 'base64' | 'url';

export default function Encoders() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>('base64');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleEncode = () => {
    setError('');
    try {
      if (mode === 'base64') {
        // Handle UTF-8 strings for Base64
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(encodeURIComponent(input));
      }
    } catch (err) {
      setError(t('common.error'));
    }
  };

  const handleDecode = () => {
    setError('');
    try {
      if (mode === 'base64') {
        setOutput(decodeURIComponent(escape(atob(input))));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (err) {
      setError(t('common.error') + ': Invalid input');
    }
  };

  const copyToClipboard = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 flex flex-col items-center">
      <SEO 
        title={t('encoders.title')}
        description={t('encoders.desc')}
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <Code2 className="h-8 w-8 text-primary" />
          {t('encoders.title')}
        </h1>
        <p className="text-muted-foreground">{t('encoders.desc')}</p>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-muted rounded-lg mb-8">
        <button
          onClick={() => { setMode('base64'); clearAll(); }}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
            mode === 'base64' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Base64
        </button>
        <button
          onClick={() => { setMode('url'); clearAll(); }}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
            mode === 'url' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          URL
        </button>
      </div>

      <div className="w-full grid gap-6 md:grid-cols-2">
        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">{t('common.input')}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none font-mono"
            placeholder={mode === 'base64' ? "Text to encode/decode..." : "URL to encode/decode..."}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleEncode}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
            >
              {t('encoders.encode')}
            </button>
            <button
              onClick={handleDecode}
              className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 rounded-md font-medium transition-colors"
            >
              {t('encoders.decode')}
            </button>
            <button
              onClick={clearAll}
              className="px-3 border rounded-md hover:bg-muted"
              title={t('common.clear')}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">{t('common.output')}</label>
          <div className="relative">
            <textarea
              readOnly
              value={output}
              className="w-full h-64 rounded-xl border border-input bg-muted/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none resize-none font-mono"
              placeholder={t('common.outputPlaceholder')}
            />
            {output && (
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-2 bg-background border rounded-md hover:bg-accent transition-colors shadow-sm"
                title={t('common.copy')}
              >
                <Copy className="h-4 w-4" />
              </button>
            )}
          </div>
          {error && (
            <div className="text-sm text-destructive mt-2 font-medium">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
