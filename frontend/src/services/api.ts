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
      const { data } = await api.post<ApiResponse<Admin>>(
        '/auth/login',
        credentials
      );
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
      const { data } = await api.get<ApiResponse<Profile>>('/public/profile');
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
      const { data } = await api.get<ApiResponse<Project[]>>('/public/projects');
      return data.data ?? [];
    } catch {
      return [];
    }
  },

  getBySlug: async (slug: string): Promise<Project | null> => {
    try {
      const { data } = await api.get<ApiResponse<Project>>(
        `/public/projects/${slug}`
      );
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
      const { data } = await api.get<ApiResponse<Skill[]>>('/public/skills');
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
      const { data } = await api.get<ApiResponse<Education[]>>(
        '/public/education'
      );
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
      const { data } = await api.get<ApiResponse<Service[]>>(
        '/public/services'
      );
      return data.data ?? [];
    } catch {
      return [];
    }
  },
};

// --- Public: Contact ---------------------------------------------------------
export const contactApi = {
  send: async (form: MessageFormData): Promise<void> => {
    try {
      await api.post('/public/contact', form);
    } catch (err) {
      throw new Error(extractMessage(err));
    }
  },
};

// --- Admin: Dashboard --------------------------------------------------------
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const { data } = await api.get<ApiResponse<DashboardStats>>(
      '/admin/dashboard'
    );
    return data.data!;
  },
};

// --- Admin: Messages ---------------------------------------------------------
export const messagesApi = {
  getAll: async (): Promise<Message[]> => {
    const { data } = await api.get<ApiResponse<Message[]>>('/admin/messages');
    return data.data ?? [];
  },

  markRead: async (id: string): Promise<void> => {
    await api.patch(`/admin/messages/${id}/read`);
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
    project: Omit<Project, '_id' | 'slug' | 'createdAt' | 'updatedAt'>
  ): Promise<Project> => {
    const { data } = await api.post<ApiResponse<Project>>(
      '/admin/projects',
      project
    );
    return data.data!;
  },

  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    const { data } = await api.put<ApiResponse<Project>>(
      `/admin/projects/${id}`,
      project
    );
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
    const { data } = await api.put<ApiResponse<Skill>>(
      `/admin/skills/${id}`,
      skill
    );
    return data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/skills/${id}`);
  },
};

export default api;
