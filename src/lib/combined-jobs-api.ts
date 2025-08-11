import { USAJobsAPI } from './usajobs-api';
import { JobicyAPI } from './jobicy-api';
import { JoinriseAPI } from './joinrise-api';
import { AdzunaAPI } from './adzuna-api';
import { UnifiedJob, CombinedJobsResponse, USAJob, JobicyJob, JoinriseJob, AdzunaJob } from '@/types/usajobs';

export class CombinedJobsAPI {
  // Transform USAJOBS job to unified format
  private static transformUSAJob(job: USAJob): UnifiedJob {
    return {
      id: `usa-${job.id}`,
      title: job.title,
      company: job.agency,
      location: job.location,
      salary: job.salaryMin && job.salaryMax 
        ? `$${parseInt(job.salaryMin).toLocaleString()} - $${parseInt(job.salaryMax).toLocaleString()}`
        : job.salaryMin 
        ? `$${parseInt(job.salaryMin).toLocaleString()}+`
        : undefined,
      type: job.schedule,
      remote: job.remote,
      applyUrl: job.applyUrl,
      postedDate: job.postedDate,
      summary: job.summary,
      source: 'usajobs',
      industry: job.category,
    };
  }

  // Transform Jobicy job to unified format
  private static transformJobicyJob(job: JobicyJob): UnifiedJob {
    const formatSalary = () => {
      if (job.salaryMin && job.salaryMax && job.salaryCurrency) {
        const currency = job.salaryCurrency === 'USD' ? '$' : job.salaryCurrency;
        const period = job.salaryPeriod ? `/${job.salaryPeriod}` : '';
        return `${currency}${job.salaryMin.toLocaleString()} - ${currency}${job.salaryMax.toLocaleString()}${period}`;
      }
      return undefined;
    };

    return {
      id: `jobicy-${job.id}`,
      title: job.jobTitle,
      company: job.companyName,
      location: Array.isArray(job.jobGeo) ? job.jobGeo.join(', ') : (job.jobGeo || 'Remote'),
      salary: formatSalary(),
      type: Array.isArray(job.jobType) ? job.jobType.join(', ') : (job.jobType || 'Full-time'),
      remote: true, // Jobicy focuses on remote jobs
      applyUrl: job.url,
      postedDate: job.pubDate,
      summary: job.jobExcerpt,
      source: 'jobicy',
      logo: job.companyLogo,
      industry: Array.isArray(job.jobIndustry) ? job.jobIndustry.join(', ') : job.jobIndustry,
    };
  }

  // Transform Joinrise job to unified format
  private static transformJoinriseJob(job: JoinriseJob): UnifiedJob {
    return {
      id: `joinrise-${job.id}`,
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      type: job.jobType || 'Full-time',
      remote: job.location?.toLowerCase().includes('remote') || false,
      applyUrl: job.applyUrl,
      postedDate: job.createdAt,
      summary: job.description,
      source: 'joinrise',
      experience: job.experience,
    };
  }

  // Transform Adzuna job to unified format
  private static transformAdzunaJob(job: AdzunaJob): UnifiedJob {
    const formatSalary = () => {
      if (job.salary_min && job.salary_max) {
        return `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`;
      } else if (job.salary_min) {
        return `$${job.salary_min.toLocaleString()}+`;
      }
      return undefined;
    };

    return {
      id: `adzuna-${job.id}`,
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      salary: formatSalary(),
      type: job.contract_type || 'Full-time',
      remote: job.location.display_name?.toLowerCase().includes('remote') || false,
      applyUrl: job.redirect_url,
      postedDate: job.created,
      summary: job.description,
      source: 'adzuna',
      category: job.category.label,
    };
  }

  // Search all four APIs simultaneously
  public static async searchAllAPIs(params: {
    keyword?: string;
    location?: string;
    remote?: boolean;
    limit?: number;
  }): Promise<CombinedJobsResponse> {
    const { keyword, location, remote, limit = 40 } = params;

    try {
      // Search all four APIs in parallel
      const [usajobsPromise, jobicyPromise, joinrisePromise, adzunaPromise] = await Promise.allSettled([
        // USAJOBS search
        keyword
          ? USAJobsAPI.searchJobs({
              Keyword: keyword,
              ...(location && { LocationName: location }),
              ...(remote && { RemoteIndicator: true }),
              ResultsPerPage: Math.min(Math.floor(limit / 4), 12),
              WhoMayApply: 'public',
              DatePosted: 30,
              SortField: 'DatePosted',
              SortDirection: 'Desc',
            })
          : USAJobsAPI.getRemoteTechJobs(),

        // Jobicy search
        keyword
          ? JobicyAPI.searchByKeyword(keyword, location)
          : JobicyAPI.getTechJobs(),

        // Joinrise search
        keyword
          ? JoinriseAPI.searchByKeyword(keyword, location)
          : JoinriseAPI.getRemoteTechJobs(),

        // Adzuna search
        keyword
          ? AdzunaAPI.searchByKeyword(keyword, location)
          : AdzunaAPI.getRemoteTechJobs(),
      ]);

      // Process results
      let usajobsJobs: USAJob[] = [];
      let jobicyJobs: JobicyJob[] = [];
      let joinriseJobs: JoinriseJob[] = [];
      let adzunaJobs: AdzunaJob[] = [];

      if (usajobsPromise.status === 'fulfilled') {
        usajobsJobs = usajobsPromise.value.jobs || [];
      } else {
        console.error('USAJOBS API error:', usajobsPromise.reason);
      }

      if (jobicyPromise.status === 'fulfilled') {
        jobicyJobs = jobicyPromise.value.jobs || [];
      } else {
        console.error('Jobicy API error:', jobicyPromise.reason);
      }

      if (joinrisePromise.status === 'fulfilled') {
        joinriseJobs = joinrisePromise.value.jobs || [];
      } else {
        console.error('Joinrise API error:', joinrisePromise.reason);
      }

      if (adzunaPromise.status === 'fulfilled') {
        adzunaJobs = adzunaPromise.value.results || [];
      } else {
        console.error('Adzuna API error:', adzunaPromise.reason);
      }

      // Transform and combine results
      const transformedUSAJobs = usajobsJobs.map(this.transformUSAJob);
      const transformedJobicyJobs = jobicyJobs.map(this.transformJobicyJob);
      const transformedJoinriseJobs = joinriseJobs.map(this.transformJoinriseJob);
      const transformedAdzunaJobs = adzunaJobs.map(this.transformAdzunaJob);

      // Combine and sort by date (newest first)
      const allJobs = [...transformedUSAJobs, ...transformedJobicyJobs, ...transformedJoinriseJobs, ...transformedAdzunaJobs]
        .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
        .slice(0, limit);

      // Filter for remote jobs if requested
      const filteredJobs = remote ? allJobs.filter(job => job.remote) : allJobs;

      return {
        jobs: filteredJobs,
        usajobsCount: transformedUSAJobs.length,
        jobicyCount: transformedJobicyJobs.length,
        joinriseCount: transformedJoinriseJobs.length,
        adzunaCount: transformedAdzunaJobs.length,
        totalCount: filteredJobs.length,
        error: (usajobsPromise.status === 'rejected' && jobicyPromise.status === 'rejected' && joinrisePromise.status === 'rejected' && adzunaPromise.status === 'rejected')
          ? 'Failed to fetch jobs from all sources'
          : undefined,
      };
    } catch (error) {
      console.error('Error in combined search:', error);
      return {
        jobs: [],
        usajobsCount: 0,
        jobicyCount: 0,
        joinriseCount: 0,
        adzunaCount: 0,
        totalCount: 0,
        error: 'Failed to search jobs',
      };
    }
  }

  // Predefined combined searches across all four APIs
  public static async getTechJobs(): Promise<CombinedJobsResponse> {
    return this.searchAllAPIs({
      keyword: 'software developer engineer programmer',
      limit: 60,
    });
  }

  public static async getRemoteJobs(): Promise<CombinedJobsResponse> {
    return this.searchAllAPIs({
      remote: true,
      limit: 60,
    });
  }

  public static async getDesignJobs(): Promise<CombinedJobsResponse> {
    return this.searchAllAPIs({
      keyword: 'designer ui ux graphic web design',
      limit: 48,
    });
  }

  public static async getMarketingJobs(): Promise<CombinedJobsResponse> {
    return this.searchAllAPIs({
      keyword: 'marketing manager social media content',
      limit: 48,
    });
  }

  public static async getWritingJobs(): Promise<CombinedJobsResponse> {
    return this.searchAllAPIs({
      keyword: 'writer content copywriter editor technical writing',
      limit: 48,
    });
  }

  public static async getDataJobs(): Promise<CombinedJobsResponse> {
    return this.searchAllAPIs({
      keyword: 'data scientist analyst machine learning AI',
      limit: 48,
    });
  }

  public static async getSalesJobs(): Promise<CombinedJobsResponse> {
    return this.searchAllAPIs({
      keyword: 'sales manager account executive business development',
      limit: 48,
    });
  }

  public static async getHighPayingJobs(): Promise<CombinedJobsResponse> {
    return this.searchAllAPIs({
      keyword: 'senior manager director executive',
      limit: 48,
    });
  }
}
