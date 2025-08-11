// USAJOBS API Types - Enhanced with full parameter support
export interface USAJobsSearchParams {
  // Basic search
  Keyword?: string;
  PositionTitle?: string;
  LocationName?: string;
  Organization?: string;

  // Job categories and grades
  JobCategoryCode?: string;
  PayGradeLow?: string;
  PayGradeHigh?: string;

  // Salary filtering
  RemunerationMinimumAmount?: number;
  RemunerationMaximumAmount?: number;

  // Job characteristics
  PositionOfferingTypeCode?: string; // e.g., "15317" for permanent
  PositionScheduleTypeCode?: string; // e.g., "1" for Full-Time, "2" for Part-Time
  TravelPercentage?: string; // "0" = Not Required, "8" = 76%+
  SecurityClearanceRequired?: string;
  RelocationIndicator?: boolean;
  RemoteIndicator?: boolean;

  // Eligibility
  WhoMayApply?: 'public' | 'internal' | 'all';

  // Date filtering
  DatePosted?: number; // Days ago (0-60)

  // Pagination and sorting
  ResultsPerPage?: number; // Max 500
  Page?: number;
  SortField?: 'DatePosted' | 'Relevance' | 'PositionTitle' | 'Department' | 'JobCategory' | 'PayGrade';
  SortDirection?: 'Asc' | 'Desc';
}

export interface USAJobsPosition {
  PositionID: string;
  PositionTitle: string;
  PositionURI: string;
  ApplyURI: string[];
  PositionLocationDisplay: string;
  OrganizationName: string;
  DepartmentName: string;
  JobCategory: Array<{
    Name: string;
    Code: string;
  }>;
  JobGrade: Array<{
    Code: string;
  }>;
  PositionSchedule: Array<{
    Name: string;
    Code: string;
  }>;
  PositionOfferingType: Array<{
    Name: string;
    Code: string;
  }>;
  QualificationSummary: string;
  PositionRemuneration: Array<{
    MinimumRange: string;
    MaximumRange: string;
    RateIntervalCode: string;
  }>;
  PositionStartDate: string;
  PositionEndDate: string;
  PublicationStartDate: string;
  ApplicationCloseDate: string;
  PositionFormattedDescription: Array<{
    Label: string;
    LabelDescription: string;
  }>;
  UserArea: {
    Details: {
      JobSummary: string;
      WhoMayApply: {
        Name: string;
        Code: string;
      };
      LowGrade: string;
      HighGrade: string;
      PromotionPotential: string;
      OrganizationCodes: string;
      Relocation: string;
      HiringPath: string[];
      TotalOpenings: string;
      AgencyMarketingStatement: string;
      TravelCode: string;
      ApplyOnlineUrl: string;
      DetailStatusUrl: string;
      MajorDuties: string[];
      Education: string;
      Requirements: string;
      Evaluations: string;
      HowToApply: string;
      WhatToExpectNext: string;
      RequiredDocuments: string;
      Benefits: string;
      BenefitsUrl: string;
      BenefitsDisplayDefaultText: boolean;
      OtherInformation: string;
      KeyRequirements: string[];
      WithinArea: string;
      CommuteDistance: string;
      ServiceType: string;
      AnnouncementClosingType: string;
      AgencyContactEmail: string;
      AgencyContactPhone: string;
      SecurityClearance: string;
      DrugTest: string;
      AdjudicationType: string[];
      TeleworkEligible: boolean;
      RemoteIndicator: boolean;
    };
  };
}

export interface USAJobsSearchResult {
  SearchResult: {
    SearchResultCount: number;
    SearchResultCountAll: number;
    SearchResultItems: Array<{
      MatchedObjectId: string;
      MatchedObjectDescriptor: USAJobsPosition;
      RelevanceRank: number;
    }>;
  };
}

// Simplified job interface for our application
export interface USAJob {
  id: string;
  title: string;
  agency: string;
  department: string;
  location: string;
  salaryMin?: string;
  salaryMax?: string;
  schedule: string; // Full-time, Part-time, etc.
  remote: boolean;
  teleworkEligible: boolean;
  applyUrl: string;
  detailsUrl: string;
  postedDate: string;
  closeDate: string;
  summary: string;
  grade?: string;
  openings: string;
  category: string;
}

export interface USAJobsApiResponse {
  jobs: USAJob[];
  totalCount: number;
  hasMore: boolean;
  error?: string;
}

// Jobicy API Types
export interface JobicySearchParams {
  count?: number; // 1-100, default: 100
  geo?: string; // e.g., 'usa', 'canada', 'europe'
  industry?: string; // e.g., 'marketing', 'supporting', 'copywriting'
  tag?: string; // Search job title/description
}

export interface JobicyJob {
  id: string;
  url: string;
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
  jobIndustry: string[];
  jobType: string[];
  jobGeo: string[];
  jobLevel: string;
  jobExcerpt: string;
  jobDescription: string;
  pubDate: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  salaryPeriod?: string;
}

export interface JobicyApiResponse {
  jobs: JobicyJob[];
  count: number;
}

// Joinrise API Types
export interface JoinriseSearchParams {
  page?: number;
  limit?: number;
  sort?: 'asc' | 'desc';
  sortedBy?: 'createdAt' | 'title' | 'company';
  jobLoc?: string; // Location or 'Remote'
  q?: string; // Keyword search
}

export interface JoinriseJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
  applyUrl: string;
  createdAt: string;
  requirements?: string;
  jobType?: string;
  experience?: string;
}

export interface JoinriseApiResponse {
  jobs: JoinriseJob[];
  total: number;
  page: number;
  limit: number;
}

// Unified job interface for displaying results from all APIs
export interface UnifiedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  type: string;
  remote: boolean;
  applyUrl: string;
  postedDate: string;
  summary: string;
  source: 'usajobs' | 'jobicy' | 'joinrise';
  logo?: string;
  industry?: string;
  experience?: string;
}

// Combined API response
export interface CombinedJobsResponse {
  jobs: UnifiedJob[];
  usajobsCount: number;
  jobicyCount: number;
  joinriseCount: number;
  totalCount: number;
  error?: string;
}
