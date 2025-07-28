'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/Card';
import { Shield, FileText, Calendar, Mail, Scale, Users, Lock, Cookie, Settings, Eye, BarChart } from 'lucide-react';

const CookiePolicyPage: React.FC = () => {
  const sections = [
    { id: 'overview', title: 'What Are Cookies', icon: Cookie },
    { id: 'types', title: 'Types of Cookies We Use', icon: Settings },
    { id: 'essential', title: 'Essential Cookies', icon: Shield },
    { id: 'analytics', title: 'Analytics Cookies', icon: BarChart },
    { id: 'functional', title: 'Functional Cookies', icon: Users },
    { id: 'third-party', title: 'Third-Party Cookies', icon: Eye },
    { id: 'management', title: 'Managing Cookies', icon: Settings },
    { id: 'consent', title: 'Your Consent', icon: FileText },
    { id: 'updates', title: 'Policy Updates', icon: Calendar },
    { id: 'contact', title: 'Contact Us', icon: Mail }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 lg:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm font-semibold uppercase tracking-wider mb-6 shadow-sm">
              <Cookie className="w-4 h-4 mr-2" />
              Cookie Policy
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Cookie Policy
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Learn how RemoteWork uses cookies to enhance your browsing experience, analyze site usage, and provide personalized content.
            </p>
            <div className="mt-8 text-sm text-gray-500">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Last updated: January 15, 2024
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation & Content */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-4 lg:gap-8">
              
              {/* Table of Contents - Desktop Sidebar */}
              <div className="hidden lg:block lg:col-span-1">
                <div className="sticky top-20 z-40">
                  <Card className="shadow-lg border-0">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        Quick Navigation
                      </h3>
                      <nav className="space-y-2">
                        {sections.map((section) => {
                          const Icon = section.icon;
                          return (
                            <a
                              key={section.id}
                              href={`#${section.id}`}
                              className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all duration-200 group"
                              onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById(section.id);
                                if (element) {
                                  const headerHeight = 80;
                                  const elementPosition = element.offsetTop - headerHeight;
                                  window.scrollTo({
                                    top: elementPosition,
                                    behavior: 'smooth'
                                  });
                                }
                              }}
                            >
                              <Icon className="h-4 w-4 group-hover:text-blue-600" />
                              <span>{section.title}</span>
                            </a>
                          );
                        })}
                      </nav>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <Card className="shadow-lg border-0 bg-white">
                  <CardContent className="p-0">
                    
                    {/* Mobile TOC */}
                    <div className="lg:hidden p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        Contents
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {sections.slice(0, 8).map((section) => {
                          const Icon = section.icon;
                          return (
                            <a
                              key={section.id}
                              href={`#${section.id}`}
                              className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 p-2 rounded-lg hover:bg-white transition-all"
                              onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById(section.id);
                                if (element) {
                                  const headerHeight = 80;
                                  const elementPosition = element.offsetTop - headerHeight;
                                  window.scrollTo({
                                    top: elementPosition,
                                    behavior: 'smooth'
                                  });
                                }
                              }}
                            >
                              <Icon className="h-4 w-4" />
                              <span className="truncate">{section.title}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    <div className="prose prose-lg max-w-none p-6 sm:p-8 lg:p-12">
                      
                      <section id="overview" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Cookie className="h-4 w-4 text-blue-600" />
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900 m-0 leading-tight flex-1">What Are Cookies</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                          Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide information to website owners.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          RemoteWork uses cookies to enhance your browsing experience, remember your preferences, and analyze how our website is used to improve our services.
                        </p>
                      </section>

                      <section id="types" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Settings className="h-4 w-4 text-green-600" />
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900 m-0 leading-tight flex-1">Types of Cookies We Use</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                          We use different types of cookies for various purposes:
                        </p>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <ul className="space-y-2 text-gray-700 m-0">
                            <li className="flex items-start gap-2 text-sm">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                              <strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                              <strong>Persistent Cookies:</strong> Cookies that remain on your device for a set period
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                              <strong>First-Party Cookies:</strong> Cookies set directly by our website
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                              <strong>Third-Party Cookies:</strong> Cookies set by external services we use
                            </li>
                          </ul>
                        </div>
                      </section>

                      <section id="essential" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Shield className="h-4 w-4 text-orange-600" />
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900 m-0 leading-tight flex-1">Essential Cookies</h2>
                        </div>
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                          <h3 className="text-base font-semibold text-orange-900 mb-2">Strictly Necessary</h3>
                          <p className="text-orange-800 m-0 text-sm">
                            These cookies are essential for the website to function properly. They enable basic functions like page navigation, access to secure areas, and remember your cookie preferences. The website cannot function properly without these cookies.
                          </p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h3 className="text-base font-semibold text-blue-900 mb-2">Examples Include:</h3>
                          <ul className="text-blue-800 text-sm space-y-1 m-0">
                            <li>• Authentication and security cookies</li>
                            <li>• Session management cookies</li>
                            <li>• Cookie consent preferences</li>
                            <li>• Load balancing cookies</li>
                          </ul>
                        </div>
                      </section>

                      <section id="analytics" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <BarChart className="h-4 w-4 text-purple-600" />
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900 m-0 leading-tight flex-1">Analytics Cookies</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                          These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                        </p>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h3 className="text-base font-semibold text-purple-900 mb-2">We Use Analytics For:</h3>
                          <ul className="text-purple-800 text-sm space-y-1 m-0">
                            <li>• Measuring website traffic and usage patterns</li>
                            <li>• Understanding which pages are most popular</li>
                            <li>• Improving website performance and user experience</li>
                            <li>• Identifying technical issues and errors</li>
                          </ul>
                        </div>
                      </section>

                      <section id="functional" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Users className="h-4 w-4 text-green-600" />
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900 m-0 leading-tight flex-1">Functional Cookies</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                          These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                        </p>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h3 className="text-base font-semibold text-green-900 mb-2">Functional Features:</h3>
                          <ul className="text-green-800 text-sm space-y-1 m-0">
                            <li>• Remembering your language preferences</li>
                            <li>• Saving your theme settings (light/dark mode)</li>
                            <li>• Remembering items in your reading list</li>
                            <li>• Personalizing content recommendations</li>
                          </ul>
                        </div>
                      </section>

                      <section id="third-party" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <Eye className="h-4 w-4 text-indigo-600" />
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900 m-0 leading-tight flex-1">Third-Party Cookies</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                          We use trusted third-party services that may set their own cookies to provide functionality and analyze usage.
                        </p>
                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
                          <h3 className="text-base font-semibold text-indigo-900 mb-2">Third-Party Services:</h3>
                          <ul className="text-indigo-800 text-sm space-y-1 m-0">
                            <li>• <strong>Google Analytics:</strong> Website traffic analysis</li>
                            <li>• <strong>Cloudinary:</strong> Image optimization and delivery</li>
                            <li>• <strong>Social Media:</strong> Social sharing buttons</li>
                            <li>• <strong>CDN Services:</strong> Fast content delivery</li>
                          </ul>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-yellow-800 m-0 text-sm">
                            <strong>Note:</strong> These third-party services have their own privacy policies and cookie practices. We recommend reviewing their policies for more information.
                          </p>
                        </div>
                      </section>

                      <section id="management" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Settings className="h-4 w-4 text-blue-600" />
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900 m-0 leading-tight flex-1">Managing Cookies</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                          You have control over cookies and can manage them through your browser settings or our cookie preferences.
                        </p>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <h3 className="text-base font-semibold text-blue-900 mb-2">Browser Settings</h3>
                          <p className="text-blue-800 m-0 text-sm">
                            Most browsers allow you to control cookies through their settings. You can block, delete, or receive notifications about cookies. However, disabling certain cookies may affect website functionality.
                          </p>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h3 className="text-base font-semibold text-green-900 mb-2">Cookie Preferences</h3>
                          <p className="text-green-800 m-0 text-sm">
                            You can manage your cookie preferences at any time by clicking the "Cookie Settings" link in our website footer or by revisiting our cookie consent banner.
                          </p>
                        </div>
                      </section>

                      <section id="consent" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-4 w-4 text-green-600" />
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900 m-0 leading-tight flex-1">Your Consent</h2>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-green-800 mb-3 text-sm">
                            By continuing to use our website, you consent to our use of cookies as described in this policy. You can withdraw your consent at any time by adjusting your browser settings or cookie preferences.
                          </p>
                          <p className="text-green-800 m-0 text-sm">
                            Essential cookies will continue to be used as they are necessary for the website to function properly, but you can opt out of non-essential cookies.
                          </p>
                        </div>
                      </section>

                      <section id="updates" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-yellow-600" />
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900 m-0 leading-tight flex-1">Policy Updates</h2>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-yellow-800 m-0 text-sm">
                            We may update this Cookie Policy from time to time to reflect changes in our practices or for legal and regulatory reasons. We will notify you of any significant changes by posting the updated policy on our website with a new effective date.
                          </p>
                        </div>
                      </section>

                      <section id="contact" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Mail className="h-4 w-4 text-blue-600" />
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900 m-0 leading-tight flex-1">Contact Us</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                          If you have any questions about our use of cookies, please contact us:
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <Mail className="h-5 w-5 text-blue-600" />
                              <h4 className="font-semibold text-blue-900 text-sm">Email</h4>
                            </div>
                            <p className="text-blue-800 m-0 text-sm">privacy@remotework.com</p>
                          </div>

                          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <FileText className="h-5 w-5 text-green-600" />
                              <h4 className="font-semibold text-green-900 text-sm">Privacy Policy</h4>
                            </div>
                            <p className="text-green-800 m-0 text-sm">View our full Privacy Policy</p>
                          </div>
                        </div>

                        <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                          <p className="text-gray-600 text-xs m-0">
                            <em>This cookie policy is effective as of January 15, 2024.</em>
                          </p>
                        </div>
                      </section>

                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CookiePolicyPage;
