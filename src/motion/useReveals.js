import { useLayoutEffect } from 'react';
import { gsap, SplitText, reduced } from './scroll';

const once = (trigger, start = 'top 88%') => ({ trigger, start, once: true });

/*
  Declarative scroll motion. Mark up elements with data attributes:
    data-split            heading → masked line/word rise
    data-words            paragraph → words light up as you scroll
    data-reveal           fade + rise
    data-stagger[=right|pop]  children enter one after another
    data-count            number counts up (data-suffix for trailing text)
    data-parallax=<n>     yPercent drift while scrolling
    data-draw             timeline line draws as you scroll
*/
export function useReveals(deps) {
  useLayoutEffect(() => {
    if (reduced()) return undefined;
    let ctx;
    let cancelled = false;
    const counters = [];

    const run = () => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.utils.toArray('[data-split]').forEach((el) => {
          const s = SplitText.create(el, {
            type: 'lines,words',
            mask: 'lines',
            linesClass: 'split-line',
            wordsClass: 'split-word',
          });
          gsap.from(s.words, {
            yPercent: 115,
            rotate: 3,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.05,
            scrollTrigger: once(el),
          });
        });

        gsap.utils.toArray('[data-words]').forEach((el) => {
          const s = SplitText.create(el, { type: 'words' });
          gsap.fromTo(
            s.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: 'top 88%', end: 'bottom 62%', scrub: true },
            }
          );
        });

        gsap.utils.toArray('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'expo.out',
            delay: Number(el.dataset.delay) || 0,
            clearProps: 'transform,opacity',
            scrollTrigger: once(el, 'top 92%'),
          });
        });

        gsap.utils.toArray('[data-stagger]').forEach((el) => {
          const mode = el.dataset.stagger;
          const vars =
            mode === 'right'
              ? { x: 60, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.12 }
              : mode === 'pop'
              ? { scale: 0.7, y: 12, opacity: 0, duration: 0.7, ease: 'back.out(1.6)', stagger: 0.05 }
              : { y: 70, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.12 };
          gsap.from(el.children, {
            ...vars,
            clearProps: 'transform,opacity',
            scrollTrigger: once(el, 'top 86%'),
          });
        });

        gsap.utils.toArray('[data-count]').forEach((el) => {
          const target = Number(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const o = { v: 0 };
          counters.push([el, `${target}${suffix}`]);
          el.textContent = `0${suffix}`;
          gsap.to(o, {
            v: target,
            duration: 1.8,
            ease: 'power3.out',
            onUpdate: () => {
              el.textContent = `${Math.round(o.v)}${suffix}`;
            },
            scrollTrigger: once(el, 'top 94%'),
          });
        });

        gsap.utils.toArray('[data-draw]').forEach((el) => {
          gsap.fromTo(el, { scaleY: 0 }, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top 75%', end: 'bottom 70%', scrub: true },
          });
        });

        gsap.utils.toArray('[data-parallax]').forEach((el) => {
          const inHero = !!el.closest('.hero');
          gsap.to(el, {
            yPercent: Number(el.dataset.parallax),
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section') || el,
              start: inHero ? 'top top' : 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });
      });
    };

    (document.fonts?.ready ?? Promise.resolve()).then(run);

    return () => {
      cancelled = true;
      ctx?.revert();
      counters.forEach(([el, text]) => {
        el.textContent = text;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
