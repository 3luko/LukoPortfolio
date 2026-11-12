# Architecture

## Overview

A single-page React app with no router and no global state library. The page is one long document; navigation uses anchor links (`#about`, `#projects`, …) and the browser's native scrolling.

```
index.html          sets data-theme before React loads (inline script)
  └─ src/main.tsx   imports global CSS, mounts <App/>
       └─ App.tsx   SkipLink, Header, <main> with the 6 sections, Footer
```

## Folder structure

```
src/
  content/       ← all site text and links (plain typed TS objects)
    types.ts       interfaces for every content shape
    profile.ts     name, headline, intro, about, resume, headshot
    experience.ts  ExperienceItem[]
    projects.ts    Project[]
    skills.ts      SkillGroup[]
    contact.ts     ContactLink[]
    navigation.ts  section order, section titles, nav labels
    constellation.ts  skill constellation: curated skills, descriptions, and
                   supporting projects (evidence that isn't shown as a project card)
  styles/
    tokens.css     CSS variables: colours (dark + light), type, spacing, motion
    global.css     reset, base elements, focus ring, .container, .visually-hidden,
                   reduced-motion override
  components/
    layout/        page chrome: SkipLink, Header (+ mobile menu), ThemeToggle, Footer
    sections/      one component per page section: Hero, About, Experience,
                   Projects (+ ProjectCard), Skills, Contact
    ui/            reusable pieces: Section, Reveal, Button, ExternalLink,
                   TagList, BulletList, Icons, IconButton.module.css
    constellation/ interactive skill explorer, lazy-loaded by Skills (see below)
  hooks/           useMediaQuery
  App.tsx, main.tsx
public/            served as-is: resume.pdf, headshot.jpg, favicon.svg
```

## Data flow

Data only flows one way: **content files → section components → UI components**.

1. `src/content/*.ts` export plain constant objects, typed against `types.ts`. TypeScript flags a typo or missing field at build time.
2. Section components import the data directly (e.g. `Experience.tsx` imports `experience`) and map over it.
3. UI components (`TagList`, `BulletList`, `Button`…) receive data through props and know nothing about where it came from.

No component fetches data, and nothing is stored in global state. The only runtime state is:

| State | Where | Notes |
|---|---|---|
| Mobile menu open/closed | `Header` (`useState`) | Closes on Escape or when a link is clicked |
| Current theme | `ThemeToggle` (`useState`) | Mirrors `<html data-theme>`, saved to `localStorage['theme']` |
| Section revealed? | `Reveal` (DOM class) | Uses IntersectionObserver; no React state |
| Skills view (Explore / List) | `Skills` (`useState`) | Explore at ≥ 48rem, List below, until the visitor picks one |
| Constellation filter and selected skill | `SkillConstellation` (`useState`) | Escape or "Reset view" clears them |
| Previewed (hovered or focused) skill | `ConstellationGraph` (`useState`) | Kept local so hovering doesn't re-render the panel |

## Sections and navigation

`content/navigation.ts` is the single source for section ids, titles and order:

- `sectionOrder` drives the order of nav links and the "01, 02…" numbers above headings.
- `ui/Section` takes an `id`, looks up its title/intro, and renders `<section id aria-labelledby>` + `<h2>`. It wraps the content in `Reveal`.
- `Hero` is the exception: it isn't in `sectionOrder`, uses `id="top"` and holds the page's only `<h1>`.

The order of sections on the page is set in `App.tsx`. Keep it in sync with `sectionOrder`.

## Skill constellation

The constellation is an optional "Explore" view of the Skills section. `Skills.tsx` loads it with `React.lazy`, so it ships as a separate chunk (about 7 KB of gzipped JS) and the main bundle doesn't change. The "List" view is the original tag grid.

```
components/constellation/
  skillGraph.ts          data model: builds the nodes from content, once at import
  layout.ts              fixed radial layout in viewBox units (no physics)
  categoryColor.ts       sets --cat to a --color-cat-<groupId> token
  SkillConstellation     state (filter, selection) and toolbar; picks graph or index by width
  ConstellationGraph     ≥ 48rem: SVG lines (aria-hidden) with HTML <button> nodes on top
  SkillIndex             < 48rem: grouped skill buttons; the panel appears under the group
  SkillDetails           the information panel
  CategoryFilter         "All skills" plus one button per skill group
  Chip.module.css        shared pill style
```

Data rules (nothing is duplicated):

- **Category:** each node's category is looked up from `skillGroups` in `skills.ts`. If a name in `constellation.ts` isn't in `skills.ts`, the node is skipped and a warning appears in the dev console.
- **"Where I've used it":** an entry counts when its `tech` list contains the skill name or one of its `evidenceAliases`. The sources are `experience`, `projects` and `constellation.supportingProjects`. The sentence shown is the first highlight that names the skill, or the entry's summary if none does.
- **Related skills:** skills that appear in the same entries, ranked by how many entries they share.
- **Links:** experience entries link to `#<id>-org` and projects to `#project-<id>`, both existing heading ids. Supporting projects show only their own `links`.

## Styling

- **Tokens:** every colour, size and duration is a CSS variable in `tokens.css`. Dark values sit on `:root`; light values on `:root[data-theme='light']`.
- **CSS Modules:** each component imports its own `*.module.css`, so class names are scoped automatically.
- **Globals:** only element defaults and the two utility classes `container` and `visually-hidden`.
- **Responsive:** mobile-first, with one main breakpoint at `48rem` (768px). Fluid type and spacing come from `clamp()`.
- **Motion:** CSS transitions only. `global.css` cuts all transition durations under `prefers-reduced-motion: reduce`, and `Reveal` skips hiding content in that case.

## Theming flow

1. The inline script in `index.html` reads `localStorage['theme']`. If nothing is saved, it uses the OS `prefers-color-scheme`. It then sets `<html data-theme="dark|light">` before first paint, so the page doesn't flash the wrong theme.
2. `ThemeToggle` reads that attribute as its initial state. A click flips it, writes `localStorage`, and the CSS variables swap instantly.

## Build

`npm run build` runs `tsc -b` (type-check both `tsconfig.app.json` and `tsconfig.node.json`), then `vite build`. The output is static files in `dist/` (one JS bundle, one CSS file, plus `public/` assets).
