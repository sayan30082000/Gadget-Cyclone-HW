import { useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react"
import {
  Bike,
  Check,
  ChevronDown,
  MapPin,
  MessageCircle,
  RotateCcw,
  Smartphone,
  Store,
} from "lucide-react"

import { BlurFade } from "@/components/ui/blur-fade"
import { MagicCard } from "@/components/ui/magic-card"
import { Marquee } from "@/components/ui/marquee"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import {
  ASKS,
  BRANDS,
  FAQS,
  PHONE_MODELS,
  SITE,
  STEPS,
  whatsappLink,
} from "@/data/site"

/* ---------- shared bits ---------- */

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z" />
    </svg>
  )
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-gc-line px-2.5 py-1.5 font-mono text-[11px] font-bold tracking-[0.14em] text-gc-ink uppercase">
      ■ {children}
    </span>
  )
}

export function SectionHead({
  label,
  title,
  bold,
  after,
  sub,
}: {
  label: string
  title: string
  bold: string
  after?: string
  sub?: string
}) {
  return (
    <BlurFade inView>
      <Label>{label}</Label>
      <h2 className="mt-5 max-w-3xl font-serif text-[36px] leading-[1.05] text-gc-ink sm:text-[48px] lg:text-[54px]">
        {title} <strong className="font-mono font-bold tracking-tight text-gc-ink">{bold}</strong>
        {after ? ` ${after}` : ""}
      </h2>
      {sub && <p className="mt-4 max-w-2xl font-mono text-[14px] leading-7 text-gc-muted">{sub}</p>}
    </BlurFade>
  )
}

export const wrap = "mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12"

/* ---------- brands ---------- */

export function Brands() {
  return (
    <section className="border-b border-gc-line bg-gc-card">
      <div className={`${wrap} flex flex-col gap-3 py-5 md:flex-row md:items-center md:gap-8`}>
        <Label>Brands we stock</Label>
        <Marquee pauseOnHover className="flex-1 [--duration:28s] [--gap:3rem] [mask-image:linear-gradient(90deg,transparent,white_10%,white_90%,transparent)]">
          {BRANDS.map((b) => (
            <span key={b} className="font-mono text-[18px] tracking-wider text-gc-muted transition-colors hover:text-gc-ink">
              {b}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

/* ---------- why us (bento of Magic Cards) ---------- */

const cardProps = {
  gradientFrom: "#007a52",
  gradientTo: "#ffb800",
  gradientColor: "#e3f1ea",
  gradientSize: 260,
} as const

export function WhyUs() {
  return (
    <section id="why" className="scroll-mt-16 border-b border-gc-line">
      <div className={`${wrap} py-16 lg:py-24`}>
        <SectionHead
          label="What we do"
          title="Shopping made"
          bold="SIMPLE"
          after="at Gadget Cyclone"
          sub="Hover or tap the cards."
        />

        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
          <BlurFade inView delay={0.05} className="md:col-span-2">
            <MagicCard {...cardProps} className="h-full">
              <div className="p-6 sm:p-8">
                <CardTitle n="01" icon={<Bike className="size-5" />} title="Cash on delivery" />
                <p className="mt-3 max-w-md font-mono text-[13px] leading-6 text-gc-muted">
                  Order now, pay the rider when it arrives. Anywhere inside Chattogram city. No advance.
                </p>
                <RiderTrack />
              </div>
            </MagicCard>
          </BlurFade>

          <BlurFade inView delay={0.1}>
            <MagicCard {...cardProps} className="h-full">
              <div className="p-6 sm:p-8">
                <CardTitle n="02" icon={<Smartphone className="size-5" />} title="Right fit, checked" />
                <p className="mt-3 font-mono text-[13px] leading-6 text-gc-muted">
                  Tell us your model. We match the case, cable or charger before we pack.
                </p>
                <div className="mt-6 -mx-2 space-y-2 [mask-image:linear-gradient(90deg,transparent,white_12%,white_88%,transparent)]">
                  <Marquee className="[--duration:22s] [--gap:0.5rem]" repeat={3}>
                    {PHONE_MODELS.slice(0, 5).map((m) => (
                      <ModelChip key={m} m={m} />
                    ))}
                  </Marquee>
                  <Marquee reverse className="[--duration:22s] [--gap:0.5rem]" repeat={3}>
                    {PHONE_MODELS.slice(5).map((m) => (
                      <ModelChip key={m} m={m} />
                    ))}
                  </Marquee>
                </div>
              </div>
            </MagicCard>
          </BlurFade>

          <BlurFade inView delay={0.15}>
            <MagicCard {...cardProps} className="h-full">
              <div className="p-6 sm:p-8">
                <CardTitle n="03" icon={<RotateCcw className="size-5" />} title="7-day replacement" />
                <p className="mt-3 font-mono text-[13px] leading-6 text-gc-muted">
                  Something wrong with it? Bring it back within 7 days.
                </p>
                <SevenDays />
              </div>
            </MagicCard>
          </BlurFade>

          <BlurFade inView delay={0.2} className="md:col-span-2">
            <MagicCard {...cardProps} className="h-full">
              <div className="flex h-full flex-col justify-between gap-6 p-6 sm:p-8 lg:flex-row lg:items-end">
                <div>
                  <CardTitle n="04" icon={<Store className="size-5" />} title="Walk in or message" />
                  <p className="mt-3 max-w-md font-mono text-[13px] leading-6 text-gc-muted">
                    See it in your hand at {SITE.address}. Or order on WhatsApp or Facebook.
                  </p>
                </div>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 border border-gc-line px-4 py-3 font-mono text-[12px] tracking-wider text-gc-ink uppercase transition-colors hover:border-gc-green"
                >
                  <MapPin className="size-4 text-gc-green" /> Open in Maps
                </a>
              </div>
            </MagicCard>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}

function CardTitle({ n, icon, title }: { n: string; icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[12px] text-gc-green">{n}</span>
      <span className="text-gc-green">{icon}</span>
      <h3 className="font-serif text-[26px] leading-tight text-gc-ink">{title}</h3>
    </div>
  )
}

function ModelChip({ m }: { m: string }) {
  return (
    <span className="border border-gc-line bg-gc-paper px-3 py-1.5 font-mono text-[11px] whitespace-nowrap text-gc-ink">
      <Check className="mr-1 inline size-3 text-gc-green" />
      {m}
    </span>
  )
}

function RiderTrack() {
  const reduce = useReducedMotion()
  return (
    <div className="mt-8">
      <div className="relative h-12">
        <div className="absolute top-1/2 right-10 left-10 border-t border-dashed border-gc-line" />
        <span className="absolute top-1/2 left-0 grid size-9 -translate-y-1/2 place-items-center border border-gc-line bg-gc-paper text-gc-green">
          <Store className="size-4" />
        </span>
        <span className="absolute top-1/2 right-0 grid size-9 -translate-y-1/2 place-items-center border border-gc-green bg-gc-paper font-mono text-[10px] text-gc-green">
          Tk
        </span>
        <motion.span
          className="absolute top-1/2 left-10 -translate-y-1/2 text-gc-ink"
          animate={reduce ? undefined : { left: ["10%", "82%"] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
        >
          <Bike className="size-6" />
        </motion.span>
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] tracking-wider text-gc-muted uppercase">
        <span>Finlay Square</span>
        <span>you pay here</span>
      </div>
    </div>
  )
}

function SevenDays() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  return (
    <div ref={ref} className="mt-6 grid grid-cols-7 gap-1.5">
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ backgroundColor: "#e2e2da" }}
          animate={inView ? { backgroundColor: "#007a52" } : undefined}
          transition={{ delay: 0.15 * i, duration: 0.3 }}
          className="grid aspect-square place-items-center font-mono text-[10px] text-gc-paper"
        >
          {i + 1}
        </motion.div>
      ))}
    </div>
  )
}

/* ---------- how to order (line fills while you scroll) ---------- */

export function HowToOrder() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <section className="border-b border-gc-line bg-gc-card">
      <div className={`${wrap} py-16 lg:py-24`}>
        <SectionHead label="How it works" title="Order in" bold="3" after="steps" />
        <div ref={ref} className="relative mt-12">
          <div className="absolute top-5 right-0 left-0 hidden h-px bg-gc-line md:block" />
          <motion.div
            className="absolute top-5 right-0 left-0 hidden h-px origin-left bg-gc-green md:block"
            style={{ scaleX: fill }}
          />
          <div className="absolute top-0 bottom-0 left-5 w-px bg-gc-line md:hidden" />
          <motion.div className="absolute top-0 bottom-0 left-5 w-px origin-top bg-gc-green md:hidden" style={{ scaleY: fill }} />
          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <BlurFade key={s.title} inView delay={0.1 * i} className="relative pl-16 md:pl-0">
                <span className="absolute top-0 left-0 grid size-10 place-items-center border border-gc-green bg-gc-paper font-mono text-[13px] text-gc-green md:relative">
                  0{i + 1}
                </span>
                <h3 className="font-serif text-[28px] leading-10 text-gc-ink md:mt-5 md:leading-tight">{s.title}</h3>
                <p className="mt-2 max-w-xs font-mono text-[13px] leading-6 text-gc-muted">{s.text}</p>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- ask us (chat bubbles marquee) ---------- */

export function AskUs() {
  const half = Math.ceil(ASKS.length / 2)
  return (
    <section className="overflow-hidden border-b border-gc-line">
      <div className={`${wrap} pt-16 lg:pt-24`}>
        <SectionHead
          label="Ask us"
          title="No question is too"
          bold="SMALL"
          sub="Things people ask us every day. Send yours on WhatsApp."
        />
      </div>
      <div className="mt-10 space-y-3 [mask-image:linear-gradient(90deg,transparent,white_8%,white_92%,transparent)]">
        <Marquee pauseOnHover className="[--duration:45s]">
          {ASKS.slice(0, half).map((q) => (
            <Bubble key={q} q={q} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse className="[--duration:45s]">
          {ASKS.slice(half).map((q) => (
            <Bubble key={q} q={q} />
          ))}
        </Marquee>
      </div>
      <div className={`${wrap} flex justify-center pt-8 pb-16 lg:pb-24`}>
        <a href={whatsappLink("Hi! I have a question: ")} target="_blank" rel="noreferrer">
          <ShimmerButton
            background="#007a52"
            borderRadius="0px"
            className="h-12 px-6 font-mono text-[13px] font-bold tracking-wider text-gc-paper uppercase"
          >
            <MessageCircle className="mr-2 size-4" /> Ask on WhatsApp
          </ShimmerButton>
        </a>
      </div>
    </section>
  )
}

function Bubble({ q }: { q: string }) {
  return (
    <div className="relative max-w-[320px] rounded-2xl rounded-bl-sm border border-gc-line bg-gc-card px-4 py-3 font-mono text-[13px] text-gc-ink">
      {q}
      <span className="ml-2 align-bottom text-[10px] text-gc-green">✓✓</span>
    </div>
  )
}

/* ---------- visit + FAQ ---------- */

export function Visit() {
  const [open, setOpen] = useState<number | null>(0)

  const contact = [
    {
      icon: <MessageCircle className="size-5" />,
      title: "WhatsApp",
      text: "Send your phone model and what you need.",
      cta: "Message us",
      href: whatsappLink("Hi Gadget Cyclone! My phone is: "),
    },
    {
      icon: <FacebookIcon className="size-5" />,
      title: "Facebook",
      text: "Message the Gadget Cyclone page.",
      cta: SITE.facebookUrl ? "Open page" : "Search on Facebook",
      href: SITE.facebookUrl || "https://www.facebook.com/search/top?q=Gadget%20Cyclone%20Chattogram",
    },
    {
      icon: <MapPin className="size-5" />,
      title: "Visit the shop",
      text: SITE.address,
      cta: "Get directions",
      href: SITE.mapsUrl,
    },
  ]

  return (
    <section id="visit" className="scroll-mt-16 border-b border-gc-line">
      <div className={`${wrap} py-16 lg:py-24`}>
        <SectionHead label="Visit" title="Come say" bold="HI" sub="4th floor of Finlay Square, near 2 No. Gate." />

        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3 [&>*]:min-w-0">
          {contact.map((c, i) => (
            <BlurFade key={c.title} inView delay={0.08 * i}>
              <MagicCard {...cardProps} className="h-full">
                <div className="flex h-full flex-col p-6">
                  <span className="grid size-11 place-items-center border border-gc-line text-gc-green">{c.icon}</span>
                  <h3 className="mt-6 font-serif text-[26px] text-gc-ink">{c.title}</h3>
                  <p className="mt-2 flex-1 font-mono text-[13px] leading-6 text-gc-muted">{c.text}</p>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex h-11 items-center justify-center bg-gc-green font-mono text-[12px] font-bold tracking-[0.12em] text-gc-paper uppercase transition-transform hover:-translate-y-0.5"
                  >
                    {c.cta}
                  </a>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_2fr]">
          <BlurFade inView>
            <Label>FAQ</Label>
            <p className="mt-5 font-serif text-[34px] leading-tight text-gc-ink">Quick answers</p>
          </BlurFade>
          <div className="border-t border-gc-line">
            {FAQS.map((f, i) => (
              <div key={f.q} className="border-b border-gc-line">
                <button
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-mono text-[14px] text-gc-ink transition-colors hover:text-gc-ink"
                >
                  {f.q}
                  <motion.span animate={{ rotate: open === i ? 180 : 0 }} className="shrink-0 text-gc-green">
                    <ChevronDown className="size-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 font-mono text-[13px] leading-6 text-gc-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
