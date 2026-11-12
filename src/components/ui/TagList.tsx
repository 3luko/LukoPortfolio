import styles from './TagList.module.css';

interface TagListProps {
  items: readonly string[];
  /** Accessible name for the list, e.g. 'Technologies'. */
  label: string;
  className?: string;
}

export function TagList({ items, label, className }: TagListProps) {
  if (items.length === 0) return null;

  return (
    <ul className={`${styles.list} ${className ?? ''}`} aria-label={label}>
      {items.map((item) => (
        <li key={item} className={styles.tag}>
          {item}
        </li>
      ))}
    </ul>
  );
}
