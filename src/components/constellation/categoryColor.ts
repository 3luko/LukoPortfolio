import type { CSSProperties } from 'react';

/** Inline style that sets `--cat` to a category's colour token (accent if the token is missing). */
export function categoryColor(categoryId: string, extra?: Record<string, string | number>): CSSProperties {
  return {
    '--cat': `var(--color-cat-${categoryId}, var(--color-accent))`,
    ...extra,
  } as CSSProperties;
}
