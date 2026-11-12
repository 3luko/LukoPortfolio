# Decisions

Important technical and design decisions, newest at the bottom. Each entry gives the date, the decision, and why. **Source** says whether the owner required it or it was an implementation choice that can be revisited.

---

### 1. React + TypeScript + Vite
- **Date:** 2026-11-11 · **Source:** owner requirement
- The project started from the official Vite `react-ts` template.

### 2. No invented content; placeholders instead
- **Date:** 2026-11-11 · **Source:** owner requirement
- Unknown text is `{{ PLACEHOLDER: ... }}` and unknown links are `#`.
- **Why:** the site describes a real person. Made-up achievements, dates or links would be misleading.

### 3. Content in typed files under `src/content/`
- **Date:** 2026-11-11 · **Source:** owner requirement
- **Why:** you can update the site without editing JSX, and TypeScript catches missing fields.

### 4. CSS Modules + CSS variables; no UI, CSS or animation libraries
- **Date:** 2026-11-11 · **Source:** owner requirement
- **Why:** few dependencies, small bundle, full control over accessibility and styling.

### 5. CSS-only motion that respects reduced motion
- **Date:** 2026-11-11 · **Source:** owner requirement
- Transitions and transforms only. A global `prefers-reduced-motion` rule cuts all transition durations.

### 6. Single page with anchor navigation (no router)
- **Date:** 2026-11-11 · **Source:** implementation choice
- **Why:** there's only one page, so a router would add a dependency for nothing. Native `#id` links also work without JS.

### 7. Dark default + light theme, saved in `localStorage`
- **Date:** 2026-11-11 · **Source:** owner chose "dark and light"; implementation details were a choice
- First visit follows the OS setting. The header toggle overrides it and remembers the choice.
- An inline script in `index.html` sets `data-theme` before React loads, **to avoid a flash of the wrong theme**.
- **Known gap:** if the visitor hasn't picked a theme and changes their OS theme while the page is open, the page doesn't follow until reload.

### 8. Teal accent on navy, system font stack
- **Date:** 2026-11-11 · **Source:** owner approved
- Dark: `#5eead4` on `#0b1220`. Light: `#0f766e` on `#f6f8fb`. Contrast ratios were calculated against AA for both themes.
- System fonts: no font download, so the fastest possible text rendering.

### 9. Scroll reveal toggles a DOM class instead of React state
- **Date:** 2026-11-11 · **Source:** implementation choice
- `Reveal` adds and removes a CSS class directly via a ref.
- **Why:** no re-renders, and it avoids the `react-hooks/set-state-in-effect` lint rule.
- Content is only hidden when it starts below the fold, so nothing is invisible if JS is slow or the observer isn't supported.

### 10. Headshot in About, not Hero
- **Date:** 2026-11-11 · **Source:** implementation choice
- **Why:** keeps the first screen text-only, so it renders fast. The image can lazy-load.

### 11. Renamed public assets
- **Date:** 2026-11-11 · **Source:** implementation choice, owner informed
- The original files were renamed to `public/headshot.jpg` and `public/resume.pdf`.
- **Why:** the original filenames had spaces and parentheses, which make awkward URLs.

### 12. Added a `typecheck` script (`tsc -b --noEmit`)
- **Date:** 2026-11-11 · **Source:** implementation choice
- **Why:** the root `tsconfig.json` only references the other two configs. A plain `tsc --noEmit` checks nothing, but `-b` follows the references.
