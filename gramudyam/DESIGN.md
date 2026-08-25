---
name: GramUdyam
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#42493e'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#72796e'
  outline-variant: '#c2c9bb'
  surface-tint: '#3b6934'
  primary: '#154212'
  on-primary: '#ffffff'
  primary-container: '#2d5a27'
  on-primary-container: '#9dd090'
  inverse-primary: '#a1d494'
  secondary: '#96472b'
  on-secondary: '#ffffff'
  secondary-container: '#fe9977'
  on-secondary-container: '#762f15'
  tertiary: '#4b3600'
  on-tertiary: '#ffffff'
  tertiary-container: '#674b00'
  on-tertiary-container: '#f1ba36'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bcf0ae'
  primary-fixed-dim: '#a1d494'
  on-primary-fixed: '#002201'
  on-primary-fixed-variant: '#23501e'
  secondary-fixed: '#ffdbd0'
  secondary-fixed-dim: '#ffb59c'
  on-secondary-fixed: '#390c00'
  on-secondary-fixed-variant: '#783116'
  tertiary-fixed: '#ffdea0'
  tertiary-fixed-dim: '#f6be3b'
  on-tertiary-fixed: '#261900'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
typography:
  display:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  caption:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 120px
---

## Brand & Style
The design system is built on the philosophy of "Digital Soil"—a synthesis of modern AI efficiency and deep-rooted rural stability. It balances professional SaaS utility with the approachability of a local community mentor.

The visual style is **Modern-Organic Minimalism**. It avoids the clinical coldness of typical fintech by utilizing warm, tactile backgrounds and a color palette inspired by nature and clay. The interface should feel spacious and calm, reducing the cognitive load for entrepreneurs who may be navigating complex business data. It utilizes soft elevation and high-contrast typography to ensure clarity and accessibility across all lighting conditions and device types.

## Colors
The palette is derived from rural landscapes and traditional materials to evoke trust and familiarity.

*   **Primary (Earthy Green):** Used for primary actions, success states, and brand presence. It represents growth and stability.
*   **Secondary (Clay Terracotta):** Used for call-outs, progress indicators, and interactive accents that need to stand out without being aggressive.
*   **Tertiary (Harvest Gold):** Reserved for highlights, ratings, and cautionary UI elements (warnings).
*   **Neutral (Cream Base):** The background is a warm off-white, reducing eye strain and providing a "paper-like" tactile quality.
*   **Typography (Charcoal Green):** A very dark green-black is used for text to maintain high legibility while feeling softer and more natural than pure black.

## Typography
This design system uses **Outfit** for its friendly, geometric clarity. The large x-height ensures excellent readability on mobile devices in outdoor environments.

Headlines should be bold and authoritative, acting as clear anchors for the advisor's insights. Body text maintains a generous line height (1.5x minimum) to ensure long-form advice is easy to digest. Use `headline-lg-mobile` for all top-level screen headers on small screens to prevent text wrapping issues.

## Layout & Spacing
The design system employs a **Fluid Grid** with a soft 8px baseline. 

*   **Mobile:** 4-column layout with 20px side margins and 16px gutters.
*   **Desktop:** 12-column layout centered at a max-width of 1280px.
*   **Rhythm:** Use `md` (24px) for most internal card padding and `lg` (40px) for section vertical spacing. 

The layout prioritizes a single-column flow on mobile to keep the experience linear and "chat-like," mirroring a conversation with an advisor.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and extremely soft, diffused shadows. 

*   **Surface Level 0:** The neutral cream background (`#FDFBF7`).
*   **Surface Level 1 (Cards):** Pure white surfaces with a "Glow" shadow—15% opacity of the Primary Green color, 20px blur, 4px vertical offset. This makes cards look like they are gently resting on the surface.
*   **Interactions:** On press/tap, elements should physically "sink" by reducing the shadow spread and slightly darkening the background color of the element.

## Shapes
Shapes are generous and welcoming. A standard radius of `16px` (rounded-lg) is the default for cards and containers, removing any "sharpness" from the business data. 

Interactive elements like buttons and chips should feel "squishy" and touch-friendly. Buttons use the `rounded-xl` (24px) setting to create a distinct, friendly silhouette that invites interaction.

## Components
Consistent implementation of these components ensures the "trusted advisor" persona remains intact:

*   **Buttons:** Large (minimum 56px height for primary), using the Earthy Green for primary actions and the Clay Terracotta for secondary. Text is white for high contrast.
*   **Advice Cards:** The primary container for AI insights. Use a white background, 16px corner radius, and a 4px left-border accent in Primary Green to denote "verified" advisor content.
*   **Visual Score Rings:** Circular progress indicators using the Tertiary Gold against a muted version of the same color. Stroke width should be a minimum of 8px for visibility.
*   **Input Fields:** Use a subtle "inset" look with a 1px border in a muted green-grey. Labels must always be visible above the field, never floating as placeholders.
*   **Chips/Tags:** Used for categorizing business sectors (e.g., "Agriculture," "Retail"). Use pill-shapes with a very light tint of the primary color and dark green text.
*   **Simple Charts:** Bar and line charts should use rounded caps on all data points to maintain the soft shape language. Avoid thin lines; use 3px minimum stroke weights.