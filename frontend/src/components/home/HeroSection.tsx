import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Instagram, Video, MapPin, GraduationCap, Sparkles } from 'lucide-react';
import type { Profile, SiteSetting } from '@/types';

interface HeroSectionProps {
  profile: Profile | null;
  settings: SiteSetting | null;
  isLoading: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile, settings, isLoading: _isLoading }) => {
  const name = profile?.name || 'Abdalle Hussein';
  const title = profile?.title || 'Full-Stack Developer';
  const location = profile?.location || 'Mogadishu, Somalia';
  const about =
    profile?.about ||
    'I am a Computer Science graduate from Jamhuriya University of Science and Technology (JUST) and a Full-Stack Developer focused on building practical, reliable web applications that solve real-world problems.';
  const cvUrl = profile?.cv || '/cv.pdf';

  const socialLinks = settings?.socialLinks || {
    github: 'https://github.com/Abdalle13',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };


  return (
    <section id="home" className="relative pt-28 sm:pt-36 lg:pt-44 pb-16 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary-500/10 dark:bg-primary-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bio & Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status Pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Projects</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <MapPin className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                <span>{location}</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-sm sm:text-base font-semibold tracking-wide text-primary-600 dark:text-primary-400 uppercase">
                Hello & Welcome
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1]">
                I&apos;m <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-indigo-600 bg-clip-text text-transparent">{name}</span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300">
                {title}
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {about}
            </motion.p>

            {/* Academic Highlight */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 pt-1">
              <GraduationCap className="w-4 h-4 text-primary-600 shrink-0" />
              <span>BSc in Computer Science, Jamhuriya University of Science and Technology</span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 pt-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                Get in Touch
              </a>

              {cvUrl && (
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span>Resume / CV</span>
                </a>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 pt-3">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">
                Follow:
              </span>
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-primary-500/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm transition-all focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm transition-all focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 hover:border-pink-500/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm transition-all focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {socialLinks.tiktok && (
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Profile"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-500/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm transition-all focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <Video className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-sm sm:max-w-md"
            >
              {/* Outer decorative gradient border */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-primary-500 via-primary-600/50 to-indigo-500 shadow-2xl shadow-primary-500/10">
                <div className="rounded-[22px] bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6">
                  {/* Avatar / Portrait */}
                  <div className="relative mx-auto w-32 h-32 rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-600 p-1 shadow-inner flex items-center justify-center">
                    {profile?.heroImage ? (
                      <img
                        src={profile.heroImage}
                        alt={name}
                        className="w-full h-full object-cover rounded-[14px]"
                      />
                    ) : (
                      <div className="w-full h-full rounded-[14px] bg-slate-900 flex flex-col items-center justify-center text-white">
                        <span className="text-3xl font-black tracking-wider text-primary-400">AH</span>
                        <span className="text-[10px] font-mono tracking-widest text-slate-400">FULL-STACK</span>
                      </div>
                    )}
                  </div>

                  {/* Profile Summary Info */}
                  <div className="text-center space-y-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {name}
                    </h3>
                    <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {location}
                    </p>
                  </div>

                  {/* Quick Skill Badges */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Frontend</span>
                      <span className="text-primary-600 font-mono">React/TS</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Backend</span>
                      <span className="text-primary-600 font-mono">Node/Express</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Database</span>
                      <span className="text-primary-600 font-mono">MongoDB</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Architecture</span>
                      <span className="text-primary-600 font-mono">REST/Clean</span>
                    </div>
                  </div>

                  {/* Real-time status */}
                  <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-950/40 border border-primary-200/80 dark:border-primary-900/60 flex items-center justify-between text-xs text-primary-700 dark:text-primary-300">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-primary-600" />
                      <span>Ready for hire & projects</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold">2026</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
