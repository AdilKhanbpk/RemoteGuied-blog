import React from 'react';
import Layout from '@/components/layout/Layout';
import { User, Target, Award, BookOpen, Users, Zap, Twitter, Linkedin, Mail } from 'lucide-react';

const AboutPage = () => {
  const achievements = [
    {
      icon: Users,
      title: '500+ Teams Helped',
      description: 'Successfully guided organizations through remote work transitions'
    },
    {
      icon: BookOpen,
      title: '50+ Articles Published',
      description: 'Comprehensive guides on remote work and productivity'
    },
    {
      icon: Award,
      title: '95% Success Rate',
      description: 'Teams report significant productivity improvements'
    },
    {
      icon: Zap,
      title: '8+ Years Experience',
      description: 'Deep expertise in distributed work environments'
    }
  ];

  const skills = [
    'Remote Team Management',
    'Productivity Optimization',
    'Digital Communication',
    'Work-Life Balance',
    'Team Culture Building',
    'Process Automation',
    'Performance Metrics',
    'Change Management'
  ];

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white border-b border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30"></div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <User className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hi, I'm Alex Johnson
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Remote work consultant and productivity expert with 8+ years of experience helping teams transition to distributed work environments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                Get In Touch
              </button>
              <button className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold px-6 py-3 rounded-lg transition-all duration-200">
                Read My Articles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">My Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              I believe that remote work isn't just the future—it's the present. My mission is to help individuals and teams unlock their full potential in distributed work environments by providing practical strategies, proven methodologies, and actionable insights that drive real results.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Achievements & Impact</h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Over the years, I've had the privilege of working with amazing teams and individuals to transform their remote work experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
                  <achievement.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Background & Experience */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">My Background</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    I started my journey in remote work back in 2016 when I transitioned my first team to a fully distributed model. What began as a necessity quickly became a passion as I witnessed the transformative power of well-executed remote work strategies.
                  </p>
                  <p>
                    Over the past 8 years, I've worked with startups, Fortune 500 companies, and everything in between. I've seen what works, what doesn't, and most importantly, how to make the transition smooth and successful for everyone involved.
                  </p>
                  <p>
                    My approach combines data-driven insights with human-centered design, ensuring that remote work solutions are not just efficient, but also sustainable and enjoyable for team members.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Core Expertise</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium text-center border border-blue-100"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Touch */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Beyond Work</h2>
                <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  When I'm not helping teams optimize their remote work experience, you can find me hiking in the mountains, experimenting with new coffee brewing methods, or contributing to open-source projects. I'm a firm believer that work-life balance isn't just something I teach—it's something I live.
                </p>
              </div>

              {/* Social Links */}
              {/* <div className="flex justify-center space-x-4">
                <a
                  href="https://twitter.com/alexjohnson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200 border border-blue-100"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/alexjohnson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200 border border-blue-100"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:alex@remotework.com"
                  className="flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200 border border-blue-100"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Remote Work Experience?
            </h2>
            <p className="text-blue-100 mb-8 text-lg leading-relaxed">
              Let's work together to unlock your team's full potential in the remote work landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                Start a Conversation
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-6 py-3 rounded-lg transition-all duration-200">
                Explore My Content
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Trust Indicators */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Available for consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span className="text-sm font-medium">Certified remote work specialist</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Trusted by 500+ teams</span>
            </div>
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default AboutPage;