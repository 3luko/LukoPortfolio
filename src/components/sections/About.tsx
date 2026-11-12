import { profile } from '../../content/profile';
import { Section } from '../ui/Section';
import styles from './About.module.css';

export function About() {
  const { headshot } = profile;

  return (
    <Section id="about">
      <div className={styles.grid}>
        <div className={styles.text}>
          {profile.about.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className={styles.photoFrame}>
          <img
            className={styles.photo}
            src={headshot.src}
            alt={headshot.alt}
            width={headshot.width}
            height={headshot.height}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </Section>
  );
}
