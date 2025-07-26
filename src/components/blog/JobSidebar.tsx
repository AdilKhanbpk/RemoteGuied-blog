import React from 'react';
import Link from 'next/link';
import { ExternalLink, Briefcase, MapPin, Clock, Building } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { jobListings } from '@/data/job-listings';
import { formatRelativeDate } from '@/lib/utils';

interface JobSidebarProps {
  className?: string;
}

const JobSidebar: React.FC<JobSidebarProps> = ({ className = '' }) => {
  const latestJobs = jobListings.slice(0, 5);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* <Card className="sticky top-24">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
              <Briefcase className="h-4 w-4 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Latest Remote Jobs</h3>
          </div>
          <p className="text-sm text-gray-600">
            Fresh opportunities from top remote-first companies
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {latestJobs.map((job) => (
              <div key={job.id} className="group">
                <div className="border border-gray-100 rounded-lg p-3 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200">
                  <h4 className="font-medium text-gray-900 text-sm mb-2 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h4>
                  
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Building className="h-3 w-3" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Clock className="h-3 w-3" />
                      <span>{formatRelativeDate(job.postedAt)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      job.type === 'Full-time' 
                        ? 'bg-green-100 text-green-800'
                        : job.type === 'Part-time'
                        ? 'bg-blue-100 text-blue-800'
                        : job.type === 'Contract'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {job.type}
                    </span>
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      Apply
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href="https://remoteok.io" target="_blank" rel="noopener noreferrer">
                View More Jobs
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Stay Updated</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get weekly remote work tips and job alerts delivered to your inbox.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-input text-sm"
              />
              <Button size="sm" className="w-full">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              No spam, unsubscribe anytime
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Popular Topics</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              'Remote Work Setup',
              'Productivity Tips',
              'Team Management',
              'Work-Life Balance',
              'Digital Nomad',
              'Remote Tools'
            ].map((topic) => (
              <Link
                key={topic}
                href={`/blog?category=${encodeURIComponent(topic)}`}
                className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
              >
                {topic}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default JobSidebar;
