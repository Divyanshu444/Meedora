"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { HeroCarousel, type HeroCarouselItem } from "@/components/ui/hero-carousel"
import { Button } from "@/components/ui/button"

const MEEDORA_HERO_ITEMS: HeroCarouselItem[] = [
  {
    id: "hero-1",
    title: "Not Waiting\nFor An Occasion",
    image: "/images/meedora-campaign.png",
    credit: "YOUR EVERYDAY ADORE · MEEDORA",
    meta: ["HANDCRAFTED IN INDIA", "18K MICRON GOLD", "JUST YOU, CHOOSING YOU"],
    accent: "#966f39",
  },
  {
    id: "hero-2",
    title: "Sitara\nCelestial",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1600&auto=format&fit=crop",
    credit: "SOLITARY STONE PENDANT",
    meta: ["NEW ARRIVAL", "₹1,499", "METRO DISPATCH"],
    accent: "#855f30",
  },
  {
    id: "hero-3",
    title: "Aira\nTextured Hoops",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1600&auto=format&fit=crop",
    credit: "ARTISAN HAMMERED GOLD",
    meta: ["BESTSELLER", "₹1,299", "FEATHER-LIGHT"],
    accent: "#b0853e",
  },
  {
    id: "hero-4",
    title: "Noor\nHeritage Kundan",
    image: "/images/meedora-ritual.png",
    credit: "FESTIVE JHUMKA COLLECTION",
    meta: ["SEED PEARL DROPS", "₹2,199", "FESTIVE EDIT"],
    accent: "#92512e",
  },
  {
    id: "hero-5",
    title: "Gul\nSolitaire Ring",
    image:
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1600&auto=format&fit=crop",
    credit: "CONTOURED COMFORT BAND",
    meta: ["ADJUSTABLE FIT", "₹899", "SUBTLE SPARKLE"],
    accent: "#765538",
  },
  {
    id: "hero-6",
    title: "Kavya\nOpen Cuff",
    image:
      "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1600&auto=format&fit=crop",
    credit: "HAMMERED TEXTURE BRACELET",
    meta: ["18K MICRON PLATED", "₹1,699", "ANTI-TARNISH"],
    accent: "#9c7538",
  },
]

export function MeedoraHero() {
  return (
    <section aria-label="Featured jewelry showcase" className="relative h-[85vh] min-h-[560px] max-h-[860px] w-full overflow-hidden bg-black">
      <HeroCarousel
        items={MEEDORA_HERO_ITEMS}
        defaultIndex={0}
        autoplay
        autoplayDelay={5000}
        className="h-full w-full"
      />

      {/* Floating CTA actions overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20">
        <div className="site-width flex items-center justify-end gap-3">
          <Button
            size="lg"
            render={<Link href="/collections/all" />}
            className="pointer-events-auto shadow-xl backdrop-blur-md bg-white text-black hover:bg-white/90 border border-white/20"
          >
            Explore collection <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            render={<Link href="/pages/about" />}
            className="pointer-events-auto hidden sm:inline-flex shadow-xl backdrop-blur-md bg-black/40 text-white border-white/30 hover:bg-black/60 hover:text-white"
          >
            <Sparkles className="size-4 text-amber-300 mr-1.5" /> Our story
          </Button>
        </div>
      </div>
    </section>
  )
}
