import { useState } from 'react';
import { MoonIcon, SunIcon } from '../ui/Icons';
import iconButton from '../ui/IconButton.module.css';

type Theme = 'light' | 'dark';

// index.html sets data-theme before React loads, so the DOM is the source of truth.
const readTheme = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable: the theme still applies for this visit */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      className={iconButton.iconButton}
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
