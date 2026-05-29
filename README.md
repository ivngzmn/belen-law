# Belen Gomez Law — Website

Official website for the **Law Office of Belen Gomez, APC** — a bilingual immigration and estate planning law practice based in Riverside, CA.

Live: [belengomezlaw.com](belengomezlaw.vercel.app)

---

## Tech Stack

| Layer           | Technology                                                        |
| --------------- | ----------------------------------------------------------------- |
| Framework       | [Astro 5](https://astro.build) — SSR with View Transitions        |
| UI Components   | [React 19](https://react.dev) (Astro islands)                     |
| Styling         | [Tailwind CSS 3](https://tailwindcss.com) + custom CSS properties |
| Animations      | [GSAP 3](https://gsap.com) with ScrollTrigger                     |
| CMS             | [Contentful](https://contentful.com) — services content           |
| Deployment      | [Vercel](https://vercel.com) via `@astrojs/vercel` adapter        |
| Language        | TypeScript 5                                                      |
| Package Manager | pnpm                                                              |
| Node            | ≥ 24                                                              |

---

## Project Structure

```
src/
├── components/
│   ├── layout/       # BaseLayout, BaseHead, Nav, Footer
│   ├── sections/     # ArchComponents, ServicesExpand, TestimonialFeature
│   └── shared/       # PageHeader, FinalCTA
├── pages/
│   ├── index.astro         # Home
│   ├── about.astro         # Attorney bio & timeline
│   ├── contact.astro       # Contact form
│   ├── media.astro         # Media & press
│   ├── services/
│   │   ├── index.astro     # Services overview
│   │   └── [slug].astro    # Dynamic service pages (Contentful)
│   └── api/
│       └── contact.ts      # Contact form endpoint
├── scripts/
│   └── animations.ts       # GSAP ScrollTrigger setup
└── lib/
    └── contentful.ts       # Contentful client & type definitions
```

---

## Pages

| Route              | Status  | Notes                                               |
| ------------------ | ------- | --------------------------------------------------- |
| `/`                | ✅ Live | Home — hero, services grid, testimonials, CTA       |
| `/about`           | ✅ Live | Bio, career timeline, credentials, language section |
| `/services`        | ✅ Live | Practice areas overview                             |
| `/services/[slug]` | ✅ Live | Dynamic pages powered by Contentful                 |
| `/contact`         | ✅ Live | Contact form + office info                          |
| `/media`           | ✅ Live | Press features & community highlights               |

---

## What's Done

- [x] Full site structure with all core pages
- [x] Mobile-responsive layout (hamburger drawer nav, responsive grids)
- [x] GSAP scroll animations integrated with Astro View Transitions
- [x] Contact form with server-side API route (`/api/contact`)
- [x] Contentful CMS integration for dynamic service pages
- [x] JSON-LD structured data / schema markup on all pages
- [x] XML sitemap (auto-generated, excludes `/api/*`)
- [x] Bilingual navigation structure (EN / ES toggle)
- [x] SEO metadata (titles, descriptions, Open Graph)
- [x] Sticky, scroll-aware navigation header
- [x] Footer with correct per-service links
- [x] QA pass — desktop (1440px) and mobile (390px)

---

## What's Coming Next

- [ ] **Spanish (ES) content** — full bilingual copy for all pages
- [ ] **Online scheduling** — integrate a booking widget (Calendly or equivalent)
- [ ] **Testimonials** — client review section with real content
- [ ] **Blog / Resources** — immigration news and legal guides via Contentful
- [ ] **Analytics** — privacy-respecting analytics integration
- [ ] **Accessibility audit** — WCAG 2.1 AA compliance pass
- [ ] **Privacy Policy & Terms** — required legal pages
- [ ] **Performance tuning** — Core Web Vitals / Lighthouse 100

---

## Local Development

```bash
pnpm install
pnpm dev          # starts at http://localhost:4321
```

Environment variables required (create `.env.local`):

```env
CONTENTFUL_SPACE_ID=...
CONTENTFUL_ACCESS_TOKEN=...
CONTACT_EMAIL=...        # destination for contact form submissions
```

---

## Deployment

Deployed automatically to Vercel on push to `main`. Preview deployments are created for every pull request.

```bash
pnpm build        # production build
pnpm preview      # preview the production build locally
```
