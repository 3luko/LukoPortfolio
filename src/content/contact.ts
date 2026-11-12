import type { ContactLink } from './types';

export const contactLinks: readonly ContactLink[] = [
  {
    kind: 'email',
    label: 'Email',
    href: '#', // 'mailto:ethanlukandwa@gmail.com'
    display: 'ethanlukandwa@gmail.com',
  },
  {
    kind: 'github',
    label: 'GitHub',
    href: '#', // 'https://github.com/3luko'
    display: '3luko',
  },
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    href: '#', // 'https://www.linkedin.com/in/ethanlukandwa/'
    display: 'https://www.linkedin.com/in/ethanlukandwa/',
  },
];
