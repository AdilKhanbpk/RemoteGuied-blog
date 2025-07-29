'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/Card';
import { Shield, FileText, Calendar, Mail, Scale, Users, Lock } from 'lucide-react';

const TermsPage: React.FC = () => {
  const sections = [
    { id: 'agreement', title: 'Agreement to Terms', icon: FileText },
    { id: 'service', title: 'Description of Service', icon: Users },
    { id: 'accounts', title: 'User Accounts', icon: Lock },
    { id: 'acceptable-use', title: 'Acceptable Use', icon: Shield },
    { id: 'content', title: 'Content', icon: FileText },
    { id: 'comments', title: 'Comments & Guidelines', icon: Users },
    { id: 'privacy', title: 'Privacy Policy', icon: Lock },
    { id: 'prohibited', title: 'Prohibited Uses', icon: Shield },
    { id: 'disclaimer', title: 'Disclaimer', icon: Scale },
    { id: 'limitation', title: 'Limitation of Liability', icon: Scale },
    { id: 'termination', title: 'Termination', icon: FileText },
    { id: 'governing', title: 'Governing Law', icon: Scale },
    { id: 'changes', title: 'Changes to Terms', icon: Calendar },
    { id: 'contact', title: 'Contact Information', icon: Mail },
  ];

  return (
    <Layout>
      {/* Hero Header */}
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
                <Scale className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Terms of Service
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 leading-relaxed">
              Clear terms for a transparent relationship
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
                                  const headerHeight = 80; // Account for sticky header
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
                                  const headerHeight = 80; // Account for sticky header
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
                      
                      <section id="agreement" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Agreement to Terms</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          By accessing and using RemoteWork ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </p>
                      </section>

                      <section id="service" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Users className="h-4 w-4 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Description of Service</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          RemoteWork is a blog and resource platform that provides information, tips, and insights about remote work, productivity, and distributed team management. We offer articles, guides, and other content to help individuals and teams succeed in remote work environments.
                        </p>
                      </section>

                      <section id="accounts" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Lock className="h-4 w-4 text-purple-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">User Accounts</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                        </p>
                      </section>

                      <section id="acceptable-use" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Shield className="h-4 w-4 text-orange-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Acceptable Use</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-4 text-sm">You agree not to use the Service:</p>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <ul className="space-y-2 text-gray-700 m-0">
                            <li className="flex items-start gap-2 text-sm">
                              <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                              For any unlawful purpose or to solicit others to perform unlawful acts
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                              To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                              To infringe upon or violate our intellectual property rights or the intellectual property rights of others
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                              To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                              To submit false or misleading information
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                              To upload or transmit viruses or any other type of malicious code
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                              To spam, phish, pharm, pretext, spider, crawl, or scrape
                            </li>
                          </ul>
                        </div>
                      </section>

                      <section id="content" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Content & Articles</h3>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                          <h3 className="text-base font-semibold text-blue-900 mb-2">Our Content</h3>
                          <p className="text-blue-800 m-0 text-sm">
                            The Service and its original content, features, and functionality are and will remain the exclusive property of RemoteWork and its licensors. The Service is protected by copyright, trademark, and other laws.
                          </p>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-2">
                          <h4 className="text-base font-semibold text-green-900 mb-2">User Content</h4>
                          <p className="text-green-800 mb-3 text-sm">
                            Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
                          </p>
                          <p className="text-green-800 m-0 text-sm">
                            By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.
                          </p>
                        </div>
                      </section>

                      <section id="comments" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Users className="h-4 w-4 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Comments & Community Guidelines</h3>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-2">
                          <p className="text-yellow-800 m-0 text-sm">
                            We encourage respectful discussion and engagement in our comment sections. Comments that are spam, abusive, harassing, or otherwise inappropriate will be removed. We reserve the right to moderate and remove comments at our discretion.
                          </p>
                        </div>
                      </section>

                      {/* Continue with remaining sections in similar style */}
                      <section id="privacy" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Lock className="h-4 w-4 text-purple-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Privacy Policy</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                        </p>
                      </section>

                      <section id="disclaimer" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                            <Scale className="h-4 w-4 text-red-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Disclaimer</h3>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <p className="text-red-800 m-0 text-sm">
                            The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms whether express or implied, statutory or otherwise.
                          </p>
                        </div>
                      </section>

                      <section id="limitation" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                            <Scale className="h-4 w-4 text-red-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Limitation of Liability</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          In no event shall RemoteWork, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                        </p>
                      </section>

                      <section id="termination" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-4 w-4 text-orange-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Termination</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                        </p>
                      </section>

                      <section id="governing" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <Scale className="h-4 w-4 text-indigo-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Governing Law</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          These Terms shall be interpreted and governed by the laws of the State of California, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                        </p>
                      </section>

                      <section id="changes" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-yellow-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Changes to Terms</h3>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-2">
                          <p className="text-yellow-800 m-0 text-sm">
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                          </p>
                        </div>
                      </section>

                      {/* <section id="contact" className="scroll-mt-8">
                        <div className="flex items-center gap-3 mb-0">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Mail className="h-4 w-4 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 m-0 mt-3 leading-tight flex-1">Contact Information</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                          If you have any questions about these Terms of Service, please contact us at:
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <Mail className="h-5 w-5 text-blue-600" />
                              <h5 className="font-semibold text-blue-900 mt-2 text-sm">Email</h5>
                            </div>
                            <p className="text-blue-800 m-0 text-sm">legal@remotework.com</p>
                          </div>

                          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <MapPin className="h-5 w-5 text-green-600" />
                              <h5 className="font-semibold text-green-900 mt-2 text-sm">Address</h5>
                            </div>
                            <p className="text-green-800 m-0 text-sm">San Francisco, CA</p>
                          </div>
                        </div>

                        <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                          <p className="text-gray-600 text-xs m-0">
                            <em>These terms of service are effective as of January 15, 2024.</em>
                          </p>
                        </div>
                      </section> */}

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

export default TermsPage;