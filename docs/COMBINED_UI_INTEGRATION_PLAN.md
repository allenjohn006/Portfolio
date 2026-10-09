# Combined UI Integration Plan: Newbie + TEDx-Redesign

## Branch Context
- **Base Source Branch**: `newbie` (Liquid Glass, iOS 26 dark mode, `#FF3B30` Apple Red, Circular Radial Reveal Menu, high-end typography).
- **Effect Source Branch**: `tedx-redesign` (Neo-brutalist tactile button pop-out effects, offset drop-shadows, interactive card elevations with red color change, doodle accents, dialog modal).
- **Target Working Branch**: `combined-ui` (cloned directly from `newbie`, currently checked out).
- **Documentation Location**: All branch documentation stored under `docs/` in `combined-ui`:
  - `docs/NEWBIE_DOCUMENTATION.md`
  - `docs/TEDX_REDESIGN_DOCUMENTATION.md`
  - `docs/COMBINED_UI_INTEGRATION_PLAN.md`

---

## 1. Core Architecture & Design Philosophy

The objective is to take the sleek, editorial dark theme from `newbie` (`#080808` canvas, white typography, `#FF3B30` Apple Red, and circular radial navigation) and marry it with the **tactile 3D "pop-out" physical elevation and dynamic red color shifts** from `tedx-redesign`.

When hovering or clicking on buttons and cards:
1. The element translates diagonally up-left (`transform: translate(-2px, -2px)` or `-3px, -3px`).
2. A sharp, unblurred offset shadow expands behind it (`box-shadow: Xpx Ypx 0 [color]`).
3. The borders and shadow **shift to vivid red (`#FF3B30`)**, making interactive elements feel responsive, bold, and energetic.
4. On click (`:active`), the element compresses inward (`transform: translate(1px, 1px)`) with reduced shadow, giving a true tactile button press sensation.

---

## 2. Detailed Component & Effect Specifications

### A. Button Pop-out & Color Shift Effects
All buttons will inherit tactile pop-out physics adapted to the dark luxury canvas:

#### 1. Primary Action Button (`.btn-primary`, `.hero-btn-primary`, `.btn-connect-now`)
* **Resting State**:
  * Background: `var(--red)` (`#FF3B30`)
  * Color: `#FFFFFF`
  * Border: `2px solid var(--red)`
  * Shadow: `4px 4px 0 #FFFFFF` (high-contrast white/light offset shadow against the dark background)
* **Hover State**:
  * `transform: translate(-3px, -3px)`
  * Background: `var(--red2)` (`#FF453A`)
  * Border-color: `var(--red2)`
  * Shadow: `6px 6px 0 #FFFFFF, 0 0 16px var(--red-glow)`
* **Active / Click State**:
  * `transform: translate(1px, 1px)`
  * Shadow: `2px 2px 0 #FFFFFF`

#### 2. Outline / Secondary Buttons (`.btn-outline`, `.hero-btn-secondary`, `.hero-btn-tertiary`, `.about-btn`)
* **Resting State**:
  * Background: `rgba(255, 255, 255, 0.04)` (frosted glass)
  * Border: `2px solid rgba(255, 255, 255, 0.18)`
  * Color: `var(--text)` (`#F5F5F5`)
  * Shadow: `4px 4px 0 rgba(255, 255, 255, 0.08)`
* **Hover State (Pop-out with Red Color Shift)**:
  * `transform: translate(-3px, -3px)`
  * Border-color: `var(--red)`
  * Color: `#FFFFFF`
  * Shadow: `5px 5px 0 var(--red), 0 0 14px var(--red-glow)`
  * Background: `rgba(255, 59, 48, 0.08)`
* **Active / Click State**:
  * `transform: translate(1px, 1px)`
  * Shadow: `2px 2px 0 var(--red)`

---

### B. Card Pop-out Elevations & Red Color Transformations

#### 1. Project Cards (`.project-card`)
* **Resting State**:
  * Dark glass card with subtle border: `border: 2px solid rgba(255, 255, 255, 0.1)`
  * Offset shadow: `box-shadow: 6px 6px 0 rgba(255, 255, 255, 0.05)`
* **Hover State**:
  * Card lift: `transform: translate(-3px, -3px)`
  * **Shadow color change**: `box-shadow: 10px 10px 0 var(--red)`
  * Border color: `border-color: var(--red)`
  * Project thumbnail: `transform: scale(1.05)` smooth zoom
  * Project tags (`.project-tag`): border and text highlight in `var(--red)`

#### 2. About Info Cards (`.about-info-card`)
* **Resting State**:
  * Border: `2px solid rgba(255, 255, 255, 0.1)`
  * Shadow: `box-shadow: 4px 4px 0 rgba(255, 255, 255, 0.05)`
* **Hover State**:
  * Lift: `transform: translate(-2px, -2px)`
  * Border color: `border-color: var(--red)`
  * Shadow color: `box-shadow: 5px 5px 0 var(--red)`

#### 3. Connect Cards (`.connect-card`)
* **Resting State**:
  * Shadow: `box-shadow: 4px 4px 0 rgba(255, 255, 255, 0.05)`
* **Hover State**:
  * Lift: `transform: translate(-2px, -2px)`
  * Border color: `border-color: var(--red)`
  * Shadow color: `box-shadow: 4px 4px 0 var(--red)`

#### 4. Skills Rows / Pills (`.skill-row-container` & `.skill-chip-pill`)
* **Hover State**:
  * `.skill-row-container:hover`: `transform: translate(-2px, -2px); box-shadow: 5px 5px 0 var(--red);`
  * `.skill-chip-pill:hover`: `border-color: var(--red); transform: translateY(-2px);`

#### 5. Hero Photo Frame (`.photo-frame` / `.hero-photo-wrapper`)
* Glass card with corner accents and tactile offset shadow: `box-shadow: 10px 10px 0 var(--red);` with floating animation.

#### 6. Success Modal Dialog (`.dialog-box` in Connect)
* Form submission success modal: `border: 2.5px solid var(--red); box-shadow: 10px 10px 0 var(--red); animation: slideUp .25s ease;`

---

### C. Hand-drawn Doodle Accents (`src/components/Doodles.jsx`)
* Included components: `<DoodleBulb />`, `<DoodleStar />`, `<DoodleArrow />`, `<DoodleSwirl />`.
* Palette adaptation: Rendered with `color: var(--red)` or semi-translucent white (`rgba(255, 255, 255, 0.18)`), positioned strategically in hero and section headers to match the TEDx playful flair while keeping the luxury dark look intact.

---

## 3. Step-by-Step Implementation Sequence

1. **Step 1: CSS Design Tokens & Core Pop-out Mixin (`src/App.css`)**:
   - Define tactile popout variables (`--popout-shadow`, `--popout-red`, `--popout-white`).
   - Implement `.btn`, `.btn-primary`, `.btn-outline` with active press states.
2. **Step 2: Hero Section Integration (`src/App.jsx` + `src/App.css`)**:
   - Apply pop-out button classes to "View My Work", "Let's Connect", and "Resume".
   - Enhance `.photo-frame` with red offset pop-out shadow.
   - Position hero doodle accents (`DoodleBulb`, `DoodleStar`, `DoodleArrow`).
3. **Step 3: About & Skills Section Integration**:
   - Apply pop-out effects to `.about-btn` and `.about-info-card`.
   - Update skills hover states to include the red popout shadow.
4. **Step 4: Projects Grid Integration**:
   - Update `.project-card` with hover diagonal translation, red offset shadow (`10px 10px 0 var(--red)`), and tag highlights.
5. **Step 5: Connect Page & Modal Dialog (`src/pages/Connect.jsx` + `src/App.css`)**:
   - Implement `.dialog-box` modal styling with red offset shadow upon Formspree submit.
   - Apply tactile pop-out to form inputs and submit button.
6. **Step 6: Build Verification & Testing**:
   - Run `npm run build` to verify clean compilation.
   - Verify responsiveness on desktop and mobile viewports.

---

## 4. User Review & Decision Points

Before execution, please confirm:
1. **Primary Button Shadow Tone**:
   - **Option A (High-contrast Neo-Brutalist)**: Solid white offset shadow (`box-shadow: 4px 4px 0 #ffffff`) for the primary red button.
   - **Option B (Monochrome Dark Glow)**: Deep black offset shadow with intense red outer halo (`box-shadow: 4px 4px 0 #000, 0 0 16px var(--red-glow)`).
2. **Doodle Inclusion**:
   - Would you like the SVG doodle accents (lightbulb, arrow, star, swirl) displayed in section headers, or do you prefer keeping only the button/card pop-out effects without doodles?
