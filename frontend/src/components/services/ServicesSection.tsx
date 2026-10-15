import React from 'react';
import { motion } from 'framer-motion';
import { Code, Globe, Database, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import type { Service } from '@/types';

interface ServicesSectionProps {
  services: Service[];
  isLoading: boolean;
}

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Full-Stack Web Development': Globe,
  'Backend & REST API Architecture': Code,
  'Database Design & Optimization': Database,
  'Security & Authentication Systems': ShieldCheck,
  'Performance & UI Engineering': Zap,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, isLoading }) => {
  const fallbackServices: Service[] = [
    {
      _id: '1',
      title: 'Full-Stack Web Development',
      description: 'End-to-end engineering of modern web applications using React, TypeScript, Node.js, Express, and MongoDB with clean component hierarchies and modular styles.',
      icon: 'Globe',
      order: 1,
      active: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      _id: '2',
      title: 'Backend & REST API Architecture',
      description: 'Design and implementation of robust RESTful services with strict input validation, rate limiting, layered controller/service patterns, and structured error responses.',
      icon: 'Code',
      order: 2,
      active: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      _id: '3',
      title: 'Database Design & Optimization',
      description: 'Schema modeling, index optimization, query tuning, and referential data integrity in MongoDB with Mongoose ORM for high throughput and clean migrations.',
      icon: 'Database',
      order: 3,
      active: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      _id: '4',
      title: 'Security & Authentication Systems',
      description: 'Hardened authentication workflows using JWT, encrypted HttpOnly cookies, bcrypt hashing, CORS whitelisting, and Helmet security headers.',
      icon: 'ShieldCheck',
      order: 4,
      active: true,
      createdAt: '',
      updatedAt: '',
    },
  ];

  const displayList = services.length > 0 ? services : fallbackServices;

  return (
    <section id="services" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2 mb-12 sm:mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            Offerings & Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
            Services & Expertise
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl">
            Reliable engineering services tailored for modern startups, academic organizations, and business ventures.
          </p>
        </motion.div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-56 rounded-3xl bg-slate-200/80 dark:bg-slate-800/60 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayList.map((service, index) => {
              const Icon = serviceIcons[service.title] || Code;
              const formattedNumber = String(index + 1).padStart(2, '0');

              return (
                <motion.div
                  key={service._id || service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-8 shadow-sm hover:shadow-xl hover:border-primary-500/50 transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xl font-bold text-slate-300 dark:text-slate-700">
                        {formattedNumber}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Available for projects
                    </span>
                    <a
                      href="#contact"
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
                    >
                      <span>Inquire now</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
