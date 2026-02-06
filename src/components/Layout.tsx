import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShieldCheck, Github, Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils/cn';
import { useTheme } from '@/components/ThemeProvider';
import Donation from '@/components/Donation';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { setTheme, theme } = useTheme();

  const navItems = [
    { name: 'Image Compressor', path: '/image-compressor' },
    { name: 'JSON Formatter', path: '/json-formatter' },
    { name: 'Password Generator', path: '/password-generator' },
    { name: 'QR Generator', path: '/qr-generator' },
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


      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Privacy in mind. No data leaves your browser.
            <span className="mx-2">•</span>
            <Link to="/privacy" className="underline underline-offset-4 hover:text-foreground">Privacy Policy</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}