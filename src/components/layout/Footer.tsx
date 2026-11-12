import { profile } from '../../content/profile';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#top" className={styles.top}>
          Back to top
        </a>
      </div>
    </footer>
  );
}
