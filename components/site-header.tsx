'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ChevronDown, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import type { Collection } from '@/lib/shopify-types'
import { categoryCollections, editCollections, specialCollections, giftingCollections } from '@/lib/site'
import { cn } from '@/lib/utils'
import { useCart } from './cart-provider'
import { CartDrawer } from './cart-drawer'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

export function Wordmark({ footer = false }: { footer?: boolean }) {
  return (
    <Link href="/" aria-label="Meedora home" className="flex w-fit flex-col items-center">
      <span className={cn('font-serif leading-none tracking-[-0.055em]', footer ? 'text-5xl' : 'text-[38px]')}>
        meedora<span className="text-primary">.</span>
      </span>
      <span className="mt-1 text-[14px] leading-none tracking-[0.09em]">Your everyday adore</span>
    </Link>
  )
}

function MegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="absolute left-0 right-0 top-full z-40 border-b border-border bg-background shadow-lg" ref={ref}>
      <div className="site-width grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* By Category */}
        <div>
          <p className="eyebrow mb-4">Shop by category</p>
          <ul className="flex flex-col gap-3">
            {categoryCollections.map((c) => (
              <li key={c.handle}>
                <Link
                  href={`/collections/${c.handle}`}
                  onClick={onClose}
                  className="text-sm transition-colors hover:text-primary"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* By Edit */}
        <div>
          <p className="eyebrow mb-4">Shop by edit</p>
          <ul className="flex flex-col gap-3">
            {editCollections.map((c) => (
              <li key={c.handle}>
                <Link
                  href={`/collections/${c.handle}`}
                  onClick={onClose}
                  className="group flex flex-col gap-1"
                >
                  <span className="text-sm font-medium transition-colors group-hover:text-primary">
                    {c.title}
                  </span>
                  <span className="text-xs text-muted-foreground">{c.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Gifting */}
        <div>
          <p className="eyebrow mb-4">Gifting</p>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                href="/pages/gift-store"
                onClick={onClose}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Gift store
              </Link>
            </li>
            {giftingCollections.map((c) => (
              <li key={c.handle}>
                <Link
                  href={`/collections/${c.handle}`}
                  onClick={onClose}
                  className="text-sm transition-colors hover:text-primary"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Special */}
        <div>
          <p className="eyebrow mb-4">Discover</p>
          <ul className="flex flex-col gap-3">
            {specialCollections.map((c) => (
              <li key={c.handle}>
                <Link
                  href={`/collections/${c.handle}`}
                  onClick={onClose}
                  className="text-sm transition-colors hover:text-primary"
                >
                  {c.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/collections/all"
                onClick={onClose}
                className="text-link mt-2"
              >
                Shop all <ArrowRight className="size-4" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function MobileMenu({
  open,
  onClose,
  shopUrl,
}: {
  open: boolean
  onClose: () => void
  shopUrl: string
}) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Explore Meedora</SheetTitle>
          <SheetDescription>Your next everyday favourite.</SheetDescription>
        </SheetHeader>
        <nav className="px-5 py-6" aria-label="Mobile navigation">
          <Accordion>
            <AccordionItem value="category">
              <AccordionTrigger className="font-serif text-xl">Shop by category</AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-4 py-2">
                  {categoryCollections.map((c) => (
                    <li key={c.handle}>
                      <Link
                        href={`/collections/${c.handle}`}
                        onClick={onClose}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="edit">
              <AccordionTrigger className="font-serif text-xl">Shop by edit</AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-4 py-2">
                  {editCollections.map((c) => (
                    <li key={c.handle}>
                      <Link
                        href={`/collections/${c.handle}`}
                        onClick={onClose}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="gifting">
              <AccordionTrigger className="font-serif text-xl">Gifting</AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-4 py-2">
                  <li>
                    <Link href="/pages/gift-store" onClick={onClose} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      Gift store
                    </Link>
                  </li>
                  {giftingCollections.map((c) => (
                    <li key={c.handle}>
                      <Link
                        href={`/collections/${c.handle}`}
                        onClick={onClose}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6">
            {specialCollections.map((c) => (
              <Link
                key={c.handle}
                href={`/collections/${c.handle}`}
                onClick={onClose}
                className="flex items-center justify-between font-serif text-xl"
              >
                {c.title} <ArrowRight className="size-4" />
              </Link>
            ))}
            <Link href="/collections/all" onClick={onClose} className="flex items-center justify-between font-serif text-xl">
              Shop all <ArrowRight className="size-4" />
            </Link>
            <Link href="/pages/about" onClick={onClose} className="flex items-center justify-between font-serif text-xl">
              Our story <ArrowRight className="size-4" />
            </Link>
          </div>

          {shopUrl && (
            <div className="mt-6 border-t border-border pt-6">
              <a
                href={`${shopUrl}/account`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <UserRound className="size-4" /> My account
              </a>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export function SiteHeader({ collections: _collections, shopUrl }: { collections: Collection[]; shopUrl: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const path = usePathname()
  const { cart, setOpen } = useCart()

  // Close mega menu on route change
  useEffect(() => {
    setMegaOpen(false)
    setMenuOpen(false)
  }, [path])

  return (
    <>
      {/* Announcement bar */}
      <div className="flex h-9 items-center justify-center bg-secondary px-4 text-center text-sm text-secondary-foreground">
        Free shipping on orders above ₹1,499{' '}
        <span className="ml-2 hidden sm:inline">· Your everyday adore</span>
      </div>

      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="site-width flex h-24 items-center justify-between">
          {/* Left: Hamburger (mobile) + Wordmark */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon-lg"
              className="lg:hidden"
              aria-label="Open navigation"
              onClick={() => setMenuOpen(true)}
            >
              <Menu />
            </Button>
            <Wordmark />
          </div>

          {/* Center: Desktop nav */}
          <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
            <button
              onClick={() => setMegaOpen(!megaOpen)}
              className={cn(
                'flex items-center gap-1 border-b py-2 text-sm transition-colors hover:text-primary',
                megaOpen ? 'border-primary' : 'border-transparent'
              )}
              aria-expanded={megaOpen}
              aria-haspopup="true"
            >
              Shop <ChevronDown className={cn('size-3 transition-transform', megaOpen && 'rotate-180')} />
            </button>
            <Link
              href="/collections/new-arrivals"
              className={cn(
                'border-b py-2 text-sm transition-colors hover:text-primary',
                path === '/collections/new-arrivals' ? 'border-primary' : 'border-transparent'
              )}
            >
              New arrivals
            </Link>
            <Link
              href="/collections/bestsellers"
              className={cn(
                'border-b py-2 text-sm transition-colors hover:text-primary',
                path === '/collections/bestsellers' ? 'border-primary' : 'border-transparent'
              )}
            >
              Bestsellers
            </Link>
            <Link
              href="/pages/about"
              className={cn(
                'border-b py-2 text-sm transition-colors hover:text-primary',
                path === '/pages/about' ? 'border-primary' : 'border-transparent'
              )}
            >
              Our story
            </Link>
          </nav>

          {/* Right: Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon-lg" aria-label="Search jewelry" onClick={() => setSearchOpen(true)}>
              <Search />
            </Button>
            {shopUrl && (
              <Button
                variant="ghost"
                size="icon-lg"
                className="hidden sm:inline-flex"
                render={<a href={`${shopUrl}/account`} target="_blank" rel="noopener noreferrer" />}
                aria-label="Shopify customer account"
              >
                <UserRound />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon-lg"
              className="relative"
              aria-label={`Open shopping bag${cart?.totalQuantity ? `, ${cart.totalQuantity} items` : ''}`}
              onClick={() => setOpen(true)}
            >
              <ShoppingBag />
              {Boolean(cart?.totalQuantity) && (
                <span className="absolute -right-2 -top-1 flex size-5 items-center justify-center rounded-full bg-secondary text-sm text-secondary-foreground">
                  {cart?.totalQuantity}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mega menu dropdown */}
        <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
      </header>

      {/* Mobile menu */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} shopUrl={shopUrl} />

      {/* Search sheet */}
      <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
        <SheetContent side="top" className="px-5 pb-10 pt-5">
          <SheetHeader className="mx-auto w-full max-w-2xl">
            <SheetTitle>Find your kind of adore</SheetTitle>
            <SheetDescription>Search for a piece, a detail, a little feeling.</SheetDescription>
          </SheetHeader>
          <form
            action="/search"
            onSubmit={() => setSearchOpen(false)}
            className="mx-auto flex w-full max-w-2xl items-end gap-3"
          >
            <Field>
              <FieldLabel htmlFor="header-search" className="sr-only">
                Search jewelry
              </FieldLabel>
              <Input
                id="header-search"
                name="q"
                required
                maxLength={100}
                placeholder="Try hoops, jhumkas, a little gold…"
                className="h-12"
              />
            </Field>
            <Button type="submit" size="lg" aria-label="Submit search">
              <Search />
            </Button>
          </form>
        </SheetContent>
      </Sheet>

      <CartDrawer />
    </>
  )
}
