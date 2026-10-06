import React from 'react';
import { ArrowUp, Github, Linkedin, Instagram, Video, Mail, MapPin } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/Abdalle13', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'TikTok', href: 'https://tiktok.com', icon: Video },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <a href="#home" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Abdalle<span className="text-primary-600">.</span>
            </a>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Computer Science graduate and Full-Stack Developer focused on building practical, reliable web applications that solve real-world problems.
            </p>
            <div className="flex flex-col space-y-2 pt-2 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary-600 shrink-0" />
                <span>Mogadishu, Somalia</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary-600 shrink-0" />
                <a
                  href="mailto:contact@abdalle.dev"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  contact@abdalle.dev
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Presence & Actions */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex flex-wrap gap-2.5 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to top</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-500 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Abdalle Hussein. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Built with React, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
