// --- API Response Envelope ---------------------------------------------------
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// --- Profile -----------------------------------------------------------------
export interface Profile {
  _id: string;
  name: string;
  title: string;
  location: string;
  email: string;
  about: string;
  heroImage?: string;
  aboutImage?: string;
  cv?: string;
  createdAt: string;
  updatedAt: string;
}

// --- Project -----------------------------------------------------------------
export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// --- Skill -------------------------------------------------------------------
export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Tools & Platforms';

export interface Skill {
  _id: string;
  name: string;
  category: SkillCategory;
  icon: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Education ---------------------------------------------------------------
export interface Education {
  _id: string;
  institution: string;
  level: string;
  degree: string;
  startYear: string;
  endYear: string;
  description?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// --- Service -----------------------------------------------------------------
export interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Message -----------------------------------------------------------------
export type MessageStatus = 'unread' | 'read' | 'archived';

export interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  status: MessageStatus;
  createdAt: string;
  updatedAt: string;
}

export interface MessageFormData {
  name: string;
  email: string;
  message: string;
  website?: string;
  honeypot?: string;
}


// --- Site Setting ------------------------------------------------------------
export interface SocialLinks {
  github?: string;
  linkedin?: string;
  instagram?: string;
  tiktok?: string;
}

export interface SiteSetting {
  _id?: string;
  siteTitle: string;
  siteDescription: string;
  socialLinks: SocialLinks;
  contactEmail: string;
  footerText: string;
  seoTitle: string;
  seoDescription: string;
  createdAt?: string;
  updatedAt?: string;
}

// --- Media Asset -------------------------------------------------------------
export interface MediaAsset {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
  size: number;
  fileType: string;
  createdAt?: string;
}

// --- Dashboard Stats ---------------------------------------------------------
export interface DashboardMetrics {
  totalProjects: number;
  publishedProjects: number;
  featuredProjects: number;
  totalSkills: number;
  activeSkills: number;
  totalEducation: number;
  totalServices: number;
  activeServices: number;
  totalMessages: number;
  unreadMessages: number;
}

export interface DashboardStats {
  metrics: DashboardMetrics;
  recentProjects: Project[];
  recentMessages: Message[];
  status: {
    portfolioOnline: boolean;
    databaseConnected: boolean;
    lastUpdated: string;
  };
}

// --- Auth --------------------------------------------------------------------
export interface Admin {
  id: string;
  name: string;
  email: string;
  lastLogin?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
