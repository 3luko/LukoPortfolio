import type { ReactNode } from 'react';
import { sectionOrder, sections } from '../../content/navigation';
import type { SectionId } from '../../content/types';
import { Reveal } from './Reveal';
import styles from './Section.module.css';

interface SectionProps {
  id: SectionId;
  children: ReactNode;
}

export function Section({ id, children }: SectionProps) {
  const { title, intro } = sections[id];
  const headingId = `${id}-heading`;
  const number = String(sectionOrder.indexOf(id) + 1).padStart(2, '0');

  return (
    <section id={id} aria-labelledby={headingId} className={styles.section}>
      <Reveal className="container">
        <div className={styles.heading}>
          <p className={styles.eyebrow} aria-hidden="true">
            {number}
          </p>
          <h2 id={headingId} className={styles.title}>
            {title}
          </h2>
          {intro && <p className={styles.intro}>{intro}</p>}
        </div>
        {children}
      </Reveal>
    </section>
  );
}
