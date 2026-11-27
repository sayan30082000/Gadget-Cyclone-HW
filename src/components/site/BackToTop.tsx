import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUp } from "lucide-react"

/*
 * Back to the hero. Shows once the hero has scrolled out of view.
 * Phones: an arrow above the floating WhatsApp button. Tablet and up: "↑ Top" in the bottom-right corner.
 */
export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("top")
    if (!hero) return
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0.1 })
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  const goTop = (e: React.MouseEvent) => {
    e.preventDefault()
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" })
    // keyboard users continue from the top of the page (the logo link)
    document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true })
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
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          // bottom-36 on phones: sits above the WhatsApp button (bottom-20); bottom-20 from tablet up: above Netlify's badge
          className="group fixed right-4 bottom-36 z-40 inline-flex size-12 items-center justify-center gap-2 border-2 border-gc-ink bg-gc-card text-gc-ink shadow-[3px_3px_0_var(--gc-green)] transition-[translate,box-shadow] hover:-translate-y-0.5 hover:shadow-[3px_5px_0_var(--gc-green)] focus-visible:ring-2 focus-visible:ring-gc-green focus-visible:ring-offset-2 focus-visible:outline-none md:right-6 md:bottom-20 md:w-auto md:px-4"
        >
          <ArrowUp aria-hidden className="size-5 transition-transform group-hover:-translate-y-0.5" />
          <span className="hidden font-mono text-[12px] font-bold tracking-wider uppercase md:inline">Top</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
