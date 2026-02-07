import { useTranslation } from 'react-i18next';
import { ShieldCheck, Github, Heart } from 'lucide-react';
import SEO from '@/components/SEO';

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 flex flex-col items-center text-center">
      <SEO 
        title="About Us" 
        description="About PureTool - The privacy-first developer toolbox." 
      />
      
      <div className="bg-primary/10 p-4 rounded-full mb-6">
        <ShieldCheck className="h-12 w-12 text-primary" />
      </div>

      <h1 className="text-4xl font-bold mb-6">About PureTool</h1>
      
      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
        PureTool was born from a simple idea: <br/>
        <span className="text-foreground font-semibold">Developer tools should be fast, free, and private.</span>
      </p>

      <div className="prose dark:prose-invert max-w-none text-left w-full space-y-6">
        <p>
          In an era where every click is tracked and every file upload is a potential privacy risk, we wanted to build something different. 
          Most online converters and formatters require you to upload your sensitive data to their servers. We asked: "Why?"
        </p>
        
        <p>
          Modern browsers are powerful enough to handle image compression, PDF merging, and code formatting right on your device. 
          That's why we built PureTool using cutting-edge <strong>WebAssembly</strong> and client-side technologies.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 my-10 not-prose">
          <div className="p-6 bg-card border rounded-xl shadow-sm flex flex-col items-center">
            <span className="text-3xl mb-2">🔒</span>
            <h3 className="font-bold">100% Private</h3>
            <p className="text-sm text-muted-foreground">No server uploads</p>
          </div>
          <div className="p-6 bg-card border rounded-xl shadow-sm flex flex-col items-center">
            <span className="text-3xl mb-2">⚡</span>
            <h3 className="font-bold">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">Zero latency</p>
          </div>
          <div className="p-6 bg-card border rounded-xl shadow-sm flex flex-col items-center">
            <span className="text-3xl mb-2">💸</span>
            <h3 className="font-bold">Always Free</h3>
            <p className="text-sm text-muted-foreground">Open Source</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold">Open Source</h2>
        <p>
          PureTool is fully open source. We believe in transparency. You can inspect our code, verify that no data is leaving your browser, 
          and even contribute to the project on GitHub.
        </p>
        
        <div className="flex justify-center mt-8">
          <a 
            href="https://github.com/Ashjdghfjj/PureTool" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            <Github className="h-5 w-5" />
            Visit GitHub Repository
          </a>
        </div>
      </div>
      
      <div className="mt-16 pt-8 border-t w-full">
        <p className="text-muted-foreground flex items-center justify-center gap-1">
          Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by Ashjdghfjj
        </p>
      </div>
    </div>
  );
}
