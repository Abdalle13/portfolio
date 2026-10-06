import React from 'react';
import { FolderGit2, Cpu, GraduationCap, Briefcase, Mail, Sparkles } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const stats = [
    { name: 'Total Projects', value: '5', change: '5 published', icon: FolderGit2 },
    { name: 'Skills Active', value: '18', change: '4 categories', icon: Cpu },
    { name: 'Education Entries', value: '3', change: '1 degree', icon: GraduationCap },
    { name: 'Services Offered', value: '5', change: 'All active', icon: Briefcase },
    { name: 'Unread Inquiries', value: '0', change: 'Inbox zero', icon: Mail },
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.name}</span>
                <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-500">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Status / Foundation Note */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex items-center space-x-3 text-primary-600 dark:text-primary-400">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">CMS Foundation Ready</h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
          The administrative navigation and page foundations are established. In subsequent phases, full CRUD operations (Projects, Skills, Education, Services, Messages, Media, Settings) will be connected to the backend API and MongoDB database.
        </p>
      </div>
    </div>
  );
};
