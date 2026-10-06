import React from 'react';
import { ArrowRight, Code, Database, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* Hero Section Anchor */}
      <section id="home" className="pt-28 sm:pt-36 lg:pt-44 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="tracking-wide uppercase">FULL-STACK DEVELOPER</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1]">
              Hi, I'm <span className="text-primary-600">Abdalle Hussein</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium">
              I build modern, scalable web applications.
            </p>

            <p className="text-base text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              I’m a Computer Science graduate and Full-Stack Developer focused on building practical, reliable web applications that solve real-world problems.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 shadow-sm hover:shadow transition-all group"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span>Contact Me</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl p-2 bg-gradient-to-tr from-primary-600 via-primary-500 to-slate-800 shadow-xl">
              <div className="w-full h-full rounded-[22px] bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center text-center p-6 border border-white/20">
                <div className="w-20 h-20 rounded-2xl bg-primary-600/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4">
                  <Code className="w-10 h-10" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Abdalle Hussein</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Full-Stack Developer</p>
                <div className="mt-4 flex items-center space-x-2 text-xs text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/60 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Available for Opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section Anchor */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
          <div className="max-w-3xl">
            <h2 className="text-xs uppercase tracking-widest text-primary-600 font-semibold mb-2">About Me</h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Education & Background</h3>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              BSc in Computer Science graduate from Jamhuriya University of Science and Technology (JUST) in Mogadishu, Somalia. Passionate about software engineering, scalable architectures, and modern web applications.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section Anchor */}
      <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
          <h2 className="text-xs uppercase tracking-widest text-primary-600 font-semibold mb-2">Technical Skills</h2>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-8">Modern Web Technologies</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'REST APIs', 'Git'].map((skill) => (
              <div
                key={skill}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:border-primary-500/50 transition-colors"
              >
                <div className="font-medium text-slate-900 dark:text-slate-100">{skill}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section Anchor */}
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
          <h2 className="text-xs uppercase tracking-widest text-primary-600 font-semibold mb-2">Portfolio</h2>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-8">Featured Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'AgriSense', desc: 'Smart agricultural sensing & data management.' },
              { title: 'Al-Hikma School Management System', desc: 'Comprehensive school operations & academic tracking.' },
              { title: 'KOBAC Electronics', desc: 'Modern electronics catalog and inventory management.' },
              { title: 'SmartClinic', desc: 'Healthcare patient appointment & clinical records.' },
              { title: 'Barwaaqo Restaurant Management System', desc: 'End-to-end POS, kitchen management & dining orders.' },
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
        </div>
      </section>

      {/* Education Section Anchor */}
      <section id="education" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
          <h2 className="text-xs uppercase tracking-widest text-primary-600 font-semibold mb-2">Milestones</h2>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-8">Education Timeline</h3>
          <div className="space-y-6 max-w-2xl">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
              <span className="text-xs font-semibold text-primary-600">2022 - 2026</span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">BSc in Computer Science</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Jamhuriya University of Science and Technology (JUST)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section Anchor */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
          <h2 className="text-xs uppercase tracking-widest text-primary-600 font-semibold mb-2">Expertise</h2>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-8">Services Offered</h3>
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
                <span className="text-xs font-bold text-primary-600">0{idx + 1}</span>
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{srv}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Anchor */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xs uppercase tracking-widest text-primary-600 font-semibold mb-2">Get In Touch</h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Send a Message</h3>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell me about your project or inquiry..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-sm text-sm"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
