import type { ContactLink } from './types';

export const contactLinks: readonly ContactLink[] = [
  {
    kind: 'email',
    label: 'Email',
    href: '#', // 'mailto:you@example.com'
    display: '{{ PLACEHOLDER: email address }}',
  },
  {
    kind: 'github',
    label: 'GitHub',
    href: '#', // 'https://github.com/<username>'
    display: '{{ PLACEHOLDER: GitHub username }}',
  },
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    href: '#', // 'https://www.linkedin.com/in/<handle>'
    display: '{{ PLACEHOLDER: LinkedIn handle }}',
  },
];
