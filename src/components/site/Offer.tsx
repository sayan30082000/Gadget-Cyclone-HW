import { Fragment, useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { BlurFade } from "@/components/ui/blur-fade"
import { wrap } from "@/components/site/Sections"
import { KIT_DEAL, OFFER, sized } from "@/data/site"

const UNITS = ["Days", "Hours", "Minutes", "Seconds"] as const
const pad = (n: number) => String(n).padStart(2, "0")

/** milliseconds left -> [days, hours, minutes, seconds] */
function split(ms: number) {
  const s = Math.floor(ms / 1000)
  return [Math.floor(s / 86400), Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60]
}

/* ---------- offer countdown (the kit deal, until OFFER.endsAt) ---------- */

export function Offer() {
  const end = OFFER.endsAt ? Date.parse(OFFER.endsAt) : Number.NaN
  const [ended, setEnded] = useState(false)
  const finish = useCallback(() => setEnded(true), [])

  // off, a bad date, or already over: no section at all
  if (Number.isNaN(end) || ended) return null

  const off = Math.round(KIT_DEAL.off * 100)

  return (
    <section id="offer" aria-labelledby="offer-title" className="scroll-mt-16 border-b border-gc-line">
      <div className={`${wrap} py-12 lg:py-20`}>
        <BlurFade inView>
          <div className="relative isolate overflow-hidden rounded-[28px] bg-[#050505] text-white ring-1 ring-white/10 lg:grid lg:min-h-[480px] lg:grid-cols-[1.15fr_1fr]">
            {/* photo: on top on phones, on the right from laptop size, fading into the black */}
            <div className="relative h-[290px] sm:h-[360px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[47%]">
              <img
                src={sized(OFFER.photo, 960)}
                srcSet={[480, 720, 960, 1280].map((w) => `${sized(OFFER.photo, w)} ${w}w`).join(", ")}
                sizes="(min-width: 1024px) 47vw, 100vw"
                alt={OFFER.alt}
                loading="lazy"
                decoding="async"
                className="size-full object-cover object-[50%_22%] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] lg:[mask-image:linear-gradient(to_right,transparent,black_40%)]"
              />
              <Burst off={off} />
            </div>

            <div className="relative -mt-14 px-6 pb-8 sm:-mt-20 sm:px-10 sm:pb-10 lg:mt-0 lg:px-14 lg:py-14">
              <span className="inline-block bg-gc-amber px-2.5 py-1.5 font-mono text-[12px] font-bold tracking-[0.14em] text-gc-onamber uppercase">
                ■ Kit deal
              </span>
              <h2 id="offer-title" className="mt-5 font-serif text-[42px] leading-[1.02] sm:text-[56px] lg:text-[52px] xl:text-[64px]">
                Pack {KIT_DEAL.minItems}, save <strong className="font-mono font-bold tracking-tight">{off}%</strong>
              </h2>
              <p className="mt-3 font-serif text-[20px] text-white/60 italic sm:text-[22px]">The deal ends in</p>

              <Countdown end={end} onEnd={finish} />

              <a
                href="#kits"
                className="group mt-9 flex h-14 w-full max-w-[460px] items-center justify-between rounded-full bg-white/[0.08] pr-2 pl-6 ring-1 ring-white/15 transition-colors hover:bg-white/[0.14] focus-visible:ring-2 focus-visible:ring-gc-amber focus-visible:outline-none"
              >
                <span className="font-mono text-[13px] font-bold tracking-wider uppercase">Pack your box</span>
                <span className="grid size-10 place-items-center rounded-full bg-gc-amber text-gc-onamber transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </a>
              <p className="mt-4 max-w-[460px] font-sans text-[13px] leading-5 text-white/55">
                Put any {KIT_DEAL.minItems} or more items in the box below and {off}% comes off the total. Ends{" "}
                {OFFER.endsLabel}, Bangladesh time.
              </p>
            </div>
          </div>
        </BlurFade>
        <p className="mt-3 text-right font-sans text-[12px] text-gc-muted">Photo: {OFFER.credit} / Unsplash</p>
      </div>
    </section>
  )
}

function Countdown({ end, onEnd }: { end: number; onEnd: () => void }) {
  // null until the page runs in the browser, so the pre-rendered HTML never shows a wrong time
  const [left, setLeft] = useState<number | null>(null)
  const reduce = useReducedMotion() ?? false

  useEffect(() => {
    const tick = () => {
      const l = end - Date.now()
      if (l <= 0) onEnd()
      else setLeft(l)
    }
    tick()
    const t = window.setInterval(tick, 1000)
    return () => window.clearInterval(t)
  }, [end, onEnd])

  const parts = left === null ? null : split(left)

  return (
    <div className="mt-5">
      <p className="sr-only">The deal ends {OFFER.endsLabel}, Bangladesh time.</p>
      <div aria-hidden className="flex items-start gap-1.5 sm:gap-4 lg:gap-2.5 xl:gap-4">
        {UNITS.map((unit, i) => (
          <Fragment key={unit}>
            {i > 0 && (
              <span className="font-mono text-[36px] leading-none font-bold text-white/35 sm:text-[58px] lg:text-[50px] xl:text-[66px]">:</span>
            )}
            <div className="flex flex-col items-center">
              <span className="relative inline-block h-[1.02em] min-w-[2ch] overflow-hidden text-center font-mono text-[36px] leading-none font-bold tabular-nums sm:text-[58px] lg:text-[50px] xl:text-[66px]">
                {parts ? <Digits value={pad(parts[i])} reduce={reduce} /> : "--"}
              </span>
              <span className="mt-2 font-serif text-[14px] text-white/60 italic sm:text-[17px]">{unit}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

/** the new number slides down into place, the old one slides out */
function Digits({ value, reduce }: { value: string; reduce: boolean }) {
  if (reduce) return <>{value}</>
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        className="block"
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  )
}

// 16-point starburst, rounded so the server and the browser draw the same numbers
const BURST = Array.from({ length: 32 }, (_, i) => {
  const r = i % 2 ? 41 : 50
  const a = (i / 32) * Math.PI * 2
  return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`
}).join(" ")

function Burst({ off }: { off: number }) {
  return (
    <div className="absolute top-5 right-5 size-[104px] -rotate-12 sm:size-[124px] lg:top-12 lg:right-auto lg:left-[4%] lg:size-[140px]">
      <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 size-full fill-gc-amber motion-safe:animate-[spin_36s_linear_infinite]">
        <polygon points={BURST} />
      </svg>
      <span className="relative grid size-full place-items-center text-center font-mono leading-none font-bold text-gc-onamber">
        <span>
          <span className="block text-[28px] sm:text-[34px] lg:text-[38px]">{off}%</span>
          <span className="mt-1 block text-[12px] tracking-[0.22em] uppercase sm:text-[13px]">off</span>
        </span>
      </span>
    </div>
  )
}
