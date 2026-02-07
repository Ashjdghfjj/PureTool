import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Copy, RefreshCw } from 'lucide-react';
import SEO from '@/components/SEO';

export default function TimestampConverter() {
  const { t } = useTranslation();
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [tsInput, setTsInput] = useState('');
  const [dateResult, setDateResult] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [tsResult, setTsResult] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTsToDate = () => {
    if (!tsInput) return;
    const ts = parseInt(tsInput);
    if (isNaN(ts)) {
      setDateResult('Invalid Timestamp');
      return;
    }
    // Handle seconds (10 digits) vs milliseconds (13 digits)
    const date = new Date(tsInput.length > 11 ? ts : ts * 1000);
    setDateResult(date.toLocaleString());
  };

  const handleDateToTs = () => {
    if (!dateInput) return;
    const date = new Date(dateInput);
    setTsResult(Math.floor(date.getTime() / 1000).toString());
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 flex flex-col items-center">
      <SEO 
        title={t('timestamp.title')}
        description={t('timestamp.desc')}
      />
      
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <Clock className="h-8 w-8 text-primary" />
          {t('timestamp.title')}
        </h1>
        <p className="text-muted-foreground">{t('timestamp.desc')}</p>
      </div>

      {/* Current Timestamp */}
      <div className="w-full max-w-md bg-card border rounded-xl p-6 shadow-sm mb-8 text-center">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">{t('timestamp.current')}</h2>
        <div className="text-4xl font-mono font-bold text-primary mb-4">{now}</div>
        <button 
          onClick={() => copyToClipboard(now.toString())}
          className="inline-flex items-center text-sm text-primary hover:underline"
        >
          <Copy className="h-4 w-4 mr-1" /> {t('common.copy')}
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 w-full">
        {/* Timestamp -> Date */}
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">{t('timestamp.tsToDate')}</h3>
          <div className="space-y-4">
            <div>
              <input
                type="number"
                value={tsInput}
                onChange={(e) => setTsInput(e.target.value)}
                placeholder="1707360000"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <button
              onClick={handleTsToDate}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
            >
              {t('common.convert')}
            </button>
            {dateResult && (
              <div className="mt-4 p-3 bg-muted rounded-md break-all">
                <p className="text-sm font-mono">{dateResult}</p>
              </div>
            )}
          </div>
        </div>

        {/* Date -> Timestamp */}
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">{t('timestamp.dateToTs')}</h3>
          <div className="space-y-4">
            <div>
              <input
                type="datetime-local"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <button
              onClick={handleDateToTs}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
            >
              {t('common.convert')}
            </button>
            {tsResult && (
              <div className="mt-4 p-3 bg-muted rounded-md flex justify-between items-center">
                <p className="text-sm font-mono">{tsResult}</p>
                <button onClick={() => copyToClipboard(tsResult)} className="text-primary hover:text-primary/80">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
