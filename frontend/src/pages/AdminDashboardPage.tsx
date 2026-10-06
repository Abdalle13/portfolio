import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  FolderGit2,
  Cpu,
  GraduationCap,
  Briefcase,
  Mail,
  TrendingUp,
  Loader2,
} from 'lucide-react';
import { dashboardApi } from '@/services/api';

const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700/50 ${className}`} />
);

export const AdminDashboardPage: React.FC = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: dashboardApi.getStats,
    refetchInterval: 30_000,
  });

  const statCards = [
    {
      name: 'Total Projects',
      value: stats?.projects ?? 0,
      sub: `${stats?.projects ?? 0} published`,
      icon: FolderGit2,
    },
    {
      name: 'Skills Active',
      value: stats?.skills ?? 0,
      sub: 'Across categories',
      icon: Cpu,
    },
    {
      name: 'Education Entries',
      value: stats?.education ?? 0,
      sub: 'Academic records',
      icon: GraduationCap,
    },
    {
      name: 'Services Offered',
      value: stats?.services ?? 0,
      sub: 'All active',
      icon: Briefcase,
    },
    {
      name: 'Unread Inquiries',
      value: stats?.unreadMessages ?? 0,
      sub: `${stats?.messages ?? 0} total messages`,
      icon: Mail,
      highlight: (stats?.unreadMessages ?? 0) > 0,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Welcome back, Abdalle. Manage your portfolio content and messages.
        </p>
      </div>

      {/* Metric Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className={`p-5 rounded-2xl border bg-white dark:bg-slate-900 shadow-sm space-y-3 transition-colors ${
                  stat.highlight
                    ? 'border-primary-400 dark:border-primary-600'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {stat.name}
                  </span>
                  <div
                    className={`p-2 rounded-xl ${
                      stat.highlight
                        ? 'bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300'
                        : 'bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500">{stat.sub}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Portfolio Status
            </h2>
          </div>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { label: 'Projects', count: stats?.projects ?? 0, total: 10 },
                { label: 'Skills', count: stats?.skills ?? 0, total: 30 },
                { label: 'Services', count: stats?.services ?? 0, total: 8 },
              ].map(({ label, count, total }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>{label}</span>
                    <span className="font-medium">{count}/{total}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-1.5 rounded-full bg-primary-500 transition-all"
                      style={{ width: `${Math.min((count / total) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Inbox Summary
            </h2>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-sm text-slate-600 dark:text-slate-400">Total Messages</span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {stats?.messages ?? 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-sm text-slate-600 dark:text-slate-400">Unread</span>
                <span className={`text-sm font-bold ${
                  (stats?.unreadMessages ?? 0) > 0
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-slate-900 dark:text-slate-100'
                }`}>
                  {stats?.unreadMessages ?? 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-sm text-slate-600 dark:text-slate-400">Read</span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {(stats?.messages ?? 0) - (stats?.unreadMessages ?? 0)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
