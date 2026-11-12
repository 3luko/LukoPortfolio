import type { Profile } from './types';

const name = '{{ PLACEHOLDER: Full name }}';

export const profile: Profile = {
  name,
  greeting: 'Hi, my name is',
  headline: '{{ PLACEHOLDER: one-line headline, e.g. your current role or focus }}',
  intro:
    '{{ PLACEHOLDER: two or three sentences introducing yourself and what you work on }}',
  focusAreas: ['Software engineering', 'Data engineering', 'Cybersecurity', 'AI'],
  about: [
    '{{ PLACEHOLDER: paragraph about your background and how you got into software }}',
    '{{ PLACEHOLDER: paragraph about the kind of problems you enjoy solving across software, data, security and AI }}',
    '{{ PLACEHOLDER: paragraph about what you are looking for next, or interests outside work }}',
  ],
  resume: { href: '/resume.pdf', label: 'View resume' },
  contactLabel: 'Get in touch',
  headshot: {
    src: '/headshot.jpg',
    alt: `Portrait of ${name}`,
    width: 1028,
    height: 1028,
  },
};
