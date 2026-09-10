import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { categoryCollections } from '@/lib/site'

const categoryMeta: Record<
  string,
  { image: string; countText: string; alt: string }
> = {
  earrings: {
    image: '/images/products/aira-hoops.png',
    countText: 'Hoops, studs & jhumkas',
    alt: 'Handcrafted gold-plated earrings collection',
  },
  'necklaces-pendants': {
    image: '/images/products/sitara-necklace.png',
    countText: 'Chains, chokers & pendants',
    alt: 'Delicate gold-plated necklaces and pendants',
  },
  rings: {
    image: '/images/products/gul-ring.png',
    countText: 'Statement & everyday bands',
    alt: 'Handcrafted adjustable rings',
  },
  bracelets: {
    image: '/images/products/aira-hoops.png',
    countText: 'Bangles, cuffs & chains',
    alt: 'Handcrafted bracelets and bangles',
  },
  anklets: {
    image: '/images/products/noor-jhumkas.png',
    countText: 'Delicate payals & bells',
    alt: 'Handcrafted everyday anklets',
  },
  sets: {
    image: '/images/products/sitara-necklace.png',
    countText: 'Coordinated festive sets',
    alt: 'Complete jewellery sets',
  },
}

export function CategoryGrid() {
  return (
    <section className="site-width py-16 sm:py-20" aria-labelledby="category-grid-heading">
      <div className="mb-10 flex flex-col items-center gap-2 text-center">
        <p className="eyebrow">Discover by category</p>
        <h2 id="category-grid-heading" className="display-heading text-3xl sm:text-4xl">
          Find your everyday adore
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Handcrafted in India with enduring 18k-tone plating, designed to be stacked or worn solo.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
        {categoryCollections.map((cat) => {
          const meta = categoryMeta[cat.handle] || {
            image: '/images/products/aira-hoops.png',
            countText: 'Explore pieces',
            alt: cat.title,
          }

          return (
            <Link
              key={cat.handle}
              href={`/collections/${cat.handle}`}
              className="group relative flex flex-col overflow-hidden rounded-sm border border-border/60 bg-secondary/30 transition-all duration-300 hover:border-primary/50 hover:shadow-md"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-secondary/50">
                <Image
                  src={meta.image}
                  alt={meta.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <span className="absolute bottom-2.5 right-2.5 flex size-7 items-center justify-center rounded-full bg-background/80 text-foreground shadow-xs backdrop-blur-sm transition-transform duration-300 group-hover:-rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowRight className="size-3.5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
                <h3 className="font-serif text-base font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-lg">
                  {cat.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                  {meta.countText}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
