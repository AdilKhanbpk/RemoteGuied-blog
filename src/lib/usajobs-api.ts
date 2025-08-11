import { USAJobsSearchParams, USAJobsSearchResult, USAJob, USAJobsApiResponse } from '@/types/usajobs';

const USAJOBS_API_BASE = 'https://data.usajobs.gov/api/search';
const API_KEY = 'PuIuWYw9etqSiQsKFhBrSmw5jx9dtwMR5x3XXZwQz8E=';
const USER_AGENT = 'remotework.blog'; // Your app name/email for tracking

// Cache for API responses (in production, use Redis or similar)
const cache = new Map<string, { data: USAJobsApiResponse; timestamp: number }>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export class USAJobsAPI {
  private static async makeRequest(params: USAJobsSearchParams): Promise<USAJobsSearchResult> {
    const url = new URL(USAJOBS_API_BASE);
    
    // Add search parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Host': 'data.usajobs.gov',
        'User-Agent': USER_AGENT,
        'Authorization-Key': API_KEY,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`USAJOBS API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private static transformJob(item: any): USAJob {
    const job = item.MatchedObjectDescriptor;
    const details = job.UserArea?.Details || {};

    // More robust remote work detection
    const isRemote = details.RemoteIndicator === true || details.RemoteIndicator === 'true';
    const isTeleworkEligible = details.TeleworkEligible === true || details.TeleworkEligible === 'true';

    return {
      id: job.PositionID,
      title: job.PositionTitle,
      agency: job.OrganizationName,
      department: job.DepartmentName,
      location: job.PositionLocationDisplay,
      salaryMin: job.PositionRemuneration?.[0]?.MinimumRange,
      salaryMax: job.PositionRemuneration?.[0]?.MaximumRange,
      schedule: job.PositionSchedule?.[0]?.Name || 'Full-time',
      remote: isRemote,
      teleworkEligible: isTeleworkEligible,
      applyUrl: job.ApplyURI?.[0] || details.ApplyOnlineUrl || job.PositionURI,
      detailsUrl: job.PositionURI,
      postedDate: job.PublicationStartDate,
      closeDate: job.ApplicationCloseDate,
      summary: details.JobSummary || job.QualificationSummary || '',
      grade: details.LowGrade && details.HighGrade ? `${details.LowGrade}-${details.HighGrade}` : undefined,
      openings: details.TotalOpenings || '1',
      category: job.JobCategory?.[0]?.Name || 'General',
    };
  }

  public static async searchJobs(searchParams: USAJobsSearchParams = {}): Promise<USAJobsApiResponse> {
    // Create cache key
    const cacheKey = JSON.stringify(searchParams);
    
    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      // Default parameters for remote/tech jobs
      const defaultParams: USAJobsSearchParams = {
        ResultsPerPage: 25,
        SortField: 'DatePosted',
        SortDirection: 'Desc',
        DatePosted: 30, // Last 30 days
        ...searchParams,
      };

      const result = await this.makeRequest(defaultParams);
      
      const jobs = result.SearchResult.SearchResultItems?.map(item => 
        this.transformJob(item)
      ) || [];

      const response: USAJobsApiResponse = {
        jobs,
        totalCount: result.SearchResult.SearchResultCount,
        hasMore: result.SearchResult.SearchResultCount > jobs.length,
      };

      // Cache the response
      cache.set(cacheKey, { data: response, timestamp: Date.now() });

      return response;
    } catch (error) {
      console.error('Error fetching USAJOBS data:', error);
      return {
        jobs: [],
        totalCount: 0,
        hasMore: false,
        error: error instanceof Error ? error.message : 'Failed to fetch jobs',
      };
    }
  }

  // Predefined searches for common remote/tech jobs
  public static async getRemoteJobs(): Promise<USAJobsApiResponse> {
    return this.searchJobs({
      RemoteIndicator: true,
      WhoMayApply: 'public',
      DatePosted: 30,
      ResultsPerPage: 20,
      SortField: 'DatePosted',
      SortDirection: 'Desc',
    });
  }

  public static async getTechJobs(): Promise<USAJobsApiResponse> {
    return this.searchJobs({
      Keyword: 'software OR developer OR programmer OR engineer OR IT OR technology OR data OR analyst OR computer OR systems',
      WhoMayApply: 'public',
      DatePosted: 30,
      ResultsPerPage: 20,
      SortField: 'DatePosted',
      SortDirection: 'Desc',
    });
  }

  public static async getRemoteTechJobs(): Promise<USAJobsApiResponse> {
    return this.searchJobs({
      Keyword: 'software OR developer OR programmer OR engineer OR IT OR technology OR data OR analyst OR computer OR systems',
      RemoteIndicator: true,
      WhoMayApply: 'public',
      DatePosted: 30,
      ResultsPerPage: 15,
      SortField: 'DatePosted',
      SortDirection: 'Desc',
    });
  }

  // Additional specialized searches
  public static async getHighPayingJobs(minSalary: number = 80000): Promise<USAJobsApiResponse> {
    return this.searchJobs({
      RemunerationMinimumAmount: minSalary,
      WhoMayApply: 'public',
      DatePosted: 30,
      ResultsPerPage: 20,
      SortField: 'DatePosted',
      SortDirection: 'Desc',
    });
  }

  public static async getEntryLevelJobs(): Promise<USAJobsApiResponse> {
    return this.searchJobs({
      PayGradeLow: '05',
      PayGradeHigh: '09',
      WhoMayApply: 'public',
      DatePosted: 30,
      ResultsPerPage: 20,
      SortField: 'DatePosted',
      SortDirection: 'Desc',
    });
  }

  public static async getJobsByLocation(location: string): Promise<USAJobsApiResponse> {
    return this.searchJobs({
      LocationName: location,
      WhoMayApply: 'public',
      DatePosted: 30,
      ResultsPerPage: 20,
      SortField: 'DatePosted',
      SortDirection: 'Desc',
    });
  }

  public static async getFullTimeRemoteJobs(): Promise<USAJobsApiResponse> {
    return this.searchJobs({
      RemoteIndicator: true,
      PositionScheduleTypeCode: '1', // Full-time
      WhoMayApply: 'public',
      DatePosted: 30,
      ResultsPerPage: 20,
      SortField: 'DatePosted',
      SortDirection: 'Desc',
    });
  }

  public static async getSoftwareEngineerJobs(): Promise<USAJobsApiResponse> {
    return this.searchJobs({
      Keyword: 'software engineer OR software developer OR application developer OR systems engineer OR computer engineer',
      WhoMayApply: 'public',
      DatePosted: 30,
      ResultsPerPage: 20,
      SortField: 'DatePosted',
      SortDirection: 'Desc',
    });
  }

  // Clear cache (useful for testing or manual refresh)
  public static clearCache(): void {
    cache.clear();
  }
}
