import type { Ref } from 'react';
import { ExternalLink } from '../ui/ExternalLink';
import { ArrowUpRightIcon, CloseIcon } from '../ui/Icons';
import iconButton from '../ui/IconButton.module.css';
import { categoryColor } from './categoryColor';
import { categoryTitle, skillById, type SkillNode } from './skillGraph';
import chip from './Chip.module.css';
import styles from './SkillDetails.module.css';

interface SkillDetailsProps {
  id: string;
  skill: SkillNode | null;
  /** Shown when nothing is selected. */
  emptyText: string;
  headingLevel: 3 | 4;
  headingRef: Ref<HTMLHeadingElement>;
  onSelect: (id: string) => void;
  onClear: () => void;
}

const sectionName = { experience: 'Experience', project: 'Projects' } as const;

export function SkillDetails({
  id,
  skill,
  emptyText,
  headingLevel,
  headingRef,
  onSelect,
  onClear,
}: SkillDetailsProps) {
  if (!skill) {
    return (
      <div id={id} className={`${styles.panel} ${styles.empty}`}>
        <p>{emptyText}</p>
      </div>
    );
  }

  const Heading = headingLevel === 3 ? 'h3' : 'h4';
  const Subheading = headingLevel === 3 ? 'h4' : 'h5';
  const headingId = `${id}-heading`;

  return (
    <div
      id={id}
      className={styles.panel}
      role="region"
      aria-labelledby={headingId}
      style={categoryColor(skill.category)}
    >
      <div className={styles.header}>
        <div>
          <Heading id={headingId} ref={headingRef} tabIndex={-1} className={styles.title}>
            {skill.name}
          </Heading>
          <p className={styles.categories}>
            {skill.categories.map((categoryId) => (
              <span key={categoryId} className={styles.category} style={categoryColor(categoryId)}>
                <span className={chip.dot} aria-hidden="true" />
                {categoryTitle(categoryId)}
              </span>
            ))}
          </p>
        </div>
        <button type="button" className={iconButton.iconButton} onClick={onClear}>
          <CloseIcon />
          <span className="visually-hidden">Clear selection</span>
        </button>
      </div>

      <p className={styles.description}>{skill.description}</p>

      <div className={styles.block}>
        <Subheading className={styles.subheading}>Where I&apos;ve used it</Subheading>
        <ul className={styles.uses}>
          {skill.uses.map(({ evidence, detail }) => (
            <li key={evidence.id} className={styles.use}>
              <p className={styles.useName}>
                {evidence.href && evidence.kind !== 'supporting' ? (
                  <a href={evidence.href}>
                    {evidence.name}
                    <span className="visually-hidden">
                      {' '}
                      (view in the {sectionName[evidence.kind]} section)
                    </span>
                  </a>
                ) : (
                  evidence.name
                )}
              </p>
              <p className={styles.useContext}>{evidence.context}</p>
              <p className={styles.useDetail}>{detail}</p>
              {evidence.links.length > 0 && (
                <ul className={styles.links}>
                  {evidence.links.map((link) => (
                    <li key={link.href}>
                      <ExternalLink href={link.href} className={styles.link}>
                        {link.label}
                        <span className="visually-hidden"> for {evidence.name}</span>
                        <ArrowUpRightIcon />
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {skill.related.length > 0 && (
        <div className={styles.block}>
          <Subheading className={styles.subheading}>Related skills</Subheading>
          <ul className={styles.related}>
            {skill.related.map((relatedId) => {
              const other = skillById.get(relatedId);
              if (!other) return null;
              return (
                <li key={relatedId}>
                  <button
                    type="button"
                    className={chip.chip}
                    style={categoryColor(other.category)}
                    onClick={() => onSelect(relatedId)}
                  >
                    <span className={chip.dot} aria-hidden="true" />
                    {other.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
