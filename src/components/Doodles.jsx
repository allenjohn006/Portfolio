import React from 'react';

/*
  Hand-drawn-style decorative SVG doodles, inspired by TEDx local-event
  branding guidelines. Pure line-art, colored via currentColor so each
  usage can set its own accent through the `className`/`style` color.
  Purely decorative — always aria-hidden.
*/

export function DoodleBulb({ className = '' }) {
  return (
    <svg className={`doodle doodle-bulb ${className}`} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 6c-11 0-18 8-18 17 0 7 4 11 7 15 2 2.5 3 4 3 7h16c0-3 1-4.5 3-7 3-4 7-8 7-15 0-9-7-17-18-17z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M26 51h12M27 56h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M25 24c1-4 4-6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleArrow({ className = '' }) {
  return (
    <svg className={`doodle doodle-arrow ${className}`} viewBox="0 0 80 40" fill="none" aria-hidden="true">
      <path d="M3 20c18-6 40-9 58-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M50 8c6 2 11 4 13 6-3 3-7 7-9 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function DoodleStar({ className = '' }) {
  return (
    <svg className={`doodle doodle-star ${className}`} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 4c1 8 2 13 6 16 4 3 9 4 15 4-6 1-11 2-15 5s-5 8-6 15c-1-7-2-12-6-15s-9-4-15-5c6 0 11-1 15-4s5-8 6-16z"
        stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
    </svg>
  );
}

export function DoodleSwirl({ className = '' }) {
  return (
    <svg className={`doodle doodle-swirl ${className}`} viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <path d="M30 6C15 6 6 17 6 29c0 10 8 17 17 17 7 0 12-5 12-11 0-5-4-8-8-8-3 0-6 2-6 6"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleSpeechBubble({ className = '' }) {
  return (
    <svg className={`doodle doodle-speech ${className}`} viewBox="0 0 64 52" fill="none" aria-hidden="true">
      <path d="M6 10c0-3 2-5 5-5h42c3 0 5 2 5 5v22c0 3-2 5-5 5H24l-10 10v-10h-3c-3 0-5-2-5-5V10z"
        stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M16 18h32M16 26h20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}

export function DoodleWave({ className = '' }) {
  return (
    <svg className={`doodle doodle-wave ${className}`} viewBox="0 0 96 24" fill="none" aria-hidden="true">
      <path d="M2 12c4-9 8-9 12 0s8 9 12 0 8-9 12 0 8 9 12 0 8-9 12 0 8 9 12 0 8-9 12 0"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}
