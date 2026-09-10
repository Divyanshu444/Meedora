import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { editCollections } from '@/lib/site'

const editDetails: Record<
  string,
  { tag: string; headline: string; image: string; alt: string }
> = {
  everyday: {
    tag: 'Effortless Wear',
    headline: 'No occasion needed. Just you, choosing you.',
    image: '/images/meedora-ritual.png',
    alt: 'Everyday handcrafted jewelry worn casually in soft natural light',
  },
  festive: {
    tag: 'Celebration Ready',
    headline: 'A little extra shimmer for weddings & festivities.',
    image: '/images/meedora-campaign.png',
    alt: 'Festive gold-plated statement jewelry with intricate detailing',
  },
  'gifting-edit': {
    tag: 'Curated Keepsakes',
    headline: 'Gifts boxed with love, meant to be cherished forever.',
    image: '/images/products/sitara-necklace.png',
    alt: 'Curated gift jewelry with delicate packaging',
  },
}

export function EditBanners() {
  return (
    <section className="bg-secondary/30 py-16 sm:py-20" aria-labelledby="edit-banners-heading">
      <div className="site-width">
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <p className="eyebrow">Shop by style & mood</p>
          </div>
          <h2 id="edit-banners-heading" className="display-heading text-3xl sm:text-4xl">
            Curated Edits for Every Moment
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Whether you are stacking chains for work, dressing for sangeet, or finding a birthday treasure.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {editCollections.map((edit) => {
            const meta = editDetails[edit.handle] || {
              tag: 'Curated',
              headline: edit.description,
              image: '/images/meedora-campaign.png',
              alt: edit.title,
            }

            return (
              <Link
                key={edit.handle}
                href={`/collections/${edit.handle}`}
                className="group relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-sm bg-secondary p-6 transition-all duration-500 hover:shadow-xl sm:min-h-[420px] sm:p-8"
              >
                {/* Background image */}
                <Image
                  src={meta.image}
                  alt={meta.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Rich gradient overlay for high contrast & luxury aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/10 transition-opacity duration-300 group-hover:from-background/90" />

                {/* Content */}
                <div className="relative z-10 flex flex-col gap-2.5">
                  <span className="eyebrow text-primary-foreground/90 font-medium tracking-widest text-[11px]">
                    {meta.tag}
                  </span>
                  <h3 className="font-serif text-2xl font-normal leading-tight text-foreground sm:text-3xl">
                    {edit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {meta.headline}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-all duration-300 group-hover:text-primary">
                    <span>Explore {edit.title}</span>
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
