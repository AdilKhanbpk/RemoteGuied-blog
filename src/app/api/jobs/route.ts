import { NextRequest, NextResponse } from 'next/server';
import { USAJobsAPI } from '@/lib/usajobs-api';
import { JobicyAPI } from '@/lib/jobicy-api';
import { JoinriseAPI } from '@/lib/joinrise-api';
import { CombinedJobsAPI } from '@/lib/combined-jobs-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get query parameters
    const keyword = searchParams.get('keyword');
    const positionTitle = searchParams.get('positionTitle');
    const location = searchParams.get('location');
    const organization = searchParams.get('organization');
    const jobCategory = searchParams.get('jobCategory');
    const payGradeLow = searchParams.get('payGradeLow');
    const payGradeHigh = searchParams.get('payGradeHigh');
    const minSalary = searchParams.get('minSalary');
    const maxSalary = searchParams.get('maxSalary');
    const remote = searchParams.get('remote') === 'true';
    const fullTime = searchParams.get('fullTime') === 'true';
    const whoMayApply = searchParams.get('whoMayApply') as 'public' | 'internal' | 'all';
    const daysPosted = parseInt(searchParams.get('daysPosted') || '30');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortField = searchParams.get('sortField') as any;
    const sortDirection = searchParams.get('sortDirection') as 'Asc' | 'Desc';

    // Search source preference
    const source = searchParams.get('source'); // 'usajobs', 'jobicy', 'joinrise', or 'all' (default)
    const type = searchParams.get('type');

    let result;

    // Handle combined searches (default behavior - all three APIs)
    if (!source || source === 'all') {
      if (type === 'combined-tech') {
        result = await CombinedJobsAPI.getTechJobs();
      } else if (type === 'combined-remote') {
        result = await CombinedJobsAPI.getRemoteJobs();
      } else if (type === 'combined-design') {
        result = await CombinedJobsAPI.getDesignJobs();
      } else if (type === 'combined-marketing') {
        result = await CombinedJobsAPI.getMarketingJobs();
      } else if (type === 'combined-writing') {
        result = await CombinedJobsAPI.getWritingJobs();
      } else if (type === 'combined-data') {
        result = await CombinedJobsAPI.getDataJobs();
      } else if (type === 'combined-sales') {
        result = await CombinedJobsAPI.getSalesJobs();
      } else {
        // Default combined search across all APIs
        result = await CombinedJobsAPI.searchAllAPIs({
          keyword,
          location,
          remote,
          limit: Math.min(limit, 60),
        });
      }
    }
    // Handle USAJOBS-only searches
    else if (source === 'usajobs') {
      if (type === 'remote') {
        result = await USAJobsAPI.getRemoteJobs();
      } else if (type === 'tech') {
        result = await USAJobsAPI.getTechJobs();
      } else if (type === 'remote-tech') {
        result = await USAJobsAPI.getRemoteTechJobs();
      } else if (type === 'software-engineer') {
        result = await USAJobsAPI.getSoftwareEngineerJobs();
      } else if (type === 'high-paying') {
        const salary = parseInt(searchParams.get('minSalary') || '80000');
        result = await USAJobsAPI.getHighPayingJobs(salary);
      } else if (type === 'entry-level') {
        result = await USAJobsAPI.getEntryLevelJobs();
      } else if (type === 'full-time-remote') {
        result = await USAJobsAPI.getFullTimeRemoteJobs();
      } else if (location && type === 'by-location') {
        result = await USAJobsAPI.getJobsByLocation(location);
      } else {
        // Custom USAJOBS search with enhanced parameters
        const customSearchParams = {
          ...(keyword && { Keyword: keyword }),
          ...(positionTitle && { PositionTitle: positionTitle }),
          ...(location && { LocationName: location }),
          ...(organization && { Organization: organization }),
          ...(jobCategory && { JobCategoryCode: jobCategory }),
          ...(payGradeLow && { PayGradeLow: payGradeLow }),
          ...(payGradeHigh && { PayGradeHigh: payGradeHigh }),
          ...(minSalary && { RemunerationMinimumAmount: parseInt(minSalary) }),
          ...(maxSalary && { RemunerationMaximumAmount: parseInt(maxSalary) }),
          ...(remote && { RemoteIndicator: true }),
          ...(fullTime && { PositionScheduleTypeCode: '1' }),
          ...(whoMayApply && { WhoMayApply: whoMayApply }),
          DatePosted: Math.min(daysPosted, 60), // Max 60 days as per API
          ResultsPerPage: Math.min(limit, 50), // Cap at 50 for performance
          ...(sortField && { SortField: sortField }),
          ...(sortDirection && { SortDirection: sortDirection }),
        };

        result = await USAJobsAPI.searchJobs(customSearchParams);
      }
    }
    // Handle Jobicy-only searches
    else if (source === 'jobicy') {
      if (type === 'tech') {
        result = await JobicyAPI.getTechJobs();
      } else if (type === 'marketing') {
        result = await JobicyAPI.getMarketingJobs();
      } else if (type === 'design') {
        result = await JobicyAPI.getDesignJobs();
      } else if (type === 'writing') {
        result = await JobicyAPI.getWritingJobs();
      } else if (type === 'support') {
        result = await JobicyAPI.getSupportJobs();
      } else {
        // Custom Jobicy search
        result = await JobicyAPI.searchByKeyword(keyword || '', location);
      }
    }
    // Handle Joinrise-only searches
    else if (source === 'joinrise') {
      if (type === 'tech') {
        result = await JoinriseAPI.getTechJobs();
      } else if (type === 'remote') {
        result = await JoinriseAPI.getRemoteJobs();
      } else if (type === 'design') {
        result = await JoinriseAPI.getDesignJobs();
      } else if (type === 'marketing') {
        result = await JoinriseAPI.getMarketingJobs();
      } else if (type === 'writing') {
        result = await JoinriseAPI.getWritingJobs();
      } else if (type === 'sales') {
        result = await JoinriseAPI.getSalesJobs();
      } else if (type === 'data') {
        result = await JoinriseAPI.getDataJobs();
      } else if (location && type === 'by-location') {
        result = await JoinriseAPI.getJobsByLocation(location);
      } else {
        // Custom Joinrise search
        result = await JoinriseAPI.searchByKeyword(keyword || '', location);
      }
    }

    // Additional client-side filtering for USAJOBS results
    if (source === 'usajobs' && remote && !type) {
      result.jobs = result.jobs.filter(job => job.remote || job.teleworkEligible);
    }

    // Limit results for single-source searches
    if (source !== 'both' && result.jobs && result.jobs.length > limit) {
      result.jobs = result.jobs.slice(0, limit);
    }

    // Set cache headers
    const response = NextResponse.json(result);
    response.headers.set('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600'); // 30 min cache

    return response;
  } catch (error) {
    console.error('Error in jobs API route:', error);
    return NextResponse.json(
      {
        jobs: [],
        totalCount: 0,
        hasMore: false,
        error: 'Failed to fetch job listings'
      },
      { status: 500 }
    );
  }
}

// Handle CORS for external requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
