import { Quote, Star } from "lucide-react"

import { BlurFade } from "@/components/ui/blur-fade"
import { Marquee } from "@/components/ui/marquee"
import { Label, wrap } from "@/components/site/Sections"
import { KIT_ITEMS, REVIEWS, cardPhoto, whatsappLink, type Review } from "@/data/site"
import { SAMPLE_REVIEWS } from "@/data/sample-reviews"

// Real reviews from site.ts. While there are none, the section shows design samples that are
// clearly marked as samples (label, names, rating line). The first real review replaces them all.
const SAMPLE = REVIEWS.length === 0
const LIST: Review[] = SAMPLE ? SAMPLE_REVIEWS : REVIEWS

const FIVE = [0, 1, 2, 3, 4]

/* ---------- customer reviews ---------- */

export function Reviews() {
  if (LIST.length === 0) return null

  const avg = LIST.reduce((sum, r) => sum + r.stars, 0) / LIST.length

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-16 overflow-hidden border-b border-gc-line">
      <div className={`${wrap} pt-16 lg:pt-24`}>
        <BlurFade inView>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <Label>Reviews</Label>
                {SAMPLE && (
                  <span className="inline-block bg-gc-amber px-2.5 py-1.5 font-mono text-[12px] font-bold tracking-[0.14em] text-gc-onamber uppercase">
                    Sample reviews, not real customers yet
                  </span>
                )}
              </div>
              <h2 id="reviews-title" className="mt-5 font-serif text-[46px] leading-[0.98] text-gc-ink sm:text-[64px] lg:text-[80px]">
                <em className="mr-2 align-[0.35em] text-[0.45em] text-gc-muted">what</em>our
                <br />
                customers <strong className="font-mono font-bold tracking-tight">SAY</strong>
              </h2>
            </div>
            <div className="md:pb-3 md:text-right">
              <Stars value={avg} />
              <p className="mt-3 font-mono text-[13px] tracking-wider text-gc-muted">
                {avg.toFixed(1)} out of 5 <span className="px-1.5 text-gc-line">|</span> from {LIST.length}
                {SAMPLE ? " sample reviews" : " reviews"}
              </p>
            </div>
          </div>
        </BlurFade>
      </div>

      <div className="mt-10 pb-16 [mask-image:linear-gradient(90deg,transparent,white_5%,white_95%,transparent)] lg:mt-14 lg:pb-24">
        <Marquee pauseOnHover repeat={2} className="[--duration:46s] [--gap:1.25rem]">
          {LIST.map((r) => (
            <ReviewCard key={`${r.name}-${r.product}`} r={r} />
          ))}
        </Marquee>
        <p className={`${wrap} mt-8 text-center font-sans text-[15px] text-gc-muted`}>
          Bought from us?{" "}
          <a
            href={whatsappLink("Hi! Here is my review of Gadget Cyclone: ")}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-gc-green underline underline-offset-4 hover:no-underline"
          >
            Send us your review on WhatsApp
          </a>
        </p>
      </div>
    </section>
  )
}

function ReviewCard({ r }: { r: Review }) {
  const item = KIT_ITEMS.find((i) => i.id === r.product)
  return (
    <figure className="flex w-[290px] shrink-0 flex-col rounded-2xl border border-gc-line bg-gc-card p-5 sm:w-[340px]">
      <div className="flex items-start justify-between">
        <Quote aria-hidden className="size-9 -scale-x-100 fill-gc-line text-gc-line" />
        <span role="img" aria-label={`${r.stars} out of 5 stars`} className="flex gap-0.5 text-gc-amber">
          {FIVE.map((i) => (
            <Star key={i} aria-hidden className={`size-4 ${i < r.stars ? "fill-current" : "fill-none text-gc-line"}`} />
          ))}
        </span>
      </div>
      <blockquote className="mt-3 flex-1 font-sans text-[15px] leading-6 text-gc-ink">{r.text}</blockquote>
      {item && (
        <div className="relative mt-4 overflow-hidden rounded-xl bg-gc-line">
          <img src={cardPhoto(item.photo, 400)} width={400} height={300} alt="" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
          <span className="absolute bottom-2 left-2 rounded-full bg-gc-paper/90 px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider text-gc-ink uppercase">
            Bought: {item.name}
          </span>
        </div>
      )}
      <figcaption className="mt-4 flex items-center justify-between border-t border-gc-line pt-3 font-sans text-[14px]">
        <span className="font-medium text-gc-ink">{r.name}</span>
        <span className="text-gc-muted">{r.area}</span>
      </figcaption>
    </figure>
  )
}

/** five stars, the amber part as wide as the average */
function Stars({ value }: { value: number }) {
  const row = (cls: string) => FIVE.map((i) => <Star key={i} aria-hidden className={`size-8 shrink-0 fill-current sm:size-9 ${cls}`} />)
  return (
    <span role="img" aria-label={`${value.toFixed(1)} out of 5 stars`} className="relative inline-flex gap-1 text-gc-line">
      {row("")}
      <span className="absolute inset-y-0 left-0 flex gap-1 overflow-hidden text-gc-amber" style={{ width: `${(value / 5) * 100}%` }}>
        {row("")}
      </span>
    </span>
  )
}
