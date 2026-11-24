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

## 4. Still to do (needs the shop owner)
- Add the real WhatsApp number and Facebook page link in `src/data/site.ts`. Until then, the WhatsApp buttons open WhatsApp with the message typed, and you pick the chat.
- Kit prices are samples.
- The "Ask us" bubbles are example questions, not real reviews.
