export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  readingTime: number;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  seoImage: string;
  seoCanonicalUrl: string;
  seoRobots: string;
  seoStructuredData: string;
  seoTwitterCard: string;
  seoOpenGraph: string;
  seoSchemaOrg: string;
  seoGoogleNews: string;
  seoBing: string;
  seoPinterest: string;
  seoLinkedin: string;
  seoDuckDuckGo: string;
  seoYandex: string;
  seoBaidu: string;
  seoYahoo: string;
  seoTumblr: string;
  seoInstagram: string;
  seoFacebook: string;
  seoReddit: string;
  seoVk: string;
  seoOk: string;
  seoQwant: string;
  seoAsk: string;
  seoAol: string;
  seoBlekko: string;
  seoDogpile: string;
  seoMojeek: string;
  seoSogou: string;
  seoNaver: string;
  seoQihoo: string;
  seo360: string;
  seoSo: string;
  seoHaosou: string;
  seoSoso: string;
  seoYoudao: string;
  seoYidao: string;
  seoZhongsou: string;
  seoHao123: string;
  seoSohu: string;
  seoSina: string;
  seoMSN: string;
  seoYahooJP: string;
  seoRakuten: string;
  seoExcite: string;
  seoLycos: string;
  seoAltaVista: string;
  seoInfoSpace: string;
  seoLycosUK: string;
  seoAllTheWeb: string;
  seoWiseNut: string;
  seoWebcrawler: string;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface Author {
  name: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  remote: boolean;
  url: string;
  postedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
