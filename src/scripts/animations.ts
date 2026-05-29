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
document.addEventListener('astro:page-load', () => {
  initAnimations();
  // After View Transitions swap the DOM, ScrollTrigger's cached positions
  // are stale from the previous page. refresh() forces a recalculation so
  // every trigger fires at the correct scroll offset on the new page.
  ScrollTrigger.refresh();
});
