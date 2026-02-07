import { Link } from 'react-router-dom';
import { Image, Shield, Zap, Lock, FileJson, ArrowRight, QrCode, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import { MobileDonation } from '@/components/Donation';

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-10">
      <SEO 
        title="Home" 
        description="Free privacy-focused developer tools. Image Compressor, JSON Formatter, and Password Generator. Run locally in your browser." 
      />
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 text-center">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          {t('home.title')}
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl leading-relaxed">
          {t('home.subtitle')}
        </p>
      </section>

      <section id="tools" className="container py-8 md:py-12 lg:py-24 bg-muted/30 rounded-3xl">
        <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
           <Link to="/image-compressor" className="group relative overflow-hidden rounded-2xl border bg-background p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 inline-flex p-3 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                  <Image className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl mb-2">{t('home.tools.imageCompressor.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('home.tools.imageCompressor.desc')}
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
                <h3 className="font-bold text-xl mb-2">{t('home.tools.qrGenerator.title')}</h3>
                <p className="text-sm text-muted-foreground">
                   {t('home.tools.qrGenerator.desc')}
                </p>
              </div>
               <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Open Tool <ArrowRight className="ml-1 h-3 w-3" />
              </div>
            </div>
          </Link>

           <Link to="/pdf-tools" className="group relative overflow-hidden rounded-2xl border bg-background p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 inline-flex p-3 rounded-lg bg-red-50 text-red-600 group-hover:bg-red-100 transition-colors">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl mb-2">{t('home.tools.pdfTools.title')}</h3>
                <p className="text-sm text-muted-foreground">
                   {t('home.tools.pdfTools.desc')}
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
                <h3 className="font-bold text-xl mb-2">{t('home.tools.jsonFormatter.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('home.tools.jsonFormatter.desc')}
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
                <h3 className="font-bold text-xl mb-2">{t('home.tools.passwordGenerator.title')}</h3>
                <p className="text-sm text-muted-foreground">
                   {t('home.tools.passwordGenerator.desc')}
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