import { useEffect, useState } from "react"
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react"
import { Menu, X } from "lucide-react"

import { Marquee } from "@/components/ui/marquee"
import { ThemeLamp } from "@/components/site/ThemeLamp"
import { TICKER, whatsappLink } from "@/data/site"

const NAV = [
  { href: "#why", label: "Why us" },
  { href: "#shop", label: "Shop" },
  { href: "#kits", label: "Kits" },
  { href: "#visit", label: "Visit" },
]

export function Header() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* scroll progress */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gc-green"
        style={{ scaleX: progress }}
      />

      {/* ticker: Magic UI Marquee */}
      <div className="bg-gc-green">
        <Marquee pauseOnHover className="py-2 [--duration:38s] [--gap:2.5rem]">
          {TICKER.map((t) => (
            <span key={t} className="font-mono text-[11px] tracking-[0.12em] text-gc-ongreen uppercase">
              <span className="mr-2 text-gc-amber">■</span>
              {t}
            </span>
          ))}
        </Marquee>
      </div>

      <header
        className={`sticky top-0 z-50 border-b border-gc-line transition-colors duration-300 ${
          scrolled ? "bg-gc-paper/85 backdrop-blur-md" : "bg-gc-paper"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" className="font-serif text-[26px] leading-none text-gc-green">
            Gadget Cyclone
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="group relative font-mono text-[12px] tracking-[0.14em] text-gc-muted uppercase transition-colors hover:text-gc-ink"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gc-green transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href={whatsappLink("Hi Gadget Cyclone! My phone is: ")}
              target="_blank"
              rel="noreferrer"
              className="bg-gc-green px-4 py-2 font-mono text-[12px] font-bold tracking-[0.12em] text-gc-ongreen uppercase transition-transform hover:-translate-y-0.5"
            >
              ■ Order now
            </a>
            <ThemeLamp />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeLamp />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center border border-gc-line text-gc-ink"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-gc-line md:hidden"
            >
              <div className="flex flex-col px-5 py-3">
                {NAV.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-gc-line py-3 font-mono text-[13px] tracking-[0.14em] text-gc-ink uppercase last:border-none"
                  >
                    {n.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
