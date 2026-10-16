import React from 'react';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';
import type { Education } from '@/types';

interface EducationSectionProps {
  education: Education[];
  isLoading: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education, isLoading }) => {
  const fallbackEducation: Education[] = [
    {
      _id: '1',
      institution: 'Jamhuriya University of Science and Technology (JUST)',
      level: 'Bachelor of Science (BSc)',
      degree: 'Computer Science',
      startYear: '2020',
      endYear: '2024',
      description: 'Comprehensive study of computer systems, software engineering principles, algorithms, distributed architectures, database design, and object-oriented programming.',
      order: 1,
      createdAt: '',
      updatedAt: '',
    },
    {
      _id: '2',
      institution: 'Full-Stack Software Engineering Specialization',
      level: 'Professional Development',
      degree: 'Advanced Web Applications & Architecture',
      startYear: '2023',
      endYear: '2024',
      description: 'Hands-on intensive masteries in modern React, TypeScript, Node.js/Express, RESTful API security, MongoDB optimization, and production deployment.',
      order: 2,
      createdAt: '',
      updatedAt: '',
    },
  ];

  const displayList = education.length > 0 ? education : fallbackEducation;

  return (
    <section id="education" className="py-20 sm:py-28 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            Academic Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
            Education & Milestones
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl">
            Strong theoretical computer science foundation paired with continuous practical modern software engineering training.
          </p>
        </div>

        {/* Timeline */}
        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-36 rounded-3xl bg-slate-200/80 dark:bg-slate-800/60 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="relative pl-6 sm:pl-8 border-l-2 border-primary-200 dark:border-primary-900/60 space-y-10 sm:space-y-12">
            {displayList.map((item, idx) => (
              <div key={item._id || idx} className="relative group">
                {/* Node marker */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-primary-600 flex items-center justify-center text-primary-600 shadow-sm transition-transform duration-200 group-hover:scale-110">
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Content Card */}
                <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 sm:p-8 shadow-sm hover:border-primary-500/50 hover:shadow-md transition-all space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200/60 dark:border-primary-800/60 mb-2">
                        {item.level}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {item.degree}
                      </h3>
                      <h4 className="text-sm font-semibold text-primary-600 dark:text-primary-400 mt-0.5">
                        {item.institution}
                      </h4>
                    </div>

                    <div className="inline-flex items-center space-x-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl shrink-0 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-primary-500" />
                      <span>{item.startYear} – {item.endYear}</span>
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-center space-x-4 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-500" />
                      <span>Verified Academic Credential</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-primary-500" />
                      <span>Computer Science Curriculum</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
