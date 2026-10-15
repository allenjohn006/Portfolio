import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/* shared motion tokens — every animation pulls from here so the site moves as one */
export const EASE = {
  out: 'expo.out',
  inOut: 'expo.inOut',
  soft: 'power3.out',
};
export const DUR = { fast: 0.4, base: 0.9, slow: 1.3 };

export const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouch = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none), (pointer: coarse)').matches;

let lenis = null;
const tick = (t) => lenis && lenis.raf(t * 1000);

/* Lenis drives scroll; GSAP's ticker drives Lenis so ScrollTrigger never desyncs */
export function initScroll() {
  if (lenis || reduced()) return lenis;
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function destroyScroll() {
  if (!lenis) return;
  gsap.ticker.remove(tick);
  lenis.destroy();
  lenis = null;
}

export const getLenis = () => lenis;

export function scrollToTarget(target, opts = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el && typeof target !== 'number') return;
  if (lenis) {
    lenis.scrollTo(el ?? target, {
      duration: 1.5,
      force: true,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      ...opts,
    });
  } else if (el) {
    el.scrollIntoView({ behavior: opts.immediate ? 'auto' : 'smooth' });
  } else {
    window.scrollTo({ top: target, behavior: 'auto' });
  }
}

export function stopScroll() {
  lenis?.stop();
}
export function startScroll() {
  lenis?.start();
}

/* restart the glitch animation on a .gn-char (same trick as GlitchName) */
export function glitchChar(el) {
  if (!el) return;
  el.classList.remove('glitching');
  void el.offsetWidth;
  el.classList.add('glitching');
}

export { gsap, ScrollTrigger, SplitText };
