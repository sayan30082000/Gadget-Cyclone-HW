# Review log: Gadget Cyclone interactive landing page

How the page was built with AI, then reviewed and fixed on phone, tablet and desktop.

## 1. Brief given to the AI
- **Task:** an interactive landing page for Gadget Cyclone (phone accessories, Finlay Square 4th floor, 2 No. Gate, Chattogram; cash on delivery; orders on WhatsApp / Facebook).
- **Required:** buttons, backgrounds and animations from free UI component galleries, plus an interactive background. The page should feel alive, then be reviewed on mobile, tablet and desktop.
- **References:**
  - my earlier Gadget Cyclone page (black grid, Newsreader + JetBrains Mono, orange #EA4A1A)
  - the Dribbble ref "Tech Gadget E-commerce Website UI" (Design Monks)
  - the "UI ELEMENTS" band on my Figma moodboard (Watermelon UI, Magic UI, Uiverse, Animate UI, Layers)

## 2. What came from the galleries
| Where on the page | Component | Source |
|---|---|---|
| Hero background (moves with mouse / finger) | Interactive Grid Pattern | Magic UI (installed with `npx shadcn add`) |
| Hero headline word that changes | Word Rotate | Magic UI |
| Order buttons | Shimmer Button | Magic UI |
| Top ticker, brands row, "Ask us" chat bubbles, phone-model chips | Marquee | Magic UI |
| "What we do" cards with a light that follows the cursor | Magic Card | Magic UI |
| Middle kit border | Shine Border | Magic UI |
| Kit prices counting up | Number Ticker | Magic UI |
| Sections fading in on scroll | Blur Fade | Magic UI |
| Huge footer text that speeds up when you scroll | Scroll Based Velocity | Magic UI |
| Category tabs with a sliding orange pill | idea from Animate UI Tabs (built with `motion` layoutId) | Animate UI |
| Pricing / contact / FAQ layout | idea from Watermelon UI blocks (Pricing 1, Contact 1, FAQ 1) | Watermelon UI |
| Square dark social / CTA styling | idea from Uiverse elements | Uiverse |

Extra motion written for this page:
- a cursor glow over the hero
- a 3D tilt on the hero photo, with floating chips
- a rider moving along the COD track
- 7 replacement days filling in
- a progress line in "Order in 3 steps" that fills as you scroll
- a scroll progress bar at the top

## 3. Review rounds and fixes

### Desktop (1440×900 and 1024×768)
- **At 1024px the headline wrapped to 4 lines and pushed the buttons below the fold.** Fix: headline is 62px on laptops and 74px only on wide screens (`lg:text-[62px] xl:text-[74px]`).
- **The sticky header covered the top of a section after clicking a nav link.** Fix: `scroll-mt-16` on every section with an id.
- **The rotating headline word dropped down onto the next line while it changed.** Fix: Word Rotate now slides inside its own clipped line box (`y: -100% → 0 → 100%`).
- **The phone-model chips were cut off hard at the card edge.** Fix: a fade mask at both ends.

### Mobile (375×812)
- **The whole page scrolled sideways (page width 1815px instead of 375px).** The phone-model marquee inside the "Right fit" card stretched its grid column. Fix: `min-w-0` on grid children and an explicit `grid-cols-1`.
- **The interactive background did nothing on phones.** The Magic UI grid only reacts to `:hover`, and phones have no hover. Fixes:
  - squares now light up under a tap or finger drag
  - a few squares glow on their own every 0.4 s (`autoGlow`, paused when off screen and for reduced-motion users)
  - the cursor glow starts behind the photo, so it shows before anyone touches the screen
- **The grid re-rendered all ~900 squares on every hover** (React state on each square). Fix: hover is pure CSS now, and touch-lit squares use a `data-on` attribute set directly on the element.
- **Kit prices sat on wrong-looking numbers ("Tk 977") for about 4 seconds** while counting up. Fix: a faster spring in Number Ticker (`stiffness 180, damping 30`), so prices land on Tk 990 / 3,190 / 1,849 in about a second.
- **The category tabs showed a grey scrollbar.** Fix: scrollbar hidden; the tabs still scroll sideways.
- **"Order in 3 steps" had no moving line on phones.** Fix: a vertical line that fills as you scroll, with the step text moved right so the line does not cross it.
- **Footer links were too small to tap** (about 18px). Fix: more padding on phones.
- **The hint "Move your cursor (or finger)"** became "Hover or tap the cards."

### Tablet (768×1024)
- **"7-day replacement" was cut off** because the "What we do" bento squeezed into 3 narrow columns. Fix: 2 columns on tablet, 3 from laptop up.
- **The kits stacked as 3 very wide cards with empty space.** Fix: 3 columns from tablet up, with a smaller price size there.
- **Kit buttons wrapped and did not line up.** Fix: shorter label ("Order this kit"), and the buttons sit at the bottom of each card.

## 4. Round 2: my own feedback after seeing it
I asked for three changes:
1. A new color palette. I wanted to choose it, and to know how many colors a website needs.
2. A new layout for the shop section.
3. A new layout for the pricing section.

**How many colors.** The answer I got: 6 to 8, in three jobs (the 60-30-10 idea).
- About 60% base: background, cards, lines.
- About 30% text: main and muted.
- About 10% accent: one brand color, plus one support color.

**The AI showed me:**
- 6 palettes, each with a mini preview and a contrast check.
- 3 shop layouts (product grid, swipe carousel, bento).
- 3 pricing layouts (kit builder, comparison table, stacked rows).

**I picked:**
- **Palette: E Mint Market**, 7 colors:

  | Color | Hex |
  |---|---|
  | Paper (background) | #F7F7F2 |
  | Card | #FFFFFF |
  | Line | #E2E2DA |
  | Muted text | #5F6158 |
  | Ink (main text) | #111111 |
  | Green (accent) | #007A52 |
  | Amber (support) | #FFB800 |

  Contrast results:
  - Ink on paper: 17.6
  - Muted text on paper: 5.9
  - Green on paper: 5.0
  - White on green: 5.4
  - Ink on amber: 10.9

  Amber is never used as text on the light background (1.6), only behind dark text.
- **Shop: a swipe carousel per category.**
  - 5 rows (earbuds, chargers, power banks, covers, watches and speakers), 6 cards each.
  - Swipe on phones, drag with the mouse, or use the arrow buttons.
  - A progress bar under each row, and "swipe →" on phones.
  - Every card opens WhatsApp asking for today's stock.
- **Pricing: a live kit builder.**
  - Start from the Starter, Power or Audio kit, or tick items one by one.
  - The total updates live (Number Ticker). 3 or more items get 15% off, with a "you save" badge.
  - An amber bar shows how many more items you need for the deal.
  - A phone-model box, and an "Order this kit on WhatsApp" button that writes the whole kit into the message.
  - On phones and tablets, a dark bar sticks to the bottom with the item count and total while you tick items.

**What I checked:**
- No sideways scroll on phones (page width 375).
- The arrows move one card, and mouse drag scrolls the row.
- Kit logic: Clear → "Pick 3 items for 15% off".
- 1 item → "Add 2 more".
- Earbuds + case cover + ear tips: Tk 1,850 → Tk 1,570 after 15% off. The WhatsApp message has all 3 items, the total and the phone model.
- Layouts on phone, tablet and desktop.

## 5. Round 3: I didn't like the kits section
I said the kits section didn't look good. The AI drew 3 new directions in the Mint Market colors:
- A: bundle box
- B: three kit cards
- C: kit finder quiz

**I picked A, the bundle box ("Pack your BOX"):**
- **The shelf:** 12 item tiles, each with an icon, name and sample price. Tap one and its icon flies into the box (motion shared-layout animation). Tap it in the box to send it back.
- **The box:** an open box drawing with flaps and tape, 8 slots, and "Gadget Cyclone · Power kit" printed on the front.
- **Price sticker:** amber, on the corner of the box, showing the total, "15% off" and "save Tk …".
- **Quick kits:** Starter, Power and Audio fill the box in one tap. "Empty the box" clears it.
- **Ordering:** a phone-model box, and "Order this box on WhatsApp" with the full list and total.
- **Phones:** box first, then the shelf in 3 columns, with a sticky bar ("5 in box · Tk 3,060 · See box ↑").

**What I fixed while testing it:**
- **The sticker price counted up from 0 every time I added an item,** because the sticker was rebuilt on each change. Fix: the number now rolls from the old total to the new one (Tk 3,060 → 4,340 → back), and the sticker only does a small pop.
- **The empty slots were hard to see.** Fix: a darker dashed border.

**Checked:**
- Adding and removing items, by tapping the shelf and by tapping inside the box.
- 15% off from 3 items.
- No sideways scroll on the phone (375 px).
- Desktop layout: shelf on the left, box and summary sticky on the right.

## 6. Round 4: show what we sell + dark mode
I asked for two things:
1. The hero should show the kinds of products we sell, not only one earbuds photo.
2. A button to switch between dark and light mode.

**Hero product showcase:**
- **6 products:** earbuds, chargers, power banks, covers, watches and speakers. Each has a free Unsplash photo (Unsplash License), picked from a contact sheet. Most are in-hand or close shots, to match the first earbuds photo.
- **One counter drives everything.** The headline word ("Chargers for the phone you ALREADY own") and the photo change together. I changed Magic UI Word Rotate so it can follow an outside index. The photo crossfades with a slight zoom.
- **Under the photo:** a strip of 6 thumbnails. The active one has a green progress bar. Tap one to jump to it (it stays 8 s). Hover to pause.
- **The bottom chip and credit change too.** The chip shows the product's line (for example "Chargers: 20W to 65W, matched to your phone"). The photographer credit under the photo changes with it.
- **Order button:** the WhatsApp message now says which product you were looking at.

**Dark / light mode:**
- **Button:** Magic UI Animated Theme Toggler, in the header (desktop and phone). Clicking it reveals the new theme as a circle from the button.
- **Same palette, dark version:**

  | Color | Light | Dark |
  |---|---|---|
  | Paper (background) | #F7F7F2 | #0C110F |
  | Card | #FFFFFF | #141B18 |
  | Line | #E2E2DA | #27322D |
  | Muted text | #5F6158 | #9AA59F |
  | Ink (main text) | #111111 | #EDF2EE |
  | Green | #007A52 | #34C38F |
  | Amber | #FFB800 | #FFB800 |

  Dark contrast: text 16.8, muted 7.5, green on background 8.5, dark text on green buttons 8.5.
- **All colors are now CSS variables.** I replaced every hard-coded color in the sections. I also added two "text on" colors, one for text on green and one for text on amber, so button text stays readable in both modes.
- **Remembered:** the choice is saved, and a tiny script in index.html applies it before the page paints, so there is no white flash. The browser bar color (theme-color) follows the theme. Light stays the default.

**Fixed during the check:** on phones the "Tk 0 advance" chip crowded the product chip, so it is hidden on small screens.

**Checked:**
- Desktop light and dark.
- Phone dark: both header buttons show, the 6 thumbnails fit, no sideways scroll at 375 px, and dark mode survives a reload.
- Every section in dark mode: why us, shop carousels, kit box, footer.

## 7. Round 5: a more unique theme button
The round 4 sun/moon button looked like every other site. I asked for something unique, like switching a light on or off.

**Now there is a light bulb hanging on a cord from the header:**
- **Light on = light mode:** the bulb glows amber, with small rays.
- **Light off = dark mode:** grey glass, no glow.
- **Three ways to switch it:**
  - drag the cord down; the cord stretches as you pull, and past 16 px it counts as a pull
  - click the bulb, which still does a small tug
  - press Enter or Space with the keyboard
- **After a pull** the bulb swings on its cord and settles. The new theme spreads out from the bulb in a circle.
- **Accessible:** it is a real `switch` for screen readers ("Light is on (light mode). Pull to switch it off").
- **Phones:** it hangs next to the menu button.
- **Cleanup:** I removed the old sun/moon component. The circle reveal idea came from Magic UI's Animated Theme Toggler, and that is credited.

**Fixed while testing:**
- **A fast second pull was ignored** while the first circle animation was still running. Now it ends the running animation and switches straight away.
- **Test:** 3 quick clicks end in the opposite theme, and 2 quick clicks end where they started.

**Checked:**
- Click, a real drag of the cord, the Enter key, and fast repeated pulls.
- Phone header (bulb next to the menu, no overlap, no sideways scroll).
- Dark mode is remembered after a reload.

## 8. Round 6: professional pass
I asked the AI to act as a web developer and tell me what would make the site look and work like a real shop's site. Then I asked it to make all those changes, but keep the parts people remember.

**Kept as they were:**
- the hero showcase (the word and the photo change together)
- the green grid background
- the pull-cord light bulb
- the bundle box
- the swipe carousels
- the Mint Market colors in light and dark

**Lighthouse, phone test, production build** (run on my computer; the live site will differ a little):

| | Before | After |
|---|---|---|
| Performance | 58 | 85-87 |
| Accessibility | 100 | 100 |
| Best practices | 96 | 100 |
| SEO | 92 | 100 |
| First text on screen | 3.0 s | 2.2 s |
| Biggest item on screen | 3.8 s | 3.4-3.5 s |
| Time the page was frozen | 1,210 ms | about 200 ms |
| Layout jumps | 0 | 0 |
| Page weight | 942 KB | 516 KB |
| Text big enough to read | 55% | 100% |

**Faster:**
- **Pre-rendered page:** the HTML now already contains the whole page, so text shows before the JavaScript loads, and React then takes it over.
- **Grid background:** it was about 1,000 separate squares in the page. Now it is drawn lines plus one canvas that paints only the lit squares. It only runs while something glows and the hero is on screen. This roughly halved the page (2,185 → about 1,190 elements) and removed most of the freezing.
- **Hero photos:** each screen gets the right size (480 to 1400 px wide). The first photo starts loading straight away, and only the next photo is loaded ahead.
- **Fonts:** only the Latin letters are loaded, the first-screen fonts load early, and the text never jumps when a font arrives.
- **Headline:** it shows immediately, with no fade-in delay.

**Easier to read:**
- Descriptions, FAQ answers, chat bubbles and card text moved from small code-style letters (10 to 14 px) to Inter at 15 to 16 px.
- The code-style font stays for labels and buttons, so the "tech shop" feel is still there.
- No text is smaller than 12 px.

**Easier to order:**
- **On phones** a WhatsApp button floats in the corner after the hero. It hides over the kit box and the Visit section, which have their own buttons.
- **Every shop card** has an "Ask for today's stock →" link.
- **The kit box order button** is now a plain green button. The shimmer version had white text on bright green in dark mode, which was hard to read.
- **Optional details:** a "Call us" card and opening hours appear only when the owner fills them in `src/data/site.ts`. Nothing is guessed.

**Honest:**
- Prices are marked as examples in the kit box, the FAQ and the footer. We confirm today's price and stock on WhatsApp.

**Share previews and Google:**
- A clear page title and description.
- A 1200×630 preview image for Facebook, WhatsApp and Messenger.
- Business details for Google: address, area, cash payment. Phone and hours are added only when filled in.
- `robots.txt` and `sitemap.xml`, written at build time.
- Favicon, phone home-screen icons and a web manifest.
- The phone's browser bar color follows the light bulb.

**Hosting (Netlify):**
- Files that never change are cached for a year.
- Basic security headers.
- A branded "This shelf is empty" 404 page.

**Cleanup:** I removed two Magic UI components the page no longer used.

**Fixed while testing:**
- **Layout jump after pre-rendering:** the headline jumped (layout shift 0.18) when its font loaded late. The font now either arrives in time or the fallback stays, so the score is back to 0.
- **"Call us" link:** it removed the letter "s" instead of spaces from the number. It now keeps only digits and +. The WhatsApp number also accepts spaces and a +.

**Checked:**
- Production build in light and dark on phone (375 px), tablet and desktop.
- No console or hydration errors.
- After the page loads, the grid, hero rotation, kit box, carousels and light bulb all still work.
- The floating WhatsApp button shows over the shop and hides over Visit.
- The "Call us" card and hours: tested with a placeholder number, then emptied again.

## 9. Round 7: real product photos, live link
**Live:** https://gadget-cyclone-h.netlify.app (Netlify, built from the GitHub repo). Moodboard: https://www.figma.com/design/2rI3oSh0jURncZABTfSMMz/Gadget-Cyclone-moodboard---Sayan (its Week 3 band shows screenshots of the live site).

**Shop photos:**
- All 30 shop cards now show a real photo of that product instead of an icon. Examples: a neckband for "Neckbands", a 67W charger for "33-65W chargers", a magnetic battery pack on the back of a phone for "Magnetic packs".
- **Source:** every photo is from Unsplash (free license, no Unsplash+).
- **Checked:** I picked each one by looking at the candidates side by side, not by the search text. Some searches were misleading: "car phone charger" mostly returned electric-car chargers.
- **Fast:**
  - each photo comes pre-cropped to the card's 4:3 shape, at 400 or 800 px wide
  - photos load only when a row comes into view
- **Look:** the card number and the COD tag sit on top of the photo, and the photo zooms in a little on hover.

**Cleanup:**
- The footer now has only shop information (example prices, photo source). The developer credits moved to the README.
- The share previews, canonical link and sitemap now use the live address.

## 10. Round 8: the shop logo
**Logo:** Sayan supplied the real Gadget Cyclone logo, and it replaces the plain text name.
- **Cut-out:** the logo came on a light-green background. I removed the background, cleaned the edges so no light halo shows, and trimmed the empty space.
- **Header (36-40 px tall) and footer:** in dark mode a lighter version is used, because the dark green "Gadget" would be hard to read on near-black. It loads as a CSS background, so each visitor downloads only one version (about 24 KB).
- **Icons:** the "G" swirl on its own is now the browser tab icon, the phone home-screen icon and the app icons.
- **Share preview:** the logo sits at the top left of the image shown on Facebook and WhatsApp.
- **Other places:** it is also on the 404 page and in the business details for Google.

**Live address:** the Netlify site is now https://gadget-cyclone-h.netlify.app. The code, README and moodboard use this address.

## 11. Round 9: photo first on phones, real photos in the kit box
- **Hero on phones and tablets:** the product photo (with its product strip) now comes first, right under the header, and the headline sits under it. On phones the first screen is now a big product photo instead of text. Desktop keeps text on the left and the photo on the right. The headline stays first in the page code, so screen readers and Google still read it first.
- **Kit box:** the 12 shelf items and the items inside the box show real product photos instead of icons. They use the same Unsplash photos as the shop cards, plus one new one for the earbud case cover (Michael Marais).
  - Shelf and box use the same square photo, so it doesn't stretch when it flies into the box.
  - Photos load only when the section is close.
- **Checked:**
  - phone (375 px) and desktop, light and dark
  - no sideways scroll
  - adding and removing an item still flies between the shelf and the box, and the price updates

## 12. Round 10: every product in the kit box, by section
- **Whole range:** the kit shelf now has every product from the shop (30), plus 2 small add-ons (earbud case cover, spare ear tips). That makes 32, grouped under the same 5 sections as the shop:
  - Earbuds & audio
  - Chargers & cables
  - Power banks
  - Covers & protection
  - Watches & speakers
- **Section headings:** each section has a numbered heading and a counter that shows how many of its items are in the box.
- **Layout:** each section is a swipe row on phones, so the page doesn't get too long, and a 4-column grid on tablets and desktop. The box stays pinned on the right on desktop.
- **One list for both:** the shop cards and the kit shelf come from the same product list in `src/data/site.ts` (id, box name, example price), so they always match.
- **Example prices:** every product has one. They are examples, and the site already says we confirm today's price on WhatsApp. "Second cable" was removed; the Power kit now has a car charger instead.
- **Checked:**
  - phone and desktop
  - adding and removing a new product (party speaker)
  - the WhatsApp message lists it with its price

## 13. Round 11: offer countdown and reviews
- **Offer countdown** (new section between the shop and the kit box): a black card with a photo that fades into the dark, a spinning amber "15% off" badge and a live timer (days, hours, minutes, seconds). Each number slides into place.
  - It promotes the real kit deal: 3 or more items in the box = 15% off. The timer runs to **31 December 2026, 11:59 PM, Bangladesh time**.
  - After that moment the section hides itself. For a new offer, change `OFFER.endsAt` in `src/data/site.ts`.
  - "Pack your box" jumps to the kit box. The timer is only drawn in the browser, so the pre-rendered page never shows a wrong time.
- **Reviews section** ("what our customers SAY"): an average star rating and the review count, plus a sliding row of cards. Each card has the quote, the stars, a photo of the product the customer bought, their name and area.
  - The rating and the count are worked out from the reviews themselves, never typed in.
  - **Samples until real reviews come in:** the section shows 6 design samples, marked "Sample reviews, not real customers yet", with "Sample name" on every card and "from 6 sample reviews" under the stars. The first real review in `REVIEWS` (`src/data/site.ts`) replaces all of them.
  - At first the samples only showed in the local preview. I asked to see the section on the live site, so it now shows there too, still marked as samples.
  - A "Bought from us? Send us your review on WhatsApp" link under the cards, to collect real ones.
- **Checked:** phone, tablet and desktop; light and dark mode; no sideways scroll; no console errors.
- **Later fix:** on 1024 px laptops the "15% off" badge covered the headline. The headline and timer are now a bit smaller between 1024 and 1280 px.

## 14. Round 12: back to top
- **Back-to-top button:** brings you back up to the hero from any section.
  - It first showed only once the hero had scrolled away, so it was missing in the hero. Now it shows everywhere after the first 200 px of scrolling, and hides only at the very top.
  - **Redesigned (unique, icon only, no "Top" text):** a round "cyclone" button.
    - A green ring around it fills up as you go down the page, so it also shows how far you are.
    - Three amber arcs inside spin as you scroll, like a small cyclone, and unwind on the way back up.
    - On click the arrow shoots up out of the button and a new one rises back in, while the page glides to the hero.
  - Where it sits: just above the WhatsApp button on phones, bottom-right corner from tablet up.
  - It keeps the site's hard green shadow, and it is dark in light mode, light in dark mode.
- **Motion and keyboard:** it scrolls smoothly, but jumps straight up for people who turn off animations. Keyboard focus moves to the logo, so Tab continues from the top.

## 15. Still to do (needs the shop owner)
- **WhatsApp number and Facebook page link** go in `src/data/site.ts`. Until then, the WhatsApp buttons open WhatsApp with the message typed, and you pick the chat.
- **Phone number and opening hours** are optional. Once filled in, they show on the page and go into the Google data automatically.
- **Prices:** all product prices are samples. Put the real ones in `src/data/site.ts` (the `price` of each product).
- **Promises:** confirm the "7-day replacement" promise and the cash-on-delivery area before the site goes live.
- **"Ask us" bubbles** are example questions, not real reviews.
- **Real reviews:** copy them from Facebook or WhatsApp (with the customer's OK) into `REVIEWS` in `src/data/site.ts` to replace the sample reviews.
- **Offer date:** the kit deal countdown ends on 31 December 2026. Set a new `OFFER.endsAt` for the next offer.
- **Later:**
  - a Bangla version (the wording needs checking by the owner)
  - a custom domain
  - a visitor analytics account
- **If the site address changes** (for example a custom domain, or renaming the Netlify site), change `url` in `src/data/site.ts` so share previews and the sitemap point to the right place.
