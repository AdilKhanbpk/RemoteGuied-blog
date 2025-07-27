'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'success' | 'error';

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-teal-600/10"></div>
        <div className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 lg:mb-8">
              Let's Start a
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Conversation
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Have questions, ideas, or want to collaborate? I'd love to hear from you and help bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/50 overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-12">
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-8 p-4 sm:p-6 bg-emerald-50 border border-emerald-200 rounded-xl sm:rounded-2xl">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-emerald-900 font-semibold text-sm sm:text-base">Message sent successfully!</p>
                      <p className="text-emerald-700 text-sm mt-1">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-8 p-4 sm:p-6 bg-red-50 border border-red-200 rounded-xl sm:rounded-2xl">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-900 font-semibold text-sm sm:text-base">Something went wrong</p>
                      <p className="text-red-700 text-sm mt-1">Please try again in a moment or refresh the page.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Header */}
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Send Message</h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Fill out the form below and I'll respond as quickly as possible.
                </p>
              </div>

              {/* Contact Form */}
              <div className="space-y-6 sm:space-y-8">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm sm:text-base font-semibold text-slate-900 mb-2 sm:mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base border-2 rounded-xl sm:rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ease-out bg-slate-50/50 text-slate-900 hover:bg-white hover:border-slate-300 ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30' : 'border-slate-200'}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm sm:text-base font-semibold text-slate-900 mb-2 sm:mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base border-2 rounded-xl sm:rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ease-out bg-slate-50/50 text-slate-900 hover:bg-white hover:border-slate-300 ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30' : 'border-slate-200'}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.email}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm sm:text-base font-semibold text-slate-900 mb-2 sm:mb-3">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base border-2 rounded-xl sm:rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ease-out bg-slate-50/50 text-slate-900 hover:bg-white hover:border-slate-300 resize-none min-h-[120px] sm:min-h-[140px] ${errors.message ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30' : 'border-slate-200'}`}
                    rows={6}
                    placeholder="Tell me about your project, questions, or how I can help you..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4 sm:pt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 hover:from-blue-700 hover:via-purple-700 hover:to-teal-700 disabled:from-slate-400 disabled:via-slate-400 disabled:to-slate-400 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent mr-3"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                        Send Message
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Footer Note */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200">
                <p className="text-center text-sm text-slate-500 leading-relaxed">
                  Your information is secure and will never be shared with third parties.
                  <br className="hidden sm:block" />
                  I typically respond within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;