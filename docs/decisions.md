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

### 13. Skill constellation as an optional view of Skills
- **Date:** 2026-11-12 · **Source:** the owner approved the placement and scope
- An "Explore / List" toggle in the Skills section. Explore is the default at ≥ 48rem. On phones the default is List, the original grid. Hero, About and the other sections are unchanged.
- **Why:** the constellation is useful because it links each skill to evidence. Skills is where visitors look for that. The plain list stays one click away, so the graph never gets in the way of a quick skim.
- It's lazy-loaded, so it doesn't add to the initial bundle.

### 14. Constellation data is derived, not written by hand
- **Date:** 2026-11-12 · **Source:** implementation choice
- Categories come from `skills.ts`. The "used in" entries, the sentence shown for each and the related skills all come from the `tech` lists and highlights in `experience.ts`, `projects.ts` and `constellation.supportingProjects`.
- Only skills with at least one matching entry appear. Skills in `skills.ts` without evidence are left out of the graph, and so are skills with no support anywhere, such as AWS or Machine Learning.
- Three supporting projects back up React, JavaScript, Java and TypeScript in the panel only: Amazon Purchase Reflection, Sustainability Trivia Game and this portfolio. The owner chose not to add them as project cards. The Trivia details were checked against its GitHub source; it's a JavaFX team project.
- **Why:** the constellation can't drift out of sync with the rest of the page, and it can't make claims the page doesn't support.

### 15. Constellation rendering: fixed layout, HTML buttons over SVG lines, no idle motion
- **Date:** 2026-11-12 · **Source:** implementation choice; the owner agreed to no idle motion
- Positions are computed once: each category gets a sector, and its skills sit on three staggered rings. There's no force simulation, dragging or panning.
- Nodes are real `<button>`s placed over an `aria-hidden` SVG of lines, so focus, `:focus-visible`, keyboard and touch work natively.
- Motion uses CSS transitions only: hover and selection, filter dimming, and a one-time staggered fade-in. All of it is skipped under `prefers-reduced-motion`. There's no continuous floating, so decision 5 still holds.
- Dimmed nodes fade only the dot, and the label switches to `--color-text-muted`, so the text keeps AA contrast.
- Five `--color-cat-*` tokens, each with a dark and a light value, named after the `skillGroups` ids. From `64rem` the panel sits beside the graph; below that it sits underneath. The 64rem breakpoint is used only by this component.
