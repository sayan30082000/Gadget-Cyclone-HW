import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { MessageCircle } from "lucide-react"

import { whatsappLink } from "@/data/site"

/*
 * Round 6: on phones most orders start on WhatsApp, so a floating button follows you down the page.
 * It shows after the hero, and hides where the page already has its own order buttons
 * (the kit box with its sticky bar, and the Visit section).
 */
export function FloatingOrder() {
  const [pastHero, setPastHero] = useState(false)
  const [nearOwnCta, setNearOwnCta] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("top")
    const busy = ["kits", "visit"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const seen = new Set<Element>()

    const heroIo = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { threshold: 0.1 })
    if (hero) heroIo.observe(hero)

    const ctaIo = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) seen.add(e.target)
        else seen.delete(e.target)
      }
      setNearOwnCta(seen.size > 0)
    })
    busy.forEach((el) => ctaIo.observe(el))

    return () => {
      heroIo.disconnect()
      ctaIo.disconnect()
    }
  }, [])

  const show = pastHero && !nearOwnCta

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          key="float"
          href={whatsappLink("Hi Gadget Cyclone! My phone is: ")}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="fixed right-4 bottom-4 z-40 inline-flex h-12 items-center gap-2 bg-gc-green px-4 font-mono text-[12px] font-bold tracking-wider text-gc-ongreen uppercase shadow-[3px_3px_0_var(--gc-ink)] md:hidden"
        >
          <MessageCircle className="size-5" /> WhatsApp
        </motion.a>
      )}
    </AnimatePresence>
  )
}
