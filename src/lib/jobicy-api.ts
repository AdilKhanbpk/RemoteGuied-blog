import { JobicySearchParams, JobicyApiResponse, JobicyJob } from '@/types/usajobs';

const JOBICY_API_BASE = 'https://jobicy.com/api/v2/remote-jobs';

// Cache for API responses
const cache = new Map<string, { data: JobicyApiResponse; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour (respecting their guidelines)

export class JobicyAPI {
  private static async makeRequest(params: JobicySearchParams): Promise<JobicyApiResponse> {
    const url = new URL(JOBICY_API_BASE);
    
    // Add search parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'RemoteWorkBlog/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Jobicy API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      jobs: data.jobs || [],
      count: data.count || 0,
    };
  }

  public static async searchJobs(searchParams: JobicySearchParams = {}): Promise<JobicyApiResponse> {
    // Create cache key
    const cacheKey = JSON.stringify(searchParams);
    
    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      // Default parameters
      const defaultParams: JobicySearchParams = {
        count: 50, // Default to 50 jobs
        ...searchParams,
      };

      const result = await this.makeRequest(defaultParams);

      // Cache the response
      cache.set(cacheKey, { data: result, timestamp: Date.now() });

      return result;
    } catch (error) {
      console.error('Error fetching Jobicy data:', error);
      return {
        jobs: [],
        count: 0,
      };
    }
  }

  // Predefined searches for common job types
  public static async getTechJobs(): Promise<JobicyApiResponse> {
    return this.searchJobs({
      tag: 'software developer programmer engineer IT technology data analyst computer systems',
      count: 30,
    });
  }

  public static async getUSAJobs(): Promise<JobicyApiResponse> {
    return this.searchJobs({
      geo: 'usa',
      count: 30,
    });
  }

  public static async getMarketingJobs(): Promise<JobicyApiResponse> {
    return this.searchJobs({
      industry: 'marketing',
      count: 20,
    });
  }

  public static async getDesignJobs(): Promise<JobicyApiResponse> {
    return this.searchJobs({
      tag: 'designer ui ux graphic web design',
      count: 20,
    });
  }

  public static async getWritingJobs(): Promise<JobicyApiResponse> {
    return this.searchJobs({
      industry: 'copywriting',
      tag: 'writer content copywriter editor',
      count: 20,
    });
  }

  public static async getSupportJobs(): Promise<JobicyApiResponse> {
    return this.searchJobs({
      industry: 'supporting',
      count: 20,
    });
  }

  // Search by keyword (for integration with search form)
  public static async searchByKeyword(keyword: string, location?: string): Promise<JobicyApiResponse> {
    const params: JobicySearchParams = {
      tag: keyword,
      count: 30,
    };

    // Map common location terms to Jobicy geo codes
    if (location) {
      const locationLower = location.toLowerCase();
      if (locationLower.includes('usa') || locationLower.includes('united states') || locationLower.includes('america')) {
        params.geo = 'usa';
      } else if (locationLower.includes('canada')) {
        params.geo = 'canada';
      } else if (locationLower.includes('europe') || locationLower.includes('uk') || locationLower.includes('germany') || locationLower.includes('france')) {
        params.geo = 'europe';
      }
    }

    return this.searchJobs(params);
  }

  // Clear cache (useful for testing or manual refresh)
  public static clearCache(): void {
    cache.clear();
  }
}
