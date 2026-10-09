# Combined UI Integration Plan: Newbie + TEDx-Redesign

## Branch Context
- **Base Branch**: `newbie` (Liquid Glass, iOS 26 dark mode, `#FF3B30` Apple Red, Circular Radial Reveal Menu, high-end typography).
- **Inspiration Branch**: `tedx-redesign` (Neo-brutalist tactile button pop-out effects, offset drop-shadows, interactive card elevations, doodle accents, dialog modals).
- **Target Working Branch**: `combined-ui` (cloned directly from `newbie`).

---

## 1. Core Objectives
1. **Preserve Color Palette & Aesthetic of `newbie`**:
   - Deep background: `#080808` / `#111111`.
   - Accent: `#FF3B30` / `#FF453A`.
   - Typography: Clean `Inter` font hierarchy with uppercase tracked labels.
   - Circular radial reveal fullscreen navigation with hamburger-to-red-X morph.
   - Reference images in `public/reference/` (`newbie.png`, `navbar newbie.png`) remain the aesthetic source of truth.

2. **Infuse Interactive Button Pop-out & Tactile UI from `tedx-redesign`**:
   - Adopt the tactile isometric pop-out mechanism:
     - **Resting state**: Clean border with distinct flat offset shadow (`box-shadow: 4px 4px 0 ...`).
     - **Hover state**: Smooth diagonal lift (`transform: translate(-3px, -3px)`) and shadow expansion (`box-shadow: 7px 7px 0 ...` + subtle red neon ambiance).
     - **Active state (Click/Press)**: Physical button push-in (`transform: translate(1px, 1px)`) with compressed shadow (`box-shadow: 2px 2px 0 ...`).
   - Apply across:
     - Hero buttons: "View My Work", "Let's Connect", "Resume"
     - About section buttons: GitHub, LinkedIn, Resume
     - Connect form submit button & Back button
     - Project action links & tags
     - Social icons

3. **Card & Container Pop-out Elevations**:
   - `.project-card`: Offset dark hairline shadow -> red pop-out shadow on hover (`box-shadow: 9px 9px 0 var(--red)`).
   - `.about-info-card`: Glass panel with offset pop-out elevation on hover.
   - `.photo-frame`: Retain the glass container with refined red corner ticks and tactile pop-out frame shadow.
   - Confirmation dialog modal (`.dialog-box`) in `Connect.jsx` with high-contrast red pop-out shadow (`box-shadow: 10px 10px 0 var(--red)`).

4. **Optional Decorative Accents**:
   - `<DoodleBulb />`, `<DoodleStar />`, `<DoodleArrow />`, `<DoodleSwirl />` from `src/components/Doodles.jsx` recolored in `var(--red)` and subtle `rgba(255,255,255,0.15)` for a sophisticated editorial touch.

---

## 2. Step-by-Step Implementation Checklist
- [x] Analyze `newbie` codebase and verify reference images in `public/reference/`.
- [x] Create comprehensive documentation for `newbie` (`NEWBIE_DOCUMENTATION.md`).
- [x] Checkout and analyze `tedx-redesign` codebase.
- [x] Create comprehensive documentation for `tedx-redesign` (`TEDX_REDESIGN_DOCUMENTATION.md`).
- [x] Create new branch `combined-ui` from `newbie`.
- [x] Port `Doodles.jsx` component to `src/components/`.
- [ ] Implement enhanced pop-out button styles in `src/App.css` adapting the Neo-brutalist pop-out physics into the dark liquid glass theme.
- [ ] Apply tactile pop-out elevations to cards, pills, and social buttons.
- [ ] Connect dialog modal in `Connect.jsx` with dark glass + red offset shadow styling.
- [ ] Run `npm run build` to ensure 0 lint/compile errors.
- [ ] Test in browser on local dev server to verify visual appearance against reference screenshots.
