'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building, Clock, DollarSign, Users, ExternalLink, Filter, RefreshCw } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { USAJob, UnifiedJob } from '@/types/usajobs';
import { formatRelativeDate } from '@/lib/utils';

const JobsPage = () => {
  const [jobs, setJobs] = useState<UnifiedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usajobsCount, setUsajobsCount] = useState(0);
  const [jobicyCount, setJobicyCount] = useState(0);
  const [joinriseCount, setJoinriseCount] = useState(0);
  const [adzunaCount, setAdzunaCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionTitle, setPositionTitle] = useState('');
  const [location, setLocation] = useState('');
  const [organization, setOrganization] = useState('');
  const [jobType, setJobType] = useState('all');
  const [jobCategory, setJobCategory] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [payGrade, setPayGrade] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [fullTimeOnly, setFullTimeOnly] = useState(false);
  const [whoMayApply, setWhoMayApply] = useState('public');
  const [daysPosted, setDaysPosted] = useState('30');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (customParams?: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        limit: '20',
        ...(jobType !== 'all' && { type: jobType }),
        ...(searchTerm && { keyword: searchTerm }),
        ...(positionTitle && { positionTitle }),
        ...(location && { location }),
        ...(organization && { organization }),
        ...(jobCategory && { jobCategory }),
        ...(minSalary && { minSalary }),
        ...(maxSalary && { maxSalary }),
        ...(payGrade && { payGradeLow: payGrade, payGradeHigh: payGrade }),
        ...(remoteOnly && { remote: 'true' }),
        ...(fullTimeOnly && { fullTime: 'true' }),
        whoMayApply,
        daysPosted,
        sortField: 'DatePosted',
        sortDirection: 'Desc',
        ...customParams,
      });

      const response = await fetch(`/api/jobs?${params}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setJobs(data.jobs || []);
      setUsajobsCount(data.usajobsCount || 0);
      setJobicyCount(data.jobicyCount || 0);
      setJoinriseCount(data.joinriseCount || 0);
      setAdzunaCount(data.adzunaCount || 0);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err instanceof Error ? err.message : 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const formatSalary = (salary?: string) => {
    return salary || 'Salary not specified';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4 !text-white">Federal Remote Jobs</h1>
              {/* <p className="text-xl max-w-2xl mx-auto !text-white/90">
                Discover remote opportunities in the federal government through USAJOBS
              </p> */}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="space-y-6">
                {/* Basic Search Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Keywords
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="e.g., software, analyst, nurse"
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position Title
                    </label>
                    <input
                      type="text"
                      value={positionTitle}
                      onChange={(e) => setPositionTitle(e.target.value)}
                      placeholder="e.g., Software Engineer"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g., Washington, DC"
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Agency
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="e.g., Department of Defense"
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Filters Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Category
                    </label>
                    <select
                      value={jobCategory}
                      onChange={(e) => setJobCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Categories</option>
                      <option value="2210">Information Technology</option>
                      <option value="0610">Nursing</option>
                      <option value="0180">Psychology</option>
                      <option value="1102">Contracting</option>
                      <option value="0343">Management Analysis</option>
                      <option value="0301">General Administration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pay Grade
                    </label>
                    <select
                      value={payGrade}
                      onChange={(e) => setPayGrade(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Grades</option>
                      <option value="05">GS-05 (Entry Level)</option>
                      <option value="07">GS-07</option>
                      <option value="09">GS-09</option>
                      <option value="11">GS-11</option>
                      <option value="12">GS-12</option>
                      <option value="13">GS-13</option>
                      <option value="14">GS-14</option>
                      <option value="15">GS-15</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min Salary
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        value={minSalary}
                        onChange={(e) => setMinSalary(e.target.value)}
                        placeholder="50000"
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Posted Within
                    </label>
                    <select
                      value={daysPosted}
                      onChange={(e) => setDaysPosted(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="7">Last 7 days</option>
                      <option value="14">Last 2 weeks</option>
                      <option value="30">Last 30 days</option>
                      <option value="60">Last 60 days</option>
                    </select>
                  </div>
                </div>

                {/* Quick Filters and Search Button */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={remoteOnly}
                        onChange={(e) => setRemoteOnly(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Remote work only</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={fullTimeOnly}
                        onChange={(e) => setFullTimeOnly(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Full-time only</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-700">Open to:</label>
                      <select
                        value={whoMayApply}
                        onChange={(e) => setWhoMayApply(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="public">Public</option>
                        <option value="internal">Federal employees</option>
                        <option value="all">All applicants</option>
                      </select>
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="px-8">
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Search className="h-4 w-4 mr-2" />
                    )}
                    Search Jobs
                  </Button>
                </div>

                {/* Predefined Search Buttons */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-3">Quick searches:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setJobType('combined-tech');
                        setSearchTerm('');
                        setLocation('');
                        fetchJobs({ type: 'combined-tech' });
                      }}
                    >
                      � Tech Jobs (All Sources)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setJobType('combined-remote');
                        setSearchTerm('');
                        setRemoteOnly(true);
                        fetchJobs({ type: 'combined-remote' });
                      }}
                    >
                      🏠 Remote Jobs (All Sources)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setJobType('combined-design');
                        setSearchTerm('designer');
                        fetchJobs({ type: 'combined-design' });
                      }}
                    >
                      🎨 Design Jobs
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setJobType('combined-marketing');
                        setSearchTerm('marketing');
                        fetchJobs({ type: 'combined-marketing' });
                      }}
                    >
                      📈 Marketing Jobs
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setJobType('combined-data');
                        setSearchTerm('data scientist');
                        fetchJobs({ type: 'combined-data' });
                      }}
                    >
                      📊 Data Jobs
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setJobType('combined-sales');
                        setSearchTerm('sales');
                        fetchJobs({ type: 'combined-sales' });
                      }}
                    >
                      💼 Sales Jobs
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setJobType('combined-high-paying');
                        setSearchTerm('senior manager director');
                        fetchJobs({ type: 'combined-high-paying' });
                      }}
                    >
                      💰 High-Paying Jobs
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="pt-6">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-red-600 mb-4">
                  <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Unable to load jobs</h3>
                  <p className="text-sm">{error}</p>
                </div>
                <Button onClick={() => fetchJobs()} variant="outline">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : jobs.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Building className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
                <Button onClick={() => fetchJobs()} variant="outline">
                  Refresh
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-4">
                  <p className="text-gray-600">
                    Found {jobs.length} job{jobs.length !== 1 ? 's' : ''}
                  </p>
                  {(usajobsCount > 0 || jobicyCount > 0 || joinriseCount > 0 || adzunaCount > 0) && (
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      {usajobsCount > 0 && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          {usajobsCount} Government
                        </span>
                      )}
                      {jobicyCount > 0 && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          {jobicyCount} Remote-focused
                        </span>
                      )}
                      {joinriseCount > 0 && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          {joinriseCount} Global
                        </span>
                      )}
                      {adzunaCount > 0 && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          {adzunaCount} Worldwide
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {job.title}
                        </h3>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{job.company}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{job.location}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>Posted {formatRelativeDate(job.postedDate)}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{formatSalary(job.salary)}</span>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {job.remote && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Users className="h-3 w-3 mr-1" />
                              Remote Work
                            </span>
                          )}

                          {job.source && (
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              job.source === 'usajobs'
                                ? 'bg-blue-100 text-blue-800'
                                : job.source === 'jobicy'
                                ? 'bg-purple-100 text-purple-800'
                                : job.source === 'joinrise'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {job.source === 'usajobs'
                                ? 'Government'
                                : job.source === 'jobicy'
                                ? 'Remote-focused'
                                : job.source === 'joinrise'
                                ? 'Global'
                                : 'Worldwide'}
                            </span>
                          )}

                          {job.industry && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {job.industry}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button asChild className="flex-1">
                          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                            Apply Now
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                        {job.source === 'usajobs' && (
                          <Button variant="outline" asChild>
                            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                              Details
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;
