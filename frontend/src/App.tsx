import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { RootLayout } from '@/layouts/RootLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { HomePage } from '@/pages/HomePage';
import { AdminLoginPage } from '@/pages/AdminLoginPage';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';
import { AdminProjectsPage } from '@/pages/AdminProjectsPage';
import { AdminSkillsPage } from '@/pages/AdminSkillsPage';
import { AdminEducationPage } from '@/pages/AdminEducationPage';
import { AdminServicesPage } from '@/pages/AdminServicesPage';
import { AdminMessagesPage } from '@/pages/AdminMessagesPage';
import { AdminProfileSettingsPage } from '@/pages/AdminProfileSettingsPage';
import { AdminMediaPage } from '@/pages/AdminMediaPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// --- Protected Route Guard ----------------------------------------------------
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-medium">Verifying session...</p>
        </div>
      </div>
    );
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};


export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Portfolio Route */}
              <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
              </Route>

              {/* Admin Authentication */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Admin Dashboard CMS */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboardPage />} />
                <Route path="projects" element={<AdminProjectsPage />} />
                <Route path="skills" element={<AdminSkillsPage />} />
                <Route path="education" element={<AdminEducationPage />} />
                <Route path="services" element={<AdminServicesPage />} />
                <Route path="messages" element={<AdminMessagesPage />} />
                <Route path="media" element={<AdminMediaPage />} />
                <Route path="profile" element={<AdminProfileSettingsPage />} />
                <Route path="settings" element={<AdminProfileSettingsPage />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Route>

              {/* 404 Catch-All */}
              <Route path="*" element={<RootLayout />}>
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
