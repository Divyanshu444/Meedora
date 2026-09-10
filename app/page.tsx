import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { getProducts } from '@/lib/shopify'
import { ProductCarousel } from '@/components/product-carousel'
import { CategoryGrid } from '@/components/category-grid'
import { EditBanners } from '@/components/edit-banners'
import { GiftingSection } from '@/components/gifting-section'
import { Button } from '@/components/ui/button'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Meedora — Your Everyday Adore | Handcrafted Jewelry',
  description:
    'Discover Meedora — handcrafted imitation jewelry for women who adorn themselves. Gold-plated earrings, necklaces, rings & more. Designed with quiet love, in India.',
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  let bestSellers: Awaited<ReturnType<typeof getProducts>> = {
    nodes: [],
    pageInfo: { hasNextPage: false, endCursor: null },
  }
  let newArrivals: Awaited<ReturnType<typeof getProducts>> = {
    nodes: [],
    pageInfo: { hasNextPage: false, endCursor: null },
  }

  try {
    ;[bestSellers, newArrivals] = await Promise.all([
      getProducts({ first: 10, sortKey: 'BEST_SELLING' }),
      getProducts({ first: 10, sortKey: 'CREATED', reverse: true }),
    ])
  } catch {
    // graceful fallback
  }

  return (
    <main id="main-content">
      {/* ─── 1. Announcement bar is mounted in site-header ─── */}

      {/* ─── 2. Hero Section ─── */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-secondary/40">
        <Image
          src="/images/meedora-campaign.png"
          alt="Meedora handcrafted jewelry — a woman adorning herself with gold-plated earrings"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        <div className="site-width relative z-10 py-20">
          <div className="flex max-w-xl flex-col gap-6 hero-reveal">
            <p className="eyebrow">Your everyday adore</p>
            <h1 className="display-heading text-4xl sm:text-5xl lg:text-6xl">
              Not waiting for an occasion.{' '}
              <span className="text-primary block mt-1">Just you, choosing you.</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground hero-reveal-delay">
              Handcrafted imitation jewelry for women who adorn themselves — not
              for someone else, not for a special day, but because they want to.
            </p>
            <div className="flex flex-wrap gap-3 hero-reveal-delay">
              <Button size="lg" render={<Link href="/collections/all" />}>
                Explore the collection <ArrowRight data-icon="inline-end" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/pages/about" />}
              >
                Our story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Shop by Category Grid ─── */}
      <CategoryGrid />

      {/* ─── 4. Bestsellers Carousel ─── */}
      {bestSellers.nodes.length > 0 && (
        <section className="site-width py-16 sm:py-20" aria-labelledby="bestsellers-heading">
          <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p className="eyebrow">Most loved</p>
              <h2 id="bestsellers-heading" className="display-heading text-3xl sm:text-4xl">
                Pieces Others Can&apos;t Stop Wearing
              </h2>
            </div>
            <Button
              variant="outline"
              size="default"
              render={<Link href="/collections/bestsellers" />}
            >
              View all bestsellers <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
          <ProductCarousel products={bestSellers.nodes} id="bestsellers" />
        </section>
      )}

      {/* ─── 5. Brand Story Strip ─── */}
      <section className="bg-secondary/40">
        <div className="site-width grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/images/meedora-ritual.png"
              alt="A woman in soft light touching a delicate necklace — the Meedora ritual of self-adornment"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-6">
            <p className="eyebrow">The Meedora ritual</p>
            <h2 className="display-heading text-3xl sm:text-4xl lg:text-5xl">
              A quiet act of choosing yourself
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
              Meedora was born from a simple idea — that adorning yourself
              doesn&apos;t need a reason. Not a wedding, not a festival, not
              someone else&apos;s approval. Just you, in front of a mirror,
              picking something that feels right.
            </p>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
              Every piece is handcrafted in India — gold-plated, carefully
              finished, designed to be worn every day and still feel special.
              This is jewelry as a personal ritual. Your everyday adore.
            </p>
            <div>
              <Link href="/pages/about" className="text-link inline-flex items-center gap-2">
                Read our full story <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Shop by Edit Banners ─── */}
      <EditBanners />

      {/* ─── 7. Gifting Section ─── */}
      <GiftingSection />

      {/* ─── 8. New Arrivals Carousel ─── */}
      {newArrivals.nodes.length > 0 && (
        <section className="site-width py-16 sm:py-20" aria-labelledby="new-arrivals-heading">
          <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p className="eyebrow">Just dropped</p>
              <h2 id="new-arrivals-heading" className="display-heading text-3xl sm:text-4xl">
                Fresh Off the Artisan&apos;s Bench
              </h2>
            </div>
            <Button
              variant="outline"
              size="default"
              render={<Link href="/collections/new-arrivals" />}
            >
              View all new arrivals <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
          <ProductCarousel products={newArrivals.nodes} id="new-arrivals" />
        </section>
      )}

      {/* ─── 9. Trust Strip ─── */}
      <section className="border-y border-border bg-background">
        <div className="site-width py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
                <Sparkles className="size-5 text-primary" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium">Handcrafted in India</p>
              <p className="text-xs text-muted-foreground">
                Every piece made & quality-checked by hand
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
                <ShieldCheck
                  className="size-5 text-primary"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-sm font-medium">Secure payments</p>
              <p className="text-xs text-muted-foreground">
                UPI, cards, net banking — safe & encrypted
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
                <Truck className="size-5 text-primary" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium">Pan-India delivery</p>
              <p className="text-xs text-muted-foreground">
                Tracked shipping, right to your door
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
                <Heart className="size-5 text-primary" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium">Easy returns</p>
              <p className="text-xs text-muted-foreground">
                Hassle-free exchanges & returns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 11. Footer with Newsletter is in site-footer.tsx ─── */}
    </main>
  )
}
