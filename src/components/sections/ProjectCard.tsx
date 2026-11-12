import type { Project } from '../../content/types';
import { BulletList } from '../ui/BulletList';
import { ExternalLink } from '../ui/ExternalLink';
import { ArrowUpRightIcon } from '../ui/Icons';
import { TagList } from '../ui/TagList';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project }: { project: Project }) {
  const headingId = `project-${project.id}`;

  return (
    <article className={styles.card} aria-labelledby={headingId}>
      <h3 id={headingId} className={styles.name}>
        {project.name}
      </h3>
      <p className={styles.summary}>{project.summary}</p>
      {project.description && <p className={styles.description}>{project.description}</p>}
      <BulletList items={project.highlights} />
      <TagList items={project.tech} label="Technologies" />

      {project.links.length > 0 && (
        <ul className={styles.links}>
          {project.links.map((link) => (
            <li key={link.label}>
              <ExternalLink href={link.href} className={styles.link}>
                {link.label}
                <span className="visually-hidden"> for {project.name}</span>
                <ArrowUpRightIcon />
              </ExternalLink>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
