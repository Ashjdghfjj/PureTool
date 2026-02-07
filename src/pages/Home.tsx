import { Link } from 'react-router-dom';
import { Image, Shield, Zap, Lock, FileJson, ArrowRight, QrCode, FileText, Clock, Code2, Palette, GitCompare, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import SEO from '@/components/SEO';
import { MobileDonation } from '@/components/Donation';

export default function Home() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const tools = [
    {
      id: 'imageCompressor',
      path: '/image-compressor',
      icon: Image,
      color: 'blue',
      title: t('home.tools.imageCompressor.title'),
      desc: t('home.tools.imageCompressor.desc')
    },
    {
      id: 'qrGenerator',
      path: '/qr-generator',
      icon: QrCode,
      color: 'purple',
      title: t('home.tools.qrGenerator.title'),
      desc: t('home.tools.qrGenerator.desc')
    },
    {
      id: 'pdfTools',
      path: '/pdf-tools',
      icon: FileText,
      color: 'red',
      title: t('home.tools.pdfTools.title'),
      desc: t('home.tools.pdfTools.desc')
    },
    {
      id: 'jsonFormatter',
      path: '/json-formatter',
      icon: FileJson,
      color: 'orange',
      title: t('home.tools.jsonFormatter.title'),
      desc: t('home.tools.jsonFormatter.desc')
    },
    {
      id: 'passwordGenerator',
      path: '/password-generator',
      icon: Lock,
      color: 'green',
      title: t('home.tools.passwordGenerator.title'),
      desc: t('home.tools.passwordGenerator.desc')
    },
    {
      id: 'timestamp',
      path: '/timestamp',
      icon: Clock,
      color: 'indigo',
      title: t('home.tools.timestamp.title'),
      desc: t('home.tools.timestamp.desc')
    },
    {
      id: 'encoders',
      path: '/encoders',
      icon: Code2,
      color: 'pink',
      title: t('home.tools.encoders.title'),
      desc: t('home.tools.encoders.desc')
    },
    {
      id: 'color',
      path: '/color',
      icon: Palette,
      color: 'cyan',
      title: t('home.tools.color.title'),
      desc: t('home.tools.color.desc')
    },
    {
      id: 'diff',
      path: '/diff',
      icon: GitCompare,
      color: 'slate',
      title: t('home.tools.diff.title'),
      desc: t('home.tools.diff.desc')
    }
  ];

  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100',
      purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-100',
      red: 'bg-red-50 text-red-600 group-hover:bg-red-100',
      orange: 'bg-orange-50 text-orange-600 group-hover:bg-orange-100',
      green: 'bg-green-50 text-green-600 group-hover:bg-green-100',
      indigo: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100',
      pink: 'bg-pink-50 text-pink-600 group-hover:bg-pink-100',
      cyan: 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100',
      slate: 'bg-slate-50 text-slate-600 group-hover:bg-slate-100'
    };
    return colors[color] || colors.blue;
  };

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

        {/* Search Bar */}
        <div className="w-full max-w-lg relative mt-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-4 border border-input rounded-full leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-lg shadow-sm"
            placeholder={t('home.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      <section id="tools" className="container py-8 md:py-12 lg:py-24 bg-muted/30 rounded-3xl min-h-[400px]">
        {filteredTools.length > 0 ? (
          <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {filteredTools.map((tool) => (
              <Link 
                key={tool.id} 
                to={tool.path} 
                className="group relative overflow-hidden rounded-2xl border bg-background p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className={`mb-4 inline-flex p-3 rounded-lg transition-colors ${getColorClasses(tool.color)}`}>
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Tool <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-xl">{t('home.noResults', { query: searchQuery })}</p>
          </div>
        )}
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