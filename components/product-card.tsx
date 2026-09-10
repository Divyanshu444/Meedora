import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Star } from 'lucide-react'
import type { Product } from '@/lib/shopify-types'
import { Price } from './price'

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product
  priority?: boolean
}) {
  const firstVariant = product.variants?.nodes?.[0]
  const currentPrice = product.priceRange?.minVariantPrice ?? firstVariant?.price
  const compareAtPrice = firstVariant?.compareAtPrice

  const hasDiscount =
    Boolean(compareAtPrice && currentPrice) &&
    parseFloat(compareAtPrice!.amount) > parseFloat(currentPrice!.amount)

  const discountPercentage = hasDiscount
    ? Math.round(
        ((parseFloat(compareAtPrice!.amount) -
          parseFloat(currentPrice!.amount)) /
          parseFloat(compareAtPrice!.amount)) *
          100
      )
    : 0

  return (
    <article className="group flex min-w-0 flex-col gap-3">
      {/* Image container */}
      <Link
        href={`/products/${product.handle}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-secondary/40"
      >
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? `${product.title} by Meedora`}
            fill
            sizes="(max-width: 767px) 48vw, (max-width: 1024px) 32vw, 24vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <span className="flex h-full items-center justify-center p-6 text-center font-serif text-2xl">
            {product.title}
          </span>
        )}

        {/* Badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5">
          {!product.availableForSale && (
            <span className="rounded-xs bg-background/90 px-2 py-0.5 text-xs font-medium text-foreground backdrop-blur-xs">
              Sold out
            </span>
          )}
          {hasDiscount && product.availableForSale && (
            <span className="rounded-xs bg-primary px-2 py-0.5 text-[11px] font-semibold tracking-wider text-primary-foreground">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Quick action button */}
        <span className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-xs backdrop-blur-xs transition-transform duration-300 group-hover:-rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight className="size-4" />
          <span className="sr-only">View {product.title}</span>
        </span>
      </Link>

      {/* Info & Price */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{product.productType || 'Handcrafted'}</span>
          <div className="flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400">
            <Star className="size-3 fill-current text-current" />
            <span>4.8</span>
          </div>
        </div>

        <Link
          href={`/products/${product.handle}`}
          className="font-serif text-base font-normal leading-snug tracking-tight text-foreground transition-colors hover:text-primary md:text-lg"
        >
          {product.title}
        </Link>

        <div className="mt-0.5 flex items-baseline gap-2">
          {currentPrice && (
            <Price
              money={currentPrice}
              className="text-sm font-semibold text-foreground md:text-base"
            />
          )}
          {hasDiscount && compareAtPrice && (
            <span className="text-xs text-muted-foreground line-through decoration-muted-foreground/60">
              <Price money={compareAtPrice} />
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
