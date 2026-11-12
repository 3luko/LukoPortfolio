import type { ReactNode } from 'react';
import { categoryColor } from './categoryColor';
import { categories, inCategory, skillNodes } from './skillGraph';
import chip from './Chip.module.css';
import styles from './SkillIndex.module.css';

interface SkillIndexProps {
  filter: string | null;
  selectedId: string | null;
  onSelect: (id: string) => void;
  detailsId: string;
  /** Details panel, rendered right after the group that holds the selected skill. */
  details: ReactNode;
}

/** Compact, list-based version of the constellation for narrow screens. */
export function SkillIndex({ filter, selectedId, onSelect, detailsId, details }: SkillIndexProps) {
  const groups = categories
    .filter((category) => filter === null || category.id === filter)
    .map((category) => ({
      category,
      // With a filter, include skills that are also in this category; otherwise each skill once.
      skills: skillNodes.filter((node) =>
        filter === null ? node.category === category.id : inCategory(node, category.id),
      ),
    }));

  return (
    <div className={styles.index}>
      {groups.map(({ category, skills }) => {
        const titleId = `skill-index-${category.id}`;
        const holdsSelection = skills.some((node) => node.id === selectedId);
        return (
          <div key={category.id} className={styles.group} style={categoryColor(category.id)}>
            <h3 id={titleId} className={styles.title}>
              {category.title}
            </h3>
            <ul className={styles.list} aria-labelledby={titleId}>
              {skills.map((node) => (
                <li key={node.id}>
                  <button
                    type="button"
                    className={chip.chip}
                    style={categoryColor(node.category)}
                    aria-pressed={node.id === selectedId}
                    aria-controls={holdsSelection ? detailsId : undefined}
                    onClick={() => onSelect(node.id)}
                  >
                    <span className={chip.dot} aria-hidden="true" />
                    {node.name}
                  </button>
                </li>
              ))}
            </ul>
            {holdsSelection && details}
          </div>
        );
      })}
    </div>
  );
}
