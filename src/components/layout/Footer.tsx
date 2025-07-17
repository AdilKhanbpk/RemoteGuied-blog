import React from 'react';
import Link from 'next/link';
import { BookOpen, Mail, Twitter, Linkedin, Github } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Blog: [
      { name: 'All Posts', href: '/blog' },
      { name: 'Categories', href: '/categories' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    Resources: [
      { name: 'Newsletter', href: '/newsletter' },
      { name: 'Remote Work Guide', href: '/guide' },
      { name: 'Templates', href: '/templates' },
      { name: 'Community', href: '/community' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Mail, href: 'mailto:hello@remotework.com', label: 'Email' },
  ];

  return (
    <footer className="bg-background-subtle border-t border-border">
      {/* Newsletter Section */}
      <div className="container-content py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-content-primary mb-4">
            Stay Updated with Remote Work Insights
          </h3>
          <p className="text-content-body mb-6">
            Get weekly tips, productivity strategies, and remote work best practices delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              type="email"
              className="flex-1"
            />
            <Button className="btn-primary">
              Subscribe
            </Button>
          </div>
          <p className="text-content-caption text-sm mt-3">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-content py-12 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-content-primary mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-content-body hover:text-primary transition-colors duration-normal"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="container-content py-6 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-primary rounded-lg">
                <BookOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-content-primary">
                RemoteWorkBlog
              </span>
            </div>
            <span className="text-content-caption">
              © {currentYear} RemoteWorkBlog. All rights reserved.
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-content-body hover:text-primary hover:bg-background rounded-lg transition-all duration-normal"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
