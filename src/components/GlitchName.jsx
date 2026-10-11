import React from "react";
import "./GlitchName.css";

const WORDS = [
  { text: "Allen", variant: "white" },
  { text: "John", variant: "white" },
  { text: "Isac.", variant: "red" },
];

const fire = (el) => {
  if (!el) return;
  el.classList.remove("glitching");
  void el.offsetWidth; // force reflow to restart animation
  el.classList.add("glitching");
};

export default function GlitchName() {
  return (
    <h1 className="gn" aria-label="Allen John Isac.">
      {WORDS.map(({ text, variant }) => (
        <span key={text} className={`gn-word gn-${variant}`}>
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
