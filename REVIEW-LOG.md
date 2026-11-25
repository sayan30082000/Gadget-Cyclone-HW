# Review log: Gadget Cyclone interactive landing page (UI/UX Class 03)

How the page was built and fixed, for the class demo.

## 1. Brief given to the AI
- **Task:** an interactive landing page for my practice business, Gadget Cyclone (phone accessories, Finlay Square 4th floor, 2 No. Gate, Chattogram; cash on delivery; orders on WhatsApp / Facebook).
- **Required:** buttons, backgrounds and animations from the component galleries we saw in class, plus an interactive background. The page should feel alive, then be reviewed on mobile, tablet and desktop.
- **References:**
  - my Class 02 page (black grid, Newsreader + JetBrains Mono, orange #EA4A1A)
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

## 7. Still to do (needs the shop owner)
- Add the real WhatsApp number and Facebook page link in `src/data/site.ts`. Until then, the WhatsApp buttons open WhatsApp with the message typed, and you pick the chat.
- Kit prices are samples.
- The "Ask us" bubbles are example questions, not real reviews.
