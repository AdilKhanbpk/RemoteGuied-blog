import { JoinriseSearchParams, JoinriseApiResponse, JoinriseJob } from '@/types/usajobs';

const JOINRISE_API_BASE = 'https://api.joinrise.io/api/v1/jobs/public';

// Cache for API responses
const cache = new Map<string, { data: JoinriseApiResponse; timestamp: number }>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export class JoinriseAPI {
  private static async makeRequest(params: JoinriseSearchParams): Promise<JoinriseApiResponse> {
    const url = new URL(JOINRISE_API_BASE);
    
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
      throw new Error(`Joinrise API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      jobs: data.jobs || [],
      total: data.total || 0,
      page: data.page || 1,
      limit: data.limit || 10,
    };
  }

  public static async searchJobs(searchParams: JoinriseSearchParams = {}): Promise<JoinriseApiResponse> {
    // Create cache key
    const cacheKey = JSON.stringify(searchParams);
    
    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      // Default parameters
      const defaultParams: JoinriseSearchParams = {
        page: 1,
        limit: 20,
        sort: 'desc',
        sortedBy: 'createdAt',
        ...searchParams,
      };

      const result = await this.makeRequest(defaultParams);

      // Cache the response
      cache.set(cacheKey, { data: result, timestamp: Date.now() });

      return result;
    } catch (error) {
      console.error('Error fetching Joinrise data:', error);
      return {
        jobs: [],
        total: 0,
        page: 1,
        limit: 20,
      };
    }
  }

  // Predefined searches for common job types
  public static async getTechJobs(): Promise<JoinriseApiResponse> {
    return this.searchJobs({
      q: 'software developer programmer engineer IT technology data analyst computer systems',
      limit: 30,
    });
  }

  public static async getRemoteJobs(): Promise<JoinriseApiResponse> {
    return this.searchJobs({
      jobLoc: 'Remote',
      limit: 30,
    });
  }

  public static async getRemoteTechJobs(): Promise<JoinriseApiResponse> {
    return this.searchJobs({
      q: 'software developer programmer engineer IT technology',
      jobLoc: 'Remote',
      limit: 25,
    });
  }

  public static async getDesignJobs(): Promise<JoinriseApiResponse> {
    return this.searchJobs({
      q: 'designer ui ux graphic web design creative',
      limit: 20,
    });
  }

  public static async getMarketingJobs(): Promise<JoinriseApiResponse> {
    return this.searchJobs({
      q: 'marketing manager social media content digital marketing',
      limit: 20,
    });
  }

  public static async getWritingJobs(): Promise<JoinriseApiResponse> {
    return this.searchJobs({
      q: 'writer content copywriter editor technical writing',
      limit: 20,
    });
  }

  public static async getSalesJobs(): Promise<JoinriseApiResponse> {
    return this.searchJobs({
      q: 'sales manager account executive business development',
      limit: 20,
    });
  }

  public static async getDataJobs(): Promise<JoinriseApiResponse> {
    return this.searchJobs({
      q: 'data scientist analyst machine learning AI artificial intelligence',
      limit: 20,
    });
  }

  // Search by keyword and location (for integration with search form)
  public static async searchByKeyword(keyword: string, location?: string): Promise<JoinriseApiResponse> {
    const params: JoinriseSearchParams = {
      q: keyword,
      limit: 30,
    };

    if (location) {
      // Check if location is "remote" or specific location
      if (location.toLowerCase().includes('remote')) {
        params.jobLoc = 'Remote';
      } else {
        params.jobLoc = location;
      }
    }

    return this.searchJobs(params);
  }

  // Get jobs by specific location
  public static async getJobsByLocation(location: string): Promise<JoinriseApiResponse> {
    return this.searchJobs({
      jobLoc: location,
      limit: 25,
    });
  }

  // Clear cache (useful for testing or manual refresh)
  public static clearCache(): void {
    cache.clear();
  }
}
