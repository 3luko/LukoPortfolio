import type { ExperienceItem } from './types';

// Listed in the order given; reorder most-recent-first once dates are filled in.
export const experience: readonly ExperienceItem[] = [
  {
    id: 'beckman-coulter',
    organization: 'Beckman Coulter Diagnostics',
    title: '{{ PLACEHOLDER: job title }}',
    location: '{{ PLACEHOLDER: location }}',
    start: '{{ PLACEHOLDER: start date }}',
    end: '{{ PLACEHOLDER: end date or "Present" }}',
    summary: '{{ PLACEHOLDER: one-sentence summary of the role }}',
    highlights: [
      '{{ PLACEHOLDER: key responsibility or outcome }}',
      '{{ PLACEHOLDER: key responsibility or outcome }}',
    ],
    tech: ['{{ PLACEHOLDER: technologies }}'],
  },
  {
    id: 'us-bank',
    organization: 'U.S. Bank',
    title: '{{ PLACEHOLDER: job title }}',
    location: '{{ PLACEHOLDER: location }}',
    start: '{{ PLACEHOLDER: start date }}',
    end: '{{ PLACEHOLDER: end date or "Present" }}',
    summary: '{{ PLACEHOLDER: one-sentence summary of the role }}',
    highlights: [
      '{{ PLACEHOLDER: key responsibility or outcome }}',
      '{{ PLACEHOLDER: key responsibility or outcome }}',
    ],
    tech: ['{{ PLACEHOLDER: technologies }}'],
  },
  {
    id: 'st-thomas-infosec',
    organization: 'University of St. Thomas',
    title: 'Information Security Intern',
    employmentType: 'Student worker',
    location: 'St. Paul, Minnesota',
    start: '{{ PLACEHOLDER: start date }}',
    end: '{{ PLACEHOLDER: end date }}',
    summary: '{{ PLACEHOLDER: one-sentence summary of the role }}',
    highlights: [
      '{{ PLACEHOLDER: key responsibility or outcome }}',
      '{{ PLACEHOLDER: key responsibility or outcome }}',
    ],
    tech: ['{{ PLACEHOLDER: technologies }}'],
  },
];
