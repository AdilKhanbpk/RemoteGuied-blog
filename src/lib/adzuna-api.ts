import { AdzunaSearchParams, AdzunaApiResponse, AdzunaJob } from '@/types/usajobs';

// Note: In production, these should be environment variables
// For demo purposes, you can get free API keys from https://api.adzuna.com/
const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID || 'demo'; // Replace with your app ID
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY || 'demo'; // Replace with your API key
const ADZUNA_API_BASE = 'https://api.adzuna.com/v1/api/jobs';

// Cache for API responses
const cache = new Map<string, { data: AdzunaApiResponse; timestamp: number }>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export class AdzunaAPI {
  private static async makeRequest(
    country: string = 'us',
    page: number = 1,
    params: AdzunaSearchParams = {}
  ): Promise<AdzunaApiResponse> {
    const url = new URL(`${ADZUNA_API_BASE}/${country}/search/${page}`);
    
    // Add required authentication
    url.searchParams.append('app_id', ADZUNA_APP_ID);
    url.searchParams.append('app_key', ADZUNA_APP_KEY);
    
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
      throw new Error(`Adzuna API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      results: data.results || [],
      count: data.count || 0,
      mean: data.mean,
    };
  }

  public static async searchJobs(
    searchParams: AdzunaSearchParams = {},
    country: string = 'us'
  ): Promise<AdzunaApiResponse> {
    // Skip if no API credentials (for demo purposes)
    if (ADZUNA_APP_ID === 'demo' || ADZUNA_APP_KEY === 'demo') {
      console.warn('Adzuna API credentials not configured. Returning empty results.');
      return {
        results: [],
        count: 0,
      };
    }

    // Create cache key
    const cacheKey = JSON.stringify({ searchParams, country });
    
    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      // Default parameters
      const defaultParams: AdzunaSearchParams = {
        results_per_page: 20,
        sort_by: 'date',
        ...searchParams,
      };

      const result = await this.makeRequest(country, 1, defaultParams);

      // Cache the response
      cache.set(cacheKey, { data: result, timestamp: Date.now() });

      return result;
    } catch (error) {
      console.error('Error fetching Adzuna data:', error);
      return {
        results: [],
        count: 0,
      };
    }
  }

  // Predefined searches for common job types
  public static async getTechJobs(country: string = 'us'): Promise<AdzunaApiResponse> {
    return this.searchJobs({
      what: 'software engineer developer programmer',
      results_per_page: 25,
    }, country);
  }

  public static async getRemoteJobs(country: string = 'us'): Promise<AdzunaApiResponse> {
    return this.searchJobs({
      where: 'Remote',
      results_per_page: 25,
    }, country);
  }

  public static async getRemoteTechJobs(country: string = 'us'): Promise<AdzunaApiResponse> {
    return this.searchJobs({
      what: 'software engineer developer programmer',
      where: 'Remote',
      results_per_page: 20,
    }, country);
  }

  public static async getDesignJobs(country: string = 'us'): Promise<AdzunaApiResponse> {
    return this.searchJobs({
      what: 'designer ui ux graphic web design',
      results_per_page: 20,
    }, country);
  }

  public static async getMarketingJobs(country: string = 'us'): Promise<AdzunaApiResponse> {
    return this.searchJobs({
      what: 'marketing manager social media digital marketing',
      results_per_page: 20,
    }, country);
  }

  public static async getDataJobs(country: string = 'us'): Promise<AdzunaApiResponse> {
    return this.searchJobs({
      what: 'data scientist analyst machine learning',
      results_per_page: 20,
    }, country);
  }

  public static async getSalesJobs(country: string = 'us'): Promise<AdzunaApiResponse> {
    return this.searchJobs({
      what: 'sales manager account executive',
      results_per_page: 20,
    }, country);
  }

  public static async getHighPayingJobs(
    minSalary: number = 80000,
    country: string = 'us'
  ): Promise<AdzunaApiResponse> {
    return this.searchJobs({
      salary_min: minSalary,
      results_per_page: 20,
    }, country);
  }

  // Search by keyword and location (for integration with search form)
  public static async searchByKeyword(
    keyword: string,
    location?: string,
    country: string = 'us'
  ): Promise<AdzunaApiResponse> {
    const params: AdzunaSearchParams = {
      what: keyword,
      results_per_page: 25,
    };

    if (location) {
      params.where = location;
    }

    return this.searchJobs(params, country);
  }

  // Get jobs by specific location
  public static async getJobsByLocation(
    location: string,
    country: string = 'us'
  ): Promise<AdzunaApiResponse> {
    return this.searchJobs({
      where: location,
      results_per_page: 25,
    }, country);
  }

  // Clear cache (useful for testing or manual refresh)
  public static clearCache(): void {
    cache.clear();
  }
}
