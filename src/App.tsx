import { Header } from "@/components/site/Header"
import { Hero } from "@/components/site/Hero"
import { AskUs, Brands, HowToOrder, Visit, WhyUs } from "@/components/site/Sections"
import { KitBuilder, Shop } from "@/components/site/Shop"
import { Footer } from "@/components/site/Footer"

export default function App() {
  return (
    <div className="min-h-screen bg-gc-paper text-gc-ink">
      <Header />
      <main>
        <Hero />
        <Brands />
        <WhyUs />
        <Shop />
        <KitBuilder />
        <HowToOrder />
        <AskUs />
        <Visit />
      </main>
      <Footer />
    </div>
  )
}
