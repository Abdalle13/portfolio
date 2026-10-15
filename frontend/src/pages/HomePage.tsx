import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  profileApi,
  projectsApi,
  skillsApi,
  educationApi,
  servicesApi,
  settingsApi,
} from '@/services/api';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/about/AboutSection';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { EducationSection } from '@/components/education/EducationSection';
import { ServicesSection } from '@/components/services/ServicesSection';
import { ContactSection } from '@/components/contact/ContactSection';

export const HomePage: React.FC = () => {
  const { data: profile = null, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: profileApi.get,
  });

  const { data: settings = null } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsApi.get,
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

  return (
    <div className="space-y-4">
      {/* 1. Hero Section */}
      <HeroSection
        profile={profile}
        settings={settings}
        isLoading={profileLoading}
      />

      {/* 2. About Section */}
      <AboutSection profile={profile} />

      {/* 3. Skills Section */}
      <SkillsSection
        skills={skills}
        isLoading={skillsLoading}
      />

      {/* 4. Projects Showcase */}
      <ProjectsSection
        projects={projects}
        isLoading={projectsLoading}
      />

      {/* 5. Education Milestone Timeline */}
      <EducationSection
        education={education}
        isLoading={educationLoading}
      />

      {/* 6. Services & Capabilities */}
      <ServicesSection
        services={services}
        isLoading={servicesLoading}
      />

      {/* 7. Contact Inquiries */}
      <ContactSection profile={profile} />
    </div>
  );
};
