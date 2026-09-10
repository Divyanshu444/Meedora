import Link from 'next/link'
import { ArrowRight, Heart, Mail, MessageCircle, ShieldCheck, Truck } from 'lucide-react'
import type { Collection } from '@/lib/shopify-types'
import { categoryCollections, editCollections, specialCollections, siteConfig } from '@/lib/site'
import { Wordmark } from './site-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const helpLinks = [
  { href: '/pages/shipping', label: 'Shipping information' },
  { href: '/pages/returns', label: 'Returns & exchanges' },
  { href: '/pages/size-guide', label: 'Size & fit guide' },
  { href: '/pages/care', label: 'Jewelry care' },
  { href: '/pages/faq', label: 'FAQ' },
  { href: '/pages/contact', label: 'Contact us' },
]

const brandLinks = [
  { href: '/pages/about', label: 'Our story' },
  { href: '/pages/gift-store', label: 'Gift store' },
  { href: '/pages/privacy', label: 'Privacy policy' },
  { href: '/pages/terms', label: 'Terms of service' },
]

export function SiteFooter({ collections: _collections }: { collections: Collection[] }) {
  const shopLinks = [
    { href: '/collections/all', label: 'Shop all' },
    ...categoryCollections.map(c => ({ href: `/collections/${c.handle}`, label: c.title })),
    ...specialCollections.map(c => ({ href: `/collections/${c.handle}`, label: c.title })),
  ]

  const editLinks = editCollections.map(c => ({ href: `/collections/${c.handle}`, label: c.title }))

  return (
    <footer className="bg-secondary" role="contentinfo">
      {/* Newsletter strip */}
      <div className="site-width py-16">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <Mail className="size-6 text-primary" strokeWidth={1.5} />
          <h2 className="display-heading text-3xl">A little something in your inbox</h2>
          <p className="text-sm text-muted-foreground">
            New pieces, styling notes, and a welcome offer for your first order.
          </p>
          <form className="flex w-full max-w-md gap-3" action="#newsletter" method="POST">
            <Input
              type="email"
              name="email"
              required
              placeholder="Your email address"
              aria-label="Email for newsletter"
              className="h-12 flex-1 bg-background"
            />
            <Button type="submit" size="lg" aria-label="Subscribe to newsletter">
              <ArrowRight />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>

      <Separator />

      {/* Trust strip */}
      <div className="site-width py-10">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <ShieldCheck className="size-6 text-primary" strokeWidth={1.5} />
            <p className="text-sm font-medium">Secure checkout</p>
            <p className="text-xs text-muted-foreground">Powered by Shopify & Razorpay</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <Truck className="size-6 text-primary" strokeWidth={1.5} />
            <p className="text-sm font-medium">Pan-India delivery</p>
            <p className="text-xs text-muted-foreground">Tracked & insured shipping</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <Heart className="size-6 text-primary" strokeWidth={1.5} />
            <p className="text-sm font-medium">Handcrafted with care</p>
            <p className="text-xs text-muted-foreground">Quality-checked, every piece</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <MessageCircle className="size-6 text-primary" strokeWidth={1.5} />
            <p className="text-sm font-medium">WhatsApp support</p>
            <p className="text-xs text-muted-foreground">We&apos;re just a message away</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Footer navigation */}
      <div className="site-width py-14">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Wordmark */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <Wordmark footer />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Handcrafted imitation jewelry for the woman who adorns herself — not for
              an occasion, but because she wants to.
            </p>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
              aria-label="Chat with us on WhatsApp"
            >
              <MessageCircle className="size-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Shop column */}
          <nav aria-label="Shop navigation">
            <h3 className="mb-4 text-sm font-medium tracking-wide">Shop</h3>
            <ul className="flex flex-col gap-3">
              {shopLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Edits column */}
          <nav aria-label="Edit navigation">
            <h3 className="mb-4 text-sm font-medium tracking-wide">Edits</h3>
            <ul className="flex flex-col gap-3">
              {editLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Help column */}
          <nav aria-label="Help navigation">
            <h3 className="mb-4 text-sm font-medium tracking-wide">Help</h3>
            <ul className="flex flex-col gap-3">
              {helpLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Brand column */}
          <nav aria-label="Brand navigation">
            <h3 className="mb-4 text-sm font-medium tracking-wide">Meedora</h3>
            <ul className="flex flex-col gap-3">
              {brandLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-border">
        <div className="site-width flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Meedora. All rights reserved.</p>
          <p>Made with quiet love, in India.</p>
        </div>
      </div>
    </footer>
  )
}
