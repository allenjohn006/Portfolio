# TEDx-Redesign Branch UI & Component Documentation

## 1. Overview & Visual Aesthetic
The `tedx-redesign` branch features a bold editorial / Neo-brutalist theme inspired by TEDx event branding guidelines. It merges stark borders, tactile physical offset shadows ("pop-out" effects), and playful hand-drawn SVG doodle accents.

### Key Visual Characteristics
- **Theme Palette**: Light cream background (`#FBF9F6`), pure white cards (`#FFFFFF`), TED red accent (`#E62B1E` / `#B82016`), high-contrast dark text (`#111111`), and secondary doodle colors (teal, yellow, blue).
- **Tactile Pop-Out Effect**: Hard, unblurred offset drop shadows (`box-shadow: 4px 4px 0 ...`) combined with isometric translation (`transform: translate(-2px, -2px)`) on hover and inward depression (`transform: translate(1px, 1px)`) on click.
- **Doodles**: Hand-drawn vector accents (Bulb, Arrow, Star, Swirl, Speech Bubble, Wave) scattered dynamically around sections.

---

## 2. Design Tokens (`src/App.css` & `src/index.css`)

```css
:root {
  --bg:             #FBF9F6;
  --surface:        #FFFFFF;
  --hairline:       #E7E0D8;
  --red:            #E62B1E;
  --red-dark:       #B82016;
  --text:           #111111;
  --muted:          #5A5550;
  --dim:            #9C948B;
  --doodle-teal:    #1E9E8C;
  --doodle-yellow:  #F2B705;
  --doodle-blue:    #2E5EAA;
  --r:              12px;
  --rl:             18px;
}
```

---

## 3. The "Button Pop-out Effect" & Interactive Behaviors

### A. Primary & Outline Buttons (`.btn`, `.btn-primary`, `.btn-outline`)
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .55rem;
  padding: .82rem 1.7rem;
  font-family: 'Inter', sans-serif;
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  border: 2px solid var(--text);
  border-radius: var(--r);
  cursor: pointer;
  text-decoration: none;
  transition: all .2s ease;
}

/* Primary Button Pop-out */
.btn-primary {
  background: var(--red);
  color: #fff;
  border-color: var(--red);
  box-shadow: 4px 4px 0 var(--text);
}
.btn-primary:hover {
  background: var(--red-dark);
  border-color: var(--red-dark);
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--text);
}

/* Outline Button Pop-out */
.btn-outline {
  background: var(--surface);
  border: 2px solid var(--text);
  color: var(--text);
}
.btn-outline:hover {
  border-color: var(--red);
  color: var(--red);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--red);
}
```

### B. Cards Pop-out Elevations
1. **Projects Card (`.project-card`)**:
   - Idle: `box-shadow: 8px 8px 0 var(--hairline);`
   - Hover: `transform: translate(-3px, -3px); box-shadow: 11px 11px 0 var(--red);`
2. **About Info Card (`.about-info-card`)**:
   - Idle: `box-shadow: 5px 5px 0 var(--hairline);`
   - Hover: `border-color: var(--red); box-shadow: 5px 5px 0 var(--red); transform: translate(-2px, -2px);`
3. **Hero Photo Frame (`.photo-frame`)**:
   - `border: 3px solid var(--text); box-shadow: 10px 10px 0 var(--red);` with subtle float animation.
4. **Connect Card (`.connect-card`)**:
   - Idle: `box-shadow: 4px 4px 0 var(--hairline);`
   - Hover: `border-color: var(--red); box-shadow: 4px 4px 0 var(--red); transform: translate(-2px, -2px);`
5. **Skills Row Container (`.skill-row-container`)**:
   - Idle: `box-shadow: 5px 5px 0 var(--hairline);`
   - Hover: `box-shadow: 5px 5px 0 var(--red); transform: translate(-2px, -2px);`
6. **Confirmation Modal (`.dialog-box`)**:
   - `box-shadow: 10px 10px 0 var(--red); animation: slideUp .25s ease;`

### C. Hand-Drawn SVG Doodles (`src/components/Doodles.jsx`)
Exported components:
- `<DoodleBulb />`: Idea / inspiration bulb with angled placement.
- `<DoodleArrow />`: Hand-drawn directional arrow.
- `<DoodleStar />`: 4-point sparkle star.
- `<DoodleSwirl />`: Playful circular swirl loop.
- `<DoodleSpeechBubble />`: Conversation bubble.
- `<DoodleWave />`: Underline wave / squiggle.
All doodles use `currentColor` and absolute positioning for easy theme integration.
