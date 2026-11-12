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
      '{{ PLACEHOLDER: one or two sentences inviting people to reach out, e.g. the roles or conversations you are open to }}',
  },
};

export const navItems = sectionOrder.map((id) => ({ id, label: sections[id].label }));
