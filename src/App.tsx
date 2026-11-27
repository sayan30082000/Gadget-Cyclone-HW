import { Header } from "@/components/site/Header"
import { Hero } from "@/components/site/Hero"
import { AskUs, Brands, HowToOrder, Visit, WhyUs } from "@/components/site/Sections"
import { Shop } from "@/components/site/Shop"
import { KitBuilder } from "@/components/site/KitBox"
import { Footer } from "@/components/site/Footer"
import { FloatingOrder } from "@/components/site/FloatingOrder"
import { Offer } from "@/components/site/Offer"
import { Reviews } from "@/components/site/Reviews"

export default function App() {
  return (
    <div className="min-h-screen bg-gc-paper text-gc-ink">
      <Header />
      <main>
        <Hero />
        <Brands />
        <WhyUs />
        <Shop />
        <Offer />
        <KitBuilder />
        <HowToOrder />
        <Reviews />
        <AskUs />
        <Visit />
      </main>
      <Footer />
      <FloatingOrder />
    </div>
  )
}
