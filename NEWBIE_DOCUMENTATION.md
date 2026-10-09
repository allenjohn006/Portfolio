# Newbie Branch UI & Codebase Documentation

## 1. Overview & Visual Aesthetic
The `newbie` branch features a dark, minimalist, editorial aesthetic inspired by iOS Liquid Glass and modern high-end studio portfolios. 

### Key Design Pillars
- **Theme Palette**: Deep blacks (`#080808`, `#111111`), crisp white headings (`#ffffff`), and vibrant Apple Red accent (`#FF3B30` / `#FF453A`).
- **Typography**: `Inter` font family (300 to 900 weights) with heavy letter-spaced uppercase labels (`0.15em` - `0.22em`) and clean hierarchy.
- **Glassmorphism**: Subtle frosted glass (`backdrop-filter: blur(20px) saturate(160%)`, `rgba(255, 255, 255, 0.04)` fill, hairline border `rgba(255, 255, 255, 0.08)`).
- **Interactive Navigation**: Fullscreen overlay with a circular expanding radial mask (`clip-path: circle(...)`), interactive hamburger-to-red-X morph, and staggered navigation items with sibling dimming on hover.

---

## 2. Design Tokens (`src/App.css` & `src/index.css`)

```css
:root {
  /* Surfaces & Backgrounds */
  --bg:        #080808;
  --bg2:       #111111;
  --hairline:  #1f1f1f;
  --s1:        rgba(255, 255, 255, 0.04);
  --s2:        rgba(255, 255, 255, 0.07);

  /* Typography Colors */
  --text:      #f5f5f5;
  --muted:     #666666;
  --dim:       #333333;

  /* Red Accent Palette */
  --red:       #FF3B30;              /* Primary Action & Active Highlight */
  --red2:      #FF453A;              /* Hover & Secondary Gradient */
  --red-glow:  rgba(255, 59, 48, 0.18);
  --accent:    #FF3B30;              /* Alias */

  /* Border Radii */
  --r:         10px;
  --rl:        16px;

  /* Fullscreen Nav Tokens */
  --nav-bg:    #090909;
  --nav-red:   #FF3B30;
  --nav-white: #ffffff;
  --nav-muted: #6b6b6b;
}
```

---

## 3. Core Components & Structure

### A. Navigation System (`src/App.jsx` + `src/App.css`)
- **Top Bar**: Fixed header with brand text (`A J I` with tracked spacing) and hamburger button.
- **Hamburger Button (`.hamburger-btn`)**:
  - Contains 3 staggered bar spans: 28px, 20px, 14px.
  - When `.is-active`: All bars equalize to 26px and morph into a sharp red "X" (top rotates 45°, bottom rotates -45°, middle fades out).
- **Fullscreen Menu Overlay (`.nav-overlay`)**:
  - Opens via a circular mask animation: `clip-path: circle(0% at calc(100% - 40px) 40px)` -> `circle(170% at calc(100% - 40px) 40px)`.
  - Closing transition reverses smoothly with 500ms delay.
  - **Left Column**: Numbered nav links (`01 Home`, `02 About`, `03 Skills`, `04 Projects`, `05 Resume`, `06 Contact`).
    - Staggered entrance animation (`itemSlideIn`).
    - Hover effect: Active item illuminates in `--red` (`#FF3B30`), while sibling links dim to `opacity: 0.25` and scale back.
  - **Right Column**: "EXPLORE & CONNECT" section with links to GitHub, LinkedIn, Direct Mail, Resume download.

### B. Hero Section
- **Eyebrow Header**: `—— PORTFOLIO` (`.hero-eyebrow`) with a delicate red prefix bar.
- **Title**: `Allen John <span class="hero-red">Isac</span>` in bold display typography.
- **Dynamic Role**: Typewriter animation (`ML & AI Engineer`) with blinking red cursor.
- **CTA Actions**:
  - `.hero-btn-primary`: Solid red pill/rectangle (`#FF3B30`), smooth scale and red glow on hover.
  - `.hero-btn-secondary`: Transparent frosted glass with hairline border, arrow indicator.
  - `.hero-btn-tertiary`: Resume action with PDF icon and glass hover state.
- **Portrait Presentation**:
  - Image card (`public/pic 1.jpeg`) framed in frosted glass (`.hero-photo-wrapper`) with subtle red corner tick marks (`.corner-accent`).
- **Scroll Indicator**: Clean mouse glyph with animated red scroll wheel dot.

### C. Skills Section (`src/components/ModernSkillsSection.jsx` & `.css`)
- Categorized grid: Languages, Machine Learning & AI, Frameworks & Libraries, Tools & Platforms.
- Frosted glass chips with border hover transition and red glow highlights.

### D. Projects Section
- Featured projects (`Vox`, `OmniFlow`, `CVScope`) with glass cards, project preview image masks, tech badges, and direct GitHub/Live links.

### E. Connect / Contact Section (`src/pages/Connect.jsx` & `src/App.jsx`)
- Contact forms and social connection cards retaining the uniform dark-and-red palette without background canvas clutter.

---

## 4. Reference Screenshots
Stored in `public/reference/`:
- `public/reference/newbie.png`: Hero section layout, photo frame, CTA buttons, and color hierarchy.
- `public/reference/navbar newbie.png`: Fullscreen circular menu with red highlight and dimmed siblings.
