import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles, FolderGit2, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      onClick={() => onSelect(project)}
      className="group relative flex flex-col rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary-500/50 transition-all duration-300 cursor-pointer"
    >
      {/* Visual Image / Header Banner */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-100 via-primary-50/30 to-slate-200 dark:from-slate-800 dark:via-primary-950/20 dark:to-slate-900">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-primary-600 dark:text-primary-400 mb-2 transition-transform duration-300 group-hover:scale-110">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
              FULL-STACK APP
            </span>
          </div>
        )}

        {/* Featured Tag */}
        {project.featured && (
          <div className="absolute top-3.5 left-3.5 inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white shadow-md">
            <Sparkles className="w-3 h-3" />
            <span>Featured</span>
          </div>
        )}

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-bold text-slate-900 dark:text-slate-100 shadow-lg flex items-center gap-1.5">
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-primary-600" />
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 rounded-lg text-xs text-slate-400">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Links */}
        <div
          className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-semibold"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
              >
                <Github className="w-4 h-4 mr-1.5" />
                <span>Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
              >
                <ExternalLink className="w-4 h-4 mr-1.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={() => onSelect(project)}
            className="text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
          >
            Learn more &rarr;
          </button>
        </div>
      </div>
    </motion.div>
  );
};
