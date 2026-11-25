import { useCallback, useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { AnimatePresence, animate, motion, useAnimate, useMotionValue, useReducedMotion, useTransform } from "motion/react"

/*
 * Round 5: theme switch as a pull-cord light bulb.
 * Light ON = light mode, light OFF = dark mode. Pull the cord down (drag), click or press Enter/Space.
 * The new theme spreads from the bulb as a circle (idea from Magic UI's Animated Theme Toggler).
 */

const CORD = 30 // px of cord before the bulb
const PULL_TO_SWITCH = 16 // px of pull that counts as a pull

function useIsDark() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"))
  useEffect(() => {
    const root = document.documentElement
    const sync = () => setDark(root.classList.contains("dark"))
    const mo = new MutationObserver(sync)
    mo.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => mo.disconnect()
  }, [])
  return dark
}

export function ThemeLamp({ className = "" }: { className?: string }) {
  const dark = useIsDark()
  const on = !dark
  const reduce = useReducedMotion()
  const bulbRef = useRef<HTMLButtonElement>(null)
  const [swing, animateSwing] = useAnimate()
  const busy = useRef(false)
  const running = useRef<ViewTransition | null>(null)
  const dragged = useRef(false)

  const y = useMotionValue(0)
  const cordHeight = useTransform(y, (v) => CORD + Math.max(0, v))

  const flip = useCallback(() => {
    const root = document.documentElement
    const apply = () => {
      const next = !root.classList.contains("dark")
      root.classList.toggle("dark", next)
      try {
        localStorage.setItem("theme", next ? "dark" : "light")
      } catch {
        /* private mode: still switches, just not remembered */
      }
    }

    if (!reduce && swing.current) {
      animateSwing(swing.current, { rotate: [0, 10, -7, 4, -2, 0] }, { duration: 1.2, ease: "easeOut" })
    }

    // fixed after testing: a fast second pull used to be ignored while the first reveal was still running.
    // Now it ends the running reveal and switches straight away.
    if (busy.current) {
      running.current?.skipTransition()
      apply()
      return
    }

    if (reduce || typeof document.startViewTransition !== "function" || !bulbRef.current) {
      apply()
      return
    }

    // circle reveal from the bulb (percent units: px clip paths misplace on scaled Windows displays)
    const r = bulbRef.current.getBoundingClientRect()
    const w = window.innerWidth
    const h = window.innerHeight
    const x = r.left + r.width / 2
    const yc = r.top + r.height / 2
    const maxR = Math.hypot(Math.max(x, w - x), Math.max(yc, h - yc))
    const pct = (v: number, of: number) => `${(v / of) * 100}%`
    const radius = (v: number) => `${(v / (Math.hypot(w, h) / Math.SQRT2)) * 100}%`
    const at = `${pct(x, w)} ${pct(yc, h)}`

    busy.current = true
    const t = document.startViewTransition(() => flushSync(apply))
    running.current = t
    t.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0% at ${at})`, `circle(${radius(maxR)} at ${at})`] },
          { duration: 650, easing: "ease-in-out", fill: "forwards", pseudoElement: "::view-transition-new(root)" }
        )
      })
      .catch(() => {})
    t.finished
      .finally(() => {
        busy.current = false
        running.current = null
      })
      .catch(() => {})
  }, [reduce, swing, animateSwing])

  return (
    <div className={`relative h-16 w-9 shrink-0 ${className}`}>
      {/* ceiling mount */}
      <span aria-hidden className="absolute top-0 left-1/2 h-1 w-3 -translate-x-1/2 bg-gc-muted" />

      <motion.div ref={swing} style={{ originY: 0 }} className="absolute top-0 left-1/2 -ml-[14px] w-7">
        {/* cord grows while you pull */}
        <motion.span aria-hidden style={{ height: cordHeight }} className="absolute top-0 left-1/2 block w-px -translate-x-1/2 bg-gc-muted" />

        <motion.button
          ref={bulbRef}
          type="button"
          role="switch"
          aria-checked={on}
          aria-label={on ? "Light is on (light mode). Pull to switch it off" : "Light is off (dark mode). Pull to switch it on"}
          title={on ? "Pull the cord: lights off" : "Pull the cord: lights on"}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.9 }}
          dragSnapToOrigin
          onDragStart={() => (dragged.current = true)}
          onDragEnd={(_, info) => {
            if (info.offset.y > PULL_TO_SWITCH) flip()
            window.setTimeout(() => (dragged.current = false), 0)
          }}
          onClick={() => {
            if (dragged.current) return
            // a click still looks like a little tug on the cord
            if (!reduce) animate(y, [0, 14, 0], { duration: 0.45, ease: "easeOut" })
            flip()
          }}
          style={{ y, top: CORD }}
          className="absolute left-0 grid w-7 cursor-grab touch-none place-items-center outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-gc-green"
        >
          {/* glow */}
          <AnimatePresence>
            {on && (
              <motion.span
                key="glow"
                aria-hidden
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.35 }}
                className="pointer-events-none absolute top-[-6px] left-1/2 size-12 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,184,0,0.55),rgba(255,184,0,0)_70%)]"
              />
            )}
          </AnimatePresence>

          <svg viewBox="0 0 28 36" className="relative h-9 w-7" aria-hidden>
            {/* rays when on */}
            <g
              stroke="#ffb800"
              strokeWidth="1.6"
              strokeLinecap="round"
              style={{ opacity: on ? 1 : 0, transition: "opacity .3s" }}
            >
              <line x1="1" y1="6" x2="3.5" y2="7.5" />
              <line x1="27" y1="6" x2="24.5" y2="7.5" />
              <line x1="0.5" y1="14" x2="3" y2="14" />
              <line x1="27.5" y1="14" x2="25" y2="14" />
            </g>
            {/* glass */}
            <path
              d="M14 2.5a9 9 0 0 0-5.2 16.4c.9.7 1.4 1.7 1.4 2.8V23h7.6v-1.3c0-1.1.5-2.1 1.4-2.8A9 9 0 0 0 14 2.5z"
              style={{
                fill: on ? "#ffb800" : "var(--gc-card)",
                stroke: on ? "#b37f00" : "var(--gc-muted)",
                transition: "fill .3s, stroke .3s",
              }}
              strokeWidth="1.4"
            />
            {/* filament */}
            <path
              d="M11.5 16.5l1.2-4 1.3 3 1.3-3 1.2 4"
              fill="none"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ stroke: on ? "#7a4f00" : "var(--gc-muted)", transition: "stroke .3s" }}
            />
            {/* screw base */}
            <rect x="10" y="23.5" width="8" height="6.5" rx="1" style={{ fill: "var(--gc-muted)" }} />
            <line x1="10" y1="25.7" x2="18" y2="25.7" stroke="var(--gc-card)" strokeWidth="0.8" />
            <line x1="10" y1="27.9" x2="18" y2="27.9" stroke="var(--gc-card)" strokeWidth="0.8" />
            <rect x="12" y="30" width="4" height="2.2" rx="0.8" style={{ fill: "var(--gc-ink)" }} />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  )
}
