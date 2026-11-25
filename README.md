# Gadget Cyclone: interactive landing page

A one-page site for Gadget Cyclone, a phone-accessories shop at Finlay Square (4th floor, 2 No. Gate), Chattogram. Cash on delivery, no advance. Built by Sayan Das.

**Live site: https://gadget-cyclone-h.netlify.app**

**Moodboard (Figma): https://www.figma.com/design/2rI3oSh0jURncZABTfSMMz/Gadget-Cyclone-moodboard---Sayan**

## What's interactive
- **Hero background:** Magic UI Interactive Grid. Squares light up green under the mouse, a tap, or a finger drag, and a few glow on their own.
- **Hero product showcase:** 6 products we sell (earbuds, chargers, power banks, covers, watches, speakers). The headline word and the photo change together. Tap a thumbnail to jump; hover to pause.
- **Dark / light mode as a light bulb on a pull cord** in the header: light on = light mode, pull (drag the cord, click or Enter) = lights off. The bulb swings, and the new theme spreads from it in a circle (idea from Magic UI Animated Theme Toggler). The choice is remembered.
- **Cursor glow** over the hero, and a **3D tilt** on the hero photo.
- A **shimmer** order button in the hero and a **number-ticker** total on the kit box sticker.
- On phones, a **floating WhatsApp button** appears after the hero and hides where the page already has order buttons.
- **Marquees:** top ticker, brands, phone models and "ask us" chat bubbles.
- **Magic Cards** with a light that follows the cursor.
- **Swipe carousels** per shop category (drag, swipe or arrows). Each of the 30 product cards has a real photo of that product.
- **"Pack your box" kit section:** all 32 products on the shelf, grouped by the same 5 sections as the shop (a swipe row per section on phones), each with a real photo and an example price:
  - tap items on a shelf and they fly into a box
  - a live price sticker, with 15% off for 3+ items
  - a ready-made WhatsApp order message
- **Scroll effects:** a progress line in "Order in 3 steps" and huge footer text that speeds up with scroll.

Review notes and fixes (mobile, tablet, desktop): [REVIEW-LOG.md](REVIEW-LOG.md).

## Fast and ready to share
Lighthouse (phone test, production build): Performance 85-87, Accessibility 100, Best Practices 100, SEO 100. No layout jumps, and the page weighs 516 KB.

- **Pre-rendered:** `npm run build` also renders the page to HTML (`src/entry-server.tsx` + `scripts/prerender.mjs`), so text shows before the JavaScript loads.
- **The grid background is one canvas**, and it only animates while something glows on screen.
- **Hero photos** come in the right size for each screen. Product photos are pre-cropped to 4:3 and load only when their row comes into view.
- **Fonts** are self-hosted, only the Latin letters, and the first-screen ones are preloaded.
- **For search and sharing:**
  - page title and description
  - share-preview image
  - canonical link
  - business details for Google
  - `robots.txt` and `sitemap.xml`
  - icons and a web manifest
- **Netlify:** `netlify.toml` sets caching and security headers. `public/404.html` is the not-found page.

## Run it
```
npm install
npm run dev
```
Build: `npm run build` (output in `dist/`). Check the build locally with `npm run preview`.

## Edit the shop details
`src/data/site.ts` holds:

- the address, WhatsApp number and Facebook link
- the phone number and opening hours, which are optional and only shown when filled in
- the live site address, used for share previews and the sitemap
- the ticker lines, categories, kits, steps and FAQ

The logo lives in `public/`:
- `logo.webp` for the light theme, `logo-dark.webp` for dark mode
- `logo.png` for Google
- `icon-*.png`, `apple-touch-icon.png` and `favicon-*.png` for the icons

Kit prices are examples until the shop adds real ones.

## Credits
- **Components:** [Magic UI](https://magicui.design) (MIT), added with the shadcn CLI:
  - Interactive Grid
  - Marquee
  - Shimmer Button
  - Magic Card
  - Number Ticker
  - Blur Fade
  - Word Rotate
  - Scroll Velocity
- **Ideas:**
  - [Watermelon UI](https://ui.watermelon.sh), [Animate UI](https://animate-ui.com) and [Uiverse](https://uiverse.io)
  - the light bulb's circle reveal comes from Magic UI's Animated Theme Toggler
- **Photos:** all from [Unsplash](https://unsplash.com) (Unsplash License).

  | Where | Photographers |
  |---|---|
  | Hero | Klim Musalimov, Lasse Jensen, I'M ZION, michael evins, Barnaby Woodrow, Nejc Soklič |
  | Earbuds & audio | TheRegisti, Miguel Angel Avila, Habib Dadkhah, C D-X, Rebekah Yip, Arturo Añez |
  | Chargers & cables | Homemade Media, Andrey Matveev, Lucian Alexe, James Lewis, Abhishek Tirkey, Matteo Grobberio |
  | Power banks | gomi, I'M ZION, Kamil Switalski, Konstantinos Papadopoulos, Andrey Matveev |
  | Covers & protection | Sophia Stark, Abhishek Yadav, Grysell Alvarez, Mason Supply, Alexandru Ant, Anuj Mhatre |
  | Watches & speakers | Simon Daoudi, Nikita Kostrykin, Daniel Korpai, Nicolas J Leclercq, Habib Dadkhah, Viktor Khilchuk |
  | Kit box | the shop photos above, plus Michael Marais (earbud case cover) |


- **Fonts:** Newsreader, JetBrains Mono and Inter (self-hosted with Fontsource).
