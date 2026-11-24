import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  Activity,
  Battery,
  BatteryCharging,
  BatteryFull,
  BatteryLow,
  Bike,
  Bluetooth,
  Cable,
  Camera,
  Car,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Hand,
  Headphones,
  Layers,
  Magnet,
  Mic,
  Music,
  PartyPopper,
  PlugZap,
  Shield,
  Smartphone,
  Speaker,
  VolumeX,
  Wallet,
  Watch,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react"

import { BlurFade } from "@/components/ui/blur-fade"
import { NumberTicker } from "@/components/ui/number-ticker"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { SectionHead, wrap } from "@/components/site/Sections"
import { CATEGORIES, KIT_DEAL, KIT_ITEMS, KIT_PRESETS, whatsappLink, type Category } from "@/data/site"

/* ================= Shop: one swipe carousel per category ================= */

const ICONS: Record<string, LucideIcon[]> = {
  earbuds: [Bluetooth, VolumeX, Music, Headphones, Gamepad2, Mic],
  chargers: [PlugZap, Zap, Cable, Cable, Car, BatteryCharging],
  power: [Battery, BatteryFull, Magnet, Zap, BatteryLow, Cable],
  covers: [Smartphone, Shield, Hand, Wallet, Layers, Camera],
  more: [Watch, Activity, Watch, Speaker, PartyPopper, Bike],
}

export function Shop() {
  return (
    <section id="shop" className="scroll-mt-16 border-b border-gc-line bg-gc-card">
      <div className={`${wrap} py-16 lg:py-24`}>
        <SectionHead
          label="Shop"
          title="Swipe through the"
          bold="SHELVES"
          sub="Accessories only, no phones. Swipe or drag each row, then tap a card to ask for today's stock."
        />
        <div className="mt-10 space-y-12 lg:space-y-14">
          {CATEGORIES.map((c, i) => (
            <BlurFade key={c.id} inView delay={0.04 * i}>
              <CategoryRow cat={c} index={i} />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryRow({ cat, index }: { cat: Category; index: number }) {
  const track = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false })
  const [thumb, setThumb] = useState({ size: 1, pos: 0 })
  const [edges, setEdges] = useState({ start: true, end: false })
  const [dragging, setDragging] = useState(false)
  const icons = ICONS[cat.id] ?? []

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setThumb({ size: el.clientWidth / el.scrollWidth, pos: max > 0 ? el.scrollLeft / max : 0 })
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 })
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [measure])

  const step = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.querySelector<HTMLElement>("[data-card]")
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.offsetWidth + 12), behavior: "smooth" })
  }

  // mouse drag-to-scroll (touch already swipes natively)
  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !track.current) return
    drag.current = { down: true, startX: e.clientX, startLeft: track.current.scrollLeft, moved: false }
  }
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d.down || !track.current) return
    const dx = e.clientX - d.startX
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true
      setDragging(true)
    }
    if (d.moved) track.current.scrollLeft = d.startLeft - dx
  }
  const onUp = () => {
    if (!drag.current.down) return
    drag.current.down = false
    setDragging(false)
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[12px] text-gc-green">0{index + 1}</span>
          <div>
            <h3 className="font-serif text-[28px] leading-tight text-gc-ink sm:text-[32px]">{cat.label}</h3>
            <p className="mt-1 font-mono text-[12px] text-gc-muted">{cat.line}</p>
          </div>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <ArrowBtn label={`Previous ${cat.label}`} disabled={edges.start} onClick={() => step(-1)}>
            <ChevronLeft className="size-5" />
          </ArrowBtn>
          <ArrowBtn label={`Next ${cat.label}`} disabled={edges.end} onClick={() => step(1)}>
            <ChevronRight className="size-5" />
          </ArrowBtn>
        </div>
      </div>

      <div
        ref={track}
        onScroll={measure}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        className={`mt-5 -mx-5 flex gap-3 overflow-x-auto px-5 pb-1 select-none sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"
        }`}
      >
        {cat.items.map((it, i) => {
          const Icon = icons[i] ?? Smartphone
          return (
            <motion.a
              key={it.name}
              data-card
              draggable={false}
              href={whatsappLink(`Hi! Do you have ${it.name.toLowerCase()} in stock? My phone is: `)}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                if (drag.current.moved) e.preventDefault()
              }}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group flex w-[72%] shrink-0 snap-start flex-col border border-gc-line bg-gc-paper p-4 transition-colors hover:border-gc-green sm:w-[42%] md:w-[31%] lg:w-[23.4%]"
            >
              <div className="relative grid aspect-[4/3] place-items-center border border-gc-line bg-gc-card">
                <Icon className="size-12 text-gc-green transition-transform duration-300 group-hover:scale-110" strokeWidth={1.4} />
                <span className="absolute top-2 left-2 font-mono text-[10px] text-gc-muted">0{i + 1}</span>
                <span className="absolute top-2 right-2 bg-gc-amber px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-gc-ink uppercase">
                  COD
                </span>
              </div>
              <p className="mt-4 font-serif text-[21px] leading-tight text-gc-ink">{it.name}</p>
              <p className="mt-1 font-mono text-[12px] text-gc-muted">{it.note}</p>
              <p className="mt-4 font-mono text-[11px] tracking-wider text-gc-muted uppercase transition-colors group-hover:text-gc-green">
                Ask for today's stock →
              </p>
            </motion.a>
          )
        })}
      </div>

      {/* scroll progress for this row */}
      <div className="mt-4 h-[3px] w-full bg-gc-line" aria-hidden>
        <div
          className="h-full bg-gc-green transition-[margin] duration-150"
          style={{ width: `${Math.max(thumb.size, 0.12) * 100}%`, marginLeft: `${thumb.pos * (1 - Math.max(thumb.size, 0.12)) * 100}%` }}
        />
      </div>
      <p className="mt-2 font-mono text-[10px] tracking-wider text-gc-muted uppercase sm:hidden">swipe →</p>
    </div>
  )
}

function ArrowBtn({
  children,
  label,
  disabled,
  onClick,
}: {
  children: React.ReactNode
  label: string
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid size-11 place-items-center border transition-colors ${
        disabled
          ? "border-gc-line text-gc-line"
          : "border-gc-ink text-gc-ink hover:border-gc-green hover:bg-gc-green hover:text-white"
      }`}
    >
      {children}
    </button>
  )
}

/* ================= Pricing: live kit builder ================= */

const tk = (n: number) => `Tk ${n.toLocaleString("en-US")}`
const GROUPS = ["Charging", "Power", "Audio", "Protection"]

export function KitBuilder() {
  const [sel, setSel] = useState<string[]>(KIT_PRESETS[1].items)
  const [model, setModel] = useState("")

  const items = useMemo(() => KIT_ITEMS.filter((i) => sel.includes(i.id)), [sel])
  const subtotal = items.reduce((s, i) => s + i.price, 0)
  const deal = items.length >= KIT_DEAL.minItems
  const total = deal ? Math.round((subtotal * (1 - KIT_DEAL.off)) / 10) * 10 : subtotal
  const saved = subtotal - total
  const preset = KIT_PRESETS.find((p) => p.items.length === sel.length && p.items.every((id) => sel.includes(id)))
  const need = Math.max(0, KIT_DEAL.minItems - items.length)

  const toggle = (id: string) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  const message =
    `Hi Gadget Cyclone! I want this kit${preset ? ` (${preset.name})` : ""}:\n` +
    items.map((i) => `- ${i.name} (${tk(i.price)})`).join("\n") +
    `\nTotal on the site: ${tk(total)}${deal ? " after 15% off" : ""}\nMy phone: ${model.trim() || "..."}`

  return (
    <section id="kits" className="scroll-mt-16 border-b border-gc-line">
      <div className={`${wrap} py-16 lg:py-24`}>
        <SectionHead
          label="Kits"
          title="Build your"
          bold="KIT"
          sub="Start from a ready kit or tick what you need. 3 or more items: 15% off. Sample prices, we confirm on WhatsApp."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_1fr] [&>*]:min-w-0">
          {/* left: presets + items */}
          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-gc-muted uppercase">Start from a kit</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {KIT_PRESETS.map((p) => {
                const on = preset?.id === p.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSel(p.items)}
                    className={`border px-4 py-2.5 text-left transition-colors ${
                      on ? "border-gc-green bg-gc-green text-white" : "border-gc-line bg-gc-card text-gc-ink hover:border-gc-green"
                    }`}
                  >
                    <span className="block font-mono text-[12px] font-bold tracking-wider uppercase">{p.name}</span>
                    <span className={`block font-mono text-[11px] ${on ? "text-white/85" : "text-gc-muted"}`}>{p.line}</span>
                  </button>
                )
              })}
              <button
                type="button"
                onClick={() => setSel([])}
                className="border border-dashed border-gc-line px-4 py-2.5 font-mono text-[12px] tracking-wider text-gc-muted uppercase transition-colors hover:border-gc-ink hover:text-gc-ink"
              >
                Clear
              </button>
            </div>

            <div className="mt-8 space-y-6">
              {GROUPS.map((g) => (
                <div key={g}>
                  <p className="font-mono text-[11px] tracking-[0.14em] text-gc-muted uppercase">■ {g}</p>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {KIT_ITEMS.filter((i) => i.group === g).map((i) => {
                      const on = sel.includes(i.id)
                      return (
                        <motion.button
                          key={i.id}
                          type="button"
                          role="checkbox"
                          aria-checked={on}
                          onClick={() => toggle(i.id)}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center gap-3 border px-4 py-3 text-left transition-colors ${
                            on ? "border-gc-green bg-gc-green/[0.06]" : "border-gc-line bg-gc-card hover:border-gc-muted"
                          }`}
                        >
                          <span
                            className={`grid size-5 shrink-0 place-items-center border transition-colors ${
                              on ? "border-gc-green bg-gc-green text-white" : "border-gc-muted bg-gc-card text-transparent"
                            }`}
                          >
                            <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4">
                              <path d="M3 8.5l3 3 7-7" />
                            </svg>
                          </span>
                          <span className="flex-1 font-mono text-[13px] text-gc-ink">{i.name}</span>
                          <span className="font-mono text-[12px] text-gc-muted">{tk(i.price)}</span>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* phones: total follows you while you tick items */}
            <div className="sticky bottom-3 z-20 mt-6 flex items-center justify-between gap-3 border border-gc-ink bg-gc-ink px-4 py-3 text-white lg:hidden">
              <span className="font-mono text-[12px]">
                {items.length} item{items.length === 1 ? "" : "s"} · <span className="font-bold">{tk(total)}</span>
              </span>
              <a href="#kit-summary" className="bg-gc-green px-3 py-2 font-mono text-[11px] font-bold tracking-wider uppercase">
                Review kit ↓
              </a>
            </div>
          </div>

          {/* right: live summary */}
          <div id="kit-summary" className="scroll-mt-20 lg:sticky lg:top-24 lg:self-start">
            <div className="border border-gc-line bg-gc-card p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[12px] font-bold tracking-[0.14em] text-gc-ink uppercase">
                  ■ {preset ? preset.name : items.length ? "Your custom kit" : "Your kit"}
                </p>
                <span className="font-mono text-[11px] text-gc-muted">{items.length} items</span>
              </div>

              <ul className="mt-4 min-h-[48px] divide-y divide-gc-line border-y border-gc-line">
                <AnimatePresence initial={false}>
                  {items.length === 0 && (
                    <motion.li
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-3 font-mono text-[12px] text-gc-muted"
                    >
                      Tick an item or pick a kit to start.
                    </motion.li>
                  )}
                  {items.map((i) => (
                    <motion.li
                      key={i.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-center gap-2 py-2.5 font-mono text-[13px]">
                        <span className="flex-1 text-gc-ink">{i.name}</span>
                        <span className="text-gc-muted">{tk(i.price)}</span>
                        <button
                          type="button"
                          aria-label={`Remove ${i.name}`}
                          onClick={() => toggle(i.id)}
                          className="grid size-7 place-items-center text-gc-muted hover:text-gc-ink"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              <div className="mt-4 space-y-1.5 font-mono text-[13px]">
                <div className="flex justify-between text-gc-muted">
                  <span>Subtotal</span>
                  <span>{tk(subtotal)}</span>
                </div>
                {deal ? (
                  <div className="flex justify-between text-gc-green">
                    <span>3+ items: 15% off</span>
                    <span>−{tk(saved)}</span>
                  </div>
                ) : (
                  <div>
                    <p className="text-gc-muted">
                      {items.length === 0 ? "Pick 3 items for 15% off" : `Add ${need} more for 15% off`}
                    </p>
                    <div className="mt-2 h-1.5 bg-gc-line">
                      <motion.div
                        className="h-full bg-gc-amber"
                        animate={{ width: `${(items.length / KIT_DEAL.minItems) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-end justify-between gap-3">
                <p className="font-serif text-[52px] leading-none text-gc-ink">
                  <span className="mr-1.5 align-top font-mono text-[16px]">Tk</span>
                  <NumberTicker value={total} className="!text-gc-ink !tracking-normal" />
                </p>
                <AnimatePresence>
                  {saved > 0 && (
                    <motion.span
                      key="save"
                      initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                      animate={{ opacity: 1, scale: 1, rotate: -3 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="mb-1 bg-gc-amber px-2.5 py-1.5 font-mono text-[11px] font-bold tracking-wider text-gc-ink uppercase"
                    >
                      you save {tk(saved)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <label className="mt-6 block font-mono text-[11px] tracking-[0.14em] text-gc-muted uppercase" htmlFor="phone-model">
                Your phone model
              </label>
              <input
                id="phone-model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Galaxy A55"
                className="mt-2 h-11 w-full border border-gc-line bg-gc-paper px-3 font-mono text-[13px] text-gc-ink outline-none placeholder:text-gc-muted/70 focus:border-gc-green"
              />

              <a
                href={items.length ? whatsappLink(message) : undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={items.length === 0}
                onClick={(e) => {
                  if (!items.length) e.preventDefault()
                }}
                className="mt-4 block"
              >
                <ShimmerButton
                  background={items.length ? "#007a52" : "#5f6158"}
                  borderRadius="0px"
                  className="h-12 w-full font-mono text-[13px] font-bold tracking-wider uppercase"
                >
                  {items.length ? "■ Order this kit on WhatsApp" : "Pick items first"}
                </ShimmerButton>
              </a>
              <p className="mt-3 font-mono text-[11px] leading-5 text-gc-muted">
                Pay the rider when it arrives. Sample prices, we confirm today's price before packing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
