'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { BarChart3, Eye, TrendingUp, Calendar } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface AnalyticsData {
  totalEvents: number;
  uniquePages: number;
  topPages: { url: string; views: number }[];
  eventsByType: { name: string; count: number }[];
  dailyStats: { date: string; events: number; uniquePages: number }[];
}

const AnalyticsPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(7);

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics?days=${timeRange}`, {
        headers: {
          'Authorization': 'Bearer admin', // Simple auth for demo
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    loadAnalytics();
  }, [timeRange, loadAnalytics]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <BarChart3 className="h-8 w-8 animate-pulse mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Loading analytics...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!analytics) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Analytics Data</h2>
          <p className="text-gray-600 mb-6">
            Analytics data will appear here once visitors start using your blog.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-blue-700 text-sm">
              <strong>Note:</strong> Make sure to add your Google Analytics ID to the environment variables for full tracking.
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const stats = [
    {
      name: 'Total Events',
      value: analytics.totalEvents,
      icon: BarChart3,
      color: 'bg-blue-500',
      change: `Last ${timeRange} days`
    },
    {
      name: 'Unique Pages',
      value: analytics.uniquePages,
      icon: Eye,
      color: 'bg-green-500',
      change: 'Pages viewed'
    },
    {
      name: 'Top Events',
      value: analytics.eventsByType[0]?.count || 0,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: analytics.eventsByType[0]?.name || 'N/A'
    },
    {
      name: 'Daily Average',
      value: Math.round(analytics.totalEvents / timeRange),
      icon: Calendar,
      color: 'bg-orange-500',
      change: 'Events per day'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Track your blog performance and user engagement</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(parseInt(e.target.value))}
              className="form-input"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
            <Button onClick={loadAnalytics} variant="outline">
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Top Pages</h3>
              <p className="text-sm text-gray-600">Most viewed blog posts</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topPages.length > 0 ? (
                  analytics.topPages.map((page, index) => (
                    <div key={page.url} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {page.url.replace('/blog/', '').replace(/^\//, '') || 'Homepage'}
                        </p>
                        <p className="text-xs text-gray-500">#{index + 1}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{page.views}</p>
                        <p className="text-xs text-gray-500">views</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No page views yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Event Types */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Event Types</h3>
              <p className="text-sm text-gray-600">User interaction breakdown</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.eventsByType.length > 0 ? (
                  analytics.eventsByType.slice(0, 8).map((event) => (
                    <div key={event.name} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {event.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{event.count}</p>
                        <p className="text-xs text-gray-500">events</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No events tracked yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Stats Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Daily Activity</h3>
            <p className="text-sm text-gray-600">Events and page views over time</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.dailyStats.length > 0 ? (
                <div className="grid grid-cols-7 gap-2">
                  {analytics.dailyStats.map((day) => (
                    <div key={day.date} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="bg-blue-100 rounded p-2">
                        <div className="text-sm font-semibold text-blue-900">{day.events}</div>
                        <div className="text-xs text-blue-600">events</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No daily data available</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Setup Instructions */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Analytics Setup</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Google Analytics Integration</h4>
                <p className="text-blue-700 text-sm mb-3">
                  To enable full analytics tracking, add your Google Analytics ID to your environment variables:
                </p>
                <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
                </code>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Current Tracking</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>✅ Page views and blog post views</li>
                  <li>✅ User engagement and reading progress</li>
                  <li>✅ Search queries and interactions</li>
                  <li>✅ Performance metrics and Core Web Vitals</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;
