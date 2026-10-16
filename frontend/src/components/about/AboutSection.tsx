import React from 'react';
import { GraduationCap, Code2, Layers, CheckCircle2, Download, Mail } from 'lucide-react';
import type { Profile } from '@/types';

interface AboutSectionProps {
  profile: Profile | null;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const aboutText =
    profile?.about ||
    'I am a Computer Science graduate from Jamhuriya University of Science and Technology (JUST) and a Full-Stack Developer focused on building practical, reliable web applications that solve real-world problems.';

  const traits = [
    {
      title: 'Full-Stack Proficiency',
      desc: 'End-to-end web engineering from React/TypeScript interfaces to Express/Node.js REST APIs.',
      icon: Code2,
    },
    {
      title: 'Computer Science Foundation',
      desc: 'BSc from Jamhuriya University of Science and Technology (JUST) with strong data structures and software design principles.',
      icon: GraduationCap,
    },
    {
      title: 'Modern Architecture',
      desc: 'Layered architectures, secure authentication patterns, MongoDB schema design, and production rate limiting.',
      icon: Layers,
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
            Engineering Scalable, Reliable Software
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              {aboutText}
            </p>

            <p className="text-base text-slate-500 dark:text-slate-400">
              Based in Mogadishu, Somalia, I focus on software systems that bridge clean user experience with solid backends. Whether architecting database models in MongoDB, enforcing strict TypeScript contracts, or polishing interactive user journeys, I aim for long-term maintainability and security.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Strict TypeScript & Type Safety',
                'Production RESTful API Architecture',
                'Secure JWT & Cookie Authentication',
                'MongoDB Indexing & Schema Modeling',
                'Responsive & Accessible UI Systems',
                'Clean Code & Comprehensive Documentation',
              ].map((item) => (
                <div key={item} className="flex items-center space-x-2.5 text-sm text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 dark:text-primary-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={profile?.cv || '/cv.pdf'}
                download
                className="inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                <span>Download CV</span>
              </a>

              <a
                href="mailto:contact@abdalle.dev"
                className="inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2 text-primary-600" />
                <span>contact@abdalle.dev</span>
              </a>
            </div>
          </div>

          {/* Right Column: Key Pillars */}
          <div className="lg:col-span-5 space-y-4">
            {traits.map((trait) => {
              const Icon = trait.icon;
              return (
                <div
                  key={trait.title}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm hover:border-primary-500/40 transition-colors space-y-2"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                      {trait.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 pl-11">
                    {trait.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
