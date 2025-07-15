import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/Card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - RemoteWork',
  description: 'Terms of Service for RemoteWork blog - Learn about the terms and conditions for using our website and services.',
};

const TermsPage: React.FC = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: January 15, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="prose prose-lg max-w-none pt-8">
                <h2>Agreement to Terms</h2>
                <p>
                  By accessing and using RemoteWork ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2>Description of Service</h2>
                <p>
                  RemoteWork is a blog and resource platform that provides information, tips, and insights about remote work, productivity, and distributed team management. We offer articles, guides, and other content to help individuals and teams succeed in remote work environments.
                </p>

                <h2>User Accounts</h2>
                <p>
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>

                <h2>Acceptable Use</h2>
                <p>You agree not to use the Service:</p>
                <ul>
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                  <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                </ul>

                <h2>Content</h2>
                
                <h3>Our Content</h3>
                <p>
                  The Service and its original content, features, and functionality are and will remain the exclusive property of RemoteWork and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>

                <h3>User Content</h3>
                <p>
                  Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
                </p>

                <p>By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.</p>

                <h2>Comments and Community Guidelines</h2>
                <p>
                  We encourage respectful discussion and engagement in our comment sections. Comments that are spam, abusive, harassing, or otherwise inappropriate will be removed. We reserve the right to moderate and remove comments at our discretion.
                </p>

                <h2>Privacy Policy</h2>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                </p>

                <h2>Prohibited Uses</h2>
                <p>You may not use our Service:</p>
                <ul>
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability</li>
                  <li>To submit false or misleading information</li>
                </ul>

                <h2>Disclaimer</h2>
                <p>
                  The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms whether express or implied, statutory or otherwise.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                  In no event shall RemoteWork, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                </p>

                <h2>Termination</h2>
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                </p>

                <h2>Governing Law</h2>
                <p>
                  These Terms shall be interpreted and governed by the laws of the State of California, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>

                <h2>Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                </p>

                <h2>Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <ul>
                  <li>Email: legal@remotework.com</li>
                  <li>Address: San Francisco, CA</li>
                </ul>

                <p>
                  <em>These terms of service are effective as of January 15, 2024.</em>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsPage;
