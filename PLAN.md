# Portfolio Implementation Plan

Status: **Implemented (steps 1–8).** Content is placeholders pending owner input. Lighthouse not yet run (see DoD).

## Decisions (from Q&A, 2026-11-11)

- Resume: `public/resume.pdf` (renamed from `OverlyRes.pdf`).
- Headshot: `public/headshot.jpg` (renamed from the original export), shown in About.
- Contact: Email, GitHub, LinkedIn. Values are placeholders in `src/content/contact.ts`.
- Accent: teal on navy. Fonts: system stack.
- Themes: dark and light. Follows the OS on first visit; the header toggle saves the choice to `localStorage`. An inline script in `index.html` applies it before first paint.
- University role: University of St. Thomas, St. Paul, Minnesota. Information Security Intern (student worker).
- Git repo initialised on `main`.

## 1. Current state

The project is an unmodified `npm create vite` React + TypeScript template:

- React 19, Vite 8, TypeScript 6, ESLint 10. No runtime dependencies beyond `react` / `react-dom`.
- `src/App.tsx`, `src/App.css`, `src/index.css` are template demo code (counter, Vite/React logos).
- `src/assets/{hero.png,react.svg,vite.svg}`, `public/icons.svg` are template assets; `public/favicon.svg` is the Vite logo.
- `tsconfig.json` is a solution file (`files: []` + references), so a bare `tsc --noEmit` checks nothing. A `typecheck` script using `tsc -b --noEmit` will be added (step 1).
- Not a git repository yet.

## 2. Constraints (from brief)

- No invented facts: achievements, URLs, contact info, metrics, dates, job titles. Unknown text → `{{ PLACEHOLDER: ... }}`, unknown links → `#`.
- No new dependencies. CSS Modules + CSS custom properties only. No Tailwind, CSS-in-JS, UI or animation libraries.
- Animations: CSS transitions/transforms only, disabled under `prefers-reduced-motion: reduce`.
- Semantic HTML, full keyboard access, visible `:focus-visible` styles, WCAG AA contrast.
- All content in typed files under `src/content/`; components only render data.

## 3. Proposed structure

```
src/
  main.tsx                      # entry (unchanged apart from CSS import path)
  App.tsx                       # composes layout + sections in order
  styles/
    tokens.css                  # :root CSS variables: colors, spacing, type scale, radii, motion
    global.css                  # reset, base typography, focus ring, reduced-motion rules, .visually-hidden
  content/
    types.ts                    # Profile, ExperienceItem, Project, SkillGroup, ContactLink, NavItem
    profile.ts                  # name, headline, intro, about paragraphs, resume URL
    experience.ts               # Beckman Coulter Diagnostics, U.S. Bank, university infosec
    projects.ts                 # AgentForge, BOMJA, Scamalytics risk automation, Matatu AI
    skills.ts                   # grouped: SWE, Data Eng, Security, AI/ML, Tools
    contact.ts                  # email, GitHub, LinkedIn (all placeholders until provided)
    navigation.ts               # section ids + labels (single source for nav and section ids)
  components/
    layout/
      SkipLink.tsx              # "Skip to main content", first focusable element
      Header.tsx + .module.css  # sticky header, nav links, mobile menu toggle (button + aria-expanded)
      ThemeToggle.tsx           # dark/light switch, persisted in localStorage
      Footer.tsx + .module.css
    ui/
      Section.tsx + .module.css # <section aria-labelledby> wrapper with heading + consistent spacing
      Button.tsx + .module.css  # renders <a> or <button>; primary / secondary variants
      Tag.tsx + .module.css     # tech-stack chip
      ExternalLink.tsx          # adds rel="noopener noreferrer" + visually-hidden "(opens in new tab)"
      Reveal.tsx + .module.css  # fade/translate-in on scroll (IntersectionObserver + CSS transition)
      TagList, BulletList, Icons.tsx, IconButton.module.css
    sections/
      Hero.tsx + .module.css
      About.tsx + .module.css
      Experience.tsx + .module.css   # <ol> timeline of <article>s
      Projects.tsx + .module.css     # responsive grid of ProjectCard
      ProjectCard.tsx + .module.css
      Skills.tsx + .module.css       # grouped lists
      Contact.tsx + .module.css
```

Notes on design decisions:

- **Single page, anchor navigation** (`#about`, `#experience`, …). No router dependency.
- **`Reveal`** uses a native `IntersectionObserver` to toggle a class; the motion itself is a CSS `opacity`/`transform` transition. Content is visible by default if JS is slow or motion is reduced (no hidden-until-JS content).
- **Data types** use string-literal unions where useful (e.g. `ContactLink.kind: 'email' | 'github' | 'linkedin' | 'other'`) and `readonly` arrays. `url` fields default to `'#'`.
- **Icons**: small inline SVG components (GitHub, LinkedIn, mail, external-link) written by hand, `aria-hidden`, so no icon library is needed.
- **Fonts**: system font stack by default (zero network cost). See question 4.

### Data shapes (draft)

```ts
export interface Project {
  id: string;
  name: string;               // e.g. 'AgentForge'
  summary: string;            // '{{ PLACEHOLDER: one-line description }}'
  description: string;
  role?: string;
  tech: readonly string[];
  highlights: readonly string[];
  links: { repo?: string; demo?: string; caseStudy?: string }; // '#' until provided
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  organization: string;       // 'Beckman Coulter Diagnostics'
  title: string;              // '{{ PLACEHOLDER: job title }}'
  start: string;              // '{{ PLACEHOLDER: start date }}'
  end: string;
  location?: string;
  summary: string;
  highlights: readonly string[];
  tech: readonly string[];
}
```

## 4. Visual design

- **Palette** (dark only; values verified for AA before use):
  - `--color-bg` deep navy `#0b1220`, `--color-surface` `#111a2e`, `--color-border` `#1f2a44`
  - `--color-text` `#e6ebf5`, `--color-text-muted` `#9aa6bf` (≥ 4.5:1 on bg and surface)
  - `--color-accent` teal/cyan `#5eead4` for links, focus ring, highlights (≥ 4.5:1 on bg)
- **Type scale**: fluid `clamp()` sizes; body 1rem–1.125rem, line-height 1.6; max line length ~68ch.
- **Spacing**: 4px-based scale tokens; sections padded `clamp(4rem, 10vw, 8rem)` vertically.
- **Layout**: centered container max ~1100px; projects grid `repeat(auto-fit, minmax(min(100%, 320px), 1fr))`.
- **Motion**: 150–250ms transitions on hover/focus (card lift via `transform`, accent underline), section reveal ~400ms. All set to `none` / instant under `prefers-reduced-motion: reduce`.

## 5. Implementation steps

1. **Clean up template.** Delete `App.css`, `src/assets/*`, `public/icons.svg`; replace Vite favicon with a simple monogram SVG; set `<title>`, meta description, `lang`, `theme-color` in `index.html`. Add `"typecheck": "tsc -b --noEmit"` script. (Optionally `git init`.)
2. **Design tokens + global CSS.** `tokens.css`, `global.css` (reset, typography, focus ring, `.visually-hidden`, reduced-motion overrides).
3. **Content layer.** `content/types.ts` and all data files populated with only the facts given in the brief; everything else as `{{ PLACEHOLDER: ... }}` / `#`.
4. **UI primitives.** `Section`, `Button`, `Tag`, `ExternalLink`, inline SVG icons.
5. **Layout.** `SkipLink`, `Header` (desktop nav + accessible mobile disclosure menu, closes on Escape / link click), `Footer`, `<main id="main">`.
6. **Sections**, one at a time, each reading from `src/content/`: Hero → About → Experience → Projects (+ `ProjectCard`) → Skills → Contact.
7. **Motion.** `Reveal` (checks reduced motion via matchMedia); hover/focus transitions.
8. **Responsive pass** at 375 / 768 / 1280px.
9. **Verification.** `npm run lint`, `npm run typecheck`, `npm run build`, `npm run preview` + Lighthouse (mobile & desktop), keyboard-only walkthrough, contrast check, console check. Fix anything found.

Each step leaves the app building cleanly.

## 6. Definition of Done

- [ ] Lighthouse Accessibility ≥ 95 (mobile and desktop, on `npm run preview` build). **Not run yet:** Lighthouse isn't installed. Run it from Chrome DevTools → Lighthouse.
- [ ] Lighthouse Performance / Best Practices / SEO reviewed. Not run yet (see above).
- [x] Layout verified at 375px, 768px, 1280px via headless Chrome screenshots: no horizontal scroll or clipping
- [x] `npm run build` succeeds with no errors or warnings
- [x] `npm run typecheck` (`tsc -b --noEmit`) clean
- [x] `npm run lint` clean
- [x] No console errors on the preview build (headless Chrome)
- [x] All six sections present: Hero (name, intro, resume button), About, Experience, Projects, Skills, Contact
- [x] All projects, experience, skills, and links rendered from `src/content/*`; only generic UI labels in JSX
- [x] No invented facts: every unknown value is a `{{ PLACEHOLDER: ... }}` or `#`
- [x] No dependencies added to `package.json`
- [ ] Fully keyboard navigable: skip link, tab order, visible focus, mobile menu with Escape. Built in; **needs a manual keyboard walkthrough.**
- [x] Semantic landmarks (`header`, `nav`, `main`, `section` with headings, `footer`), single `h1`, no skipped heading levels
- [x] All text meets WCAG AA contrast (token pairs calculated for both themes; recheck with Lighthouse)
- [x] `prefers-reduced-motion: reduce` disables all non-essential motion; content visible without JS-driven animation
- [x] External links use `rel="noopener noreferrer"` and announce new-tab behaviour

## 7. Open questions

See the chat response; answers will be folded into this plan before implementation starts.
