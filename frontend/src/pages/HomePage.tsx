import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  ArrowRight,
  Code,
  Database,
  ExternalLink,
  Github,
  Loader2,
  CheckCircle,
  AlertCircle,
  Mail,
  MapPin,
} from 'lucide-react';
import {
  profileApi,
  projectsApi,
  skillsApi,
  educationApi,
  servicesApi,
  contactApi,
} from '@/services/api';
import type { MessageFormData } from '@/types';

// --- Skeleton -----------------------------------------------------------------
const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700/50 ${className}`} />
);

// --- Section Header -----------------------------------------------------------
const SectionHeader: React.FC<{ label: string; title: string }> = ({
  label,
  title,
}) => (
  <>
    <h2 className="text-xs uppercase tracking-widest text-primary-600 font-semibold mb-2">
      {label}
    </h2>
    <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-8">
      {title}
    </h3>
  </>
);

// --- Skills grouped by category -----------------------------------------------
function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce(
    (acc, item) => {
      const k = String(item[key]);
      (acc[k] = acc[k] || []).push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}

export const HomePage: React.FC = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: profileApi.get,
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.getAll,
  });

  const { data: skills = [], isLoading: skillsLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: skillsApi.getAll,
  });

  const { data: education = [], isLoading: educationLoading } = useQuery({
    queryKey: ['education'],
    queryFn: educationApi.getAll,
  });

  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: servicesApi.getAll,
  });

  // --- Contact form ----------------------------------------------------------
  const [form, setForm] = useState<MessageFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  );
  const [formError, setFormError] = useState('');

  const contactMutation = useMutation({
    mutationFn: contactApi.send,
    onSuccess: () => {
      setFormStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    },
    onError: (err: Error) => {
      setFormStatus('error');
      setFormError(err.message);
    },
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('idle');
    contactMutation.mutate(form);
  };

  const skillsByCategory = groupBy(skills, 'category');

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* -- Hero ------------------------------------------------------------- */}
      <section
        id="home"
        className="pt-28 sm:pt-36 lg:pt-44 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="tracking-wide uppercase">
                {profile?.title ?? 'Full-Stack Developer'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1]">
              Hi, I&apos;m{' '}
              <span className="text-primary-600">
                {profile?.name ?? 'Abdalle Hussein'}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium">
              {profile?.bio?.split('.')[0] ?? 'I build modern, scalable web applications.'}
            </p>

            <p className="text-base text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              {profile?.bio ??
                "I'm a Computer Science graduate and Full-Stack Developer focused on building practical, reliable web applications that solve real-world problems."}
            </p>

            {profile?.location && (
              <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 shadow-sm hover:shadow transition-all group"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>

              {profile?.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Resume
                </a>
              )}

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Contact Me
              </a>
            </div>

            {/* Social Links */}
            {profile?.socialLinks && (
              <div className="flex items-center gap-3 pt-1">
                {profile.socialLinks.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {profile.socialLinks.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl p-2 bg-gradient-to-tr from-primary-600 via-primary-500 to-slate-800 shadow-xl">
              <div className="w-full h-full rounded-[22px] bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center text-center p-6 border border-white/20">
                {profile?.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-24 h-24 rounded-2xl object-cover mb-4"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-primary-600/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4">
                    <Code className="w-10 h-10" />
                  </div>
                )}
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {profile?.name ?? 'Abdalle Hussein'}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {profile?.title ?? 'Full-Stack Developer'}
                </p>
                <div className="mt-4 flex items-center space-x-2 text-xs text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/60 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- Skills ----------------------------------------------------------- */}
      <section
        id="skills"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12"
      >
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
          <SectionHeader label="Technical Skills" title="Modern Web Technologies" />
          {skillsLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-16" />
              ))}
            </div>
          ) : skills.length > 0 ? (
            <div className="space-y-8">
              {Object.entries(skillsByCategory).map(([category, catSkills]) => (
                <div key={category}>
                  <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                    {category}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {catSkills.map((skill) => (
                      <div
                        key={skill._id}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:border-primary-500/50 transition-colors"
                      >
                        <div className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                          {skill.name}
                        </div>
                        {skill.proficiency > 0 && (
                          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700">
                            <div
                              className="h-1.5 rounded-full bg-primary-500 transition-all"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'React', 'TypeScript', 'Node.js', 'Express.js',
                'MongoDB', 'Tailwind CSS', 'REST APIs', 'Git',
              ].map((skill) => (
                <div
                  key={skill}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:border-primary-500/50 transition-colors"
                >
                  <div className="font-medium text-slate-900 dark:text-slate-100">
                    {skill}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* -- Projects --------------------------------------------------------- */}
      <section
        id="projects"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12"
      >
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
          <SectionHeader label="Portfolio" title="Featured Projects" />
          {projectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj._id}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:border-primary-500/50 transition-all space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      {proj.title}
                    </h4>
                    {proj.status === 'completed' && (
                      <span className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        Completed
                      </span>
                    )}
                    {proj.status === 'in-progress' && (
                      <span className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {proj.description}
                  </p>
                  {proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-3 pt-1">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'AgriSense', desc: 'Smart agricultural sensing & data management.' },
                { title: 'Al-Hikma School Management System', desc: 'Comprehensive school operations & academic tracking.' },
                { title: 'KOBAC Electronics', desc: 'Modern electronics catalog and inventory management.' },
              ].map((proj) => (
                <div
                  key={proj.title}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:border-primary-500/50 transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{proj.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{proj.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* -- Education -------------------------------------------------------- */}
      <section
        id="education"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12"
      >
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
          <SectionHeader label="Milestones" title="Education Timeline" />
          {educationLoading ? (
            <div className="space-y-4 max-w-2xl">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-28" />
              ))}
            </div>
          ) : education.length > 0 ? (
            <div className="space-y-6 max-w-2xl">
              {education.map((edu) => (
                <div
                  key={edu._id}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40"
                >
                  <span className="text-xs font-semibold text-primary-600">
                    {edu.startYear} – {edu.current ? 'Present' : edu.endYear}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
                    {edu.degree} in {edu.field}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {edu.institution}
                  </p>
                  {edu.description && (
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-500 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6 max-w-2xl">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
                <span className="text-xs font-semibold text-primary-600">2022 – 2026</span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">BSc in Computer Science</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Jamhuriya University of Science and Technology (JUST)</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* -- Services --------------------------------------------------------- */}
      <section
        id="services"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12"
      >
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
          <SectionHeader label="Expertise" title="Services Offered" />
          {servicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv, idx) => (
                <div
                  key={srv._id}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 space-y-3"
                >
                  <span className="text-xs font-bold text-primary-600">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {srv.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {srv.description}
                  </p>
                  {srv.features.length > 0 && (
                    <ul className="space-y-1">
                      {srv.features.slice(0, 3).map((f) => (
                        <li
                          key={f}
                          className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'Full-Stack Web Applications',
                'Business Websites',
                'E-commerce Applications',
                'School Management Systems',
                'Restaurant Management Systems',
              ].map((srv, idx) => (
                <div
                  key={srv}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 space-y-2"
                >
                  <span className="text-xs font-bold text-primary-600">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{srv}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* -- Contact ---------------------------------------------------------- */}
      <section
        id="contact"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12"
      >
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <SectionHeader label="Get In Touch" title="Send a Message" />
            {profile?.email && (
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400 -mt-4">
                <Mail className="w-4 h-4" />
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-primary-600 transition-colors"
                >
                  {profile.email}
                </a>
              </div>
            )}
          </div>

          {formStatus === 'success' ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
              <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Message Sent!
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Thank you for reaching out. I'll get back to you soon.
              </p>
              <button
                onClick={() => setFormStatus('idle')}
                className="mt-2 text-sm text-primary-600 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleContactSubmit}>
              {formStatus === 'error' && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  placeholder="Project inquiry, collaboration, etc."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about your project or inquiry..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm text-sm inline-flex items-center justify-center gap-2"
              >
                {contactMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
