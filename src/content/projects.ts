import type { Project } from './types';

// Remove any link that doesn't apply (e.g. a private repo); cards render only the links listed.
const placeholderLinks = [
  { label: 'Code', href: '#' },
  { label: 'Demo', href: '#' },
] as const;

export const projects: readonly Project[] = [
  {
    id: 'agentforge',
    name: 'AgentForge',
    summary: 'This is the summary',
    description: '{{ PLACEHOLDER: the problem, your approach, and your role }}',
    highlights: ['{{ PLACEHOLDER: notable feature or result }}'],
    tech: ['{{ PLACEHOLDER: tech stack }}'],
    links: placeholderLinks,
  },
  {
    id: 'bomja',
    name: 'BOMJA',
    summary: '{{ PLACEHOLDER: one-line description of what BOMJA does }}',
    description: '{{ PLACEHOLDER: the problem, your approach, and your role }}',
    highlights: ['{{ PLACEHOLDER: notable feature or result }}'],
    tech: ['{{ PLACEHOLDER: tech stack }}'],
    links: placeholderLinks,
  },
  {
    id: 'scamalytics-risk-automation',
    name: 'Scamalytics risk automation',
    summary: '{{ PLACEHOLDER: one-line description of the risk automation }}',
    description: '{{ PLACEHOLDER: the problem, your approach, and your role }}',
    highlights: ['{{ PLACEHOLDER: notable feature or result }}'],
    tech: ['{{ PLACEHOLDER: tech stack }}'],
    links: placeholderLinks,
  },
  {
    id: 'matatu-ai',
    name: 'Matatu AI',
    summary: '{{ PLACEHOLDER: one-line description of what Matatu AI does }}',
    description: '{{ PLACEHOLDER: the problem, your approach, and your role }}',
    highlights: ['{{ PLACEHOLDER: notable feature or result }}'],
    tech: ['{{ PLACEHOLDER: tech stack }}'],
    links: placeholderLinks,
  },
];
