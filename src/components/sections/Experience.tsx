import { experience } from '../../content/experience';
import { BulletList } from '../ui/BulletList';
import { Section } from '../ui/Section';
import { TagList } from '../ui/TagList';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <Section id="experience">
      <ol className={styles.list}>
        {experience.map((item) => (
          <li key={item.id}>
            <article className={styles.card} aria-labelledby={`${item.id}-org`}>
              <div className={styles.meta}>
                <p>
                  {item.start} – {item.end}
                </p>
                {item.location && <p>{item.location}</p>}
              </div>

              <div className={styles.body}>
                <h3 id={`${item.id}-org`} className={styles.org}>
                  {item.organization}
                </h3>
                <p className={styles.title}>
                  {item.title}
                  {item.employmentType && (
                    <span className={styles.type}> · {item.employmentType}</span>
                  )}
                </p>
                <p className={styles.summary}>{item.summary}</p>
                <BulletList items={item.highlights} className={styles.highlights} />
                <TagList items={item.tech} label="Technologies" className={styles.tags} />
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
