import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Sparkles, FolderGit2 } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectsSectionProps {
  projects: Project[];
  isLoading: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, isLoading }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  // Fallback demo projects matching database seed if empty
  const defaultProjects: Project[] = [
    {
      _id: '1',
      title: 'AgriSense',
      slug: 'agrisense',
      description: 'An IoT and data-driven agricultural monitoring and management system designed for farmers to optimize irrigation and crop yield.',
      image: '',
      technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
      githubUrl: 'https://github.com/Abdalle13/agrisense',
      liveUrl: 'https://agrisense-demo.abdalle.dev',
      featured: true,
      published: true,
      order: 1,
      createdAt: '',
      updatedAt: '',
    },
    {
      _id: '2',
      title: 'Al-Hikma School Management System',
      slug: 'al-hikma-school-management',
      description: 'Comprehensive academic administration portal facilitating student enrollments, attendance tracking, grading, and automated fee statements.',
      image: '',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT'],
      githubUrl: 'https://github.com/Abdalle13/al-hikma-sms',
      liveUrl: 'https://alhikma-sms.abdalle.dev',
      featured: true,
      published: true,
      order: 2,
      createdAt: '',
      updatedAt: '',
    },
    {
      _id: '3',
      title: 'KOBAC Electronics',
      slug: 'kobac-electronics',
      description: 'High-performance e-commerce catalog and point-of-sale management system for consumer electronics with real-time inventory reconciliation.',
      image: '',
      technologies: ['React', 'TypeScript', 'Express', 'MongoDB', 'REST APIs'],
      githubUrl: 'https://github.com/Abdalle13/kobac-electronics',
      liveUrl: 'https://kobac-demo.abdalle.dev',
      featured: true,
      published: true,
      order: 3,
      createdAt: '',
      updatedAt: '',
    },
    {
      _id: '4',
      title: 'Somali Logistics & Fleet Tracker',
      slug: 'somali-logistics-tracker',
      description: 'Logistics tracking interface providing delivery milestone verifications, manifest generation, and dispatcher route monitoring.',
      image: '',
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Leaflet'],
      githubUrl: 'https://github.com/Abdalle13/fleet-tracker',
      liveUrl: '',
      featured: false,
      published: true,
      order: 4,
      createdAt: '',
      updatedAt: '',
    },
  ];

  const sourceProjects = projects.length > 0 ? projects : defaultProjects;
  const filteredProjects = filter === 'featured'
    ? sourceProjects.filter((p) => p.featured)
    : sourceProjects;

  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
              Selected Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
              Featured Systems & Applications
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl">
              Production-focused web software built with modular architectures, responsive user interfaces, and robust APIs.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-sm shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              All Projects ({sourceProjects.length})
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === 'featured'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Only</span>
            </button>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-96 rounded-3xl bg-slate-200/80 dark:bg-slate-800/60 animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-8 space-y-3">
            <FolderGit2 className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 dark:text-slate-200">No projects found</h3>
            <p className="text-xs text-slate-400">Try switching your filter to see all projects.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id || project.slug}
                project={project}
                onSelect={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        )}

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
