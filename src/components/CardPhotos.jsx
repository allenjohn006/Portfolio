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
  const [portrait, setPortrait] = useState({});

  useEffect(() => {
    const card = root.current?.parentElement;
    if (!card || !photos.length) return undefined;
    const enter = () => setOn(true);
    const leave = () => { setOn(false); setIdx(0); };
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

  useEffect(() => {
    const cur = photos[idx];
    root.current?.parentElement?.classList.toggle('photo-doc', !!cur && (cur.doc || !!portrait[cur.src]));
  }, [idx, portrait, photos]);

  if (!photos.length) return null;
  return (
    <div className="cp" ref={root} aria-hidden="true">
      {photos.map(({ src, doc }, i) => {
        const fit = doc || portrait[src];
        return (
          <div
            key={src}
            className={`cp-slide ${fit ? 'fit' : 'fill'} ${i === idx ? 'on' : ''}`}
            style={{ '--bg': `url("${src}")` }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              onLoad={(e) => {
                const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
                if (w / h < 1.15) setPortrait((p) => ({ ...p, [src]: true }));
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
