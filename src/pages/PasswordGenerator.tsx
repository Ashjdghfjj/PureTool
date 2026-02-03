import { useState, useEffect } from 'react';
import { Copy, RefreshCw, CheckCircle2, Sliders } from 'lucide-react';
import { cn } from '@/utils/cn';
import SEO from '@/components/SEO';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charset = '';
    if (options.uppercase) charset += uppercaseChars;
    if (options.lowercase) charset += lowercaseChars;
    if (options.numbers) charset += numberChars;
    if (options.symbols) charset += symbolChars;

    if (charset === '') {
      setPassword('');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
    calculateStrength(newPassword);
  };

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) {
        setStrength(0);
        return;
    }
    if (pass.length > 8) score += 1;
    if (pass.length > 12) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    setStrength(score);
  };

  useEffect(() => {
    generatePassword();
  }, [length, options]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrengthColor = () => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
      if (strength <= 2) return 'Weak';
      if (strength <= 3) return 'Medium';
      return 'Strong';
  }

  return (
    <div className="container max-w-3xl py-8 space-y-8">
      <SEO 
        title="Password Generator" 
        description="Generate strong, secure passwords instantly in your browser. Customizable length and characters." 
      />
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Secure Password Generator</h1>
        <p className="text-muted-foreground">
          Generate strong, random passwords to keep your accounts safe. 
          Generated locally in your browser.
        </p>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        {/* Password Display */}
        <div className="p-8 pb-4">
           <div className="relative">
            <div className="w-full min-h-[80px] p-6 pr-14 text-center text-3xl font-mono break-all bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                {password || <span className="text-muted-foreground/40 text-lg">Select options to generate</span>}
            </div>
             <button
                onClick={handleCopy}
                disabled={!password}
                className="absolute top-1/2 -translate-y-1/2 right-4 p-2 text-muted-foreground hover:text-primary transition-colors bg-background rounded-md border shadow-sm disabled:opacity-50"
                title="Copy to clipboard"
              >
                {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
           </div>
           
           {/* Strength Meter */}
           {password && (
               <div className="mt-4 flex items-center gap-3">
                   <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                       <div 
                           className={cn("h-full transition-all duration-500", getStrengthColor())} 
                           style={{ width: `${(strength / 5) * 100}%` }}
                       />
                   </div>
                   <span className="text-sm font-medium w-16 text-right">{getStrengthText()}</span>
               </div>
           )}
        </div>

        {/* Controls */}
        <div className="p-8 pt-4 space-y-8 bg-muted/10">
            {/* Length Slider */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <Sliders className="w-4 h-4" /> Password Length
                    </label>
                    <span className="text-xl font-bold text-primary">{length}</span>
                </div>
                <input
                    type="range"
                    min="6"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                />
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { key: 'uppercase', label: 'ABC', desc: 'Uppercase' },
                    { key: 'lowercase', label: 'abc', desc: 'Lowercase' },
                    { key: 'numbers', label: '123', desc: 'Numbers' },
                    { key: 'symbols', label: '#$&', desc: 'Symbols' },
                ].map((opt) => (
                    <label 
                        key={opt.key}
                        className={cn(
                            "flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all",
                            options[opt.key as keyof typeof options] 
                                ? "border-primary bg-primary/5 text-primary" 
                                : "border-muted bg-background text-muted-foreground hover:border-muted-foreground/50"
                        )}
                    >
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={options[opt.key as keyof typeof options]}
                            onChange={() => setOptions(prev => ({ ...prev, [opt.key]: !prev[opt.key as keyof typeof options] }))}
                        />
                        <span className="text-lg font-bold mb-1">{opt.label}</span>
                        <span className="text-xs">{opt.desc}</span>
                    </label>
                ))}
            </div>

            <button
                onClick={generatePassword}
                className="w-full h-12 inline-flex items-center justify-center rounded-lg bg-primary px-8 text-base font-semibold text-primary-foreground shadow transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <RefreshCw className="w-5 h-5 mr-2" />
                Generate New Password
            </button>
        </div>
      </div>
    </div>
  );
}
