'use client';

import React from 'react';
import { Shield, FileText, Calendar, Mail, MapPin, Scale, Users, Lock, Briefcase } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TermsNavigationProps {
  sections: Section[];
}

const TermsNavigation: React.FC<TermsNavigationProps> = ({ sections }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-blue-600" />
            Table of Contents
          </h3>
          <nav className="space-y-1">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all duration-200 group"
                  onClick={(e) => handleNavClick(e, section.id)}
                >
                  <IconComponent className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <span className="group-hover:font-medium transition-all">
                    {section.title}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TermsNavigation;
