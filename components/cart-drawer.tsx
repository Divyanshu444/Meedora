'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, LockKeyhole, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { trackInitiateCheckout } from './analytics'
import { useCart } from './cart-provider'
import { Price } from './price'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from '@/components/ui/empty'
import { Separator } from '@/components/ui/separator'

export function CartDrawer() {
  const { cart, open, setOpen, pending, loading, error, retry, update } = useCart()
  function checkout() {
    if (!cart?.checkoutUrl) return
    trackInitiateCheckout({
      totalAmount: cart.cost.subtotalAmount.amount,
      currency: cart.cost.subtotalAmount.currencyCode,
      itemsCount: cart.totalQuantity,
    })
    const url = new URL(cart.checkoutUrl)
    if (url.protocol !== 'https:') return
    url.searchParams.set('channel', 'online_store')
    if (window.self !== window.top) window.open(url.toString(), '_blank', 'noopener,noreferrer')
    else window.location.assign(url.toString())
  }
  return <Sheet open={open} onOpenChange={setOpen}><SheetContent className="w-full data-[side=right]:w-full sm:max-w-lg data-[side=right]:sm:max-w-lg">
    <SheetHeader className="px-6 pt-7"><SheetTitle>Your bag {cart?.totalQuantity ? `(${cart.totalQuantity})` : ''}</SheetTitle><SheetDescription>A little something, just for you.</SheetDescription></SheetHeader>
    <Separator />
    {loading ? <p role="status" className="px-6 py-12 text-muted-foreground">Opening your bag…</p> : error ? <Empty><EmptyHeader><EmptyTitle>Your bag needs a moment</EmptyTitle><EmptyDescription>We couldn&apos;t connect to the shop.</EmptyDescription></EmptyHeader><EmptyContent><Button onClick={retry}>Try again</Button></EmptyContent></Empty> : !cart?.lines.nodes.length ? <Empty className="flex-1"><EmptyHeader><ShoppingBag className="mx-auto size-9 text-primary" strokeWidth={1} /><EmptyTitle>A little room for adore</EmptyTitle><EmptyDescription>Your bag is empty. Find a piece that feels like you.</EmptyDescription></EmptyHeader><EmptyContent><Button size="lg" render={<Link href="/collections/all" onClick={() => setOpen(false)} />}>Explore the collection <ArrowRight data-icon="inline-end" /></Button></EmptyContent></Empty> : <>
      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 py-3" aria-live="polite">{cart.lines.nodes.map(line => <div key={line.id} className="flex gap-4">
        <Link href={`/products/${line.merchandise.product.handle}`} onClick={() => setOpen(false)} className="relative h-28 w-24 shrink-0 overflow-hidden rounded-sm bg-secondary">{line.merchandise.image && <Image src={line.merchandise.image.url} alt={line.merchandise.image.altText ?? line.merchandise.product.title} fill sizes="96px" className="object-cover" />}</Link>
        <div className="flex flex-1 flex-col gap-2"><Link href={`/products/${line.merchandise.product.handle}`} onClick={() => setOpen(false)} className="font-serif text-xl">{line.merchandise.product.title}</Link>{line.merchandise.title !== 'Default Title' && <span className="text-sm text-muted-foreground">{line.merchandise.title}</span>}<Price money={line.cost.totalAmount} /><div className="mt-auto flex items-center justify-between"><div className="flex items-center border border-border"><Button size="icon" variant="ghost" aria-label={`Decrease ${line.merchandise.product.title} quantity`} disabled={pending || line.quantity <= 1} onClick={() => update({ action: 'update', lineId: line.id, quantity: line.quantity - 1 })}><Minus /></Button><span className="min-w-8 text-center text-sm">{line.quantity}</span><Button size="icon" variant="ghost" aria-label={`Increase ${line.merchandise.product.title} quantity`} disabled={pending || line.quantity >= 10} onClick={() => update({ action: 'update', lineId: line.id, quantity: line.quantity + 1 })}><Plus /></Button></div><Button variant="ghost" size="icon" aria-label={`Remove ${line.merchandise.product.title}`} disabled={pending} onClick={() => update({ action: 'remove', lineId: line.id })}><Trash2 /></Button></div></div>
      </div>)}</div>
      <div className="flex flex-col gap-4 border-t border-border px-6 pb-7 pt-5"><div className="flex items-center justify-between text-lg"><span>Subtotal</span><Price money={cart.cost.subtotalAmount} /></div><p className="text-sm text-muted-foreground">Shipping and taxes calculated at checkout.</p><Button size="lg" onClick={checkout} disabled={pending}>Continue to checkout <ArrowRight data-icon="inline-end" /></Button><p className="flex items-center justify-center gap-2 text-sm text-muted-foreground"><LockKeyhole className="size-4" /> Secure checkout by Shopify</p></div>
    </>}
  </SheetContent></Sheet>
}
