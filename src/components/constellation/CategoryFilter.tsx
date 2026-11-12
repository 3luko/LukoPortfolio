import { categoryColor } from './categoryColor';
import { categories } from './skillGraph';
import chip from './Chip.module.css';
import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
  value: string | null;
  onChange: (categoryId: string | null) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div role="group" aria-label="Filter skills by category" className={styles.filter}>
      <button
        type="button"
        className={chip.chip}
        aria-pressed={value === null}
        onClick={() => onChange(null)}
      >
        All skills
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          className={chip.chip}
          style={categoryColor(category.id)}
          aria-pressed={value === category.id}
          onClick={() => onChange(category.id)}
        >
          <span className={chip.dot} aria-hidden="true" />
          {category.title}
        </button>
      ))}
    </div>
  );
}
