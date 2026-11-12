import type { ReactNode } from 'react';
import { ExternalLink } from './ExternalLink';
import styles from './Button.module.css';

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
  newTab?: boolean;
}

/** A link styled as a button. All calls to action on this site are navigations. */
export function Button({ href, children, variant = 'primary', icon, newTab = false }: ButtonProps) {
  return (
    <ExternalLink href={href} newTab={newTab} className={`${styles.button} ${styles[variant]}`}>
      {icon}
      <span>{children}</span>
    </ExternalLink>
  );
}
