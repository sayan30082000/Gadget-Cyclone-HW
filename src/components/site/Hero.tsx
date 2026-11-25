import { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"
import { ArrowDown, Check, MapPin } from "lucide-react"

import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { WordRotate } from "@/components/ui/word-rotate"
import { HERO_PRODUCTS, heroSrcSet, sized, whatsappLink } from "@/data/site"

const STEP_MS = 2800
const WORDS = HERO_PRODUCTS.map((p) => p.word)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // one counter drives both the headline word and the product photo
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const holdUntil = useRef(0)

  useEffect(() => {
    if (paused || reduce) return
    const wait = Math.max(STEP_MS, holdUntil.current - Date.now())
    const t = window.setTimeout(() => setActive((i) => (i + 1) % HERO_PRODUCTS.length), wait)
    return () => window.clearTimeout(t)
  }, [active, paused, reduce])

  // warm only the next photo (the old version downloaded all six big photos at once)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  useEffect(() => {
    const next = HERO_PRODUCTS[(active + 1) % HERO_PRODUCTS.length]
    const img = new Image()
    img.sizes = "(min-width: 1024px) 45vw, 100vw"
    img.srcset = heroSrcSet(next.photo)
  }, [active])

  const pick = (i: number) => {
    holdUntil.current = Date.now() + 8000 // a tapped product stays a bit longer
    setActive(i)
  }

  // cursor glow: follows the pointer (mouse or finger) across the hero
  const gx = useMotionValue(-600)
  const gy = useMotionValue(-600)
  const sx = useSpring(gx, { stiffness: 120, damping: 20, mass: 0.6 })
  const sy = useSpring(gy, { stiffness: 120, damping: 20, mass: 0.6 })
  const glow = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, color-mix(in srgb, var(--gc-green) 16%, transparent), transparent 65%)`

  // start the glow behind the photo, so touch screens see it before anyone taps
  useEffect(() => {
    const r = sectionRef.current?.getBoundingClientRect()
    if (!r) return
    // phones/tablets: the photo is at the top, desktop: on the right
    gx.set(r.width * (r.width < 1024 ? 0.5 : 0.72))
    gy.set(r.height * (r.width < 1024 ? 0.22 : 0.45))
  }, [gx, gy])

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = sectionRef.current?.getBoundingClientRect()
    if (!r) return
    gx.set(e.clientX - r.left)
    gy.set(e.clientY - r.top)
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      onPointerMove={onMove}
      onPointerDown={onMove}
      className="relative overflow-hidden border-b border-gc-line"
    >
      {/* Interactive background: Magic UI Interactive Grid Pattern */}
      <InteractiveGridPattern
        cell={44}
        className="[mask-image:radial-gradient(ellipse_at_center,white_35%,transparent_85%)]"
        trackRef={sectionRef}
        autoGlow
      />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />

      <div className="pointer-events-none relative z-10 mx-auto grid max-w-[1400px] gap-8 px-5 pt-6 pb-16 sm:px-8 sm:pt-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12 lg:px-12 lg:pt-20 lg:pb-24">
        <div>
            <p className="inline-flex items-center gap-2 border border-gc-line bg-gc-paper/70 px-3 py-1.5 font-mono text-[12px] tracking-[0.14em] text-gc-muted uppercase">
              <MapPin className="size-3.5 text-gc-green" /> Finlay Square · 4th floor · Chattogram
            </p>

            <h1 className="mt-6 font-serif text-[44px] leading-[1.02] text-gc-ink sm:text-[60px] lg:text-[62px] xl:text-[74px]">
              <WordRotate words={WORDS} index={active} className="text-gc-green italic" />
              for the phone you{" "}
              <strong className="font-mono font-bold tracking-tight text-gc-ink">ALREADY</strong> own.
            </h1>

            <p className="mt-6 max-w-xl font-sans text-[16px] leading-7 text-gc-muted sm:text-[17px]">
              Earbuds, chargers, power banks, covers, watches and speakers, picked for your exact phone model.
              Delivered across Chattogram, and you pay the rider when it arrives.
            </p>

            <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
              <a
                href={whatsappLink(`Hi Gadget Cyclone! I'm looking for ${WORDS[active].toLowerCase()}. My phone is: `)}
                target="_blank"
                rel="noreferrer"
              >
                <ShimmerButton
                  background="var(--gc-green)"
                  shimmerColor="#ffffff"
                  borderRadius="0px"
                  className="h-12 px-6 font-mono text-[13px] font-bold tracking-wider text-gc-ongreen uppercase"
                >
                  ■ Order on WhatsApp
                </ShimmerButton>
              </a>
              <a
                href="#kits"
                className="inline-flex h-12 items-center gap-2 border border-gc-line bg-gc-paper/70 px-5 font-mono text-[13px] tracking-wider text-gc-ink uppercase transition-colors hover:border-gc-green hover:text-gc-ink"
              >
                See the kits <ArrowDown className="size-4" />
              </a>
            </div>

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] text-gc-muted">
              {["No advance", "Pay the rider", "7-day replacement"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 text-gc-green" /> {t}
                </li>
              ))}
            </ul>
        </div>

        {/* photo first on phones and tablets (the headline stays first in the page code for screen readers and Google) */}
        <div className="pointer-events-auto order-first lg:order-none">
          <div onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)} onPointerLeave={() => setPaused(false)}>
            <TiltPhoto reduce={!!reduce} active={active} />

            {/* product strip: tap to jump, the active one shows time left */}
            <div className="mt-3 grid grid-cols-6 gap-2" role="tablist" aria-label="Products">
              {HERO_PRODUCTS.map((p, i) => {
                const on = i === active
                return (
                  <button
                    key={p.word}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-label={p.word}
                    onClick={() => pick(i)}
                    className={`group relative aspect-square overflow-hidden border-2 transition-colors ${
                      on ? "border-gc-green" : "border-transparent hover:border-gc-line"
                    }`}
                  >
                    <img
                      src={sized(p.photo, 160)}
                      loading="lazy"
                      width={80}
                      height={80}
                      alt=""
                      className={`size-full object-cover transition duration-300 ${on ? "" : "opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0"}`}
                    />
                    {mounted && on && !paused && !reduce && (
                      <motion.span
                        key={`bar-${active}`}
                        className="absolute bottom-0 left-0 h-1 bg-gc-green"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: Math.max(STEP_MS, holdUntil.current - Date.now()) / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[12px] text-gc-muted">
              <span className="hidden sm:inline">{paused ? "paused" : "tap a product"}</span>
              <span>photo: {HERO_PRODUCTS[active].credit} / Unsplash</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TiltPhoto({ reduce, active }: { reduce: boolean; active: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 150, damping: 18 })
  const p = HERO_PRODUCTS[active]

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div className="[perspective:1200px]">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/3] w-full overflow-hidden border border-gc-line bg-gc-card"
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={p.photo}
            src={sized(p.photo, 960)}
            srcSet={heroSrcSet(p.photo)}
            sizes="(min-width: 1024px) 45vw, 100vw"
            fetchPriority={active === 0 ? "high" : "auto"}
            alt={p.alt}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.7, ease: "easeOut" }}
            className="absolute inset-0 size-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        <FloatChip className="top-5 left-5" delay={0}>
          <span className="text-gc-green">■</span> COD · Chattogram
        </FloatChip>
        <FloatChip className="top-1/2 right-4 hidden sm:block" delay={0.8}>
          Tk 0 advance
        </FloatChip>
        <FloatChip className="bottom-5 left-5 max-w-[calc(100%-2.5rem)]" delay={1.6}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={p.word}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="block"
            >
              {p.word}: <span className="text-gc-green">{p.note}</span>
            </motion.span>
          </AnimatePresence>
        </FloatChip>
      </motion.div>
    </div>
  )
}

function FloatChip({
  children,
  className,
  delay,
}: {
  children: React.ReactNode
  className?: string
  delay: number
}) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay }}
      style={{ translateZ: 40 }}
      className={`absolute border border-gc-line bg-gc-card/90 px-3 py-2 font-mono text-[12px] tracking-wide text-gc-ink uppercase backdrop-blur ${className ?? ""}`}
    >
      {children}
    </motion.div>
  )
}
