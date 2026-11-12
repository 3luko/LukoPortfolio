import { useEffect, useRef, useState } from 'react';
import { navItems } from '../../content/navigation';
import { profile } from '../../content/profile';
import { CloseIcon, MenuIcon } from '../ui/Icons';
import iconButton from '../ui/IconButton.module.css';
import { ThemeToggle } from './ThemeToggle';
import styles from './Header.module.css';

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand}>
          {profile.name}
        </a>

        <nav aria-label="Primary" className={styles.nav}>
          <button
            ref={menuButtonRef}
            type="button"
            className={`${iconButton.iconButton} ${styles.menuButton}`}
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
            <span className="visually-hidden">Menu</span>
          </button>

          <ul id="primary-navigation" className={styles.list} data-open={open}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={styles.link} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
