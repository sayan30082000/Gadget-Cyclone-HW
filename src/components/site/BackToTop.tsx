import { useEffect, useState } from "react"
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react"
import { ArrowUp } from "lucide-react"

/** how far down (px) before the button shows: hidden only at the very top of the page */
const SHOW_AFTER = 200

// three arcs of a little cyclone (r = 19 around the centre of a 56 x 56 box), each fainter than the last
const SWIRL = [
  { d: "M28 9 A19 19 0 0 1 46.71 24.7", o: 1 },
  { d: "M44.45 37.5 A19 19 0 0 1 21.5 45.85", o: 0.6 },
  { d: "M11.55 37.5 A19 19 0 0 1 15.79 13.45", o: 0.3 },
]

/*
 * "Cyclone" back-to-top button, in every section (hidden only at the very top).
 * - the green ring fills up as you go down the page (how far you are)
 * - the amber swirl spins as you scroll, and unwinds on the way back up
 * - click: the arrow shoots up out of the button and the page glides back to the hero
 * Phones: above the floating WhatsApp button. Tablet and up: bottom-right corner.
 */
export function BackToTop() {
  const [show, setShow] = useState(false)
  const reduce = useReducedMotion() ?? false
  const { scrollY, scrollYProgress } = useScroll()
  const spin = useTransform(scrollY, (y) => (reduce ? 0 : y * 0.35))
  const arrowY = useMotionValue(0)
  const arrowOpacity = useMotionValue(1)

  // a page reload can open halfway down: check once on load, then on every scroll
  useEffect(() => setShow(window.scrollY > SHOW_AFTER), [])
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > SHOW_AFTER))

  const goTop = async (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" })
    // keyboard users continue from the top of the page (the logo link)
    document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true })
    if (reduce) return
    // launch: the arrow flies out of the top, then a new one rises from the bottom
    await Promise.all([
      animate(arrowY, -34, { duration: 0.28, ease: [0.5, 0, 0.9, 0.5] }),
      animate(arrowOpacity, 0, { duration: 0.28 }),
    ])
    arrowY.set(30)
    animate(arrowY, 0, { type: "spring", stiffness: 320, damping: 22 })
    animate(arrowOpacity, 1, { duration: 0.2 })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          key="back-to-top"
          href="#top"
          onClick={goTop}
          aria-label="Back to top"
          title="Back to top"
          initial={{ opacity: 0, scale: 0.4, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.4, rotate: 90 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          // bottom-36 on phones: sits above the WhatsApp button (bottom-20); bottom-20 from tablet up: above Netlify's badge
          className="group fixed right-4 bottom-36 z-40 grid size-14 place-items-center overflow-hidden rounded-full bg-gc-ink text-gc-paper shadow-[3px_3px_0_var(--gc-green)] transition-[translate,box-shadow] hover:-translate-y-1 hover:shadow-[3px_6px_0_var(--gc-green)] focus-visible:ring-2 focus-visible:ring-gc-amber focus-visible:ring-offset-2 focus-visible:ring-offset-gc-paper focus-visible:outline-none md:right-6 md:bottom-20"
        >
          <svg viewBox="0 0 56 56" aria-hidden className="pointer-events-none absolute inset-0 size-full">
            {/* progress: how far down the page you are */}
            <circle cx="28" cy="28" r="25.5" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="2.5" />
            <motion.circle
              cx="28"
              cy="28"
              r="25.5"
              fill="none"
              stroke="var(--gc-green)"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform="rotate(-90 28 28)"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          {/* the cyclone: spins with the page */}
          <motion.svg viewBox="0 0 56 56" aria-hidden className="pointer-events-none absolute inset-0 size-full" style={{ rotate: spin }}>
            {SWIRL.map((a) => (
              <path key={a.d} d={a.d} fill="none" stroke="var(--gc-amber)" strokeWidth="2" strokeLinecap="round" strokeOpacity={a.o} />
            ))}
          </motion.svg>
          <motion.span className="relative" style={{ y: arrowY, opacity: arrowOpacity }}>
            <ArrowUp aria-hidden strokeWidth={2.5} className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </motion.span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
