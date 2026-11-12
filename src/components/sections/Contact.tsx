import type { ComponentType, SVGProps } from 'react';
import { contactLinks } from '../../content/contact';
import type { ContactKind } from '../../content/types';
import { ExternalLink } from '../ui/ExternalLink';
import { GitHubIcon, LinkedInIcon, MailIcon } from '../ui/Icons';
import { Section } from '../ui/Section';
import styles from './Contact.module.css';

const icons: Record<ContactKind, ComponentType<SVGProps<SVGSVGElement>>> = {
  email: MailIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
};

export function Contact() {
  return (
    <Section id="contact">
      <ul className={styles.list}>
        {contactLinks.map((link) => {
          const Icon = icons[link.kind];
          return (
            <li key={link.kind}>
              <ExternalLink href={link.href} className={styles.link}>
                <Icon className={styles.icon} />
                <span className={styles.text}>
                  <span className={styles.label}>{link.label}</span>
                  <span className={styles.detail}>{link.display}</span>
                </span>
              </ExternalLink>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
