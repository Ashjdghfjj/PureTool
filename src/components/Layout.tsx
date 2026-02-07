import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShieldCheck, Github, Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/utils/cn';
import { useTheme } from '@/components/ThemeProvider';
import Donation from '@/components/Donation';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { setTheme, theme } = useTheme();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en');
  };

  const navItems = [
    { name: t('nav.imageCompressor'), path: '/image-compressor' },
    { name: t('nav.jsonFormatter'), path: '/json-formatter' },
    { name: t('nav.passwordGenerator'), path: '/password-generator' },
    { name: t('nav.qrGenerator'), path: '/qr-generator' },
    { name: t('nav.pdfTools'), path: '/pdf-tools' },
    { name: t('nav.timestamp'), path: '/timestamp' },
    { name: t('nav.encoders'), path: '/encoders' },
    { name: t('nav.color'), path: '/color' },
    { name: t('nav.diff'), path: '/diff' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased selection:bg-primary/10 selection:text-primary transition-colors duration-300">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-85">
              <div className="bg-primary/10 p-1.5 rounded-lg">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <span className="hidden font-bold sm:inline-block text-xl tracking-tight">PureTool</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                    location.pathname === item.path && "text-foreground font-semibold"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                title="Switch Language"
              >
                <Languages className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle language</span>
              </button>
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </button>
             <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              
              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2 text-muted-foreground hover:text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t p-4 bg-background">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === item.path ? "text-foreground" : "text-muted-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
      <main className="flex-1 container py-8 md:py-12">
        <Outlet />
      </main>
      
      <Donation />


      <footer className="py-8 md:py-12 border-t bg-muted/20 mt-auto">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="font-bold text-lg">PureTool</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Built with privacy in mind. <br className="md:hidden" />No data leaves your browser.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              © {new Date().getFullYear()} PureTool. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-medium text-muted-foreground">
             <Link to="/about" className="hover:text-foreground transition-colors">About Us</Link>
             <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
             <a href="https://github.com/Ashjdghfjj/PureTool" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}