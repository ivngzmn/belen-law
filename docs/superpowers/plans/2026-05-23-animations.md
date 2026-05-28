# Animation System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Astro View Transitions for page navigation and GSAP ScrollTrigger scroll entrance animations across all pages.

**Architecture:** Data-attribute driven (`data-animate`, `data-animate-delay`, `data-animate-duration`) scroll animations using GSAP + ScrollTrigger. Astro `<ViewTransitions />` for client-side page transitions with named elements for logo and site header. `prefers-reduced-motion` fully respected — module exits early when set. All animation JS runs as vanilla JS in Astro `<script>` tags — no React hydration.

**Tech Stack:** Astro 5 View Transitions, `gsap` (core + ScrollTrigger plugin), TypeScript.

**Note:** `PageBanner.astro` does not yet exist in this codebase — skip all PageBanner steps from the spec.

---

### Task 1: Install gsap package

**Files:**
- Modify: `package.json` (dependency added by pnpm)
- Modify: `pnpm-lock.yaml` (auto-updated)

- [ ] **Step 1: Install gsap**

```bash
pnpm add gsap
```

Expected: `gsap` appears in `dependencies` in `package.json`.

- [ ] **Step 2: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat(animations): install gsap package"
```

---

### Task 2: Create src/scripts/animations.ts

**Files:**
- Create: `src/scripts/animations.ts`

- [ ] **Step 1: Create the animation module**

```typescript
// src/scripts/animations.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DURATION = 0.5;
const EASING = 'power2.out';
const OFFSET = 24;
const STAGGER_STEP = 0.08;

interface HiddenVars {
  opacity: number;
  x?: number;
  y?: number;
}

function getHiddenVars(type: string): HiddenVars {
  switch (type) {
    case 'fade-up':    return { opacity: 0, y: OFFSET };
    case 'fade-left':  return { opacity: 0, x: -OFFSET };
    case 'fade-right': return { opacity: 0, x: OFFSET };
    case 'fade-in':
    default:           return { opacity: 0 };
  }
}

function initAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Kill existing ScrollTrigger instances before re-initialising (required on astro:page-load)
  ScrollTrigger.getAll().forEach((st) => st.kill());

  // 1. Stagger parents — direct children animate in sequence
  document.querySelectorAll<HTMLElement>('[data-animate="stagger"]').forEach((parent) => {
    const children = Array.from(parent.children) as HTMLElement[];
    gsap.set(children, { opacity: 0, y: OFFSET });
    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: DURATION,
      ease: EASING,
      stagger: STAGGER_STEP,
      scrollTrigger: {
        trigger: parent,
        start: 'top 80%',
        once: true,
      },
    });
  });

  // 2. Individual animated elements — skip children already inside a stagger parent
  document.querySelectorAll<HTMLElement>('[data-animate]:not([data-animate="stagger"])').forEach((el) => {
    if (el.closest('[data-animate="stagger"]')) return;

    const type = el.getAttribute('data-animate') ?? 'fade-in';
    const delay = parseFloat(el.getAttribute('data-animate-delay') ?? '0');
    const duration = parseFloat(el.getAttribute('data-animate-duration') ?? String(DURATION));
    const hiddenVars = getHiddenVars(type);

    gsap.set(el, hiddenVars);
    gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      ease: EASING,
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      },
    });
  });
}

document.addEventListener('DOMContentLoaded', initAnimations);
document.addEventListener('astro:page-load', initAnimations);
```

- [ ] **Step 2: Commit**

```bash
git add src/scripts/animations.ts
git commit -m "feat(animations): add GSAP ScrollTrigger scroll animation module"
```

---

### Task 3: Add ViewTransitions and script to BaseLayout.astro

**Files:**
- Modify: `src/components/layout/BaseLayout.astro`

Current file (for reference):
```astro
---
import BaseHead from './BaseHead.astro';
import Nav from './Nav.astro';
import Footer from './Footer.astro';
import '../../styles/global.css';
// ... props ...
---
<!doctype html>
<html lang="en">
  <head>
    <BaseHead ... />
    {schema && <script type="application/ld+json" ... />}
  </head>
  <body>
    <Nav />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

Changes needed:
- Add `import { ViewTransitions } from 'astro:transitions';` to frontmatter imports
- Add `<ViewTransitions />` inside `<head>` after BaseHead
- Add `transition:animate="slide"` to `<main>`
- Add `<script>` tag importing `src/scripts/animations.ts` before `</body>`

Target file:
```astro
---
import BaseHead from './BaseHead.astro';
import Nav from './Nav.astro';
import Footer from './Footer.astro';
import { ViewTransitions } from 'astro:transitions';
import '../../styles/global.css';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  schema?: object;
}

const { title, description, canonical, ogImage, noIndex, schema } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <BaseHead {title} {description} {canonical} {ogImage} {noIndex} />
    {schema && (
      <script type="application/ld+json" set:html={JSON.stringify(schema)} />
    )}
    <ViewTransitions />
  </head>
  <body>
    <Nav />
    <main transition:animate="slide">
      <slot />
    </main>
    <Footer />
    <script>
      import '../scripts/animations';
    </script>
  </body>
</html>
```

- [ ] **Step 1: Modify BaseLayout.astro** (make the three changes above)

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/BaseLayout.astro
git commit -m "feat(animations): add ViewTransitions and animation script to BaseLayout"
```

---

### Task 4: Add transition:name to Nav.astro

**Files:**
- Modify: `src/components/layout/Nav.astro`

Changes:
- Line 36: `<header id="site-header" ...>` → add `transition:name="site-header"`
- Line 39: `<a href="/" aria-label="..." ...>` (logo link) → add `transition:name="logo"`

Target attribute additions (do NOT change any other attributes):

```astro
<!-- Line 36 -->
<header id="site-header" transition:name="site-header" style="position:sticky;top:0;...">

<!-- Line 39 -->
<a href="/" transition:name="logo" aria-label="Law Office of Belen Gomez, APC — home" style="display:inline-flex;...">
```

- [ ] **Step 1: Add `transition:name="site-header"` to the `<header>` tag**
- [ ] **Step 2: Add `transition:name="logo"` to the logo `<a>` tag**

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Nav.astro
git commit -m "feat(animations): add View Transition names to nav logo and header"
```

---

### Task 5: Add data-animate to shared components (PageHeader, FinalCTA)

**Files:**
- Modify: `src/components/shared/PageHeader.astro`
- Modify: `src/components/shared/FinalCTA.astro`

**PageHeader.astro** — target (only the animated elements shown; rest unchanged):

```astro
{eyebrow && <div class="eyebrow" data-animate="fade-up">{eyebrow}</div>}
<h1 class="display" data-animate="fade-up" data-animate-delay="0.05" style="font-size:clamp(40px,6vw,76px);margin-top:24px;max-width:18ch;">
  <Fragment set:html={title} />
</h1>
{intro && (
  <p data-animate="fade-up" data-animate-delay="0.1" style="margin-top:22px;...">
    {intro}
  </p>
)}
```

**FinalCTA.astro** — add `data-animate="fade-up"` to the `<div class="cta-card">`:

```astro
<div class="cta-card" data-animate="fade-up" style="background:var(--primary);...">
```

- [ ] **Step 1: Modify PageHeader.astro** — add `data-animate` to eyebrow div, h1, and intro p

- [ ] **Step 2: Modify FinalCTA.astro** — add `data-animate="fade-up"` to `.cta-card` div

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/PageHeader.astro src/components/shared/FinalCTA.astro
git commit -m "feat(animations): add data-animate to PageHeader and FinalCTA"
```

---

### Task 6: Add data-animate to index.astro

**Files:**
- Modify: `src/pages/index.astro`

**Animation targets:**

1. **Hero left column** (the `<div style="animation:pageIn...">` div): Remove the `animation:pageIn .6s ease both` inline style, add `data-animate="fade-up"`. Also remove the `@keyframes pageIn` from the `<style>` block.

2. **Hero right column** (the portrait div `<div class="hero-portrait" style="...animation:pageIn .6s .15s ease both;opacity:0;...">`): Remove `animation:pageIn` and `opacity:0` from the inline style, add `data-animate="fade-up" data-animate-delay="0.1"`.

3. **Services cards grid** (`<div style="margin-top:52px;display:grid;grid-template-columns:repeat(3,1fr);..." class="svc-overview-grid">`): Add `data-animate="stagger"`.

4. **About preview — left column** (the `<div>` containing eyebrow + h2 + p + link): Add `data-animate="fade-right"`.

5. **About preview — right column** (the quote card `<div style="background:var(--primary);...">`): Add `data-animate="fade-left"`.

6. **Testimonial section** (the `<TestimonialFeature client:load />` component — wrap it if needed or add `data-animate` to its wrapper): Add a wrapping div with `data-animate="fade-up"` around `<TestimonialFeature client:load />`.

- [ ] **Step 1: Modify index.astro** — add all data-animate attributes and remove old pageIn animation

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat(animations): add scroll animations to homepage"
```

---

### Task 7: Add data-animate to about.astro

**Files:**
- Modify: `src/pages/about.astro`

**Animation targets:**

1. **Bio paragraphs** — each `<p>` inside the bio `<div style="display:grid;gap:28px;">` block: add `data-animate="fade-up"` to each individual `<p>` tag

2. **Blockquote card** (the `<div style="background:var(--bg-alt);border-radius:var(--r-card);padding:32px;border-left:3px solid var(--accent);">`): Add `data-animate="fade-in"`

3. **Timeline items grid** (`<div style="display:grid;gap:0;">`): Add `data-animate="stagger"`

4. **Stats grid** (`<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">`): Add `data-animate="stagger"`

- [ ] **Step 1: Modify about.astro**

- [ ] **Step 2: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat(animations): add scroll animations to about page"
```

---

### Task 8: Add data-animate to services/index.astro

**Files:**
- Modify: `src/pages/services/index.astro`

**Animation targets:**

1. **Process steps grid** (`<div style="margin-top:48px;display:grid;grid-template-columns:repeat(4,1fr);gap:24px;..." class="process-grid">`): Add `data-animate="stagger"`

- [ ] **Step 1: Modify services/index.astro**

- [ ] **Step 2: Commit**

```bash
git add src/pages/services/index.astro
git commit -m "feat(animations): add scroll animations to services index"
```

---

### Task 9: Add data-animate to services/[slug].astro

**Files:**
- Modify: `src/pages/services/[slug].astro`

**Animation targets:**

1. **Body paragraph** (`<p style="font-size:18px;line-height:1.7;color:var(--ink-soft);">{f.body}</p>`): Add `data-animate="fade-up"`

2. **Who this helps list** (`<ul style="margin:0;margin-top:14px;padding:0;list-style:none;display:grid;gap:12px;">`): Add `data-animate="stagger"`

3. **FAQ items container** (`<div style="margin-top:8px;">`): Add `data-animate="stagger"`

- [ ] **Step 1: Modify services/[slug].astro**

- [ ] **Step 2: Commit**

```bash
git add "src/pages/services/[slug].astro"
git commit -m "feat(animations): add scroll animations to service detail page"
```

---

### Task 10: Add data-animate to media.astro

**Files:**
- Modify: `src/pages/media.astro`

**Animation targets:**

1. **Magazine feature grid** (`<div style="display:grid;grid-template-columns:1fr 1.4fr;..." class="feature-grid">`): Add `data-animate="fade-up"`

2. **Recognition cards grid** (`<div style="margin-top:44px;display:grid;grid-template-columns:repeat(3,1fr);..." class="recognition-grid">`): Add `data-animate="stagger"`

3. **Community cards column** (`<div style="display:grid;gap:16px;">`): Add `data-animate="stagger"`

- [ ] **Step 1: Modify media.astro**

- [ ] **Step 2: Commit**

```bash
git add src/pages/media.astro
git commit -m "feat(animations): add scroll animations to media page"
```

---

### Task 11: Add data-animate to contact.astro

**Files:**
- Modify: `src/pages/contact.astro`

**Animation targets:**

1. **Info cards column** (the left `<div style="display:grid;gap:16px;">` containing phone, address, hours, and what-to-expect cards): Add `data-animate="stagger"`

2. **Contact form card** (the right `<div style="background:var(--card);border:1px solid var(--line-soft);border-radius:var(--r-lg);...">`): Add `data-animate="fade-up" data-animate-delay="0.1"`

- [ ] **Step 1: Modify contact.astro**

- [ ] **Step 2: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat(animations): add scroll animations to contact page"
```

---

### Task 12: Build verification

- [ ] **Step 1: Run build to verify no TypeScript or Astro errors**

```bash
pnpm build
```

Expected: Build completes with no errors.

- [ ] **Step 2: Commit plan and spec updates**

```bash
git add docs/superpowers/specs/2026-05-23-animations-design.md docs/superpowers/plans/2026-05-23-animations.md
git commit -m "docs(animations): update spec and plan to use GSAP instead of motion"
```
