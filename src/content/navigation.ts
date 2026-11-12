import type { SectionId, SectionMeta } from './types';

/** Order of sections on the page and in the navigation. */
export const sectionOrder: readonly SectionId[] = [
  'about',
  'experience',
  'projects',
  'skills',
  'contact',
];

export const sections: Record<SectionId, SectionMeta> = {
  about: { label: 'About', title: 'About me' },
  experience: { label: 'Experience', title: 'Professional experience' },
  projects: { label: 'Projects', title: 'Featured projects' },
  skills: { label: 'Skills', title: 'Technical skills' },
  contact: {
    label: 'Contact',
    title: 'Get in touch',
    intro:
      "I'm always open to connecting with fellow engineers, recruiters, and professionals who share a passion for technology and innovation. Whether it's an opportunity in software engineering, data engineering, or cybersecurity, or simply a conversation about an exciting project, I'd love to hear from you!",
  },
};

export const navItems = sectionOrder.map((id) => ({ id, label: sections[id].label }));
