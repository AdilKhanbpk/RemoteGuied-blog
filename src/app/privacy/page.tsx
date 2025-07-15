import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/Card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - RemoteWork',
  description: 'Privacy Policy for RemoteWork blog - Learn how we collect, use, and protect your personal information.',
};

const PrivacyPage: React.FC = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
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
                <h2>Introduction</h2>
                <p>
                  At RemoteWork ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>

                <h2>Information We Collect</h2>
                
                <h3>Personal Information</h3>
                <p>We may collect personal information that you voluntarily provide to us when you:</p>
                <ul>
                  <li>Subscribe to our newsletter</li>
                  <li>Submit a contact form</li>
                  <li>Leave comments on blog posts</li>
                  <li>Create an account on our website</li>
                </ul>

                <p>This information may include:</p>
                <ul>
                  <li>Name and email address</li>
                  <li>Contact information</li>
                  <li>Professional information</li>
                  <li>Comments and feedback</li>
                </ul>

                <h3>Automatically Collected Information</h3>
                <p>When you visit our website, we may automatically collect certain information about your device and usage patterns, including:</p>
                <ul>
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>We use the information we collect for various purposes, including:</p>
                <ul>
                  <li>Providing and maintaining our services</li>
                  <li>Sending newsletters and updates</li>
                  <li>Responding to your inquiries and comments</li>
                  <li>Improving our website and content</li>
                  <li>Analyzing usage patterns and trends</li>
                  <li>Preventing fraud and ensuring security</li>
                </ul>

                <h2>Information Sharing and Disclosure</h2>
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
                <ul>
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With trusted service providers who assist us in operating our website</li>
                </ul>

                <h2>Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>

                <h2>Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookie settings through your browser preferences.
                </p>

                <h2>Third-Party Services</h2>
                <p>Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.</p>

                <h2>Your Rights</h2>
                <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                <ul>
                  <li>The right to access your personal data</li>
                  <li>The right to correct inaccurate information</li>
                  <li>The right to delete your personal data</li>
                  <li>The right to restrict processing</li>
                  <li>The right to data portability</li>
                  <li>The right to object to processing</li>
                </ul>

                <h2>Children's Privacy</h2>
                <p>
                  Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>

                <h2>Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
                </p>

                <h2>Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                </p>
                <ul>
                  <li>Email: privacy@remotework.com</li>
                  <li>Address: San Francisco, CA</li>
                </ul>

                <p>
                  <em>This privacy policy is effective as of January 15, 2024.</em>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPage;
