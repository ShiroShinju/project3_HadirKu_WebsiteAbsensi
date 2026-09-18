---
name: Luminous Presence
colors:
  surface: '#fcf8fb'
  surface-dim: '#dcd9dc'
  surface-bright: '#fcf8fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7ea'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#3d4a3c'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#6d7b6b'
  outline-variant: '#bccbb8'
  surface-tint: '#006e28'
  primary: '#006e28'
  on-primary: '#ffffff'
  primary-container: '#34c759'
  on-primary-container: '#004d1a'
  inverse-primary: '#53e16f'
  secondary: '#0058bc'
  on-secondary: '#ffffff'
  secondary-container: '#0070eb'
  on-secondary-container: '#fefcff'
  tertiary: '#8c5000'
  on-tertiary: '#ffffff'
  tertiary-container: '#fe9400'
  on-tertiary-container: '#633700'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#72fe88'
  primary-fixed-dim: '#53e16f'
  on-primary-fixed: '#002107'
  on-primary-fixed-variant: '#00531c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a41'
  on-secondary-fixed-variant: '#004493'
  tertiary-fixed: '#ffdcbf'
  tertiary-fixed-dim: '#ffb874'
  on-tertiary-fixed: '#2d1600'
  on-tertiary-fixed-variant: '#6a3b00'
  background: '#fcf8fb'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.005em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.015em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  numeric-timer:
    fontFamily: Plus Jakarta Sans
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system establishes an ultra-clean, elegant, and serene operational workspace for attendance tracking and daily workforce workflows. The emotional tone bridges the tranquil, welcoming clarity of soft pastel ambient light with the refined precision of modern desktop and tablet operating environments. Users should experience zero cognitive friction or institutional dread; instead, recording attendance, reviewing work hours, and requesting leave feels effortless, modern, and ambient.

The aesthetic philosophy fuses Apple Human Interface Design principles with high-fidelity liquid glassmorphism. Interfaces rely on translucent substrate materials layered over slowly shifting pastel mesh gradients—composed of lilac, soft sky blue, and warm peach blush. Precision is maintained through strict structural alignment, pure optic spacing, crisp 1px light-refracting edge highlights, and tactile rounded geometry.

## Colors

The palette leverages a pristine light mode anchored by Apple-grade functional vibrancy against high-translucency neutral substrates.

- **Primary (`#34C759`)**: Vibrant System Green. Reserved for principal affirmative actions, particularly "Clock In", active verified status badges, on-time markers, and primary progress indicators.
- **Secondary (`#007AFF`)**: System Blue. Drives secondary navigational elements, actionable links, focus boundaries, information states, and clock-out reconciliation prompts.
- **Tertiary (`#FF9500`)**: Warm Amber/Orange. Communicates pending approvals, shift transitions, lunch breaks, and subtle alert markers without alarming the user.
- **Neutral (`#1C1C1E`)**: Deep Apple Slate/Graphite. Used for high-contrast primary typography and foreground glyphs. Secondary content recedes to `#8E8E93` (System Grey) and tertiary details to `#AEAEB2`.

### Background Canvas & Glass Surfacing
- **Canvas Base**: Soft ambient mesh gradient combining `#F2F2F7` (system background), `#E8ECFD` (diffuse lilac/blue), and `#FDF0ED` (soft peach blush).
- **Glass Panel Fill**: `rgba(255, 255, 255, 0.68)` for primary interactive cards, layered over an underlying blur layer.
- **Glass Panel Border**: Solidified optical edge using `rgba(255, 255, 255, 0.85)` along the top and left edges, falling to `rgba(255, 255, 255, 0.45)` along bottom edges.
- **Inactive / Muted Fills**: `rgba(120, 120, 128, 0.08)`.

## Typography

Plus Jakarta Sans delivers the exact geometric cleanliness, open apertures, and modern humanist rhythm characteristic of contemporary Cupertino interface guidelines. 

- **Display & Large Headlines**: Tight negative tracking (-0.02em to -0.03em) ensures numbers, timestamps, and hero greeting displays maintain tight typographic cohesion without visual looseness.
- **Data & Clock Digits**: When displaying live timestamps or duration meters, use tabular numeric figures (`font-variant-numeric: tabular-nums`) to prevent horizontal jitter during real-time seconds ticking.
- **Micro-Hierarchy**: Tertiary status hints and badge labels utilize `label-sm` with slight positive tracking (+0.02em) to guarantee immediate scan-readability against blurred translucent backgrounds.

## Layout & Spacing

The layout is built upon a 12-column responsive fluid grid pinned to an ultra-wide max container boundary of `1440px`. The overarching rhythm promotes breathability and floating card separation.

- **Desktop (1024px and up)**: 12 columns with `1.5rem` (`24px`) gutters and `2rem` (`32px`) canvas margin. The left navigation rail anchors fixed at `280px` width as a floating glass vertical pill, while main dashboard widgets (Clock Action Card, Schedule Map, Analytics, and Activity Timeline) organize across balanced spans (e.g., 4-column punch cards and 8-column summary tables).
- **Tablet (768px – 1023px)**: 8 columns with `1rem` (`16px`) gutters. Side rail contracts to an icon-centric glass dock or top persistent header.
- **Mobile (< 768px)**: 4 columns with `0.75rem` (`12px`) gutters and `1rem` (`16px`) canvas margins. Panels stack vertically into full-width edge-to-edge frosted cards. Primary actions ("Clock In") float via a persistent lower ergonomic thumb bar.

Internal element margins stick rigidly to multiples of `4px` (`space-xs` to `space-xl`), ensuring vertical alignment matches typographic baseline increments.

## Elevation & Depth

Visual depth is achieved through multi-layered liquid glassmorphism rather than heavy dark drop shadows. Depth informs hierarchy by stacking translucent sheets above the vibrant background canvas.

1. **Canvas (Level 0)**: Non-interactive pastel mesh gradient layer (`background-attachment: fixed`).
2. **Standard Surface Panels (Level 1)**:
   - Fill: `rgba(255, 255, 255, 0.65)`
   - Backdrop Filter: `blur(24px) saturate(180%)`
   - Border: `1px solid rgba(255, 255, 255, 0.70)`
   - Shadow: `0 10px 30px -5px rgba(0, 0, 0, 0.04), 0 4px 12px -2px rgba(31, 38, 135, 0.03)`
3. **Floating Controls & Active Cards (Level 2)**:
   - Fill: `rgba(255, 255, 255, 0.82)`
   - Backdrop Filter: `blur(32px) saturate(200%)`
   - Border: `1px solid rgba(255, 255, 255, 0.90)`
   - Shadow: `0 20px 40px -10px rgba(0, 0, 0, 0.06), 0 8px 16px -4px rgba(31, 38, 135, 0.04)`
4. **Modals & Flyouts (Level 3)**:
   - Fill: `rgba(255, 255, 255, 0.92)`
   - Backdrop Filter: `blur(40px) saturate(210%)`
   - Border: `1px solid #FFFFFF`
   - Shadow: `0 30px 60px -12px rgba(28, 28, 30, 0.12), 0 12px 24px -6px rgba(0, 0, 0, 0.06)`
5. **Inner Specular Light**: Cards feature a subtle top inset border highlight (`box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`) creating the characteristic Apple glass optical bevel.

## Shapes

The design system employs continuous squircle curves and pill forms (`roundedness: 3`). 

- **Containers & Glass Cards**: Standardized to `rounded-3xl` (`24px` to `32px` radius), providing a sleek, hand-held device contour across wide desktop dashboards.
- **Buttons, Status Badges, and Micro-Pills**: Executed strictly as continuous organic capsules (`border-radius: 9999px` / `rounded-full`).
- **Inner Controls (Inputs, Dropdown Selectors, Date Pickers)**: Standardized to `rounded-2xl` (`16px` radius) to echo card contours without geometric dissonance.

## Components

### 1. Primary Action Button ("Clock In / Presence")
- **Visuals**: Full pill shape (`rounded-full`), solid `#34C759` primary fill with white high-contrast text and glowing ambient under-shadow (`0 10px 24px -4px rgba(52, 199, 89, 0.45)`).
- **Sub-elements**: Includes dynamic live pulsing dot (scale and opacity ring animation) denoting GPS location validation and network synchronization.
- **Interaction**: Subtle haptic-inspired scale transform on active press (`transform: scale(0.97)`), transition speed `150ms cubic-bezier(0.2, 0.8, 0.2, 1)`.

### 2. Glass Cards
- Built with `backdrop-filter: blur(24px)`, `rgba(255, 255, 255, 0.65)` background, and sharp hairline `1px` gradient border (`rgba(255, 255, 255, 0.8)` to `rgba(255, 255, 255, 0.2)`).
- Hover state elevates card subtly with `translateY(-2px)` and increases background opacity to `0.78`.

### 3. Presence Status Badges & Chips
- **Geometry**: Compact capsules (`padding: 4px 12px`, `rounded-full`).
- **Variants**:
  - *Present*: Soft translucent green background (`rgba(52, 199, 89, 0.12)`), solid `#34C759` typography and marker dot.
  - *Late / Exception*: Soft amber (`rgba(255, 149, 0, 0.14)`), text `#D97706`.
  - *Remote / WFH*: Soft blue (`rgba(0, 122, 255, 0.12)`), text `#007AFF`.

### 4. Input Fields & Search Bars
- Translucent input wells using `rgba(118, 118, 128, 0.08)`, borderless in neutral state with inset shadow.
- On focus: Background clears to `rgba(255, 255, 255, 0.9)`, bounded by a `2px` focus ring tinted with Apple Blue (`#007AFF`) and ambient diffused glow.

### 5. Shift & Attendance Log Lists
- Rows formatted as independent mini-cards or separated by `1px` translucent dividers (`rgba(60, 60, 67, 0.08)`).
- Left metadata displays mono-spaced clock-in/out timestamps with high legibility; right metadata displays total calculated decimal hours and approval state chips.

### 6. Circular Shift Progress Dial
- Dedicated progress ring visualizing elapsed working hours vs target 8-hour shift.
- Background track is translucent white-grey; foreground active stroke utilizes a linear-gradient transition from `#007AFF` to `#34C759` with rounded caps.