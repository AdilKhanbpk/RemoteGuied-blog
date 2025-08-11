'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, Briefcase, MapPin, Clock, Building, DollarSign, Users, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatRelativeDate } from '@/lib/utils';
import { UnifiedJob } from '@/types/usajobs';

interface JobSidebarProps {
  className?: string;
}

const JobSidebar: React.FC<JobSidebarProps> = ({ className = '' }) => {
  const [jobs, setJobs] = useState<UnifiedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Fetch jobs from USAJOBS API
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch combined remote tech jobs (most relevant for remote work blog)
      const response = await fetch('/api/jobs?type=combined-tech&limit=5');
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setJobs(data.jobs || []);
      setLastRefresh(new Date());
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err instanceof Error ? err.message : 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchJobs();
  };

  const formatSalary = (salary?: string) => {
    return salary || null;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="sticky top-24">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <Briefcase className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Remote Jobs</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
              className="p-1 h-8 w-8"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            Latest opportunities from government & private sources
          </p>
          {lastRefresh && (
            <p className="text-xs text-gray-500">
              Updated {formatRelativeDate(lastRefresh.toISOString())}
            </p>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            // Loading skeleton
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="border border-gray-100 rounded-lg p-3">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="space-y-1 mb-3">
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-5 bg-gray-200 rounded w-16"></div>
                      <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            // Error state
            <div className="text-center py-6">
              <div className="text-red-600 mb-2">
                <Briefcase className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">Unable to load jobs</p>
                <p className="text-xs text-gray-500 mt-1">{error}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-2">
                Try Again
              </Button>
            </div>
          ) : jobs.length === 0 ? (
            // No jobs state
            <div className="text-center py-6">
              <Briefcase className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm text-gray-500">No jobs available</p>
              <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-2">
                Refresh
              </Button>
            </div>
          ) : (
            // Jobs list
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="group">
                  <div className="border border-gray-100 rounded-lg p-3 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200">
                    <h4 className="font-medium text-gray-900 text-sm mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {job.title}
                    </h4>

                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Building className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Clock className="h-3 w-3 flex-shrink-0" />
                        <span>{formatRelativeDate(job.postedDate)}</span>
                      </div>
                      {formatSalary(job.salary) && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <DollarSign className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{formatSalary(job.salary)}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-xs">
                        {job.remote && (
                          <span className="text-green-600 flex items-center gap-1">
                            <Users className="h-3 w-3 flex-shrink-0" />
                            Remote
                          </span>
                        )}
                        {job.source && (
                          <span className={`ml-2 px-1 py-0.5 rounded text-xs ${
                            job.source === 'usajobs'
                              ? 'bg-blue-100 text-blue-700'
                              : job.source === 'jobicy'
                              ? 'bg-purple-100 text-purple-700'
                              : job.source === 'joinrise'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {job.source === 'usajobs'
                              ? 'Gov'
                              : job.source === 'jobicy'
                              ? 'Remote'
                              : job.source === 'joinrise'
                              ? 'Global'
                              : 'Worldwide'}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {job.type}
                      </span>
                      <a
                        href={job.applyUrl}
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
          )}

          <div className="mt-4 pt-4 border-t border-gray-100">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href="https://www.usajobs.gov/Search/Results?k=remote" target="_blank" rel="noopener noreferrer">
                View More on USAJOBS
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
      </Card>
    </div>
  );
};

export default JobSidebar;
