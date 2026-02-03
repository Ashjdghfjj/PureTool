import { Link } from 'react-router-dom';
import { Image, Shield, Zap, Lock, FileJson, ArrowRight, QrCode } from 'lucide-react';
import SEO from '@/components/SEO';
import { MobileDonation } from '@/components/Donation';

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <SEO 
        title="Home" 
        description="Free privacy-focused developer tools. Image Compressor, JSON Formatter, and Password Generator. Run locally in your browser." 
      />
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 text-center">
        <div className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground mb-4">
          ✨ New: QR Code Generator is now available
        </div>
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Privacy-First Tools <br className="hidden sm:inline" />
          <span className="text-primary">For Developers</span>
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl leading-relaxed">
          A collection of essential web tools that run entirely in your browser. 
          <br className="hidden sm:inline" />
          No server uploads. No data collection. 100% Free.
        </p>
        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
          <Link
            to="/image-compressor"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Start Compressing
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <a
            href="#tools"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Explore All Tools
          </a>
        </div>
      </section>

      <section id="tools" className="container py-8 md:py-12 lg:py-24 bg-muted/30 rounded-3xl">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-12">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
            Available Tools
          </h2>
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Hand-picked utilities to speed up your workflow.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
           <Link to="/image-compressor" className="group relative overflow-hidden rounded-2xl border bg-background p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 inline-flex p-3 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                  <Image className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl mb-2">Image Compressor</h3>
                <p className="text-sm text-muted-foreground">
                  Compress JPG, PNG, and WebP images intelligently. Reduce file size without losing quality.
                </p>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Open Tool <ArrowRight className="ml-1 h-3 w-3" />
              </div>
            </div>
          </Link>
          
           <Link to="/qr-generator" className="group relative overflow-hidden rounded-2xl border bg-background p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 inline-flex p-3 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
                  <QrCode className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl mb-2">QR Code Generator</h3>
                <p className="text-sm text-muted-foreground">
                   Create custom QR codes instantly. Download as PNG. 100% Client-side.
                </p>
              </div>
               <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Open Tool <ArrowRight className="ml-1 h-3 w-3" />
              </div>
            </div>
          </Link>

           <Link to="/json-formatter" className="group relative overflow-hidden rounded-2xl border bg-background p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 inline-flex p-3 rounded-lg bg-orange-50 text-orange-600 group-hover:bg-orange-100 transition-colors">
                  <FileJson className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl mb-2">JSON Formatter</h3>
                <p className="text-sm text-muted-foreground">
                  Format, validate, and minify JSON data instantly. Includes syntax highlighting and error detection.
                </p>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Open Tool <ArrowRight className="ml-1 h-3 w-3" />
              </div>
            </div>
          </Link>
          
           <Link to="/password-generator" className="group relative overflow-hidden rounded-2xl border bg-background p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 inline-flex p-3 rounded-lg bg-green-50 text-green-600 group-hover:bg-green-100 transition-colors">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl mb-2">Password Generator</h3>
                <p className="text-sm text-muted-foreground">
                   Generate strong, secure passwords locally. Customize length and characters instantly.
                </p>
              </div>
               <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Open Tool <ArrowRight className="ml-1 h-3 w-3" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="flex flex-col items-center text-center p-4">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Privacy First</h3>
            <p className="text-sm text-muted-foreground">
              Your files never leave your device. All processing is done locally in your browser.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              No upload/download wait times. Instant results using WebAssembly technology.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Secure</h3>
            <p className="text-sm text-muted-foreground">
              No cookies, no tracking, no hidden scripts. Just pure utility tools.
            </p>
          </div>
        </div>
      </section>
      
      <div className="container pb-12">
        <MobileDonation />
      </div>
    </div>
  );
}