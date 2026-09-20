import React, { useEffect, useRef } from 'react';

/*
  Decorative cursor-following "pixel worm": a chain of shrinking squares
  that eases toward the mouse, each segment chasing the one before it.
  Segments steer around text/button bounding boxes instead of rendering
  on top of them (local collision push-out, recomputed only on
  scroll/resize — not every frame).
*/

const SEGMENT_COUNT = 7;
const SEGMENT_SIZES = [16, 13, 11, 9, 7, 6, 5];
const EASE = 0.22;
const AVOID_SELECTOR = 'h1,h2,h3,h4,p,a,button,label,span,li';
const AVOID_MARGIN = 6;

export default function PixelCursorWorm() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isCoarsePointer) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const rootStyle = getComputedStyle(document.documentElement);
    const colorRed = rootStyle.getPropertyValue('--red').trim() || '#E62B1E';
    const colorText = rootStyle.getPropertyValue('--text').trim() || '#111111';
    const colors = [colorRed, colorRed, colorText, colorText, colorText, colorText, colorText];

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();

    let avoidRects = [];
    const collectRects = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const nodes = document.querySelectorAll(AVOID_SELECTOR);
      const rects = [];
      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) continue;
        if (rect.bottom < 0 || rect.top > vh || rect.right < 0 || rect.left > vw) continue;
        if (!node.textContent || !node.textContent.trim()) continue;
        rects.push({
          left: rect.left - AVOID_MARGIN,
          right: rect.right + AVOID_MARGIN,
          top: rect.top - AVOID_MARGIN,
          bottom: rect.bottom + AVOID_MARGIN,
        });
      }
      avoidRects = rects;
    };
    collectRects();

    let resizeTimeout;
    const handleResize = () => {
      resizeCanvas();
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(collectRects, 120);
    };
    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(collectRects, 120);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const pushOutOfRects = (point, radius) => {
      for (const rect of avoidRects) {
        const left = rect.left - radius;
        const right = rect.right + radius;
        const top = rect.top - radius;
        const bottom = rect.bottom + radius;
        if (point.x > left && point.x < right && point.y > top && point.y < bottom) {
          const distLeft = point.x - left;
          const distRight = right - point.x;
          const distTop = point.y - top;
          const distBottom = bottom - point.y;
          const minDist = Math.min(distLeft, distRight, distTop, distBottom);
          if (minDist === distLeft) point.x = left;
          else if (minDist === distRight) point.x = right;
          else if (minDist === distTop) point.y = top;
          else point.y = bottom;
        }
      }
      return point;
    };

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };
    const segments = Array.from({ length: SEGMENT_COUNT }, () => ({ x: mouse.x, y: mouse.y }));

    const handlePointerMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handlePointerLeave = () => { mouse.active = false; };
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);

    let rafId;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mouse.active) {
        for (let i = 0; i < segments.length; i++) {
          const target = i === 0 ? mouse : segments[i - 1];
          const seg = segments[i];
          seg.x += (target.x - seg.x) * EASE;
          seg.y += (target.y - seg.y) * EASE;
          pushOutOfRects(seg, SEGMENT_SIZES[i] / 2);
        }

        for (let i = segments.length - 1; i >= 0; i--) {
          const seg = segments[i];
          const size = SEGMENT_SIZES[i];
          ctx.fillStyle = colors[i];
          ctx.fillRect(Math.round(seg.x - size / 2), Math.round(seg.y - size / 2), size, size);
        }
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      clearTimeout(resizeTimeout);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return <canvas ref={canvasRef} className="pixel-cursor-worm" aria-hidden="true" />;
}
