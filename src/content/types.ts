/**
 * Content types. Every string shown on the site comes from a file in src/content/.
 * Convention: unknown text is '{{ PLACEHOLDER: ... }}', unknown links are '#'.
 */

export type SectionId = 'about' | 'experience' | 'projects' | 'skills' | 'contact';

export interface SectionMeta {
  /** Short label used in the navigation. */
  label: string;
  /** Visible section heading. */
  title: string;
  /** Optional sentence under the heading. */
  intro?: string;
}

export interface Profile {
  name: string;
  greeting: string;
  headline: string;
  intro: string;
  focusAreas: readonly string[];
  about: readonly string[];
  resume: { href: string; label: string };
  contactLabel: string;
  headshot: { src: string; alt: string; width: number; height: number };
}

export interface ExperienceItem {
  id: string;
  organization: string;
  title: string;
  /** e.g. 'Student worker', 'Full-time', 'Internship' */
  employmentType?: string;
  location?: string;
  start: string;
  end: string;
  summary: string;
  highlights: readonly string[];
  tech: readonly string[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  name: string;
  summary: string;
  description?: string;
  highlights: readonly string[];
  tech: readonly string[];
  links: readonly ProjectLink[];
}

export interface SkillGroup {
  id: string;
  title: string;
  items: readonly string[];
}

export type ContactKind = 'email' | 'github' | 'linkedin';

export interface ContactLink {
  kind: ContactKind;
  label: string;
  /** Use 'mailto:you@example.com' for email, full https:// URLs for profiles. */
  href: string;
  /** Text shown under the label, e.g. the address or handle. */
  display: string;
}
