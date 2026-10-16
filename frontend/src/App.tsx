import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { RootLayout } from '@/layouts/RootLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

// ─── Lazy-loaded pages for code splitting ───────────────────────────────────
const HomePage               = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })));
const AdminLoginPage         = lazy(() => import('@/pages/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboardPage     = lazy(() => import('@/pages/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const AdminProjectsPage      = lazy(() => import('@/pages/AdminProjectsPage').then(m => ({ default: m.AdminProjectsPage })));
const AdminSkillsPage        = lazy(() => import('@/pages/AdminSkillsPage').then(m => ({ default: m.AdminSkillsPage })));
const AdminEducationPage     = lazy(() => import('@/pages/AdminEducationPage').then(m => ({ default: m.AdminEducationPage })));
const AdminServicesPage      = lazy(() => import('@/pages/AdminServicesPage').then(m => ({ default: m.AdminServicesPage })));
const AdminMessagesPage      = lazy(() => import('@/pages/AdminMessagesPage').then(m => ({ default: m.AdminMessagesPage })));
const AdminProfileSettingsPage = lazy(() => import('@/pages/AdminProfileSettingsPage').then(m => ({ default: m.AdminProfileSettingsPage })));
const AdminMediaPage         = lazy(() => import('@/pages/AdminMediaPage').then(m => ({ default: m.AdminMediaPage })));
const NotFoundPage           = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// ─── Page-level loading fallback ────────────────────────────────────────────
const PageLoader: React.FC = () => (
  <div
    className="min-h-screen flex items-center justify-center bg-slate-900"
    role="status"
    aria-label="Loading page"
  >
    <div className="flex flex-col items-center space-y-3">
      <div
        className="w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"
        aria-hidden="true"
      />
      <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">Loading…</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// ─── Protected Route Guard ───────────────────────────────────────────────────
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-slate-900 text-white"
        role="status"
        aria-label="Verifying session"
      >
        <div className="flex flex-col items-center space-y-3">
          <div
            className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          />
          <p className="text-xs text-slate-400 font-medium">Verifying session…</p>
        </div>
      </div>
    );
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

// ─── App ─────────────────────────────────────────────────────────────────────
export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
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
                  <Route path="projects"  element={<AdminProjectsPage />} />
                  <Route path="skills"    element={<AdminSkillsPage />} />
                  <Route path="education" element={<AdminEducationPage />} />
                  <Route path="services"  element={<AdminServicesPage />} />
                  <Route path="messages"  element={<AdminMessagesPage />} />
                  <Route path="media"     element={<AdminMediaPage />} />
                  <Route path="profile"   element={<AdminProfileSettingsPage />} />
                  <Route path="settings"  element={<AdminProfileSettingsPage />} />
                  <Route path="*"         element={<Navigate to="/admin" replace />} />
                </Route>

                {/* 404 Catch-All */}
                <Route path="*" element={<RootLayout />}>
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
