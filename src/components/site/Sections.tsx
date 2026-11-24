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
  BatteryCharging,
  Bike,
  Check,
  ChevronDown,
  Headphones,
  MapPin,
  MessageCircle,
  PlugZap,
  RotateCcw,
  Smartphone,
  Store,
  Watch,
} from "lucide-react"

import { BlurFade } from "@/components/ui/blur-fade"
import { MagicCard } from "@/components/ui/magic-card"
import { Marquee } from "@/components/ui/marquee"
import { NumberTicker } from "@/components/ui/number-ticker"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { ShineBorder } from "@/components/ui/shine-border"
import {
  ASKS,
  BRANDS,
  CATEGORIES,
  FAQS,
  KITS,
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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-gc-tag px-2.5 py-1.5 font-mono text-[11px] font-bold tracking-[0.14em] text-gc-light uppercase">
      ■ {children}
    </span>
  )
}

function SectionHead({
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
      <h2 className="mt-5 max-w-3xl font-serif text-[36px] leading-[1.05] text-gc-light sm:text-[48px] lg:text-[54px]">
        {title} <strong className="font-mono font-bold tracking-tight text-white">{bold}</strong>
        {after ? ` ${after}` : ""}
      </h2>
      {sub && <p className="mt-4 max-w-2xl font-mono text-[14px] leading-7 text-gc-grey">{sub}</p>}
    </BlurFade>
  )
}

const wrap = "mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12"

/* ---------- brands ---------- */

export function Brands() {
  return (
    <section className="border-b border-gc-line bg-gc-strip">
      <div className={`${wrap} flex flex-col gap-3 py-5 md:flex-row md:items-center md:gap-8`}>
        <Label>Brands we stock</Label>
        <Marquee pauseOnHover className="flex-1 [--duration:28s] [--gap:3rem] [mask-image:linear-gradient(90deg,transparent,white_10%,white_90%,transparent)]">
          {BRANDS.map((b) => (
            <span key={b} className="font-mono text-[18px] tracking-wider text-gc-grey transition-colors hover:text-white">
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
  gradientFrom: "#ea4a1a",
  gradientTo: "#ffb08f",
  gradientColor: "#1f1410",
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
                <p className="mt-3 max-w-md font-mono text-[13px] leading-6 text-gc-grey">
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
                <p className="mt-3 font-mono text-[13px] leading-6 text-gc-grey">
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
                <p className="mt-3 font-mono text-[13px] leading-6 text-gc-grey">
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
                  <p className="mt-3 max-w-md font-mono text-[13px] leading-6 text-gc-grey">
                    See it in your hand at {SITE.address}. Or order on WhatsApp or Facebook.
                  </p>
                </div>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 border border-gc-line px-4 py-3 font-mono text-[12px] tracking-wider text-gc-light uppercase transition-colors hover:border-gc-orange"
                >
                  <MapPin className="size-4 text-gc-orange" /> Open in Maps
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
      <span className="font-mono text-[12px] text-gc-orange">{n}</span>
      <span className="text-gc-orange">{icon}</span>
      <h3 className="font-serif text-[26px] leading-tight text-gc-light">{title}</h3>
    </div>
  )
}

function ModelChip({ m }: { m: string }) {
  return (
    <span className="border border-gc-line bg-gc-black px-3 py-1.5 font-mono text-[11px] whitespace-nowrap text-gc-light">
      <Check className="mr-1 inline size-3 text-gc-orange" />
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
        <span className="absolute top-1/2 left-0 grid size-9 -translate-y-1/2 place-items-center border border-gc-line bg-gc-black text-gc-orange">
          <Store className="size-4" />
        </span>
        <span className="absolute top-1/2 right-0 grid size-9 -translate-y-1/2 place-items-center border border-gc-orange bg-gc-black font-mono text-[10px] text-gc-orange">
          Tk
        </span>
        <motion.span
          className="absolute top-1/2 left-10 -translate-y-1/2 text-gc-light"
          animate={reduce ? undefined : { left: ["10%", "82%"] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
        >
          <Bike className="size-6" />
        </motion.span>
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] tracking-wider text-gc-grey uppercase">
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
          initial={{ backgroundColor: "#1a1a1a" }}
          animate={inView ? { backgroundColor: "#ea4a1a" } : undefined}
          transition={{ delay: 0.15 * i, duration: 0.3 }}
          className="grid aspect-square place-items-center font-mono text-[10px] text-gc-black"
        >
          {i + 1}
        </motion.div>
      ))}
    </div>
  )
}

/* ---------- shop by category (sliding tabs, after Animate UI Tabs) ---------- */

const CAT_ICONS: Record<string, React.ReactNode> = {
  earbuds: <Headphones className="size-5" />,
  chargers: <PlugZap className="size-5" />,
  power: <BatteryCharging className="size-5" />,
  covers: <Smartphone className="size-5" />,
  more: <Watch className="size-5" />,
}

export function Categories() {
  const [active, setActive] = useState(CATEGORIES[0].id)
  const cat = CATEGORIES.find((c) => c.id === active)!

  return (
    <section id="shop" className="scroll-mt-16 border-b border-gc-line bg-gc-strip">
      <div className={`${wrap} py-16 lg:py-24`}>
        <SectionHead label="Shop" title="Pick a" bold="CATEGORY" sub="Accessories only. No phones." />

        <div role="tablist" aria-label="Categories" className="mt-10 flex gap-1 overflow-x-auto border border-gc-line bg-gc-black p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={active === c.id}
              onClick={() => setActive(c.id)}
              className="relative shrink-0 px-4 py-2.5 font-mono text-[12px] tracking-wider whitespace-nowrap uppercase outline-none"
            >
              {active === c.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 bg-gc-orange"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className={`relative ${active === c.id ? "text-gc-black" : "text-gc-grey hover:text-white"}`}>
                {c.label}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={cat.id}
            role="tabpanel"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_2fr] [&>*]:min-w-0"
          >
            <div className="flex flex-col justify-between border border-gc-line bg-gc-black p-6">
              <span className="grid size-12 place-items-center border border-gc-orange text-gc-orange">
                {CAT_ICONS[cat.id]}
              </span>
              <div className="mt-8">
                <h3 className="font-serif text-[32px] text-gc-light">{cat.label}</h3>
                <p className="mt-2 font-mono text-[13px] leading-6 text-gc-grey">{cat.line}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {cat.items.map((it, i) => (
                <motion.a
                  key={it.name}
                  href={whatsappLink(`Hi! Do you have ${it.name.toLowerCase()} for my phone? My phone is: `)}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col justify-between border border-gc-line bg-gc-black p-5 transition-colors hover:border-gc-orange"
                >
                  <span className="font-mono text-[11px] text-gc-orange">0{i + 1}</span>
                  <div className="mt-5 sm:mt-10">
                    <p className="font-serif text-[22px] leading-tight text-gc-light">{it.name}</p>
                    <p className="mt-1 font-mono text-[12px] text-gc-grey">{it.note}</p>
                    <p className="mt-4 font-mono text-[11px] tracking-wider text-gc-grey uppercase transition-colors group-hover:text-gc-orange">
                      Ask for today's stock →
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ---------- kits (pricing) ---------- */

export function Kits() {
  return (
    <section id="kits" className="scroll-mt-16 border-b border-gc-line">
      <div className={`${wrap} py-16 lg:py-24`}>
        <SectionHead
          label="Kits"
          title="Three kits,"
          bold="ONE"
          after="message away"
          sub="Sample prices. Message us for today's price and stock."
        />

        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3 [&>*]:min-w-0">
          {KITS.map((k, i) => (
            <BlurFade key={k.name} inView delay={0.08 * i}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`relative flex h-full flex-col border p-6 lg:p-8 ${
                  k.pick ? "border-gc-orange bg-gc-orange text-gc-black" : "border-gc-line bg-gc-strip text-gc-light"
                }`}
              >
                {k.pick && <ShineBorder borderWidth={2} duration={9} shineColor={["#ffffff", "#ffd2c2"]} />}
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-[12px] tracking-[0.14em] uppercase ${k.pick ? "font-bold" : "text-gc-grey"}`}>
                    ■ {k.name}
                  </span>
                  {k.pick && (
                    <span className="bg-gc-black px-2 py-1 font-mono text-[10px] tracking-wider text-gc-orange uppercase">
                      our pick
                    </span>
                  )}
                </div>
                <p className={`mt-6 font-serif text-[56px] leading-none md:text-[44px] lg:text-[62px] ${k.pick ? "text-gc-black" : ""}`}>
                  <span className="mr-2 font-mono text-[18px] align-top">Tk</span>
                  <NumberTicker value={k.price} className={k.pick ? "!text-gc-black" : "!text-gc-light"} />
                </p>
                <p className={`mt-3 font-mono text-[13px] ${k.pick ? "text-gc-black/80" : "text-gc-grey"}`}>{k.line}</p>
                <ul className="mt-6 mb-8 space-y-2.5 font-mono text-[13px]">
                  {k.items.map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <Check className={`size-4 ${k.pick ? "text-gc-black" : "text-gc-orange"}`} /> {it}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappLink(`Hi! I want the ${k.name} (Tk ${k.price.toLocaleString("en-US")}). My phone is: `)}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-auto inline-flex h-12 items-center justify-center font-mono text-[12px] font-bold tracking-[0.12em] uppercase transition-transform hover:-translate-y-0.5 ${
                    k.pick ? "bg-gc-black text-gc-orange" : "border border-gc-line text-gc-light hover:border-gc-orange"
                  }`}
                >
                  Order this kit
                </a>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- how to order (line fills while you scroll) ---------- */

export function HowToOrder() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <section className="border-b border-gc-line bg-gc-strip">
      <div className={`${wrap} py-16 lg:py-24`}>
        <SectionHead label="How it works" title="Order in" bold="3" after="steps" />
        <div ref={ref} className="relative mt-12">
          <div className="absolute top-5 right-0 left-0 hidden h-px bg-gc-line md:block" />
          <motion.div
            className="absolute top-5 right-0 left-0 hidden h-px origin-left bg-gc-orange md:block"
            style={{ scaleX: fill }}
          />
          <div className="absolute top-0 bottom-0 left-5 w-px bg-gc-line md:hidden" />
          <motion.div className="absolute top-0 bottom-0 left-5 w-px origin-top bg-gc-orange md:hidden" style={{ scaleY: fill }} />
          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <BlurFade key={s.title} inView delay={0.1 * i} className="relative pl-16 md:pl-0">
                <span className="absolute top-0 left-0 grid size-10 place-items-center border border-gc-orange bg-gc-black font-mono text-[13px] text-gc-orange md:relative">
                  0{i + 1}
                </span>
                <h3 className="font-serif text-[28px] leading-10 text-gc-light md:mt-5 md:leading-tight">{s.title}</h3>
                <p className="mt-2 max-w-xs font-mono text-[13px] leading-6 text-gc-grey">{s.text}</p>
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
            background="#ea4a1a"
            borderRadius="0px"
            className="h-12 px-6 font-mono text-[13px] font-bold tracking-wider text-gc-black uppercase"
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
    <div className="relative max-w-[320px] rounded-2xl rounded-bl-sm border border-gc-line bg-gc-strip px-4 py-3 font-mono text-[13px] text-gc-light">
      {q}
      <span className="ml-2 align-bottom text-[10px] text-gc-orange">✓✓</span>
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
                  <span className="grid size-11 place-items-center border border-gc-line text-gc-orange">{c.icon}</span>
                  <h3 className="mt-6 font-serif text-[26px] text-gc-light">{c.title}</h3>
                  <p className="mt-2 flex-1 font-mono text-[13px] leading-6 text-gc-grey">{c.text}</p>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex h-11 items-center justify-center bg-gc-orange font-mono text-[12px] font-bold tracking-[0.12em] text-gc-black uppercase transition-transform hover:-translate-y-0.5"
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
            <p className="mt-5 font-serif text-[34px] leading-tight text-gc-light">Quick answers</p>
          </BlurFade>
          <div className="border-t border-gc-line">
            {FAQS.map((f, i) => (
              <div key={f.q} className="border-b border-gc-line">
                <button
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-mono text-[14px] text-gc-light transition-colors hover:text-white"
                >
                  {f.q}
                  <motion.span animate={{ rotate: open === i ? 180 : 0 }} className="shrink-0 text-gc-orange">
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
                      <p className="pb-5 font-mono text-[13px] leading-6 text-gc-grey">{f.a}</p>
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
