# CLAUDE.md

Guidance for Claude Code (and humans) working in this repository.

## Before making changes

Read the relevant repo files first. Don't rely on memory of earlier sessions:

- `docs/progress.md`: what's done, known limitations, next tasks
- `docs/architecture.md`: component structure and data flow
- `docs/decisions.md`: why things are the way they are (don't undo a decision without discussing it)
- `PLAN.md`: original implementation plan and Definition of Done checklist

The code is the source of truth. If a doc disagrees with the code, trust the code and fix the doc.

## Project

Personal portfolio site: a single page with Hero, About, Experience, Projects, Skills and Contact sections.

- **Stack:** React 19, TypeScript 6, Vite 8, ESLint 10. Node `^20.19` or `>=22.12` (developed on 22.14).
- **Styling:** CSS Modules + CSS custom properties (`src/styles/tokens.css`).
- **Runtime dependencies:** `react` and `react-dom` only.

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server with hot reload (http://localhost:5173)
npm run typecheck    # tsc -b --noEmit (a bare `tsc --noEmit` checks nothing here)
npm run lint         # eslint
npm run build        # type-check + production build into dist/
npm run preview      # serve dist/ (http://localhost:4173)
```

Run `typecheck`, `lint` and `build` before calling work done.

## Hard rules

1. **Never invent personal facts.** That covers achievements, metrics, dates, job titles, URLs and contact details. Unknown text gets `'{{ PLACEHOLDER: ... }}'` and unknown links get `'#'`. Search for `{{` to find every placeholder (some use other wording, e.g. `{{ Confirm ... }}`).
2. **Content lives in `src/content/*.ts`**, typed by `src/content/types.ts`. Components only render data. Generic UI labels ("Menu", "Back to top") may live in JSX.
3. **No new dependencies** without asking. That rules out Tailwind, CSS-in-JS, UI kits, animation libraries, routers and icon packs.
4. **Motion uses CSS transitions/transforms only** (no keyframe animation libraries). Everything must respect `prefers-reduced-motion: reduce`.
5. **Accessibility:** semantic HTML, a single `h1`, sections labelled by their `h2`, keyboard operable, visible `:focus-visible`, WCAG AA contrast in **both** themes.

## Conventions

- One component per file, with a co-located `Name.module.css`. Use named exports, except `App` (default).
- Colours, spacing, type sizes, radii and durations come from `tokens.css` variables. Don't hard-code hex values in modules.
- Every colour token has a dark value (`:root`) and a light value (`:root[data-theme='light']`). Add both.
- Global utility classes, defined in `global.css`: `container`, `visually-hidden`.
- Breakpoint: `48rem` (768px), mobile-first (`@media (min-width: 48rem)`).
- External links go through `ui/ExternalLink` (handles `target`, `rel` and screen-reader "opens in a new tab"). `'#'` links never open new tabs.
- New page sections: add the id to `SectionId` in `types.ts`, then to `sectionOrder` and `sections` in `content/navigation.ts`, and wrap the component in `ui/Section`.

## Design

Modern, minimal, professional. Dark navy (default) and light themes, with a teal accent and the system font stack. Generous spacing. Subtle motion: hover lifts and fade-in on scroll.

## Keeping docs current

Update the docs when architecture, dependencies, project status or important decisions change:
- New or removed dependency, or a structural change: `architecture.md` (+ this file if the rules change)
- Notable technical or design choice: append to `decisions.md`
- Feature finished or limitation found or fixed: `progress.md`

Don't touch docs for small cosmetic edits (copy tweaks, spacing, colour nudges).

## Git

Don't commit or push unless the user asks.

## Verification tip (Windows)

Headless Chrome on Windows won't make a viewport narrower than ~484px. To screenshot true 375px or 768px layouts, put a page containing an `<iframe width="375">` of the site into `dist/`, serve it with `npm run preview`, screenshot that, then delete it.
