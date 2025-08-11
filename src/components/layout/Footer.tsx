import React from 'react';
import Link from 'next/link';
import { BookOpen, Mail, Twitter, Linkedin, Github, MapPin, Phone } from 'lucide-react';
// Button, Input, and ArrowRight removed as they're not used

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Quick Links': [
      { name: 'All Articles', href: '/blog' },
      { name: 'Categories', href: '/categories' },
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    // 'Company': [
      // { name: 'Our Story', href: '/about' },
      // { name: 'Careers', href: '/careers' },
      // { name: 'Press Kit', href: '/press' },
      // { name: 'Partners', href: '/partners' },
    // ],
    // 'Resources': [
    //   { name: 'Remote Work Guide', href: '/guide' },
    //   { name: 'Templates & Tools', href: '/templates' },
    //   { name: 'Community Forum', href: '/community' },
    //   { name: 'Success Stories', href: '/stories' },
    // ],
    'Support': [
      // { name: 'Help Center', href: '/help' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:bg-blue-500 hover:text-white hover:border-blue-500' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-blue-600 hover:text-white hover:border-blue-600' },
    { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'hover:bg-gray-700 hover:text-white hover:border-gray-700' },
    { icon: Mail, href: 'mailto:hello@remotework.com', label: 'Email', color: 'hover:bg-emerald-500 hover:text-white hover:border-emerald-500' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Newsletter Section */}
      {/* <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <Mail className="w-3 h-3 mr-2" />
              Newsletter
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              Stay Ahead of the Remote Work Revolution
            </h3>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Join 50,000+ professionals who rely on our weekly insights to excel in remote work environments.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <Input
                placeholder="Enter your email address"
                type="email"
                className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 text-sm"
              />
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm whitespace-nowrap">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <p className="text-gray-400 text-xs mt-3 text-center">
              ✨ No spam, unsubscribe anytime. Join our community of remote work enthusiasts.
            </p>
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Brand Section - Enhanced */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl blur opacity-20"></div>
                  <div className="relative p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl">
                    <BookOpen className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <span className="font-bold  text-2xl text-white tracking-tight">RemoteWork</span>
                  <span className="block text-base text-gray-300 font-medium">Insights</span>
                </div>
              </div>
              
              <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-md">
                Empowering remote professionals with cutting-edge insights, proven strategies, and actionable advice for the future of work.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-400 text-sm">
                  <div className="p-2 bg-white/10 rounded-lg mr-3">
                    <MapPin className="w-4 h-4 text-gray-300" />
                  </div>
                  <span className="font-medium">Global Remote Community</span>
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <div className="p-2 bg-white/10 rounded-lg mr-3">
                    <Phone className="w-4 h-4 text-gray-300" />
                  </div>
                  <span className="font-medium">Available 24/7 Online</span>
                </div>
              </div>
            </div>

            {/* Footer Links - Improved Layout */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="lg:col-span-1">
                <h3 className="font-bold text-white text-lg mb-4 relative">
                  {category}
                  <div className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 hover:translate-x-1 inline-block relative group"
                      >
                        {link.name}
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer - Professional Layout */}
      <div className="relative border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <div className="flex items-center text-center lg:text-left">
              <p className="text-gray-400 text-sm font-medium pt-2">
                © {currentYear} RemoteWork Insights. All rights reserved.
              </p>
              {/* <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>•</span>
                <span>Made with ❤️ for Remote Workers</span>
                <span>•</span>
                <span>50K+ Happy Subscribers</span>
              </div> */}
            </div>

            {/* Social Links - Premium Design */}
            {/* <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm font-medium">Connect with us</span>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-3 text-gray-400 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 ${color} backdrop-blur-sm`}
                  >
                    <Icon className="h-4 w-4 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;