import { skillGroups } from '../../content/skills';
import { Section } from '../ui/Section';
import { TagList } from '../ui/TagList';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <Section id="skills">
      <div className={styles.grid}>
        {skillGroups.map((group) => (
          <div key={group.id} className={styles.group}>
            <h3 className={styles.title}>{group.title}</h3>
            <TagList items={group.items} label={group.title} />
          </div>
        ))}
      </div>
    </Section>
  );
}
