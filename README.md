# Portfolio

A personal portfolio website showcasing software engineering, data engineering, cybersecurity and AI work. It's a single fast, accessible page built with React, TypeScript and Vite.

## Features

- Six sections: **Hero** (intro + resume button), **About** (with headshot), **Experience**, **Featured projects**, **Technical skills** and **Contact**
- **Dark and light themes.** Follows your OS on first visit; the header toggle remembers your choice.
- **Responsive** from small phones up to desktop, with a mobile menu below 768px
- **Accessible:** skip link, keyboard navigation, visible focus outlines, AA colour contrast, screen-reader labels
- **Subtle motion:** sections fade in on scroll and cards lift on hover. All of it turns off when the visitor's system asks for reduced motion.
- **Content kept separate from code:** all text and links are in `src/content/`
- **Minimal dependencies:** only `react` and `react-dom` at runtime, and no CSS framework

## Getting started

Requirements: [Node.js](https://nodejs.org/) `20.19+` or `22.12+`, plus npm.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run typecheck` | Check TypeScript types |
| `npm run lint` | Run ESLint |
| `npm run build` | Type-check and build the production site into `dist/` |
| `npm run preview` | Serve the built `dist/` folder at http://localhost:4173 |

## Editing your content

You don't need to touch components to change what the site says. Edit these files:

| File | Contents |
|---|---|
| `src/content/profile.ts` | Name, headline, intro, About paragraphs, resume and headshot paths |
| `src/content/experience.ts` | Jobs and internships |
| `src/content/projects.ts` | Project cards and their links |
| `src/content/skills.ts` | Skill groups |
| `src/content/contact.ts` | Email, GitHub and LinkedIn links |
| `src/content/navigation.ts` | Section titles and navigation labels |

Unfinished text is marked `{{ ... }}`. Search the project for `{{` to find what's left. Links still set to `'#'` don't go anywhere yet.

Static files live in `public/`: `resume.pdf`, `headshot.jpg` and `favicon.svg`. Replace them with files of the same name to update them.

## Project docs

- [`docs/architecture.md`](docs/architecture.md): how the code is organised
- [`docs/decisions.md`](docs/decisions.md): why it's built this way
- [`docs/progress.md`](docs/progress.md): status, limitations, next steps
- [`PLAN.md`](PLAN.md): original plan and Definition of Done

## Deployment

Not set up yet. `npm run build` produces a static site in `dist/` that any static host can serve.
