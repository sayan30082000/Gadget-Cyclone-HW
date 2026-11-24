import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity"
import { SITE, whatsappLink } from "@/data/site"

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="overflow-hidden bg-gc-black">
      {/* Magic UI Scroll Based Velocity: scroll faster and it speeds up */}
      <ScrollVelocityContainer className="border-b border-gc-line py-6">
        <ScrollVelocityRow baseVelocity={3} direction={1}>
          <span className="mx-6 font-mono text-[18vw] leading-none font-bold tracking-tight text-gc-light sm:text-[12vw]">
            GADGET CYCLONE <span className="text-gc-orange">■</span>
          </span>
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={3} direction={-1}>
          <span className="mx-6 font-serif text-[10vw] leading-none text-transparent italic [-webkit-text-stroke:1px_#8c8c8c] sm:text-[7vw]">
            cash on delivery · Chattogram ·
          </span>
        </ScrollVelocityRow>
      </ScrollVelocityContainer>

      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-10 sm:px-8 md:grid-cols-3 lg:px-12">
        <div>
          <p className="font-serif text-[26px] text-gc-orange">Gadget Cyclone</p>
          <p className="mt-3 font-mono text-[12px] leading-6 text-gc-grey">{SITE.address}</p>
        </div>
        <nav className="flex flex-col font-mono text-[12px] tracking-wider text-gc-grey uppercase [&>a]:py-2 md:[&>a]:py-1">
          <a href="#why" className="hover:text-white">Why us</a>
          <a href="#shop" className="hover:text-white">Shop</a>
          <a href="#kits" className="hover:text-white">Kits</a>
          <a href="#visit" className="hover:text-white">Visit</a>
          <a href={whatsappLink("Hi Gadget Cyclone! ")} target="_blank" rel="noreferrer" className="text-gc-orange hover:text-white">
            WhatsApp →
          </a>
        </nav>
        <div className="font-mono text-[11px] leading-6 text-gc-grey">
          <p>
            Built for UI/UX Class 03 by Sayan Das. Components: Magic UI (Interactive Grid, Marquee, Shimmer Button,
            Shine Border, Magic Card, Number Ticker, Blur Fade, Word Rotate, Scroll Velocity). Ideas from Watermelon UI,
            Animate UI and Uiverse.
          </p>
          <p className="mt-2">Hero photo: Klim Musalimov on Unsplash. Kit prices are samples.</p>
        </div>
      </div>
      <div className="border-t border-gc-line py-4 text-center font-mono text-[11px] text-gc-grey">
        © {YEAR} Gadget Cyclone · Chattogram
      </div>
    </footer>
  )
}
