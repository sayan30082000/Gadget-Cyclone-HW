import { useEffect, useRef } from "react"
import {
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
import { BlurFade } from "@/components/ui/blur-fade"
import { ROTATING_WORDS, whatsappLink } from "@/data/site"

const HERO_PHOTO =
  "https://images.unsplash.com/photo-1657532350710-d0becd0c680d?w=1400&q=80&auto=format&fit=crop"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // cursor glow: follows the pointer (mouse or finger) across the hero
  const gx = useMotionValue(-600)
  const gy = useMotionValue(-600)
  const sx = useSpring(gx, { stiffness: 120, damping: 20, mass: 0.6 })
  const sy = useSpring(gy, { stiffness: 120, damping: 20, mass: 0.6 })
  const glow = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(234,74,26,0.22), transparent 65%)`

  // start the glow behind the photo, so touch screens see it before anyone taps
  useEffect(() => {
    const r = sectionRef.current?.getBoundingClientRect()
    if (!r) return
    gx.set(r.width * (r.width < 1024 ? 0.5 : 0.72))
    gy.set(r.height * (r.width < 1024 ? 0.75 : 0.45))
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
        width={44}
        height={44}
        squares={[40, 22]}
        className="border-none [mask-image:radial-gradient(ellipse_at_center,white_35%,transparent_85%)]"
        squaresClassName="stroke-gc-line/70 hover:fill-gc-orange/45 data-[on]:fill-gc-orange/35"
        trackRef={sectionRef}
        autoGlow
      />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />

      <div className="pointer-events-none relative z-10 mx-auto grid max-w-[1400px] gap-10 px-5 pt-14 pb-16 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12 lg:px-12 lg:pt-20 lg:pb-24">
        <div>
          <BlurFade delay={0.05}>
            <p className="inline-flex items-center gap-2 border border-gc-line bg-gc-black/70 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-gc-grey uppercase">
              <MapPin className="size-3.5 text-gc-orange" /> Finlay Square · 4th floor · Chattogram
            </p>
          </BlurFade>

          <BlurFade delay={0.15}>
            <h1 className="mt-6 font-serif text-[44px] leading-[1.02] text-gc-light sm:text-[60px] lg:text-[62px] xl:text-[74px]">
              <WordRotate
                words={ROTATING_WORDS}
                duration={2200}
                className="text-gc-orange italic"
              />
              for the phone you{" "}
              <strong className="font-mono font-bold tracking-tight text-white">ALREADY</strong> own.
            </h1>
          </BlurFade>

          <BlurFade delay={0.25}>
            <p className="mt-6 max-w-xl font-mono text-[14px] leading-7 text-gc-grey sm:text-[15px]">
              Earbuds, chargers, power banks and covers, picked for your exact phone model.
              Delivered across Chattogram, and you pay the rider when it arrives.
            </p>
          </BlurFade>

          <BlurFade delay={0.35}>
            <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
              <a href={whatsappLink("Hi Gadget Cyclone! My phone is: ")} target="_blank" rel="noreferrer">
                <ShimmerButton
                  background="#ea4a1a"
                  shimmerColor="#ffffff"
                  borderRadius="0px"
                  className="h-12 px-6 font-mono text-[13px] font-bold tracking-wider text-gc-black uppercase"
                >
                  ■ Order on WhatsApp
                </ShimmerButton>
              </a>
              <a
                href="#kits"
                className="inline-flex h-12 items-center gap-2 border border-gc-line bg-gc-black/70 px-5 font-mono text-[13px] tracking-wider text-gc-light uppercase transition-colors hover:border-gc-orange hover:text-white"
              >
                See the kits <ArrowDown className="size-4" />
              </a>
            </div>
          </BlurFade>

          <BlurFade delay={0.45}>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] text-gc-grey">
              {["No advance", "Pay the rider", "7-day replacement"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 text-gc-orange" /> {t}
                </li>
              ))}
            </ul>
          </BlurFade>
        </div>

        <BlurFade delay={0.3} className="pointer-events-auto">
          <TiltPhoto reduce={!!reduce} />
        </BlurFade>
      </div>
    </section>
  )
}

function TiltPhoto({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 150, damping: 18 })

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
        className="relative aspect-[4/3] w-full border border-gc-line bg-gc-strip"
      >
        <img
          src={HERO_PHOTO}
          alt="A hand holding white wireless earbuds in their case"
          className="absolute inset-0 size-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gc-black/70 via-transparent to-transparent" />

        <FloatChip className="top-5 left-5" delay={0}>
          <span className="text-gc-orange">■</span> COD · Chattogram
        </FloatChip>
        <FloatChip className="top-1/2 right-4" delay={0.8}>
          Tk 0 advance
        </FloatChip>
        <FloatChip className="bottom-5 left-5" delay={1.6}>
          Fit-checked for <span className="text-white">your model</span>
        </FloatChip>
      </motion.div>
      <p className="mt-2 text-right font-mono text-[10px] text-gc-grey/80">
        photo: Klim Musalimov / Unsplash
      </p>
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
      className={`absolute border border-gc-line bg-gc-black/85 px-3 py-2 font-mono text-[11px] tracking-wide text-gc-light uppercase backdrop-blur ${className ?? ""}`}
    >
      {children}
    </motion.div>
  )
}
