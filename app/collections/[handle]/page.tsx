import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { getCollection, getCollections, getProducts } from '@/lib/shopify'
import { ProductGrid } from '@/components/product-card'
import { SortSelect } from '@/components/sort-select'
import { CollectionFilters } from '@/components/collection-filters'
import { siteUrl } from '@/lib/site'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const collections = await getCollections()
    return [{ handle: 'all' }, ...collections.map((c) => ({ handle: c.handle }))]
  } catch {
    return [{ handle: 'all' }]
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  if (handle === 'all') {
    return {
      title: 'All jewelry',
      description:
        'Explore the full Meedora collection — handcrafted earrings, necklaces, rings, and more. Gold-plated imitation jewelry designed for everyday wear.',
      alternates: { canonical: '/collections/all' },
    }
  }
  try {
    const collection = await getCollection(handle)
    if (!collection) return { title: 'Collection not found' }
    return {
      title: collection.seo.title || collection.title,
      description:
        collection.seo.description ||
        collection.description?.slice(0, 160) ||
        `Shop the ${collection.title} collection by Meedora.`,
      alternates: { canonical: `/collections/${collection.handle}` },
      openGraph: {
        title: collection.title,
        description: collection.description?.slice(0, 160),
        images: collection.image ? [collection.image.url] : [],
      },
    }
  } catch {
    return { title: 'Collection' }
  }
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>
  searchParams: Promise<{ sort?: string; price?: string; metal?: string; style?: string }>
}) {
  const { handle } = await params
  const { sort, price, metal, style } = await searchParams

  const sortMap: Record<string, { sortKey: string; reverse: boolean }> = {
    'price-asc': { sortKey: 'PRICE', reverse: false },
    'price-desc': { sortKey: 'PRICE', reverse: true },
    newest: { sortKey: 'CREATED', reverse: true },
  }
  const sortOptions = sort && sortMap[sort] ? sortMap[sort] : undefined

  let title = 'All jewelry'
  let description = ''
  let bannerImage: { url: string; altText: string | null } | null = null
  let products: Awaited<ReturnType<typeof getProducts>>['nodes'] = []

  try {
    if (handle === 'all') {
      const result = await getProducts({
        first: 100,
        sortKey: sortOptions?.sortKey ?? 'BEST_SELLING',
        reverse: sortOptions?.reverse,
      })
      products = result.nodes
    } else {
      const collection = await getCollection(handle, {
        first: 100,
        sortKey:
          sortOptions?.sortKey === 'PRICE'
            ? 'PRICE'
            : sortOptions?.sortKey === 'CREATED'
            ? 'CREATED'
            : 'MANUAL',
        reverse: sortOptions?.reverse,
      })
      if (!collection) notFound()
      title = collection.title
      description = collection.description
      bannerImage = collection.image
      products = collection.products.nodes
    }
  } catch {
    // Shopify fallback handled inside lib/shopify
  }

  // Filter products based on URL parameters
  const filteredProducts = products.filter((p) => {
    // 1. Price filter
    if (price) {
      const pAmt = parseFloat(p.priceRange.minVariantPrice.amount)
      if (price === '0-1000' && pAmt > 1000) return false
      if (price === '1000-2000' && (pAmt < 1000 || pAmt > 2000)) return false
      if (price === '2000-3500' && (pAmt < 2000 || pAmt > 3500)) return false
      if (price === '3500-inf' && pAmt < 3500) return false
    }

    // 2. Metal tone filter
    if (metal) {
      const metalNormalized = metal.replace(/-/g, ' ').toLowerCase()
      const matchTags = p.tags?.some((t) => t.toLowerCase().includes(metalNormalized))
      const matchTitle = p.title.toLowerCase().includes(metalNormalized)
      const matchMeta = p.metafields?.some((m) =>
        m?.value?.toLowerCase().includes(metalNormalized)
      )
      const matchDesc = p.description?.toLowerCase().includes(metalNormalized)
      if (!matchTags && !matchTitle && !matchMeta && !matchDesc) return false
    }

    // 3. Style / occasion filter
    if (style) {
      const styleNormalized = style.toLowerCase()
      const matchTags = p.tags?.some((t) => t.toLowerCase().includes(styleNormalized))
      const matchTitle = p.title.toLowerCase().includes(styleNormalized)
      const matchDesc = p.description?.toLowerCase().includes(styleNormalized)
      if (!matchTags && !matchTitle && !matchDesc) return false
    }

    return true
  })

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: `${siteUrl}/collections/${handle}`,
  }

  return (
    <main id="main-content" className="site-width pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 py-6 text-sm text-muted-foreground"
      >
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="size-3" />
        {handle === 'all' ? (
          <span aria-current="page">All jewelry</span>
        ) : (
          <>
            <Link href="/collections/all" className="hover:text-foreground">
              All jewelry
            </Link>
            <ChevronRight className="size-3" />
            <span aria-current="page">{title}</span>
          </>
        )}
      </nav>

      {/* Collection Header */}
      <header className="mb-8">
        {bannerImage ? (
          <div className="relative mb-8 aspect-[3/1] overflow-hidden rounded-sm bg-secondary/30">
            <Image
              src={bannerImage.url}
              alt={bannerImage.altText ?? `${title} collection by Meedora`}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-10">
              <h1 className="display-heading text-4xl text-white sm:text-5xl">{title}</h1>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="display-heading text-4xl sm:text-5xl">{title}</h1>
            {description && (
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
      </header>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between pb-2">
          <div className="hidden sm:block">
            {/* Desktop label */}
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Filter Collection
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs text-muted-foreground sm:text-sm">
              Sort by
            </label>
            <SortSelect current={sort} />
          </div>
        </div>

        {/* Filters bar */}
        <CollectionFilters totalCount={filteredProducts.length} />
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="font-serif text-2xl">No pieces matched your filters</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your price range, metal tone, or occasion filters.
          </p>
          <Link
            href={`/collections/${handle}`}
            className="text-link inline-flex items-center gap-1.5"
          >
            Reset all filters
          </Link>
        </div>
      )}
    </main>
  )
}
