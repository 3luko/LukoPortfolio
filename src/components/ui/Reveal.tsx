import { useEffect, useRef, type ReactNode } from 'react';
import styles from './Reveal.module.css';

interface RevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Fades content in as it scrolls into view. Content is visible by default and is
 * only hidden (then revealed) when it starts below the fold, IntersectionObserver
 * exists, and the user hasn't asked for reduced motion. The motion is pure CSS.
 */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add(styles.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove(styles.hidden);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      el.classList.remove(styles.hidden);
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.reveal} ${className ?? ''}`}>
      {children}
    </div>
  );
}
