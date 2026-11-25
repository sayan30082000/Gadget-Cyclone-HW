# Gadget Cyclone: interactive landing page

UI/UX Class 03 assignment by Sayan Das. A one-page site for Gadget Cyclone, a phone-accessories shop at Finlay Square (4th floor, 2 No. Gate), Chattogram.

Live: _(link added after the first Netlify deploy)_

## What's interactive
- **Hero background:** Magic UI Interactive Grid. Squares light up green under the mouse, a tap, or a finger drag, and a few glow on their own.
- **Hero product showcase:** 6 products we sell (earbuds, chargers, power banks, covers, watches, speakers). The headline word and the photo change together. Tap a thumbnail to jump; hover to pause.
- **Dark / light mode** button (Magic UI Animated Theme Toggler, circle reveal). The choice is remembered.
- **Cursor glow** over the hero, and a **3D tilt** on the hero photo.
- **Shimmer** order buttons and **number-ticker** totals in the kit box.
- **Marquees:** top ticker, brands, phone models and "ask us" chat bubbles.
- **Magic Cards** with a light that follows the cursor.
- **Swipe carousels** per shop category (drag, swipe or arrows) and a **"pack your box" kit section**: tap items on a shelf and they fly into a box with a live price sticker, 15% off for 3+ items, and a WhatsApp order message.
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
- **Hero photos:** Klim Musalimov, Lasse Jensen, I'M ZION, michael evins, Barnaby Woodrow and Nejc Soklič on [Unsplash](https://unsplash.com) (Unsplash License).
- **Fonts:** Newsreader, JetBrains Mono and Inter (self-hosted with Fontsource).
