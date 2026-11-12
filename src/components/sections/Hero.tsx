import { profile } from '../../content/profile';
import { Button } from '../ui/Button';
import { FileIcon } from '../ui/Icons';
import { TagList } from '../ui/TagList';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-heading">
      <div className="container">
        <p className={styles.greeting}>{profile.greeting}</p>
        <h1 id="hero-heading" className={styles.name}>
          {profile.name}
        </h1>
        <p className={styles.headline}>{profile.headline}</p>
        <p className={styles.intro}>{profile.intro}</p>

        <TagList items={profile.focusAreas} label="Focus areas" className={styles.focus} />

        <div className={styles.actions}>
          <Button href={profile.resume.href} newTab icon={<FileIcon />}>
            {profile.resume.label}
          </Button>
          <Button href="#contact" variant="secondary">
            {profile.contactLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
