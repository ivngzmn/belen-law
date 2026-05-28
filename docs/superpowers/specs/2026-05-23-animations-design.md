# Animation System Design
**Date:** 2026-05-23  
**Branch:** `feat/animations`  
**Approach:** Data-attribute driven (Approach A)  
**Intensity:** Polished & fluid (Option B) — fades + directional slides, View Transitions with named elements  
**Library:** `motion` (`@motionone/dom`) for scroll animations  

---

## Goals

- Add Astro View Transitions for smooth client-side page navigation
- Add scroll-triggered entrance animations using the Motion library
- Keep the law firm brand feeling premium and professional — nothing flashy
- Zero regression on accessibility (`prefers-reduced-motion` fully respected)
- No hydration overhead — animations run as vanilla JS, not React

---

## Architecture

### 1. Astro View Transitions

Add `<ViewTransitions />` to `src/components/layout/BaseLayout.astro`.

The `<main>` slot receives `transition:animate="slide"` so only page content transitions; the nav and footer remain stable across navigations.

**Named transition elements** (persist across page navigations without re-rendering):

| Element | File | `transition:name` value |
|---|---|---|
| Logo `<a>` tag | `Nav.astro` | `"logo"` |
| `<header id="site-header">` | `Nav.astro` | `"site-header"` |
| `<div class="page-banner">` | `PageBanner.astro` | `"page-banner"` |

### 2. Scroll Animation Module

**File:** `src/scripts/animations.ts`

Runs on `DOMContentLoaded` (initial load) and on every `astro:page-load` event (fired by View Transitions after each client-side navigation, since the DOM is replaced).

**Initialisation sequence:**
1. Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` — if true, return immediately; all elements render at full opacity with no offsets
2. Query all `[data-animate]` elements in the document
3. Apply initial hidden state via inline styles (opacity + transform offset)
4. Wire each element to Motion's `inView()` — fires entrance animation when element is ≥20% visible in viewport
5. Animations fire **once only** — no re-animation on scroll back up

**Script injection:** Added as a `<script>` tag in `BaseLayout.astro`. Runs as vanilla JS — no `client:load` hydration.

### 3. Data Attributes API

| Attribute | Values | Behaviour |
|---|---|---|
| `data-animate` | `fade-up` | Fade in + translate Y 24px → 0 |
| `data-animate` | `fade-in` | Fade in only (no translate) |
| `data-animate` | `fade-left` | Fade in + translate X -24px → 0 |
| `data-animate` | `fade-right` | Fade in + translate X 24px → 0 |
| `data-animate` | `stagger` | Applied to a **parent** — children animate in sequence, 80ms apart, using `fade-up` |
| `data-animate-delay` | `"0.1"` – `"0.6"` | Delay in seconds before animation starts |
| `data-animate-duration` | `"0.4"` | Override animation duration in seconds |

**Animation defaults:**
- Duration: `0.5s`
- Easing: `cubic-bezier(0.25, 0.1, 0.25, 1)` (ease)
- Translate offset: `24px`
- Viewport threshold: `0.2` (20% visible)

### 4. Accessibility

- `prefers-reduced-motion: reduce` → entire animation module exits early; no inline styles applied, no Motion observers registered; elements render normally
- All animated elements have their final visible state as the CSS fallback (no permanent `opacity: 0` without JS)
- View Transitions degrade gracefully in browsers that don't support the API (Astro handles this automatically)

---

## Animation Map

### Global Components

| Component | Element | Animation |
|---|---|---|
| `PageHeader.astro` | Eyebrow | `fade-up` |
| `PageHeader.astro` | `<h1>` | `fade-up`, delay `0.05s` |
| `PageHeader.astro` | Intro `<p>` | `fade-up`, delay `0.1s` |
| `PageBanner.astro` | Banner div | `fade-in` |
| `FinalCTA.astro` | Entire block | `fade-up` |

### Homepage (`index.astro`)

| Element | Animation |
|---|---|
| Hero headline + subtext | `fade-up`, staggered |
| Services cards grid | Parent `stagger` |
| About teaser — left column | `fade-right` |
| About teaser — right column | `fade-left` |
| Testimonial block | `fade-up` |

### About (`about.astro`)

| Element | Animation |
|---|---|
| Bio paragraphs | `fade-up` |
| Blockquote | `fade-in` |
| Timeline items | Parent `stagger` + `fade-left` per item |
| Stats grid | Parent `stagger` |

### Services Index (`services/index.astro`)

| Element | Animation |
|---|---|
| Process steps | Parent `stagger` |

### Services Detail (`services/[slug].astro`)

| Element | Animation |
|---|---|
| Body paragraph | `fade-up` |
| "Who this helps" list | Parent `stagger` |
| FAQ items | Parent `stagger` |

### Media (`media.astro`)

| Element | Animation |
|---|---|
| Magazine feature block | `fade-up` |
| Recognition cards | Parent `stagger` |
| Community cards | Parent `stagger` |

### Contact (`contact.astro`)

| Element | Animation |
|---|---|
| Info cards (phone, address, hours, what-to-expect) | Parent `stagger` |
| Contact form | `fade-up`, delay `0.1s` |

---

## Files to Create / Modify

| Action | File |
|---|---|
| **Modify** | `src/components/layout/BaseLayout.astro` — add `<ViewTransitions />`, `transition:animate="slide"` on `<main>`, inject animations script |
| **Modify** | `src/components/layout/Nav.astro` — add `transition:name` to logo and header |
| **Modify** | `src/components/shared/PageBanner.astro` — add `transition:name="page-banner"` |
| **Modify** | `src/components/shared/PageHeader.astro` — add `data-animate` attributes |
| **Modify** | `src/components/shared/FinalCTA.astro` — add `data-animate` |
| **Modify** | `src/pages/index.astro` — add `data-animate` throughout |
| **Modify** | `src/pages/about.astro` — add `data-animate` throughout |
| **Modify** | `src/pages/services/index.astro` — add `data-animate` |
| **Modify** | `src/pages/services/[slug].astro` — add `data-animate` |
| **Modify** | `src/pages/media.astro` — add `data-animate` throughout |
| **Modify** | `src/pages/contact.astro` — add `data-animate` |
| **Create** | `src/scripts/animations.ts` — Motion scroll animation module |
| **Install** | `motion` package via pnpm |

---

## Out of Scope

- Hover micro-animations beyond what already exists in global CSS (buttons, cards, links already have transitions)
- Parallax scrolling on the banner image
- Loading/skeleton states
- Lottie or SVG path animations
- Per-word or per-character text splitting
