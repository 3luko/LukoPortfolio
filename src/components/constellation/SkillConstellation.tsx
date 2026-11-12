import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { constellation } from '../../content/constellation';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { CategoryFilter } from './CategoryFilter';
import { ConstellationGraph } from './ConstellationGraph';
import { SkillDetails } from './SkillDetails';
import { SkillIndex } from './SkillIndex';
import { categories, inCategory, skillById, skillNodes } from './skillGraph';
import styles from './SkillConstellation.module.css';

const DETAILS_ID = 'skill-details';
const HINT_ID = 'skill-constellation-hint';

/**
 * Interactive skill explorer: a graph on wider screens, a grouped list on narrow ones.
 * Both share the same filter, selection and details panel.
 */
export function SkillConstellation() {
  const showGraph = useMediaQuery('(min-width: 48rem)');
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const focusDetails = useRef(false);

  const selected = selectedId ? (skillById.get(selectedId) ?? null) : null;

  // After choosing a related skill, move focus to the new details heading.
  useEffect(() => {
    if (focusDetails.current) {
      focusDetails.current = false;
      headingRef.current?.focus();
    }
  }, [selectedId]);

  const toggle = (id: string) => setSelectedId((current) => (current === id ? null : id));

  const selectRelated = (id: string) => {
    focusDetails.current = true;
    setSelectedId(id);
    if (filter && !inCategory(skillById.get(id)!, filter)) setFilter(null);
  };

  const changeFilter = (categoryId: string | null) => {
    setFilter(categoryId);
    if (selected && !inCategory(selected, categoryId)) setSelectedId(null);
  };

  const reset = () => {
    setFilter(null);
    setSelectedId(null);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && selectedId) {
      event.stopPropagation();
      setSelectedId(null);
    }
  };

  const details = (
    <SkillDetails
      id={DETAILS_ID}
      skill={selected}
      emptyText={`${skillNodes.length} skills across ${categories.length} areas. Hover or select one to see the roles and projects where I used it, and the skills I used alongside it.`}
      headingLevel={showGraph ? 3 : 4}
      headingRef={headingRef}
      onSelect={selectRelated}
      onClear={() => setSelectedId(null)}
    />
  );

  return (
    <div className={styles.root} onKeyDown={onKeyDown}>
      <div className={styles.toolbar}>
        <CategoryFilter value={filter} onChange={changeFilter} />
        {(filter !== null || selectedId !== null) && (
          <button type="button" className={styles.reset} onClick={reset}>
            Reset view
          </button>
        )}
      </div>

      <p id={HINT_ID} className={styles.hint}>
        {constellation.instruction}
      </p>

      <p className="visually-hidden" aria-live="polite">
        {selected ? `${selected.name} selected` : ''}
      </p>

      {showGraph ? (
        <div className={styles.explorer}>
          <div className={styles.graphCard}>
            <ConstellationGraph
              filter={filter}
              selectedId={selectedId}
              onSelect={toggle}
              centerLabel={constellation.centerLabel}
              detailsId={DETAILS_ID}
              describedBy={HINT_ID}
            />
          </div>
          {details}
        </div>
      ) : (
        <SkillIndex
          filter={filter}
          selectedId={selectedId}
          onSelect={toggle}
          detailsId={DETAILS_ID}
          details={details}
        />
      )}
    </div>
  );
}
