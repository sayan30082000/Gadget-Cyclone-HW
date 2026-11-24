import { useCallback, useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
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
  Zap,
  type LucideIcon,
} from "lucide-react"

import { BlurFade } from "@/components/ui/blur-fade"
import { SectionHead, wrap } from "@/components/site/Sections"
import { CATEGORIES, whatsappLink, type Category } from "@/data/site"

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
