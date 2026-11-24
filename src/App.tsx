import { Header } from "@/components/site/Header"
import { Hero } from "@/components/site/Hero"
import { AskUs, Brands, Categories, HowToOrder, Kits, Visit, WhyUs } from "@/components/site/Sections"
import { Footer } from "@/components/site/Footer"

export default function App() {
  return (
    <div className="min-h-screen bg-gc-black text-gc-light">
      <Header />
      <main>
        <Hero />
        <Brands />
        <WhyUs />
        <Categories />
        <Kits />
        <HowToOrder />
        <AskUs />
        <Visit />
      </main>
      <Footer />
    </div>
  )
}
