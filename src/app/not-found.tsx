import Link from 'next/link';
import Button from '@/components/ui/Button';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full mx-auto text-center px-4">
        <div className="mb-8">
          <FileQuestion className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-content-primary mb-2">404</h1>
          <h2 className="text-xl font-semibold text-content-primary mb-4">
            Page Not Found
          </h2>
          <p className="text-content-body">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Go to homepage
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse articles
            </Link>
          </Button>
        </div>
        
        <div className="mt-8">
          <p className="text-sm text-content-caption">
            If you believe this is an error, please{' '}
            <Link href="/contact" className="text-primary hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
