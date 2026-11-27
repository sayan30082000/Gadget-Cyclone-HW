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
import { HERO_PRODUCTS, heroImg, heroSrcSet, whatsappLink } from "@/data/site"

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
    img.srcset = heroSrcSet(next.cutout)
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
                    className={`group relative aspect-square overflow-hidden border-2 bg-gc-card/70 transition-colors ${
                      on ? "border-gc-green" : "border-gc-line/60 hover:border-gc-line"
                    }`}
                  >
                    {/* small spotlight behind the cut-out */}
                    <span
                      aria-hidden
                      className={`absolute inset-0 bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--gc-green)_22%,transparent),transparent)] transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    />
                    <img
                      src={heroImg(p.cutout, 160)}
                      loading="lazy"
                      width={80}
                      height={80}
                      alt=""
                      className={`relative size-full object-contain p-1.5 transition duration-300 ${on ? "scale-105" : "opacity-75 group-hover:scale-105 group-hover:opacity-100"}`}
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
        // see-through stage: the hero grid shows behind, the cut-out product floats in a soft spotlight
        className="relative aspect-[4/3] w-full overflow-hidden border border-gc-line bg-gc-card/45"
      >
        {/* backdrop that stays still: a shaded green disc with two rings, so the floating product's
            movement (and the 3D tilt) reads clearly against it */}
        <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="relative aspect-square h-[84%] -translate-y-[3%]">
            {/* light mode needs a deeper shade than dark mode to show up */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_40%,color-mix(in_srgb,var(--gc-green)_52%,var(--gc-card))_0%,color-mix(in_srgb,var(--gc-green)_30%,var(--gc-card))_44%,transparent_71%)] dark:bg-[radial-gradient(circle_at_50%_40%,color-mix(in_srgb,var(--gc-green)_36%,var(--gc-card))_0%,color-mix(in_srgb,var(--gc-green)_18%,var(--gc-card))_46%,transparent_71%)]" />
            <div className="absolute inset-[10%] rounded-full border border-gc-green/35 dark:border-gc-green/25" />
            <div className="absolute inset-[2%] rounded-full border border-dashed border-gc-green/45 motion-safe:animate-[spin_60s_linear_infinite] dark:border-gc-green/35" />
          </div>
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(closest-side_at_68%_26%,color-mix(in_srgb,var(--gc-amber)_14%,transparent),transparent)]"
        />
        {/* floor shadow: shrinks and fades while the product floats up, grows back when it comes down */}
        <motion.div
          aria-hidden
          animate={reduce ? undefined : { scaleX: [1, 0.78, 1], opacity: [1, 0.55, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[11%] left-[28%] h-[7%] w-[44%] rounded-[50%] bg-black/35 blur-lg dark:bg-black/80"
        />
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          // in front of the stage, behind the chips (40)
          style={{ translateZ: 28 }}
        >
          {/* wait: the old product leaves before the new one rises in (cut-outs must not overlap) */}
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={p.cutout}
              src={heroImg(p.cutout, 960)}
              srcSet={heroSrcSet(p.cutout)}
              sizes="(min-width: 1024px) 36vw, 80vw"
              fetchPriority={active === 0 ? "high" : "auto"}
              alt={p.alt}
              initial={{ opacity: 0, y: 46, scale: 0.86, rotate: -7 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: -34, scale: 0.94, rotate: 5, transition: { duration: reduce ? 0 : 0.22, ease: "easeIn" } }}
              transition={{ duration: reduce ? 0 : 0.65, ease: [0.2, 0.8, 0.2, 1] }}
              // phones: a bit smaller and lower, so the top and bottom chips don't cover the product
              className="absolute inset-x-[12%] top-[17%] h-[58%] w-[76%] object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.28)] sm:top-[10%] sm:h-[70%]"
            />
          </AnimatePresence>
        </motion.div>

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
