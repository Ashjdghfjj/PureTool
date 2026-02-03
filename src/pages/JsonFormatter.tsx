import { useState } from 'react';
import { Copy, FileJson, Trash2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import SEO from '@/components/SEO';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setOutput('');
    }
  };

  const minifyJson = () => {
     if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setOutput('');
    }
  }

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div className="container max-w-5xl py-8 space-y-8">
      <SEO 
        title="JSON Formatter" 
        description="Online JSON Formatter and Validator. Prettify, minify, and validate JSON data locally in your browser." 
      />
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">JSON Formatter & Validator</h1>
          <p className="text-muted-foreground mt-2">
            Format, validate, and minify JSON data. All processing happens in your browser.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 h-[600px]">
        {/* Input Section */}
        <div className="flex flex-col gap-2 h-full">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Input JSON
          </label>
          <div className="relative flex-1">
            <textarea
              className="absolute inset-0 w-full h-full p-4 font-mono text-sm resize-none border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
              placeholder='Paste your JSON here... e.g. {"name": "PureTool", "private": true}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
             <button
              onClick={handleClear}
              className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-destructive transition-colors"
              title="Clear input"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={formatJson}
              className="flex-1 inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
            >
              <FileJson className="w-4 h-4 mr-2" />
              Format (Prettify)
            </button>
            <button
              onClick={minifyJson}
              className="flex-1 inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
            >
              Minify
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-2 h-full">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Output
            </label>
            {error && (
              <span className="text-sm font-medium text-destructive">Invalid JSON</span>
            )}
          </div>
          
          <div className={cn(
            "relative flex-1 border rounded-md bg-muted/30 overflow-hidden",
            error && "border-destructive/50 bg-destructive/5"
          )}>
            {error ? (
              <div className="p-4 text-sm text-destructive font-mono break-all whitespace-pre-wrap">
                Error: {error}
              </div>
            ) : (
              <textarea
                readOnly
                className="absolute inset-0 w-full h-full p-4 font-mono text-sm resize-none bg-transparent focus:outline-none text-foreground"
                value={output}
                placeholder="Result will appear here..."
              />
            )}
            
            {!error && output && (
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-foreground transition-colors bg-background/50 backdrop-blur-sm rounded-md border shadow-sm"
                title="Copy to clipboard"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
