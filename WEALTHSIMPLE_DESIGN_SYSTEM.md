# Wealthsimple-Inspired Design System

This document outlines the core principles, design tokens, and component styles used to create the Wealthsimple-inspired aesthetic for this portfolio. Use this as a reference when adding new sections or building new projects with a similar look and feel.

## 1. Core Philosophy

*   **Editorial Typography:** Bold, warm serif headings paired with clean, highly readable sans-serif body text.
*   **Extreme Whitespace:** Elements should have room to breathe. Use large padding and margins (e.g., `8rem` vertical padding for sections).
*   **Restrained Palette:** Mostly monochrome (warm off-whites, soft blacks, grays) with very subtle accents. No harsh borders.
*   **Borderless UI:** Avoid heavy borders or drop shadows on static elements. Separate content using whitespace and typography hierarchy.
*   **Purposeful Subtlety:** Animations and hover states should feel effortless and smooth (e.g., gentle lifts, opacity fades).

---

## 2. Design Tokens (CSS Variables)

These variables are defined in the `:root` pseudo-class in `styles.css`.

```css
:root {
  --bg-color: #FAFAF8;       /* Warm off-white background */
  --text-primary: #1A1A1A;   /* Soft black for headings and primary text */
  --text-body: #6B6B6B;      /* Warm medium gray for body paragraphs */
  --text-muted: #9B9B9B;     /* Lighter gray for dates, metadata, etc. */
  --border-color: #E8E8E6;   /* Warm light gray for subtle dividers */
  --accent-color: #32302F;   /* "Dune" dark gray/brown for primary buttons */
  --card-bg: #FFFFFF;        /* Pure white for elevated card backgrounds */
}
```

---

## 3. Typography

We use Google Fonts for our typography stack.

### Headings & Logos
*   **Font Family:** `"DM Serif Display", serif`
*   **Weight:** `400` (Regular)
*   **Usage:** Used for `h1`, `h2`, `h3`, `.title`, and `.logo`.
*   **Characteristics:** High contrast, elegant, editorial feel. Large sizes (e.g., `4.5rem` for hero titles) with tight letter-spacing (`-0.02em`) and tight line-height (`1.1`).

### Body Text & UI Elements
*   **Font Family:** `"Inter", sans-serif`
*   **Weights:** `300` (Light), `400` (Regular), `500` (Medium)
*   **Usage:** Used for paragraphs, buttons, navigation links, and tags.
*   **Characteristics:** Clean, neutral, highly legible.

---

## 4. UI Components

### Buttons
Buttons are pill-shaped with a minimum width and smooth hover scaling.

*   **Primary Button (`.btn-color-1`):** 
    *   Background: `var(--accent-color)`
    *   Text: `white`
    *   Hover: Background turns to `black`, scales up slightly (`transform: scale(1.02)`).
*   **Secondary/Ghost Button (`.btn-color-2`):**
    *   Background: `transparent`
    *   Border: `1px solid var(--border-color)`
    *   Text: `var(--text-primary)`
    *   Hover: Border darkens to `var(--text-primary)`, scales up slightly.

### Cards (Projects)
Cards are flat by default and only elevate on hover to keep the UI clean.

*   **Default State:** `background: var(--card-bg)`, `border-radius: 1rem`, `border: 1px solid var(--border-color)`.
*   **Hover State:** Border becomes transparent, card lifts up (`transform: translateY(-5px)`), and a soft shadow appears (`box-shadow: 0 20px 40px rgba(0,0,0,0.04)`).

### Tags (Tech Stack)
Tags are outlined, pill-shaped elements used to denote technologies or categories.

*   **Style:** `background: transparent`, `border: 1px solid var(--border-color)`, `border-radius: 2rem`, `font-size: 0.75rem`.

### Navigation
*   **Style:** Sticky top bar (`position: sticky`), `80px` height.
*   **Background:** Semi-transparent warm white (`rgba(250, 250, 248, 0.85)`) with a blur effect (`backdrop-filter: blur(10px)`).
*   **Links:** Uppercase, small font size (`0.85rem`), wide letter-spacing (`0.05em`).
*   **Hover:** Links fade to `opacity: 0.5` instead of using underlines.

---

## 5. Animations & Interactions

### Scroll Fade-In
Sections smoothly fade in and slide up as they enter the viewport using the Intersection Observer API.
*   **CSS Classes:** `.fade-in-section` (initial hidden state), `.is-visible` (triggered state).
*   **Transition:** `opacity 800ms ease-out, transform 800ms ease-out`.
*   **Initial State:** `opacity: 0`, `transform: translateY(20px)`.

### Global Transitions
*   All interactive elements (`a`, `.btn`, `.project-card`) use a smooth `300ms ease` or `400ms ease` transition for all properties.