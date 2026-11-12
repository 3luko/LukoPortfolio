# Progress

_Last updated: 2026-11-11_

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

## Current limitations

- **Contact links don't work yet.** All three `href`s in `contact.ts` are still `'#'`. The real URLs are in comments next to them.
- **Placeholders remain** in `profile.ts` (name, headline, intro, About), `projects.ts`, `skills.ts`, the Contact intro in `navigation.ts`, and three `{{ Confirm ... }}` values in `experience.ts`. Search for `{{` to find them all.
- **Uncertain:** AgentForge's summary in `projects.ts` reads `'This is the summary'`. It looks like test text.
- **Uncertain:** the St. Thomas title in `experience.ts` is "Information Security Analyst", but it was "Information Security Intern" during planning. Confirm which is correct.
- **Page title** in `index.html` is generic. Update it once the name is set.
- **Lighthouse has not been run.** The target is Accessibility ≥ 95.
- **No manual keyboard walkthrough yet.** The features are built but haven't been tested by hand.
- **Headshot is 1028×1028 (~230 KB)** but displays at about 290px wide. It could be smaller.
- The theme doesn't follow live OS theme changes until reload (see decision 7).
- No automated tests and no deployment set up.

## Next recommended tasks

1. Swap the `'#'` hrefs in `contact.ts` for the real URLs (use `mailto:` for email).
2. Fill in the remaining `{{ ... }}` placeholders, starting with the name in `profile.ts` and the projects.
3. Run Lighthouse (Chrome DevTools) on `npm run preview` in both themes, then fix any issues.
4. Do a keyboard-only pass: Tab through the page, check the mobile menu works with Escape, and check the skip link.
5. Resize `public/headshot.jpg` to about 600px.
6. Choose a host and deploy. Static hosting works (e.g. GitHub Pages, Netlify, Vercel); _not decided_.
