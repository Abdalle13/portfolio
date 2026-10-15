import React, { useState } from 'react';
import { Cpu, Layout, Server, Database, Wrench, Sparkles } from 'lucide-react';
import type { Skill, SkillCategory } from '@/types';

interface SkillsSectionProps {
  skills: Skill[];
  isLoading: boolean;
}

const CATEGORIES: SkillCategory[] = [
  'Frontend',
  'Backend',
  'Database',
  'Tools & Platforms',
];

const categoryIcons: Record<SkillCategory, React.ComponentType<{ className?: string }>> = {
  Frontend: Layout,
  Backend: Server,
  Database: Database,
  'Tools & Platforms': Wrench,
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, isLoading }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Fallback skills if database hasn't loaded yet
  const displaySkills: Skill[] = skills.length > 0
    ? skills
    : [
        { _id: '1', name: 'React.js', category: 'Frontend', icon: '', order: 1, active: true, createdAt: '', updatedAt: '' },
        { _id: '2', name: 'TypeScript', category: 'Frontend', icon: '', order: 2, active: true, createdAt: '', updatedAt: '' },
        { _id: '3', name: 'Tailwind CSS', category: 'Frontend', icon: '', order: 3, active: true, createdAt: '', updatedAt: '' },
        { _id: '4', name: 'Next.js', category: 'Frontend', icon: '', order: 4, active: true, createdAt: '', updatedAt: '' },
        { _id: '5', name: 'Node.js', category: 'Backend', icon: '', order: 1, active: true, createdAt: '', updatedAt: '' },
        { _id: '6', name: 'Express.js', category: 'Backend', icon: '', order: 2, active: true, createdAt: '', updatedAt: '' },
        { _id: '7', name: 'RESTful APIs', category: 'Backend', icon: '', order: 3, active: true, createdAt: '', updatedAt: '' },
        { _id: '8', name: 'JWT & Security', category: 'Backend', icon: '', order: 4, active: true, createdAt: '', updatedAt: '' },
        { _id: '9', name: 'MongoDB', category: 'Database', icon: '', order: 1, active: true, createdAt: '', updatedAt: '' },
        { _id: '10', name: 'Mongoose ORM', category: 'Database', icon: '', order: 2, active: true, createdAt: '', updatedAt: '' },
        { _id: '11', name: 'PostgreSQL', category: 'Database', icon: '', order: 3, active: true, createdAt: '', updatedAt: '' },
        { _id: '12', name: 'Git & GitHub', category: 'Tools & Platforms', icon: '', order: 1, active: true, createdAt: '', updatedAt: '' },
        { _id: '13', name: 'Postman', category: 'Tools & Platforms', icon: '', order: 2, active: true, createdAt: '', updatedAt: '' },
        { _id: '14', name: 'Vite', category: 'Tools & Platforms', icon: '', order: 3, active: true, createdAt: '', updatedAt: '' },
        { _id: '15', name: 'Docker', category: 'Tools & Platforms', icon: '', order: 4, active: true, createdAt: '', updatedAt: '' },
      ];

  const filteredSkills = activeCategory === 'All'
    ? displaySkills
    : displaySkills.filter((s) => s.category === activeCategory);

  // Group skills by category for standard layout
  const groupedSkills = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = displaySkills.filter((s) => s.category === cat);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  return (
    <section id="skills" className="py-20 sm:py-28 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
              Technical Stack
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
              Technologies & Methodologies
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl">
              Curated toolkit honed through production engineering, modern web standards, and rigorous software development.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-sm">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === 'All'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              All Skills ({displaySkills.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Skills Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-20 rounded-2xl bg-slate-200/80 dark:bg-slate-800/60 animate-pulse" />
            ))}
          </div>
        ) : activeCategory === 'All' ? (
          /* Grouped by Category */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => {
              const Icon = categoryIcons[cat] || Cpu;
              const catSkills = groupedSkills[cat] || [];
              return (
                <div
                  key={cat}
                  className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-4 hover:border-primary-500/40 transition-colors"
                >
                  <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{cat}</h3>
                      <p className="text-[11px] text-slate-400">{catSkills.length} competencies</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((skill) => (
                      <span
                        key={skill._id || skill.name}
                        className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 hover:border-primary-500/40 transition-colors"
                      >
                        <Sparkles className="w-3 h-3 text-primary-500 mr-1.5 shrink-0" />
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Filtered List */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSkills.map((skill) => (
              <div
                key={skill._id || skill.name}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm hover:border-primary-500/50 transition-all flex items-center justify-between space-x-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-xs">
                    {skill.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                      {skill.name}
                    </h4>
                    <p className="text-xs text-slate-400">{skill.category}</p>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active Skill" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
