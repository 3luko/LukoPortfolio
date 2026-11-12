import styles from './BulletList.module.css';

interface BulletListProps {
  items: readonly string[];
  className?: string;
}

export function BulletList({ items, className }: BulletListProps) {
  if (items.length === 0) return null;

  return (
    <ul className={`${styles.list} ${className ?? ''}`}>
      {items.map((item, index) => (
        <li key={index} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
