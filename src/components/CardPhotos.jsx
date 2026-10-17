import React, { useEffect, useRef, useState } from 'react';
import { getPhotos } from '../data/cardPhotos';

/*
  Background photo loop for a card. Add as the card's first child.
  Hover (or focus) switches the card to "photo mode": photos crossfade in a loop
  behind the text, which fades back. On touch screens it plays while the card
  sits in the middle of the viewport.
*/
export default function CardPhotos({ slug }) {
  const photos = getPhotos(slug);
  const root = useRef(null);
  const [idx, setIdx] = useState(0);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const card = root.current?.parentElement;
    if (!card || !photos.length) return undefined;
    const enter = () => setOn(true);
    const leave = () => setOn(false);
    card.addEventListener('pointerenter', enter);
    card.addEventListener('pointerleave', leave);
    card.addEventListener('focusin', enter);
    card.addEventListener('focusout', leave);

    let io;
    if (window.matchMedia('(hover: none)').matches && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: '-38% 0px -38% 0px' });
      io.observe(card);
    }
    return () => {
      card.removeEventListener('pointerenter', enter);
      card.removeEventListener('pointerleave', leave);
      card.removeEventListener('focusin', enter);
      card.removeEventListener('focusout', leave);
      io?.disconnect();
    };
  }, [photos.length]);

  useEffect(() => {
    root.current?.parentElement?.classList.toggle('photo-on', on);
    if (!on || photos.length < 2) return undefined;
    const t = setInterval(() => setIdx((i) => (i + 1) % photos.length), 2600);
    return () => clearInterval(t);
  }, [on, photos.length]);

  if (!photos.length) return null;
  return (
    <div className="cp" ref={root} aria-hidden="true">
      {photos.map((src, i) => (
        <img key={src} src={src} alt="" loading="lazy" className={i === idx ? 'on' : ''} />
      ))}
    </div>
  );
}
