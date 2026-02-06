import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';
import SEO from '@/components/SEO';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <SEO title="404 Not Found" description="Page not found" />
      
      <div className="p-6 bg-muted rounded-full">
        <FileQuestion className="h-16 w-16 text-muted-foreground" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">404 - Page Not Found</h1>
        <p className="text-muted-foreground max-w-[500px]">
          Oops! The page you are looking for doesn't exist. It might have been moved or deleted.
        </p>
      </div>

      <Link 
        to="/" 
        className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}
