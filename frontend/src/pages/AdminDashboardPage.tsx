import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Cpu,
  GraduationCap,
  Briefcase,
  Mail,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Database,
  Globe,
  Plus,
} from 'lucide-react';
import { dashboardApi } from '@/services/api';

const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800/60 ${className}`} />
);

export const AdminDashboardPage: React.FC = () => {
  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: dashboardApi.getStats,
    refetchInterval: 30_000,
  });

  const metrics = dashboard?.metrics;
  const recentProjects = dashboard?.recentProjects || [];
  const recentMessages = dashboard?.recentMessages || [];

  const statCards = [
    {
      name: 'Total Projects',
      value: metrics?.totalProjects ?? 0,
      sub: `${metrics?.publishedProjects ?? 0} published, ${metrics?.featuredProjects ?? 0} featured`,
      icon: FolderGit2,
      link: '/admin/projects',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/50',
    },
    {
      name: 'Active Skills',
      value: metrics?.activeSkills ?? 0,
      sub: `${metrics?.totalSkills ?? 0} total across 4 categories`,
      icon: Cpu,
      link: '/admin/skills',
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/50',
    },
    {
      name: 'Education Milestones',
      value: metrics?.totalEducation ?? 0,
      sub: 'Academic degrees & records',
      icon: GraduationCap,
      link: '/admin/education',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/50',
    },
    {
      name: 'Services Offered',
      value: metrics?.activeServices ?? 0,
      sub: `${metrics?.totalServices ?? 0} total competencies`,
      icon: Briefcase,
      link: '/admin/services',
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/50',
    },
    {
      name: 'Unread Inquiries',
      value: metrics?.unreadMessages ?? 0,
      sub: `${metrics?.totalMessages ?? 0} total messages received`,
      icon: Mail,
      link: '/admin/messages',
      highlight: (metrics?.unreadMessages ?? 0) > 0,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/50',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Administrative Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time content management and incoming communication portal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>New Project</span>
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
          </a>
        </div>
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
              <Link
                key={stat.name}
                to={stat.link}
                className={`p-5 rounded-2xl border bg-white dark:bg-slate-900 shadow-sm space-y-3 hover:shadow-md transition-all group ${
                  stat.highlight
                    ? 'border-amber-400 dark:border-amber-600/80 ring-1 ring-amber-400/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-primary-500/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-primary-600 transition-colors">
                    {stat.name}
                  </span>
                  <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {stat.sub}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Grid: Recent Projects & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Recent Projects
              </h2>
            </div>
            <Link
              to="/admin/projects"
              className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-14" />
              ))}
            </div>
          ) : recentProjects.length === 0 ? (
            <p className="text-sm text-slate-400 py-6 text-center">No projects in database yet.</p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {recentProjects.map((proj) => (
                <div key={proj._id || proj.slug} className="py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
                      {proj.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span>{proj.technologies.slice(0, 3).join(', ')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {proj.featured && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                        Featured
                      </span>
                    )}
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      proj.published
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {proj.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <Mail className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Recent Inquiries
              </h2>
            </div>
            <Link
              to="/admin/messages"
              className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
            >
              <span>Inbox ({metrics?.unreadMessages ?? 0} unread)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-14" />
              ))}
            </div>
          ) : recentMessages.length === 0 ? (
            <p className="text-sm text-slate-400 py-6 text-center">No inquiries received yet.</p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {recentMessages.map((msg) => (
                <div key={msg._id} className="py-3 flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                        {msg.name}
                      </span>
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" title="Unread" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate">{msg.email}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">{msg.message}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* System Status Banner */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-3">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>MongoDB Connected</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
            <Globe className="w-4 h-4 text-primary-500" />
            <span>REST API Online (Port 5000)</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-500">
            <Database className="w-4 h-4 text-slate-400" />
            <span>Database: abdalle_portfolio</span>
          </div>
        </div>
        <div className="text-slate-400 font-mono text-[11px]">
          Auto-sync: every 30s
        </div>
      </div>
    </div>
  );
};
