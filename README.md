# Gadget Cyclone: interactive landing page

UI/UX Class 03 assignment by Sayan Das. A one-page site for Gadget Cyclone, a phone-accessories shop at Finlay Square (4th floor, 2 No. Gate), Chattogram.

Live: _(link added after the first Netlify deploy)_

## What's interactive
- **Hero background:** Magic UI Interactive Grid. Squares light up orange under the mouse, a tap, or a finger drag, and a few glow on their own.
- **Cursor glow** over the hero, and a **3D tilt** on the hero photo.
- **Rotating headline word**, **shimmer** order buttons, **number-ticker** kit prices, and a **shine border** on the middle kit.
- **Marquees:** top ticker, brands, phone models and "ask us" chat bubbles.
- **Magic Cards** with a light that follows the cursor.
- **Swipe carousels** per shop category (drag, swipe or arrows) and a **live kit builder** with a 15% deal and a WhatsApp order message.
- **Scroll effects:** a progress line in "Order in 3 steps" and huge footer text that speeds up with scroll.

Review notes and fixes (mobile, tablet, desktop): [REVIEW-LOG.md](REVIEW-LOG.md).

## Run it
```
npm install
npm run dev
```
Build: `npm run build` (output in `dist/`).

## Edit the shop details
`src/data/site.ts` holds the address, WhatsApp number, Facebook link, ticker lines, categories, kits, steps and FAQ.

## Credits
- **Components:** [Magic UI](https://magicui.design) (MIT), added with the shadcn CLI.
- **Ideas:** [Watermelon UI](https://ui.watermelon.sh), [Animate UI](https://animate-ui.com) and [Uiverse](https://uiverse.io).
- **Hero photo:** Klim Musalimov on [Unsplash](https://unsplash.com) (Unsplash License).
- **Fonts:** Newsreader, JetBrains Mono and Inter (self-hosted with Fontsource).
