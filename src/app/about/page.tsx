import React from 'react';
import Link from 'next/link';
import { User, Target, Award, BookOpen, Users, Zap, Twitter, Linkedin, Mail } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Alex Johnson - Remote Work Expert',
  description: 'Learn about Alex Johnson, a remote work consultant and productivity expert with 8+ years of experience helping teams transition to distributed work environments.',
  keywords: ['remote work expert', 'productivity consultant', 'distributed teams', 'work from home'],
};

const AboutPage: React.FC = () => {
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
      {/* Hero Section */}
      <section className="gradient-hero section-padding">
        <div className="container-content">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mx-auto mb-8">
              <User className="h-16 w-16 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-content-primary mb-6">
              Hi, I'm Alex Johnson
            </h1>
            <p className="lead mb-8 max-w-2xl mx-auto">
              Remote work consultant and productivity expert with 8+ years of experience helping teams transition to distributed work environments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Get In Touch</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/blog">Read My Articles</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section-padding bg-background">
        <div className="container-content">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-content-primary mb-6">My Mission</h2>
            <p className="lead leading-relaxed">
              I believe that remote work isn't just the future—it's the present. My mission is to help individuals and teams unlock their full potential in distributed work environments by providing practical strategies, proven methodologies, and actionable insights that drive real results.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-background-alt">
        <div className="container-content">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-content-primary mb-4">Achievements & Impact</h2>
            <p className="lead max-w-2xl mx-auto">
              Over the years, I've had the privilege of working with amazing teams and individuals to transform their remote work experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center card-elevated">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
                    <achievement.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-content-primary mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-content-body text-sm">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Background & Experience */}
      <section className="section-padding bg-background">
        <div className="container-content">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-content-primary mb-6">My Background</h2>
                <div className="space-y-4 text-content-body">
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

              <div>
                <h3 className="text-xl font-semibold text-content-primary mb-6">Core Expertise</h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium text-center"
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
      <section className="section-padding bg-background-alt">
        <div className="container-content">
          <div className="max-w-3xl mx-auto">
            <Card className="card-elevated">
              <CardHeader>
                <h2 className="text-2xl font-bold text-content-primary text-center">Beyond Work</h2>
              </CardHeader>
              <CardContent>
                <p className="text-content-body text-center mb-6">
                  When I'm not helping teams optimize their remote work experience, you can find me hiking in the mountains, experimenting with new coffee brewing methods, or contributing to open-source projects. I'm a firm believer that work-life balance isn't just something I teach—it's something I live.
                </p>

                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://twitter.com/alexjohnson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-normal"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/alexjohnson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-normal"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="mailto:alex@remotework.com"
                    className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-normal"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary">
        <div className="container-content">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Remote Work Experience?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Let's work together to unlock your team's full potential in the remote work landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">Start a Conversation</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/blog">Explore My Content</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
