# Progress

_Last updated: 2026-11-12_

## Done

- Template removed; project structure as described in `architecture.md`
- All six sections built and rendering from `src/content/`
- Dark/light theme with toggle and no flash on load
- Responsive layout with a mobile menu
- Accessibility features: skip link, landmarks, one `h1`, labelled sections, focus styles, new-tab announcements, reduced-motion support
- Real content added by the owner:
  - Experience: Beckman Coulter Diagnostics and U.S. Bank are filled in; University of St. Thomas is partly filled (dates still missing)
  - Contact: display text for email, GitHub and LinkedIn
- Resume PDF and headshot in `public/`
- Checks passing: `npm run typecheck`, `npm run lint`, `npm run build`
- Layout checked by screenshot at 375, 768 and 1280px; no console errors on the preview build
- Git repo initialised; first commit `6e4f22e`
- **Skill constellation** (Skills → Explore): 29 evidence-backed skills, category filter, hover preview, details panel with "used in" links and related skills, phone layout, keyboard and reduced-motion support. Checked by screenshot at 375, 768 and 1280px in both themes; every "used in" link resolves to an existing heading. The owner checked it by hand, including the intro animation and the technology descriptions.

## Current limitations

- **No project has a link.** Every `links` array in `projects.ts` is empty.
- **Typo:** the St. Thomas end date in `experience.ts` is `'August 2026w'`.
- **Uncertain:** the St. Thomas title in `experience.ts` is "Information Security Analyst", but it was "Information Security Intern" during planning. Confirm which is correct.
- **Page title** in `index.html` doesn't include the name.- **Lighthouse has not been run.** The target is Accessibility ≥ 95.
- **No manual keyboard walkthrough yet.** The features are built but haven't been tested by hand.
- **Headshot is 1028×1028 (~230 KB)** but displays at about 290px wide. It could be smaller.
- The theme doesn't follow live OS theme changes until reload (see decision 7).
- No automated tests and no deployment set up.

## Next recommended tasks

1. Add GitHub or demo links to the projects in `projects.ts`.
2. Fix the `'August 2026w'` typo in `experience.ts`.
3. Run Lighthouse (Chrome DevTools) on `npm run preview` in both themes, then fix any issues.
4. Do a keyboard-only pass: Tab through the page, check the mobile menu works with Escape, and check the skip link.
5. Resize `public/headshot.jpg` to about 600px.
6. Choose a host and deploy. Static hosting works (e.g. GitHub Pages, Netlify, Vercel); _not decided_.
