'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, BookOpen, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-1.5 sm:p-2 bg-primary rounded-lg">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-content-primary">
              RemoteWork<span className="text-primary">Blog</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-content-body hover:text-primary transition-colors duration-300 font-medium text-sm lg:text-base py-2 px-1"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search & CTA */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <button className="p-2 text-content-body hover:text-primary transition-colors duration-300 rounded-lg hover:bg-primary/5">
              <Search className="h-4 w-4 lg:h-5 lg:w-5" />
            </button>
            <Button variant="default" size="sm" asChild>
              <Link href="/blog">Latest Posts</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-content-body hover:text-primary transition-colors duration-300 rounded-lg hover:bg-primary/5 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="px-4 py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-base font-medium transition-colors min-h-[44px] flex items-center',
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-content-body hover:text-primary hover:bg-primary/5'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-3">
                <Button variant="default" size="default" className="w-full" asChild>
                  <Link href="/blog">Latest Posts</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
