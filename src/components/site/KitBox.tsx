import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, LayoutGroup, motion, useAnimate, useReducedMotion } from "motion/react"
import {
  Battery,
  BatteryFull,
  Bluetooth,
  Cable,
  Car,
  Ear,
  Layers,
  Package,
  PlugZap,
  Shield,
  Smartphone,
  type LucideIcon,
} from "lucide-react"

import { NumberTicker } from "@/components/ui/number-ticker"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { SectionHead, wrap } from "@/components/site/Sections"
import { KIT_DEAL, KIT_ITEMS, KIT_PRESETS, whatsappLink } from "@/data/site"

/*
 * Kits, round 3: "bundle box". Tap an item on the shelf and its icon flies into the box
 * (shared layoutId), tap it in the box to send it back. Price sticker on the box.
 */

const ICON: Record<string, LucideIcon> = {
  charger: PlugZap,
  cable: Cable,
  cable2: Cable,
  car: Car,
  bank10: Battery,
  bank20: BatteryFull,
  earbuds: Bluetooth,
  budcover: Package,
  tips: Ear,
  clear: Smartphone,
  rugged: Shield,
  glass: Layers,
}

const tk = (n: number) => `Tk ${n.toLocaleString("en-US")}`
const SLOTS = 8

export function KitBuilder() {
  const reduce = useReducedMotion()
  const [sel, setSel] = useState<string[]>(KIT_PRESETS[1].items)
  const [model, setModel] = useState("")

  const items = useMemo(() => sel.map((id) => KIT_ITEMS.find((i) => i.id === id)!).filter(Boolean), [sel])
  const subtotal = items.reduce((s, i) => s + i.price, 0)
  const deal = items.length >= KIT_DEAL.minItems
  const total = deal ? Math.round((subtotal * (1 - KIT_DEAL.off)) / 10) * 10 : subtotal
  const saved = subtotal - total
  const need = Math.max(0, KIT_DEAL.minItems - items.length)
  const preset = KIT_PRESETS.find((p) => p.items.length === sel.length && p.items.every((id) => sel.includes(id)))

  // new items go to the end of the box, so they land in the next free slot
  const toggle = (id: string) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  const message =
    `Hi Gadget Cyclone! I want this kit${preset ? ` (${preset.name})` : ""}:\n` +
    items.map((i) => `- ${i.name} (${tk(i.price)})`).join("\n") +
    `\nTotal on the site: ${tk(total)}${deal ? " after 15% off" : ""}\nMy phone: ${model.trim() || "..."}`

  // sticker pops when the total changes (the number itself rolls from the old total, it is not remounted)
  const [sticker, animateSticker] = useAnimate()
  useEffect(() => {
    if (reduce || !sticker.current) return
    animateSticker(sticker.current, { scale: [1, 1.12, 1] }, { duration: 0.35 })
  }, [total, reduce, animateSticker, sticker])

  const fly = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 380, damping: 30 }

  const summary = (
    <div className="border border-gc-line bg-gc-card p-5 sm:p-6">
      <div className="space-y-1.5 font-mono text-[13px]">
        <div className="flex justify-between text-gc-muted">
          <span>
            {items.length} item{items.length === 1 ? "" : "s"}
          </span>
          <span>{tk(subtotal)}</span>
        </div>
        {deal ? (
          <div className="flex justify-between text-gc-green">
            <span>3+ items: 15% off</span>
            <span>−{tk(saved)}</span>
          </div>
        ) : (
          <div>
            <p className="text-gc-muted">{items.length === 0 ? "Put 3 items in the box for 15% off" : `Add ${need} more for 15% off`}</p>
            <div className="mt-2 h-1.5 bg-gc-line">
              <motion.div className="h-full bg-gc-amber" animate={{ width: `${(items.length / KIT_DEAL.minItems) * 100}%` }} />
            </div>
          </div>
        )}
      </div>

      <label className="mt-5 block font-mono text-[11px] tracking-[0.14em] text-gc-muted uppercase">
        Your phone model
        <input
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Galaxy A55"
          className="mt-2 h-11 w-full border border-gc-line bg-gc-paper px-3 font-mono text-[13px] tracking-normal text-gc-ink normal-case outline-none placeholder:text-gc-muted/70 focus:border-gc-green"
        />
      </label>

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
          {items.length ? "■ Order this box on WhatsApp" : "Box is empty"}
        </ShimmerButton>
      </a>
      <p className="mt-3 font-mono text-[11px] leading-5 text-gc-muted">
        Pay the rider when it arrives. Sample prices, we confirm today's price before packing.
      </p>
    </div>
  )

  return (
    <section id="kits" className="scroll-mt-16 border-b border-gc-line">
      <div className={`${wrap} py-16 lg:py-24`}>
        <SectionHead
          label="Kits"
          title="Pack your"
          bold="BOX"
          sub="Tap things on the shelf and they jump into your box. Tap them in the box to take them out. 3 or more items: 15% off."
        />

        <LayoutGroup>
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-10 [&>*]:min-w-0">
            {/* quick kits */}
            <div className="order-1 lg:col-start-1 lg:row-start-1">
              <p className="font-mono text-[11px] tracking-[0.14em] text-gc-muted uppercase">Quick kits</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {KIT_PRESETS.map((p) => {
                  const on = preset?.id === p.id
                  return (
                    <button
                      key={p.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setSel(p.items)}
                      className={`border px-4 py-2 font-mono text-[12px] font-bold tracking-wider uppercase transition-colors ${
                        on ? "border-gc-green bg-gc-green text-white" : "border-gc-line bg-gc-card text-gc-ink hover:border-gc-green"
                      }`}
                    >
                      {p.name}
                    </button>
                  )
                })}
                <button
                  type="button"
                  onClick={() => setSel([])}
                  className="border border-dashed border-gc-muted px-4 py-2 font-mono text-[12px] tracking-wider text-gc-muted uppercase transition-colors hover:border-gc-ink hover:text-gc-ink"
                >
                  Empty the box
                </button>
              </div>
            </div>

            {/* the box (+ summary on desktop) */}
            <div id="kit-box" className="order-2 scroll-mt-24 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:self-start">
              <div className="relative pt-8">
                {/* flaps */}
                <div className="pointer-events-none absolute inset-x-0 top-0 flex h-8 gap-1 px-1">
                  <div className="flex-1 origin-bottom -skew-x-[18deg] border-2 border-b-0 border-gc-ink bg-gc-paper" />
                  <div className="flex-1 origin-bottom skew-x-[18deg] border-2 border-b-0 border-gc-ink bg-gc-paper" />
                </div>

                <div className="relative border-2 border-gc-ink bg-gc-card px-4 pt-5 pb-12 sm:px-5">
                  {/* tape */}
                  <div className="pointer-events-none absolute inset-y-0 left-1/2 w-14 -translate-x-1/2 bg-gc-green/[0.07]" />

                  <div className="relative grid grid-cols-4 gap-2">
                    {items.map((i) => {
                      const Icon = ICON[i.id] ?? Package
                      return (
                        <motion.button
                          key={i.id}
                          layoutId={`kit-${i.id}`}
                          transition={fly}
                          type="button"
                          onClick={() => toggle(i.id)}
                          aria-label={`Take ${i.name} out of the box`}
                          title={`${i.name} · ${tk(i.price)} (tap to remove)`}
                          className="group relative grid aspect-square place-items-center bg-gc-green text-white"
                        >
                          <Icon className="size-[42%]" strokeWidth={1.6} />
                          <span className="absolute inset-0 grid place-items-center bg-gc-ink/80 font-mono text-[10px] tracking-wider uppercase opacity-0 transition-opacity group-hover:opacity-100">
                            remove
                          </span>
                        </motion.button>
                      )
                    })}
                    {Array.from({ length: Math.max(0, SLOTS - items.length) }).map((_, k) => (
                      <div key={`slot-${k}`} className="aspect-square border border-dashed border-gc-muted/40" />
                    ))}
                  </div>

                  <p className="absolute right-4 bottom-4 left-4 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-gc-muted uppercase">
                    <span>Gadget Cyclone · {preset ? preset.name : items.length ? "your kit" : "empty box"}</span>
                    <span className="hidden border border-gc-muted px-1.5 py-0.5 sm:inline">COD · CTG</span>
                  </p>
                </div>

                {/* price sticker */}
                <div
                  ref={sticker}
                  className="absolute -top-1 -right-2 -rotate-6 bg-gc-amber px-3 py-2 text-gc-ink shadow-[3px_3px_0_#111111] sm:-right-4"
                >
                  <p className="font-mono text-[10px] font-bold tracking-wider uppercase">{deal ? "15% off" : "box total"}</p>
                  <p className="font-mono text-[22px] leading-none font-bold">
                    Tk <NumberTicker value={total} className="!text-gc-ink !tracking-tight" />
                  </p>
                  {saved > 0 && <p className="mt-0.5 font-mono text-[10px]">save {tk(saved)}</p>}
                </div>
              </div>

              <div className="mt-4 hidden lg:block">{summary}</div>
            </div>

            {/* the shelf */}
            <div className="order-3 lg:col-start-1 lg:row-start-2">
              <p className="font-mono text-[11px] tracking-[0.14em] text-gc-muted uppercase">The shelf</p>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {KIT_ITEMS.map((i) => {
                  const on = sel.includes(i.id)
                  const Icon = ICON[i.id] ?? Package
                  return (
                    <button
                      key={i.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(i.id)}
                      className={`relative flex flex-col items-center border p-3 text-center transition-colors ${
                        on ? "border-gc-green bg-gc-green/[0.05]" : "border-gc-line bg-gc-card hover:border-gc-ink"
                      }`}
                    >
                      <div className="grid size-12 place-items-center">
                        {on ? (
                          <div className="size-12 border border-dashed border-gc-green/50" />
                        ) : (
                          <motion.div
                            layoutId={`kit-${i.id}`}
                            transition={fly}
                            className="grid size-12 place-items-center bg-gc-paper text-gc-green"
                          >
                            <Icon className="size-6" strokeWidth={1.6} />
                          </motion.div>
                        )}
                      </div>
                      <span className="mt-2 font-mono text-[11px] leading-tight text-gc-ink">{i.name}</span>
                      <span className="mt-1 font-mono text-[11px] text-gc-muted">{tk(i.price)}</span>
                      <AnimatePresence>
                        {on && (
                          <motion.span
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-1.5 right-1.5 bg-gc-green px-1 font-mono text-[9px] tracking-wider text-white uppercase"
                          >
                            in box
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  )
                })}
              </div>

              {/* phones/tablets: total follows you down the shelf */}
              <div className="sticky bottom-3 z-20 mt-5 flex items-center justify-between gap-3 border border-gc-ink bg-gc-ink px-4 py-3 text-white lg:hidden">
                <span className="font-mono text-[12px]">
                  {items.length} in box · <span className="font-bold">{tk(total)}</span>
                </span>
                <a href="#kit-box" className="bg-gc-green px-3 py-2 font-mono text-[11px] font-bold tracking-wider uppercase">
                  See box ↑
                </a>
              </div>
            </div>

            {/* summary for phones/tablets */}
            <div className="order-4 lg:hidden">{summary}</div>
          </div>
        </LayoutGroup>
      </div>
    </section>
  )
}
