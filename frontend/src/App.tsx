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
  if (isLoading) return null;
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
