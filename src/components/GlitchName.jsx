import React from "react";
import "./GlitchName.css";

const LINES = [
  { text: "ALLEN", variant: "white" },
  { text: "JOHN", variant: "white" },
  { text: "ISAC", variant: "red" },
];

const fire = (el) => {
  if (!el) return;
  el.classList.remove("glitching");
  void el.offsetWidth; // restart animation
  el.classList.add("glitching");
};

export default function GlitchName() {
  return (
    <h1 className="gn" aria-label="Allen John Isac">
      {LINES.map(({ text, variant }) => (
        <span key={text} className={`gn-line gn-${variant}`} aria-hidden="true">
          {[...text].map((ch, i) => (
            <span
              key={i}
              className="gn-char"
              data-char={ch}
              onPointerEnter={(e) => fire(e.currentTarget)}
              onPointerDown={(e) => fire(e.currentTarget)}
              onAnimationEnd={(e) => e.currentTarget.classList.remove("glitching")}
            >
              {ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
