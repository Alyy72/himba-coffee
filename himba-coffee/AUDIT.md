# Accessibility and performance review — 16 October 2026

## Fixed
- Store deal cards overflowed a 390px viewport to 420px. Stack cards on narrow screens and allow countdown columns to shrink.
- Improved store price, badge and button contrast; visible keyboard focus; larger menu target and current-page semantics.
- Product dialog cycles keyboard focus, closes with Escape and restores focus. Mobile navigation cycles focus and closes on selection/Escape.
- Customize now has a primary heading.
- Removed page-wide initial opacity animation so content is available immediately; respect reduced-motion CSS preferences.
- Product and gallery WebP assets total 1,286,506 bytes versus 5,519,221 bytes for original PNGs (76.7% smaller). Originals retained; UI references use WebP.

## Validation
- Final production build, TypeScript and lint passed.
- Store: no document overflow at 320, 390, 768 or 1440px; no broken loaded images.
- Story, Gallery, Customize: no document overflow at 390px; image alt attributes and button names present.
- Dialog Shift+Tab/Tab wrapping and Escape focus restoration verified in browser. Mobile menu Shift+Tab/Tab wrapping and Escape closure also verified.
- Portfolio current static homepage: no overflow at 390px, one h1, English document language, no missing image alt attributes, unnamed buttons or unlabeled inputs in the DOM checks.
- Live HTML curl spot checks: HIMBA store HTTP 200, TTFB 0.065s, total 0.069s, 37,709 bytes; portfolio HTTP 200, TTFB 0.412s, total 0.529s, 88,620 bytes. Single unthrottled checks, not user-experience metrics.

## Limits and follow-up
No Lighthouse trace, LCP, CLS or INP measurement was available. This targeted review is not a WCAG conformance certification or a complete screen-reader audit. Original portfolio screenshots still show the old HIMBA capture. npm ci reported dependency security findings; a separate dependency review is needed before claiming a security audit.
