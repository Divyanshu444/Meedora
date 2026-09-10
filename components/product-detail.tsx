'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, LockKeyhole, LoaderCircle, PackageCheck, Plus, Minus, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/shopify-types'
import { Price } from './price'
import { useCart } from './cart-provider'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'

export function ProductDetail({ product }: { product: Product }) {
  const [imageIndex, setImageIndex] = useState(0)
  const [variantId, setVariantId] = useState(product.variants.nodes.find(v => v.availableForSale)?.id ?? product.variants.nodes[0]?.id)
  const [quantity, setQuantity] = useState(1)
  const [zoom, setZoom] = useState(false)
  const { update, pending } = useCart()
  const variant = product.variants.nodes.find(v => v.id === variantId)
  const images = product.images.nodes
  const image = images[imageIndex]
  const details = product.metafields.filter((m): m is NonNullable<typeof m> => Boolean(m?.value))
  const labels: Record<string, string> = { material: 'Materials', plating: 'Finish & plating', care: 'A little care goes a long way', styling: 'Make it your own', size: 'Size & fit' }
  const add = () => { if (variant) void update({ action: 'add', merchandiseId: variant.id, quantity }) }
  return <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
    <div className="flex min-w-0 flex-col gap-4"><div className="relative aspect-square overflow-hidden rounded-sm bg-secondary/50">{image && <button onClick={() => setZoom(true)} aria-label="Enlarge product photograph" className="block size-full"><Image src={image.url} alt={image.altText ?? product.title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-110" /><span className="absolute bottom-4 right-4 rounded-full bg-background p-3 text-foreground"><ZoomIn className="size-5" /></span></button>}{images.length > 1 && <div className="absolute bottom-4 left-4 flex gap-2"><Button variant="secondary" size="icon-lg" aria-label="Previous image" onClick={() => setImageIndex((imageIndex - 1 + images.length) % images.length)}><ChevronLeft /></Button><Button variant="secondary" size="icon-lg" aria-label="Next image" onClick={() => setImageIndex((imageIndex + 1) % images.length)}><ChevronRight /></Button></div>}</div>{images.length > 1 && <div className="flex snap-x gap-3 overflow-x-auto">{images.map((img, index) => <button key={img.url} onClick={() => setImageIndex(index)} aria-label={`View photo ${index + 1}`} aria-pressed={imageIndex === index} className={cn('relative size-20 shrink-0 snap-start overflow-hidden rounded-sm border-2', imageIndex === index ? 'border-primary' : 'border-transparent')}><Image src={img.url} alt={img.altText ?? `${product.title}, photo ${index + 1}`} fill sizes="80px" className="object-cover" /></button>)}</div>}</div>
    <div className="flex flex-col gap-6 lg:py-5"><div className="flex flex-col gap-3"><p className="eyebrow">{product.productType || 'A little everyday adore'}</p><h1 className="display-heading text-4xl sm:text-5xl">{product.title}</h1><div className="flex items-center gap-3"><Price money={variant?.price ?? product.priceRange.minVariantPrice} className="text-xl" />{variant?.compareAtPrice && Number(variant.compareAtPrice.amount) > Number(variant.price.amount) && <Price money={variant.compareAtPrice} className="text-muted-foreground line-through" />}</div><p className="text-sm text-muted-foreground">{variant?.price.currencyCode ?? product.priceRange.minVariantPrice.currencyCode} · Shipping calculated at checkout</p></div>
      <p className="max-w-lg text-base leading-relaxed text-muted-foreground">{product.description}</p>
      {product.variants.nodes.length > 1 && <fieldset className="flex flex-col gap-3"><legend className="mb-3 text-sm">Choose your finish or size</legend><div className="flex flex-wrap gap-2">{product.variants.nodes.map(v => <label key={v.id} className={cn('cursor-pointer rounded-sm border px-4 py-3 text-sm has-focus-visible:ring-2 has-focus-visible:ring-ring', v.id === variantId ? 'border-primary bg-secondary/50' : 'border-border', !v.availableForSale && 'opacity-50')}><input type="radio" name="variant" value={v.id} checked={v.id === variantId} onChange={() => { setVariantId(v.id); const matching = images.findIndex(i => i.url === v.image?.url); if (matching >= 0) setImageIndex(matching) }} className="sr-only" />{v.title}{!v.availableForSale && ' — sold out'}</label>)}</div></fieldset>}
      <Link href="/pages/size-guide" className="text-link">A note on size & fit <ArrowRight className="size-4" /></Link>
      <div className="flex gap-3"><div className="flex h-12 items-center border border-border"><Button variant="ghost" size="icon-lg" aria-label="Decrease quantity" disabled={quantity <= 1 || pending} onClick={() => setQuantity(q => q - 1)}><Minus /></Button><span className="min-w-8 text-center">{quantity}</span><Button variant="ghost" size="icon-lg" aria-label="Increase quantity" disabled={quantity >= 10 || pending} onClick={() => setQuantity(q => q + 1)}><Plus /></Button></div><Button size="lg" className="flex-1" onClick={add} disabled={pending || !variant?.availableForSale}>{pending ? <><LoaderCircle className="animate-spin" /> Adding to your bag…</> : variant?.availableForSale ? <>Add to bag <ArrowRight data-icon="inline-end" /></> : 'Currently sold out'}</Button></div>
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"><span className="flex items-center gap-2"><LockKeyhole className="size-4" /> Secure checkout</span><Link href="/pages/shipping" className="flex items-center gap-2 underline-offset-4 hover:underline"><PackageCheck className="size-4" /> Delivery information</Link></div>
      <Accordion className="border-t border-border">{details.map(detail => <AccordionItem key={detail.key} value={detail.key}><AccordionTrigger>{labels[detail.key] ?? detail.key}</AccordionTrigger><AccordionContent><p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground">{detail.value}</p></AccordionContent></AccordionItem>)}<AccordionItem value="shipping"><AccordionTrigger>Shipping & returns</AccordionTrigger><AccordionContent><p className="text-base leading-relaxed text-muted-foreground">Available delivery options and charges are shown before payment at checkout. Please read our <Link className="underline underline-offset-4" href="/pages/shipping">shipping information</Link> and <Link className="underline underline-offset-4" href="/pages/returns">returns policy</Link> before ordering.</p></AccordionContent></AccordionItem></Accordion>
    </div>
    <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-border bg-background px-5 py-3 lg:hidden"><Price money={variant?.price ?? product.priceRange.minVariantPrice} /><Button size="lg" disabled={pending || !variant?.availableForSale} onClick={add}>{pending ? 'Adding…' : variant?.availableForSale ? 'Add to bag' : 'Sold out'} <ArrowRight data-icon="inline-end" /></Button></div>
    <Sheet open={zoom} onOpenChange={setZoom}><SheetContent className="data-[side=right]:w-full data-[side=right]:sm:max-w-3xl"><SheetHeader><SheetTitle>{product.title}</SheetTitle><SheetDescription>A closer look at your next favourite piece.</SheetDescription></SheetHeader>{image && <div className="relative min-h-0 flex-1"><Image src={image.url} alt={image.altText ?? product.title} fill sizes="90vw" className="object-contain" /></div>}</SheetContent></Sheet>
  </div>
}
