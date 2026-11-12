import { useLayoutEffect, useRef, useState, type FocusEvent, type PointerEvent } from 'react';
import { categoryColor } from './categoryColor';
import { layout, toPercent, VIEW_HEIGHT, VIEW_WIDTH, type Edge } from './layout';
import { categories, categoryTitle, inCategory, skillById, skillNodes, type SkillNode } from './skillGraph';
import styles from './ConstellationGraph.module.css';

interface ConstellationGraphProps {
  filter: string | null;
  selectedId: string | null;
  onSelect: (id: string) => void;
  centerLabel: string;
  /** id of the details panel the nodes control. */
  detailsId: string;
  /** id of the text that explains how to use the graph. */
  describedBy: string;
}

type NodeState = 'idle' | 'active' | 'related' | 'lit' | 'dim';

/**
 * Plays a one-time staggered fade-in when the graph first scrolls into view.
 * Skipped entirely under reduced motion or without IntersectionObserver.
 */
function useIntro() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer = 0;
    el.classList.add(styles.pending);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        el.classList.add(styles.entering);
        // Force a style flush so the staggered transitions start from the hidden state.
        void el.offsetWidth;
        el.classList.remove(styles.pending);
        timer = window.setTimeout(() => el.classList.remove(styles.entering), 1800);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      el.classList.remove(styles.pending, styles.entering);
    };
  }, []);

  return ref;
}

export function ConstellationGraph({
  filter,
  selectedId,
  onSelect,
  centerLabel,
  detailsId,
  describedBy,
}: ConstellationGraphProps) {
  const ref = useIntro();
  const [previewId, setPreviewId] = useState<string | null>(null);

  // Hovering (or keyboard focus) previews a skill; otherwise the selection is shown.
  const active = skillById.get(previewId ?? selectedId ?? '');
  const related = new Set(active?.related);

  function nodeState(node: SkillNode): NodeState {
    if (active) {
      if (node.id === active.id) return 'active';
      return related.has(node.id) ? 'related' : 'dim';
    }
    if (filter) return inCategory(node, filter) ? 'lit' : 'dim';
    return 'idle';
  }

  function categoryState(categoryId: string): NodeState {
    if (active) return active.categories.includes(categoryId) ? 'lit' : 'dim';
    if (filter) return categoryId === filter ? 'lit' : 'dim';
    return 'idle';
  }

  function edgeState(edge: Edge): NodeState {
    if (active) {
      if (edge.skill) return edge.skill === active.id ? 'lit' : 'dim';
      return active.categories.includes(edge.category) ? 'lit' : 'dim';
    }
    if (filter) return edge.category === filter ? 'lit' : 'dim';
    return 'idle';
  }

  const startPreview = (id: string) => (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse') setPreviewId(id);
  };
  const focusPreview = (id: string) => (event: FocusEvent<HTMLButtonElement>) => {
    // Only keyboard focus previews; a mouse click already selects.
    if (event.currentTarget.matches(':focus-visible')) setPreviewId(id);
  };
  const endPreview = (id: string) => () => {
    setPreviewId((current) => (current === id ? null : current));
  };

  const activePoint = active ? layout.nodes.get(active.id) : undefined;

  return (
    <div
      ref={ref}
      className={styles.graph}
      role="group"
      aria-label="Skill constellation"
      aria-describedby={describedBy}
    >
      <svg
        className={styles.lines}
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        {layout.edges.map((edge) => (
          <line
            key={edge.id}
            x1={edge.from.x}
            y1={edge.from.y}
            x2={edge.to.x}
            y2={edge.to.y}
            className={edge.skill ? (edge.secondary ? styles.secondary : styles.link) : styles.spoke}
            style={categoryColor(edge.category)}
            data-state={edgeState(edge)}
          />
        ))}
        {activePoint &&
          active?.related.map((id) => {
            const to = layout.nodes.get(id);
            return to ? (
              <line
                key={`relation-${active.id}-${id}`}
                x1={activePoint.x}
                y1={activePoint.y}
                x2={to.x}
                y2={to.y}
                className={styles.relation}
              />
            ) : null;
          })}
      </svg>

      <div className={styles.slot} style={toPercent(layout.center)} aria-hidden="true">
        <span className={styles.center}>
          <span className={styles.centerDot} />
          <span className={styles.centerLabel}>{centerLabel}</span>
        </span>
      </div>

      {categories.map((category) => {
        const point = layout.hubs.get(category.id);
        if (!point) return null;
        return (
          <div
            key={category.id}
            className={styles.slot}
            style={{ ...toPercent(point), ...categoryColor(category.id) }}
            aria-hidden="true"
          >
            <span className={styles.hub} data-state={categoryState(category.id)}>
              <span className={styles.hubDot} />
              <span className={styles.hubLabel}>{category.title}</span>
            </span>
          </div>
        );
      })}

      {skillNodes.map((node, index) => {
        const point = layout.nodes.get(node.id)!;
        const categoryNames = node.categories.map(categoryTitle).join(' · ');
        return (
          <div
            key={node.id}
            className={styles.slot}
            style={{ ...toPercent(point), ...categoryColor(node.category, { '--i': index }) }}
          >
            <button
              type="button"
              className={styles.node}
              data-state={nodeState(node)}
              aria-pressed={node.id === selectedId}
              aria-controls={detailsId}
              onClick={() => onSelect(node.id)}
              onPointerEnter={startPreview(node.id)}
              onPointerLeave={endPreview(node.id)}
              onFocus={focusPreview(node.id)}
              onBlur={endPreview(node.id)}
            >
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.label}>{node.name}</span>
              <span className="visually-hidden">, {categoryNames}</span>
              <span className={styles.tooltip} aria-hidden="true">
                <strong>{node.name}</strong> {categoryNames}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
