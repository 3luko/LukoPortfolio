import type { SkillGroup } from './types';

// Group titles mirror the focus areas from the brief; replace the item lists with your real skills.
export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'software',
    title: 'Software engineering',
    items: ['{{ PLACEHOLDER: languages & frameworks }}'],
  },
  {
    id: 'data',
    title: 'Data engineering',
    items: ['{{ PLACEHOLDER: data tools & platforms }}'],
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    items: ['{{ PLACEHOLDER: security tools & practices }}'],
  },
  {
    id: 'ai',
    title: 'AI & machine learning',
    items: ['{{ PLACEHOLDER: AI/ML libraries & techniques }}'],
  },
  {
    id: 'tools',
    title: 'Tools & platforms',
    items: ['{{ PLACEHOLDER: cloud, DevOps & other tools }}'],
  },
];
