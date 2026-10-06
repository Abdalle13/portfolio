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
export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface Profile {
  _id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  avatarUrl?: string;
  resumeUrl?: string;
  socialLinks?: SocialLinks;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Project -----------------------------------------------------------------
export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Skill -------------------------------------------------------------------
export interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Education ---------------------------------------------------------------
export interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  current: boolean;
  description?: string;
  grade?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Service -----------------------------------------------------------------
export interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  features: string[];
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Message -----------------------------------------------------------------
export interface Message {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  ipAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// --- SiteSetting -------------------------------------------------------------
export interface SiteSetting {
  _id: string;
  key: string;
  value: string | boolean | number | string[];
  type: 'string' | 'boolean' | 'number' | 'array';
  group: string;
  label: string;
  description?: string;
  updatedAt: string;
}

// --- Dashboard Stats ---------------------------------------------------------
export interface DashboardStats {
  projects: number;
  skills: number;
  education: number;
  services: number;
  messages: number;
  unreadMessages: number;
}

// --- Auth --------------------------------------------------------------------
export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
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
