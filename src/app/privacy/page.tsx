'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/Card';
import { Shield, FileText, Calendar, Mail, Scale, Users, Lock, Cookie, Settings, Eye } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  const sections = [
    { id: 'introduction', title: 'Introduction', icon: FileText },
    { id: 'information', title: 'Information We Collect', icon: Users },
    { id: 'usage', title: 'How We Use Your Information', icon: Settings },
    { id: 'sharing', title: 'Information Sharing and Disclosure', icon: Eye },
    { id: 'security', title: 'Data Security', icon: Lock },
    { id: 'cookies', title: 'Cookies and Tracking Technologies', icon: Cookie },
    { id: 'third-party', title: 'Third-Party Services', icon: Eye },
    { id: 'rights', title: 'Your Rights', icon: Scale },
    { id: 'children', title: 'Children\'s Privacy', icon: Shield },
    { id: 'changes', title: 'Changes to This Privacy Policy', icon: Calendar },
    { id: 'contact', title: 'Contact Us', icon: Mail },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='7' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='7' cy='53' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Lock className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 leading-relaxed">
              Learn how we collect, use, and protect your personal information.
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-200">
              <Calendar className="h-5 w-5" />
              <span className="text-lg">Last updated: January 15, 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation & Content */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:lg:px-8">
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
                <Card className="shadow-xl border-0 overflow-hidden">
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
                      <section id="introduction" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Introduction</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          At RemoteWork ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                        </p>
                      </section>

                      <section id="information" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Users className="h-4 w-4 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Information We Collect</h3>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <h4 className="text-base font-semibold text-blue-900 mb-2">Personal Information</h4>
                          <p className="text-blue-800 m-0 text-sm">We may collect personal information that you voluntarily provide to us when you:</p>
                          <ul className="text-blue-800 text-sm space-y-1 m-0 mt-2">
                            <li>• Subscribe to our newsletter</li>
                            <li>• Submit a contact form</li>
                            <li>• Leave comments on blog posts</li>
                            <li>• Create an account on our website</li>
                          </ul>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-2">
                          <p className="text-green-800 m-0 text-sm">This information may include:</p>
                          <ul className="text-green-800 text-sm space-y-1 m-0 mt-2">
                            <li>• Name and email address</li>
                            <li>• Contact information</li>
                            <li>• Professional information</li>
                            <li>• Comments and feedback</li>
                          </ul>
                        </div>
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-2">
                          <h4 className="text-base font-semibold text-orange-900 mb-2">Automatically Collected Information</h4>
                          <p className="text-orange-800 m-0 text-sm">When you visit our website, we may automatically collect certain information about your device and usage patterns, including:</p>
                          <ul className="text-orange-800 text-sm space-y-1 m-0 mt-2">
                            <li>• IP address and location data</li>
                            <li>• Browser type and version</li>
                            <li>• Operating system</li>
                            <li>• Pages visited and time spent on our site</li>
                            <li>• Referring website</li>
                          </ul>
                        </div>
                      </section>

                      <section id="usage" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Settings className="h-4 w-4 text-purple-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">How We Use Your Information</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                          We use the information we collect for various purposes, including:
                        </p>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-2">
                          <ul className="text-purple-800 text-sm space-y-1 m-0">
                            <li>• Providing and maintaining our services</li>
                            <li>• Sending newsletters and updates</li>
                            <li>• Responding to your inquiries and comments</li>
                            <li>• Improving our website and content</li>
                            <li>• Analyzing usage patterns and trends</li>
                            <li>• Preventing fraud and ensuring security</li>
                          </ul>
                        </div>
                      </section>

                      <section id="sharing" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <Eye className="h-4 w-4 text-indigo-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Information Sharing and Disclosure</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                          We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                        </p>
                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-2">
                          <ul className="text-indigo-800 text-sm space-y-1 m-0">
                            <li>• With your explicit consent</li>
                            <li>• To comply with legal obligations</li>
                            <li>• To protect our rights and safety</li>
                            <li>• With trusted service providers who assist us in operating our website</li>
                          </ul>
                        </div>
                      </section>

                      <section id="security" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Lock className="h-4 w-4 text-orange-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Data Security</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                        </p>
                      </section>

                      <section id="cookies" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Cookie className="h-4 w-4 text-blue-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Cookies and Tracking Technologies</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookie settings through your browser preferences.
                        </p>
                      </section>

                      <section id="third-party" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <Eye className="h-4 w-4 text-indigo-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Third-Party Services</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
                        </p>
                      </section>

                      <section id="rights" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Scale className="h-4 w-4 text-purple-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Your Rights</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                          Depending on your location, you may have certain rights regarding your personal information, including:
                        </p>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-2">
                          <ul className="text-purple-800 text-sm space-y-1 m-0">
                            <li>• The right to access your personal data</li>
                            <li>• The right to correct inaccurate information</li>
                            <li>• The right to delete your personal data</li>
                            <li>• The right to restrict processing</li>
                            <li>• The right to data portability</li>
                            <li>• The right to object to processing</li>
                          </ul>
                        </div>
                      </section>

                      <section id="children" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Shield className="h-4 w-4 text-orange-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Children's Privacy</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                        </p>
                      </section>

                      <section id="changes" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-yellow-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Changes to This Privacy Policy</h3>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-2">
                          <p className="text-yellow-800 m-0 text-sm">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
                          </p>
                        </div>
                      </section>

                      <section id="contact" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Mail className="h-4 w-4 text-blue-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Contact Us</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                          If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <Mail className="h-5 w-5 text-blue-600" />
                              <h5 className="font-semibold text-blue-900 mt-2 text-sm">Email</h5>
                            </div>


                            <p className="text-blue-800 m-0 text-sm">privacy@remotework.com</p>
                          </div>
                          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <FileText className="h-5 w-5 text-green-600" />


                              <h5 className="font-semibold text-green-900 mt-2 text-sm">Address</h5>
                            </div>
                            <p className="text-green-800 m-0 text-sm">San Francisco, CA</p>
                          </div>
                        </div>
                        <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                          <p className="text-gray-600 text-xs m-0">
                            <em>This privacy policy is effective as of January 15, 2024.</em>
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

export default PrivacyPage;