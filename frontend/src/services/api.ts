import axios, { AxiosError } from 'axios';
import type {
  ApiResponse,
  Profile,
  Project,
  Skill,
  Education,
  Service,
  MessageFormData,
  DashboardStats,
  Admin,
  LoginCredentials,
  Message,
  SiteSetting,
} from '@/types';

// --- Axios Instance -----------------------------------------------------------
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Error helper ------------------------------------------------------------
function extractMessage(err: unknown): string {
  const axiosErr = err as AxiosError<ApiResponse>;
  return (
    axiosErr.response?.data?.message ||
    axiosErr.message ||
    'An unexpected error occurred'
  );
}

// --- Auth --------------------------------------------------------------------
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<Admin> => {
    try {
      const { data } = await api.post<ApiResponse<Admin>>('/auth/login', credentials);
      return data.data!;
    } catch (err) {
      throw new Error(extractMessage(err));
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore
    }
  },

  getMe: async (): Promise<Admin> => {
    const { data } = await api.get<ApiResponse<Admin>>('/auth/me');
    return data.data!;
  },
};

// --- Public: Profile ---------------------------------------------------------
export const profileApi = {
  get: async (): Promise<Profile | null> => {
    try {
      const { data } = await api.get<ApiResponse<Profile>>('/profile');
      return data.data ?? null;
    } catch {
      return null;
    }
  },
};

// --- Public: Projects --------------------------------------------------------
export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    try {
      const { data } = await api.get<ApiResponse<Project[]>>('/projects');
      return data.data ?? [];
    } catch {
      return [];
    }
  },

  getBySlug: async (slug: string): Promise<Project | null> => {
    try {
      const { data } = await api.get<ApiResponse<Project>>(`/projects/${slug}`);
      return data.data ?? null;
    } catch {
      return null;
    }
  },
};

// --- Public: Skills ----------------------------------------------------------
export const skillsApi = {
  getAll: async (): Promise<Skill[]> => {
    try {
      const { data } = await api.get<ApiResponse<Skill[]>>('/skills');
      return data.data ?? [];
    } catch {
      return [];
    }
  },
};

// --- Public: Education -------------------------------------------------------
export const educationApi = {
  getAll: async (): Promise<Education[]> => {
    try {
      const { data } = await api.get<ApiResponse<Education[]>>('/education');
      return data.data ?? [];
    } catch {
      return [];
    }
  },
};

// --- Public: Services --------------------------------------------------------
export const servicesApi = {
  getAll: async (): Promise<Service[]> => {
    try {
      const { data } = await api.get<ApiResponse<Service[]>>('/services');
      return data.data ?? [];
    } catch {
      return [];
    }
  },
};

// --- Public: Settings --------------------------------------------------------
export const settingsApi = {
  get: async (): Promise<SiteSetting | null> => {
    try {
      const { data } = await api.get<ApiResponse<SiteSetting>>('/settings');
      return data.data ?? null;
    } catch {
      return null;
    }
  },
};

// --- Public: Contact ---------------------------------------------------------
export const contactApi = {
  send: async (form: MessageFormData): Promise<void> => {
    try {
      await api.post('/contact', form);
    } catch (err) {
      throw new Error(extractMessage(err));
    }
  },
};

// --- Admin: Dashboard --------------------------------------------------------
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const { data } = await api.get<ApiResponse<DashboardStats>>('/admin/dashboard');
    return data.data!;
  },
};

// --- Admin: Messages ---------------------------------------------------------
export const messagesApi = {
  getAll: async (filter?: { status?: string; read?: boolean }): Promise<Message[]> => {
    const { data } = await api.get<ApiResponse<Message[]>>('/admin/messages', {
      params: filter,
    });
    return data.data ?? [];
  },

  getById: async (id: string): Promise<Message> => {
    const { data } = await api.get<ApiResponse<Message>>(`/admin/messages/${id}`);
    return data.data!;
  },

  markRead: async (id: string, read: boolean = true, status?: string): Promise<Message> => {
    const { data } = await api.patch<ApiResponse<Message>>(`/admin/messages/${id}/read`, {
      read,
      status,
    });
    return data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/messages/${id}`);
  },
};

// --- Admin: Projects ---------------------------------------------------------
export const adminProjectsApi = {
  getAll: async (): Promise<Project[]> => {
    const { data } = await api.get<ApiResponse<Project[]>>('/admin/projects');
    return data.data ?? [];
  },

  create: async (
    project: Omit<Project, '_id' | 'slug' | 'createdAt' | 'updatedAt'> & { slug?: string }
  ): Promise<Project> => {
    const { data } = await api.post<ApiResponse<Project>>('/admin/projects', project);
    return data.data!;
  },

  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    const { data } = await api.put<ApiResponse<Project>>(`/admin/projects/${id}`, project);
    return data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/projects/${id}`);
  },
};

// --- Admin: Skills -----------------------------------------------------------
export const adminSkillsApi = {
  getAll: async (): Promise<Skill[]> => {
    const { data } = await api.get<ApiResponse<Skill[]>>('/admin/skills');
    return data.data ?? [];
  },

  create: async (
    skill: Omit<Skill, '_id' | 'createdAt' | 'updatedAt'>
  ): Promise<Skill> => {
    const { data } = await api.post<ApiResponse<Skill>>('/admin/skills', skill);
    return data.data!;
  },

  update: async (id: string, skill: Partial<Skill>): Promise<Skill> => {
    const { data } = await api.put<ApiResponse<Skill>>(`/admin/skills/${id}`, skill);
    return data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/skills/${id}`);
  },
};

// --- Admin: Education --------------------------------------------------------
export const adminEducationApi = {
  getAll: async (): Promise<Education[]> => {
    const { data } = await api.get<ApiResponse<Education[]>>('/admin/education');
    return data.data ?? [];
  },

  create: async (
    education: Omit<Education, '_id' | 'createdAt' | 'updatedAt'>
  ): Promise<Education> => {
    const { data } = await api.post<ApiResponse<Education>>('/admin/education', education);
    return data.data!;
  },

  update: async (id: string, education: Partial<Education>): Promise<Education> => {
    const { data } = await api.put<ApiResponse<Education>>(`/admin/education/${id}`, education);
    return data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/education/${id}`);
  },
};

// --- Admin: Services ---------------------------------------------------------
export const adminServicesApi = {
  getAll: async (): Promise<Service[]> => {
    const { data } = await api.get<ApiResponse<Service[]>>('/admin/services');
    return data.data ?? [];
  },

  create: async (
    service: Omit<Service, '_id' | 'createdAt' | 'updatedAt'>
  ): Promise<Service> => {
    const { data } = await api.post<ApiResponse<Service>>('/admin/services', service);
    return data.data!;
  },

  update: async (id: string, service: Partial<Service>): Promise<Service> => {
    const { data } = await api.put<ApiResponse<Service>>(`/admin/services/${id}`, service);
    return data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/services/${id}`);
  },
};

// --- Admin: Profile & Settings ------------------------------------------------
export const adminProfileApi = {
  get: async (): Promise<Profile> => {
    const { data } = await api.get<ApiResponse<Profile>>('/admin/profile');
    return data.data!;
  },

  update: async (profile: Partial<Profile>): Promise<Profile> => {
    const { data } = await api.put<ApiResponse<Profile>>('/admin/profile', profile);
    return data.data!;
  },
};

export const adminSettingsApi = {
  get: async (): Promise<SiteSetting> => {
    const { data } = await api.get<ApiResponse<SiteSetting>>('/admin/settings');
    return data.data!;
  },

  update: async (settings: Partial<SiteSetting>): Promise<SiteSetting> => {
    const { data } = await api.put<ApiResponse<SiteSetting>>('/admin/settings', settings);
    return data.data!;
  },
};

export default api;
