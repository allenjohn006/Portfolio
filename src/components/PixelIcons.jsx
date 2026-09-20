import React from 'react';

/*
  Blocky, rect-based "pixel art" icons (crisp edges, no curves) used by the
  retro game-HUD styling. Colored via currentColor so usage sites can tint
  them through CSS `color`.
*/

const px = { shapeRendering: 'crispEdges' };

export function PixelBulb({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" style={px} aria-hidden="true">
      <g fill="currentColor">
        <rect x="6" y="1" width="4" height="1" />
        <rect x="5" y="2" width="1" height="1" />
        <rect x="10" y="2" width="1" height="1" />
        <rect x="4" y="3" width="1" height="4" />
        <rect x="11" y="3" width="1" height="4" />
        <rect x="5" y="7" width="1" height="1" />
        <rect x="10" y="7" width="1" height="1" />
        <rect x="6" y="8" width="4" height="2" />
        <rect x="6" y="11" width="4" height="1" />
        <rect x="6" y="13" width="4" height="1" />
        <rect x="5" y="2" width="6" height="5" opacity="0" />
      </g>
    </svg>
  );
}

export function PixelStar({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" style={px} aria-hidden="true">
      <g fill="currentColor">
        <rect x="7" y="0" width="2" height="4" />
        <rect x="7" y="12" width="2" height="4" />
        <rect x="0" y="7" width="4" height="2" />
        <rect x="12" y="7" width="4" height="2" />
        <rect x="6" y="6" width="4" height="4" />
      </g>
    </svg>
  );
}

export function PixelHeart({ className = '', filled = true }) {
  return (
    <svg className={className} viewBox="0 0 16 16" style={px} aria-hidden="true">
      <g fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1">
        <rect x="2" y="3" width="3" height="1" />
        <rect x="11" y="3" width="3" height="1" />
        <rect x="1" y="4" width="14" height="3" />
        <rect x="2" y="7" width="12" height="2" />
        <rect x="3" y="9" width="10" height="2" />
        <rect x="5" y="11" width="6" height="2" />
        <rect x="7" y="13" width="2" height="1" />
      </g>
    </svg>
  );
}

export function PixelPlay({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" style={px} aria-hidden="true">
      <g fill="currentColor">
        <rect x="4" y="3" width="2" height="10" />
        <rect x="6" y="5" width="2" height="6" />
        <rect x="8" y="6" width="2" height="4" />
        <rect x="10" y="7" width="2" height="2" />
      </g>
    </svg>
  );
}

export function PixelSkipBack({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" style={px} aria-hidden="true">
      <g fill="currentColor">
        <rect x="3" y="3" width="2" height="10" />
        <rect x="11" y="3" width="2" height="2" />
        <rect x="9" y="5" width="2" height="2" />
        <rect x="7" y="7" width="2" height="2" />
        <rect x="9" y="9" width="2" height="2" />
        <rect x="11" y="11" width="2" height="2" />
      </g>
    </svg>
  );
}

export function PixelKeyboard({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" style={px} aria-hidden="true">
      <g fill="currentColor">
        <rect x="1" y="4" width="14" height="8" fillOpacity="0" stroke="currentColor" strokeWidth="1" />
        <rect x="3" y="6" width="1" height="1" />
        <rect x="5" y="6" width="1" height="1" />
        <rect x="7" y="6" width="1" height="1" />
        <rect x="9" y="6" width="1" height="1" />
        <rect x="11" y="6" width="1" height="1" />
        <rect x="3" y="8" width="1" height="1" />
        <rect x="5" y="8" width="1" height="1" />
        <rect x="7" y="8" width="1" height="1" />
        <rect x="9" y="8" width="1" height="1" />
        <rect x="11" y="8" width="1" height="1" />
        <rect x="4" y="10" width="8" height="1" />
      </g>
    </svg>
  );
}

export function PixelMouseScroll({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 16 24" style={px} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="1" width="12" height="20" />
      </g>
      <rect x="7" y="5" width="2" height="4" fill="currentColor" />
    </svg>
  );
}
