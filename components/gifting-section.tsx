import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Gift, Heart, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function GiftingSection() {
  return (
    <section className="site-width py-16 sm:py-20" aria-labelledby="gifting-section-heading">
      <div className="overflow-hidden rounded-sm border border-border/80 bg-secondary/40 p-6 sm:p-10 lg:p-12">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center justify-center gap-2 md:justify-start">
              <Gift className="size-4 text-primary" />
              <p className="eyebrow">The Meedora Gift Studio</p>
            </div>
            <h2 id="gifting-section-heading" className="display-heading text-3xl sm:text-4xl">
              Gift Yourself Adornment — Or Someone You Adore
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground">
              Every Meedora order arrives in our signature blush keepsake box with an anti-tarnish pouch, ready to bring an instant smile.
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            render={<Link href="/pages/gift-store" />}
            className="shrink-0"
          >
            Visit the Gift Store <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

        {/* 2 Featured Gifting Banners */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Under ₹999 Card */}
          <Link
            href="/collections/gifts-under-999"
            className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-sm border border-border/50 bg-background p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg sm:p-8"
          >
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  Pocket Friendly
                </span>
                <span className="text-xs text-muted-foreground">Under ₹999</span>
              </div>
              <h3 className="font-serif text-2xl font-medium sm:text-3xl">
                Thoughtful Treasures Under ₹999
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Everyday studs, dainty pendant chains, and rings that look twice their price tag.
              </p>
              <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary">
                <span>Shop under ₹999</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            <div className="absolute right-4 top-4 text-secondary-foreground/10 transition-colors group-hover:text-primary/20">
              <Sparkles className="size-20" strokeWidth={1} />
            </div>
          </Link>

          {/* Gifts for Her Card */}
          <Link
            href="/collections/gifts-for-her"
            className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-sm border border-border/50 bg-background p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg sm:p-8"
          >
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  Most Loved
                </span>
                <span className="text-xs text-muted-foreground">For Her</span>
              </div>
              <h3 className="font-serif text-2xl font-medium sm:text-3xl">
                Gifts for Her: Sister, Friend, or You
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Timeless pieces crafted with emotional warmth and high-durability 18k-tone sheen.
              </p>
              <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary">
                <span>Discover gifts for her</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            <div className="absolute right-4 top-4 text-secondary-foreground/10 transition-colors group-hover:text-primary/20">
              <Heart className="size-20" strokeWidth={1} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
