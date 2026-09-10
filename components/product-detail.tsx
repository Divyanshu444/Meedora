'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Flame,
  LockKeyhole,
  LoaderCircle,
  PackageCheck,
  Plus,
  Minus,
  Sparkles,
  Star,
  ZoomIn,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/shopify-types'
import { Price } from './price'
import { useCart } from './cart-provider'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { PincodeChecker } from './pincode-checker'
import { ProductReviews } from './product-reviews'

function getProductDetails(product: Product) {
  const existing = (product.metafields ?? []).filter(
    (m): m is NonNullable<typeof m> => Boolean(m?.value)
  )
  const existingKeys = new Set(existing.map((m) => m.key))

  const pType = (product.productType || '').toLowerCase()

  const defaults: Record<
    string,
    { material: string; plating: string; care: string; size: string; styling: string }
  > = {
    earrings: {
      material: 'Hypoallergenic lightweight brass base with precision prong settings',
      plating: '18k Micron Yellow Gold Plating with protective anti-tarnish e-coating',
      care: 'Store dry in the provided Meedora velvet pouch. Avoid direct contact with perfume and water.',
      size: 'Designed for lightweight, pressure-free all-day wear with secure snap or butterfly backings.',
      styling: 'Stacks cleanly with second-piercing studs or makes a warm everyday statement on its own.',
    },
    'necklaces & pendants': {
      material: 'Solid brass links with micro-faceted simulated stones',
      plating: '18k Micron Gold Plating with scratch-resistant lustrous finish',
      care: 'Store flat in box to prevent tangling; wipe gently with microfiber cloth after wear.',
      size: 'Includes 5cm extension chain to adjust drape over collarbones or higher neckline.',
      styling: 'Perfect for framing open collars, linen shirts, or layering with dainty choker chains.',
    },
    rings: {
      material: 'Lead and nickel-free comfort-molded brass alloy',
      plating: '18k High Micron Gold with double protective sealant',
      care: 'Remove before washing hands, applying sanitizer, or rigorous physical activity.',
      size: 'Contoured comfort band with adjustable sizing (fits standard Indian ring sizes 10–16).',
      styling: 'Wear solo on index finger for subtle impact or stack alongside minimalist bands.',
    },
    'bracelets & bangles': {
      material: 'Solid malleable brass with artisan-hammered or woven texture',
      plating: '18k Micron Gold Plating with anti-rust formulation',
      care: 'Store in individual soft pouch to prevent surface friction with other jewelry.',
      size: 'Adjustable circumference (fits wrist sizes 6 to 7.5 inches comfortably).',
      styling: 'Sits flush next to a metal watch or pairs with delicate payals and rings.',
    },
    anklets: {
      material: 'High-strength silver/gold plated core alloy with delicate bells',
      plating: 'Rhodium / 18k Gold protective seal for enduring shine',
      care: 'Keep away from damp surfaces and chlorinated pools; dry thoroughly if exposed to rain.',
      size: 'Standard 24cm chain with a 4cm extension hook for flexible ankle fit.',
      styling: 'Subtle musical chime and golden glimmer under ethnic skirts, sarees, or casual denims.',
    },
    'jewellery sets': {
      material: 'Artisan-crafted brass frameworks set with faceted stones and seed pearls',
      plating: '18k / 22k Antique heirloom tone plating with high durability seal',
      care: 'Store each set component in its dedicated box compartment to maintain symmetry.',
      size: 'Coordinated proportions — necklace fits neckline effortlessly with matching earrings.',
      styling: 'Takes all the guesswork out of styling for weddings, sangeet, and festive celebrations.',
    },
  }

  const matchedKey =
    Object.keys(defaults).find((k) => pType.includes(k.split(' ')[0])) || 'earrings'
  const categoryDefault = defaults[pType] || defaults[matchedKey]

  const result: { key: string; value: string }[] = [...existing]
  const requiredKeys = ['material', 'plating', 'care', 'size', 'styling'] as const

  for (const key of requiredKeys) {
    if (!existingKeys.has(key) && categoryDefault[key]) {
      result.push({ key, value: categoryDefault[key] })
    }
  }

  return result
}

export function ProductDetail({ product }: { product: Product }) {
  const [imageIndex, setImageIndex] = useState(0)
  const [variantId, setVariantId] = useState(
    product.variants.nodes.find((v) => v.availableForSale)?.id ??
      product.variants.nodes[0]?.id
  )
  const [quantity, setQuantity] = useState(1)
  const [zoom, setZoom] = useState(false)
  const { update, pending } = useCart()

  const variant = product.variants.nodes.find((v) => v.id === variantId)
  const images = product.images.nodes
  const image = images[imageIndex] ?? product.featuredImage

  const details = getProductDetails(product)
  const labels: Record<string, string> = {
    material: 'Materials & Craftsmanship',
    plating: 'Finish & Micron Plating',
    care: 'A Little Care Goes a Long Way',
    styling: 'Styling & Stacking Notes',
    size: 'Size & Fit Specifications',
  }

  const add = () => {
    if (variant) void update({ action: 'add', merchandiseId: variant.id, quantity })
  }

  const compareAt = variant?.compareAtPrice
  const currentPrice = variant?.price ?? product.priceRange.minVariantPrice
  const hasDiscount =
    Boolean(compareAt && currentPrice) &&
    parseFloat(compareAt!.amount) > parseFloat(currentPrice.amount)
  const discountPercent = hasDiscount
    ? Math.round(
        ((parseFloat(compareAt!.amount) - parseFloat(currentPrice.amount)) /
          parseFloat(compareAt!.amount)) *
          100
      )
    : 0

  return (
    <div className="flex flex-col gap-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* ─── Gallery Column ─── */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-sm bg-secondary/40">
            {image && (
              <button
                onClick={() => setZoom(true)}
                aria-label="Enlarge product photograph"
                className="block size-full cursor-zoom-in"
              >
                <Image
                  src={image.url}
                  alt={image.altText ?? product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
                <span className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur-xs transition-transform hover:scale-110">
                  <ZoomIn className="size-4" />
                </span>
              </button>
            )}

            {/* Badges */}
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {product.tags.includes('Bestseller') && (
                <span className="rounded-xs bg-foreground px-2.5 py-1 text-[11px] font-semibold tracking-wider text-background shadow-xs">
                  ★ BESTSELLER
                </span>
              )}
              {hasDiscount && (
                <span className="rounded-xs bg-primary px-2.5 py-1 text-[11px] font-bold tracking-wider text-primary-foreground shadow-xs">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Prev / Next controls */}
            {images.length > 1 && (
              <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none">
                <Button
                  variant="secondary"
                  size="icon-lg"
                  aria-label="Previous image"
                  onClick={() =>
                    setImageIndex((imageIndex - 1 + images.length) % images.length)
                  }
                  className="pointer-events-auto shadow-md"
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="secondary"
                  size="icon-lg"
                  aria-label="Next image"
                  onClick={() => setImageIndex((imageIndex + 1) % images.length)}
                  className="pointer-events-auto shadow-md"
                >
                  <ChevronRight />
                </Button>
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex snap-x gap-3 overflow-x-auto pb-1">
              {images.map((img, index) => (
                <button
                  key={`${img.url}-${index}`}
                  onClick={() => setImageIndex(index)}
                  aria-label={`View angle ${index + 1}`}
                  aria-pressed={imageIndex === index}
                  className={cn(
                    'relative size-20 shrink-0 snap-start overflow-hidden rounded-sm border-2 transition-all',
                    imageIndex === index
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border/60 hover:border-border opacity-70 hover:opacity-100'
                  )}
                >
                  <Image
                    src={img.url}
                    alt={img.altText ?? `${product.title}, photo ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ─── Details & Actions Column ─── */}
        <div className="flex flex-col gap-6 lg:py-2">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="eyebrow">{product.productType || 'Handcrafted Adornment'}</p>
              <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current text-current" />
                  ))}
                </div>
                <span className="font-semibold">4.9</span>
                <span className="text-muted-foreground">(38 reviews)</span>
              </div>
            </div>

            <h1 className="display-heading text-3xl sm:text-4xl lg:text-5xl leading-tight">
              {product.title}
            </h1>

            {/* Price section */}
            <div className="mt-1 flex items-baseline gap-3">
              <Price
                money={currentPrice}
                className="text-2xl sm:text-3xl font-semibold text-foreground"
              />
              {hasDiscount && compareAt && (
                <span className="text-base sm:text-lg text-muted-foreground line-through decoration-muted-foreground/60">
                  <Price money={compareAt} />
                </span>
              )}
              <span className="text-xs text-muted-foreground">
                (Inclusive of all taxes)
              </span>
            </div>

            {/* Urgency Badge */}
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-xs bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-800 dark:text-amber-300 w-fit">
              <Sparkles className="size-3 text-amber-600" />
              <span>Only 3 pieces left in this artisan batch</span>
            </div>
          </div>

          <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Variant Selector */}
          {product.variants.nodes.length > 1 ? (
            <fieldset className="flex flex-col gap-2.5">
              <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Select Option / Finish:
              </legend>
              <div className="flex flex-wrap gap-2">
                {product.variants.nodes.map((v) => {
                  const isSelected = v.id === variantId
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => {
                        setVariantId(v.id)
                        const matching = images.findIndex((i) => i.url === v.image?.url)
                        if (matching >= 0) setImageIndex(matching)
                      }}
                      className={cn(
                        'flex items-center gap-2 rounded-sm border px-4 py-2.5 text-sm transition-all',
                        isSelected
                          ? 'border-primary bg-secondary font-medium text-foreground ring-1 ring-primary'
                          : 'border-border bg-background hover:bg-secondary/40 text-muted-foreground',
                        !v.availableForSale && 'opacity-50 line-through'
                      )}
                    >
                      {isSelected && <Check className="size-3.5 text-primary" />}
                      <span>{v.title}</span>
                      {!v.availableForSale && ' (Sold out)'}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ) : (
            <div className="flex items-center gap-2 rounded-xs border border-border/70 bg-secondary/20 px-3.5 py-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Finish:</span>
              <span>18k Micron Gold Plating with Anti-Tarnish Seal</span>
              <span className="ml-auto text-emerald-600 dark:text-emerald-400 font-medium">
                ● In Stock
              </span>
            </div>
          )}

          {/* Quantity & Add to Bag */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex h-12 items-center rounded-sm border border-border bg-background">
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="Decrease quantity"
                disabled={quantity <= 1 || pending}
                onClick={() => setQuantity((q) => q - 1)}
              >
                <Minus />
              </Button>
              <span className="min-w-10 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="Increase quantity"
                disabled={quantity >= 10 || pending}
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus />
              </Button>
            </div>

            <Button
              size="lg"
              className="flex-1 text-base font-medium"
              onClick={add}
              disabled={pending || !variant?.availableForSale}
            >
              {pending ? (
                <>
                  <LoaderCircle className="animate-spin" /> Adding to your bag…
                </>
              ) : variant?.availableForSale ? (
                <>
                  Add to bag <ArrowRight data-icon="inline-end" />
                </>
              ) : (
                'Currently sold out'
              )}
            </Button>
          </div>

          {/* Pincode delivery estimator */}
          <PincodeChecker />

          {/* Trust points */}
          <div className="grid grid-cols-2 gap-3 border-y border-border py-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <LockKeyhole className="size-4 text-primary" />
              <span>100% Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <PackageCheck className="size-4 text-primary" />
              <span>Discreet Signature Gift Box</span>
            </div>
          </div>

          {/* Accordion Specification Sections */}
          <Accordion defaultValue={['material']} className="border-t border-border">
            {details.map((detail) => (
              <AccordionItem key={detail.key} value={detail.key}>
                <AccordionTrigger className="text-base font-serif">
                  {labels[detail.key] ?? detail.key}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {detail.value}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}

            <AccordionItem value="shipping">
              <AccordionTrigger className="text-base font-serif">
                Shipping & Easy Returns
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    All Meedora orders ship in our bespoke blush rigid presentation box
                    with an airtight anti-tarnish storage pouch.
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>
                      <strong>Metro Delivery:</strong> 2–4 business days via insured express air.
                    </li>
                    <li>
                      <strong>Standard Delivery:</strong> 4–6 business days across all serviceable PIN codes in India.
                    </li>
                    <li>
                      <strong>Returns:</strong> 7-day hassle-free exchange & return window.
                    </li>
                  </ul>
                  <p className="mt-1">
                    Read our full{' '}
                    <Link className="underline underline-offset-4 hover:text-foreground" href="/pages/shipping">
                      shipping guidelines
                    </Link>{' '}
                    and{' '}
                    <Link className="underline underline-offset-4 hover:text-foreground" href="/pages/returns">
                      return policy
                    </Link>
                    .
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* ─── Customer Reviews Section ─── */}
      <ProductReviews productTitle={product.title} productType={product.productType} />

      {/* ─── Sticky Mobile Add-to-Bag Bar ─── */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-border bg-background/95 px-5 py-3 backdrop-blur-md lg:hidden">
        <div className="flex flex-col">
          <span className="text-[11px] text-muted-foreground">Total Price</span>
          <Price
            money={currentPrice}
            className="text-base font-semibold text-foreground"
          />
        </div>
        <Button
          size="lg"
          disabled={pending || !variant?.availableForSale}
          onClick={add}
          className="font-medium"
        >
          {pending
            ? 'Adding…'
            : variant?.availableForSale
            ? 'Add to bag'
            : 'Sold out'}
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>

      {/* ─── Image Zoom Sheet ─── */}
      <Sheet open={zoom} onOpenChange={setZoom}>
        <SheetContent className="data-[side=right]:w-full data-[side=right]:sm:max-w-3xl">
          <SheetHeader>
            <SheetTitle className="font-serif text-2xl">{product.title}</SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground">
              A closer look at your next favourite piece
            </SheetDescription>
          </SheetHeader>
          {image && (
            <div className="relative min-h-0 flex-1 my-6 aspect-square w-full">
              <Image
                src={image.url}
                alt={image.altText ?? product.title}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
