import { lazy, Suspense, useState } from 'react';
import { skillGroups } from '../../content/skills';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Section } from '../ui/Section';
import { TagList } from '../ui/TagList';
import styles from './Skills.module.css';

// Loaded as a separate chunk so it doesn't add to the initial bundle.
const SkillConstellation = lazy(() =>
  import('../constellation/SkillConstellation').then((module) => ({
    default: module.SkillConstellation,
  })),
);

type View = 'explore' | 'list';

export function Skills() {
  const isWide = useMediaQuery('(min-width: 48rem)');
  const [choice, setChoice] = useState<View | null>(null);
  // Until the visitor picks a view: the constellation on wider screens, the list on phones.
  const view: View = choice ?? (isWide ? 'explore' : 'list');

  return (
    <Section id="skills">
      <div role="group" aria-label="Skills view" className={styles.viewToggle}>
        <button
          type="button"
          className={styles.viewButton}
          aria-pressed={view === 'explore'}
          onClick={() => setChoice('explore')}
        >
          Explore
        </button>
        <button
          type="button"
          className={styles.viewButton}
          aria-pressed={view === 'list'}
          onClick={() => setChoice('list')}
        >
          List
        </button>
      </div>

      {view === 'explore' ? (
        <Suspense fallback={<div className={styles.loading} />}>
          <SkillConstellation />
        </Suspense>
      ) : (
        <div className={styles.grid}>
          {skillGroups.map((group) => (
            <div key={group.id} className={styles.group}>
              <h3 className={styles.title}>{group.title}</h3>
              <TagList items={group.items} label={group.title} />
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
