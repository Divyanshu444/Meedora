import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ArrowRight, MessageCircle, Mail } from 'lucide-react'
import { getShop } from '@/lib/shopify'
import { contentLinks, siteConfig } from '@/lib/site'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { MeedoraLogo } from '@/components/meedora-logo'

export const revalidate = 3600

type PageContent = {
  title: string
  description: string
  body: React.ReactNode
  shopifyPolicy?: 'privacyPolicy' | 'refundPolicy' | 'shippingPolicy' | 'termsOfService'
}

const pages: Record<string, PageContent> = {
  about: {
    title: 'Our story',
    description: 'Meedora was born from a simple idea — that adorning yourself doesn\'t need a reason. Learn about our journey of creating handcrafted jewelry for everyday self-expression.',
    body: (
      <div className="policy-copy">
        <div className="my-6 flex justify-center">
          <MeedoraLogo variant="full" asLink={false} />
        </div>
        <h2>Your everyday adore</h2>
        <p>
          Meedora was born from a simple, quiet realization: that we don&apos;t need a reason to adorn ourselves. Not a wedding invitation, not a festival, not someone else&apos;s approval — just the feeling of wanting to choose something beautiful, for yourself, today.
        </p>
        <p>
          The name Meedora comes from a blend of languages and feelings — &quot;mee&quot; as in &quot;mine,&quot; and &quot;dora&quot; as in &quot;adored.&quot; Together: <em>my own adore</em>. A tiny act of self-gifting, every single day.
        </p>

        <h2>What we make</h2>
        <p>
          We design handcrafted imitation jewelry — gold-plated earrings, necklaces, rings, and more — made by skilled artisans in India. Each piece is carefully finished, quality-checked, and designed to be worn every day without losing its charm.
        </p>
        <p>
          Our designs sit at the intersection of contemporary taste and traditional Indian craft. Not too minimal, not too maximal — just enough to make you feel like yourself, elevated.
        </p>

        <h2>Who it&apos;s for</h2>
        <p>
          For the woman who pauses at a mirror and puts on earrings even when she&apos;s just working from home. For the one who doesn&apos;t wait for festivals to feel festive. For every quiet moment of self-expression that no one else needs to see.
        </p>
        <p>
          Meedora is your everyday adore.
        </p>
      </div>
    ),
  },

  shipping: {
    title: 'Shipping information',
    description: 'Everything you need to know about Meedora delivery — shipping times, tracking, and delivery zones across India.',
    shopifyPolicy: 'shippingPolicy',
    body: (
      <div className="policy-copy">
        <h2>Delivery across India</h2>
        <p>We ship to all serviceable pin codes in India via our logistics partners.</p>
        <ul>
          <li>Standard delivery: 5–7 business days</li>
          <li>Metro cities: 3–5 business days</li>
        </ul>

        <h2 id="tracking">Tracking your order</h2>
        <p>Once your order is dispatched, you&apos;ll receive an automated tracking link via SMS, WhatsApp, and email with the courier tracking AWB (Delhivery, Blue Dart, or Shiprocket). You can track your shipment live at any time.</p>
        <p>Need urgent assistance tracking an existing order? Message our support team directly on <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a> with your order number.</p>

        <h2>Shipping charges</h2>
        <p>Shipping charges are calculated at checkout based on your location and order value. We occasionally offer free shipping promotions — keep an eye on our announcements.</p>

        <h2>Order processing</h2>
        <p>Orders are processed within 1–2 business days. Orders placed on weekends or holidays will be processed on the next business day.</p>
      </div>
    ),
  },

  returns: {
    title: 'Returns & exchanges',
    description: 'Meedora return and exchange policy — hassle-free returns within 7 days of delivery.',
    shopifyPolicy: 'refundPolicy',
    body: (
      <div className="policy-copy">
        <h2>Our return promise</h2>
        <p>We want you to love your Meedora piece. If something isn&apos;t right, we&apos;re here to help.</p>

        <h2>Return window</h2>
        <p>You may request a return or exchange within 7 days of delivery.</p>

        <h2>Conditions</h2>
        <ul>
          <li>Items must be unworn, undamaged, and in original packaging</li>
          <li>Earrings cannot be returned for hygiene reasons, unless defective</li>
          <li>Sale/discounted items are final sale</li>
        </ul>

        <h2>How to return</h2>
        <p>
          Reach out to us via <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a> or email at <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a> with your order number and reason for return. We&apos;ll guide you through the process.
        </p>

        <h2>Refunds</h2>
        <p>Refunds are processed within 5–7 business days of receiving the returned item. The refund will be credited to your original payment method.</p>
      </div>
    ),
  },

  'size-guide': {
    title: 'Size & fit guide',
    description: 'Find your perfect fit — Meedora ring size guide, earring weight guide, and necklace length chart.',
    body: (
      <div className="policy-copy">
        <h2>Finding your ring size</h2>
        <p>
          Wrap a thin strip of paper or string snugly around the finger you want to measure. Mark where the ends meet, then measure the length in millimeters. Use the chart below to find your size.
        </p>

        <h3>Ring size chart (Indian standard)</h3>
        <ul>
          <li>Size 6 — 51.5 mm circumference</li>
          <li>Size 7 — 54.4 mm circumference</li>
          <li>Size 8 — 57.2 mm circumference</li>
          <li>Size 9 — 59.5 mm circumference</li>
          <li>Size 10 — 62.1 mm circumference</li>
        </ul>

        <h2>Necklace lengths</h2>
        <ul>
          <li>Choker: 14–16 inches — sits at the base of the neck</li>
          <li>Princess: 17–19 inches — falls just below the collarbone</li>
          <li>Matinee: 20–24 inches — sits at the center of the chest</li>
        </ul>

        <h2>Earring weight</h2>
        <p>All Meedora earrings are designed to be lightweight and comfortable for all-day wear. Individual product pages list approximate weight where relevant.</p>

        <h2>Still unsure?</h2>
        <p>
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a> — we&apos;re happy to help you find the right fit.
        </p>
      </div>
    ),
  },

  care: {
    title: 'Jewelry care',
    description: 'How to care for your Meedora jewelry — tips on storage, cleaning, and keeping your pieces looking their best.',
    body: (
      <div className="policy-copy">
        <h2>A little care goes a long way</h2>
        <p>Your Meedora jewelry is designed to be worn every day — but a few simple habits will keep it looking its best for much longer.</p>

        <h2>Daily care</h2>
        <ul>
          <li>Put jewelry on last — after perfume, sunscreen, and makeup have dried</li>
          <li>Remove before showering, swimming, or exercising</li>
          <li>Wipe gently with a soft, dry cloth after each wear</li>
        </ul>

        <h2>Storage</h2>
        <ul>
          <li>Store each piece separately to avoid scratches</li>
          <li>Use the pouch or box your Meedora piece came in</li>
          <li>Keep away from direct sunlight and humidity</li>
        </ul>

        <h2>What to avoid</h2>
        <ul>
          <li>Harsh chemicals, detergents, and cleaning agents</li>
          <li>Prolonged contact with water</li>
          <li>Rough surfaces and abrasive cloths</li>
        </ul>

        <h2>Cleaning</h2>
        <p>For a gentle clean, dampen a soft cloth with lukewarm water, wipe the piece, and dry immediately. Do not soak or use ultrasonic cleaners.</p>
      </div>
    ),
  },

  contact: {
    title: 'Contact us',
    description: 'Get in touch with the Meedora team — we\'re here to help with orders, sizing, returns, and anything else.',
    body: (
      <div className="policy-copy">
        <h2>We&apos;d love to hear from you</h2>
        <p>Whether you have a question about an order, need help choosing a size, or just want to say hello — we&apos;re here.</p>

        <h2>WhatsApp (fastest)</h2>
        <p>
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
            <MessageCircle className="size-4" /> Chat with us on WhatsApp
          </a>
        </p>
        <p>We typically reply within a few hours during business days.</p>

        <h2>Email</h2>
        <p>
          <a href="mailto:hello@meedora.in" className="inline-flex items-center gap-2">
            <Mail className="size-4" /> hello@meedora.in
          </a>
        </p>

        <h2>Business hours</h2>
        <p>Monday to Saturday, 10 AM – 7 PM IST<br />Closed on Sundays and public holidays</p>
      </div>
    ),
  },

  faq: {
    title: 'Frequently asked questions',
    description: 'Common questions about Meedora jewelry — ordering, shipping, returns, care, and more.',
    body: (
      <div className="flex flex-col gap-2">
        <Accordion>
          <AccordionItem value="what-is-meedora">
            <AccordionTrigger>What is Meedora?</AccordionTrigger>
            <AccordionContent>
              <p className="text-base leading-relaxed text-muted-foreground">Meedora is an Indian handcrafted imitation jewelry brand. We design gold-plated earrings, necklaces, rings, and more — meant to be worn every day, not just on special occasions.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="materials">
            <AccordionTrigger>What materials do you use?</AccordionTrigger>
            <AccordionContent>
              <p className="text-base leading-relaxed text-muted-foreground">Our pieces are made with high-quality base metals, finished with gold plating (and sometimes rhodium or rose gold). Stones used are high-quality imitation — not natural gemstones. Specific materials are listed on each product page.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="skin-safe">
            <AccordionTrigger>Is Meedora jewelry safe for sensitive skin?</AccordionTrigger>
            <AccordionContent>
              <p className="text-base leading-relaxed text-muted-foreground">We use nickel-free base metals where possible, but if you have very sensitive skin or known metal allergies, we recommend checking the materials listed on the product page or reaching out to us before ordering.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping-time">
            <AccordionTrigger>How long does shipping take?</AccordionTrigger>
            <AccordionContent>
              <p className="text-base leading-relaxed text-muted-foreground">Standard delivery takes 5–7 business days across India. Metro cities may receive orders in 3–5 days. You&apos;ll receive a tracking link once your order ships.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="returns">
            <AccordionTrigger>Can I return or exchange a piece?</AccordionTrigger>
            <AccordionContent>
              <p className="text-base leading-relaxed text-muted-foreground">Yes — returns and exchanges are accepted within 7 days of delivery, provided the item is unworn, undamaged, and in original packaging. Earrings are excluded for hygiene reasons unless defective. See our <a href="/pages/returns">returns policy</a> for details.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="payment-methods">
            <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
            <AccordionContent>
              <p className="text-base leading-relaxed text-muted-foreground">We accept UPI, credit/debit cards, net banking, and popular wallets — all processed securely through our payment partners. Cash on delivery is not currently available.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="care">
            <AccordionTrigger>How do I care for my jewelry?</AccordionTrigger>
            <AccordionContent>
              <p className="text-base leading-relaxed text-muted-foreground">Wipe gently after each wear, store separately, and avoid water, perfume, and harsh chemicals. See our full <a href="/pages/care">jewelry care guide</a> for detailed tips.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="gift">
            <AccordionTrigger>Can I order as a gift?</AccordionTrigger>
            <AccordionContent>
              <p className="text-base leading-relaxed text-muted-foreground">Absolutely — every order comes beautifully packaged. You can ship directly to the recipient&apos;s address during checkout. Gift wrapping and personalized notes may be available for certain pieces.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    ),
  },

  privacy: {
    title: 'Privacy policy',
    description: 'Meedora privacy policy — how we collect, use, and protect your personal information.',
    shopifyPolicy: 'privacyPolicy',
    body: (
      <div className="policy-copy">
        <p>Our privacy policy will be loaded from your Shopify store settings once connected. In the meantime, rest assured that we take your privacy seriously and handle all personal data responsibly.</p>
      </div>
    ),
  },

  terms: {
    title: 'Terms of service',
    description: 'Meedora terms of service — the rules and guidelines for using our website and purchasing from us.',
    shopifyPolicy: 'termsOfService',
    body: (
      <div className="policy-copy">
        <p>Our terms of service will be loaded from your Shopify store settings once connected. By using our website and purchasing from us, you agree to our terms.</p>
      </div>
    ),
  },

  'gift-store': {
    title: 'The Gift Store',
    description:
      'Curated gift edits, keepsake packaging, and pieces meant to make someone (or yourself) feel deeply adored.',
    body: (
      <div className="space-y-10">
        <div className="policy-copy">
          <h2>Thoughtful Adornment, Ready to Gift</h2>
          <p>
            Jewelry has always been more than an accessory — it&apos;s a sentiment, a memory, and an intimate gesture. Whether you are celebrating a milestone, surprising a best friend, or practicing the quiet joy of self-gifting, Meedora pieces are designed to feel personal and timeless.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/collections/gifts-under-999"
            className="group rounded-sm border border-border bg-secondary/30 p-6 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <span className="eyebrow text-primary">Budget Friendly</span>
            <h3 className="mt-1 font-serif text-2xl font-medium text-foreground group-hover:text-primary">
              Gifts Under ₹999
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Dainty rings, everyday studs, and charm pendants that feel luxurious without stretching your wallet.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Browse under ₹999 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/collections/gifts-for-her"
            className="group rounded-sm border border-border bg-secondary/30 p-6 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <span className="eyebrow text-primary">Crowd Favorites</span>
            <h3 className="mt-1 font-serif text-2xl font-medium text-foreground group-hover:text-primary">
              Gifts for Her
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Our most-gifted earrings, statement pendants, and handcrafted sets guaranteed to delight.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Explore gifts for her <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/collections/gifting-edit"
            className="group rounded-sm border border-border bg-secondary/30 p-6 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <span className="eyebrow text-primary">Curated Series</span>
            <h3 className="mt-1 font-serif text-2xl font-medium text-foreground group-hover:text-primary">
              The Gifting Edit
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Selected by our designers with versatility, comfort, and timeless charm in mind.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              View the edit <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/collections/sets"
            className="group rounded-sm border border-border bg-secondary/30 p-6 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <span className="eyebrow text-primary">Complete Looks</span>
            <h3 className="mt-1 font-serif text-2xl font-medium text-foreground group-hover:text-primary">
              Jewellery Sets
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Harmonious necklace, earring, and bracelet pairings for celebrations, weddings, and grand occasions.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Discover sets <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>

        <div className="rounded-sm border border-border/60 bg-secondary/20 p-6 sm:p-8">
          <h3 className="font-serif text-2xl mb-4">The Meedora Gifting Standard</h3>
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="font-medium text-sm text-foreground">Signature Keepsake Box</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Every piece arrives in our embossed blush rigid box, lined with soft velvet.
              </p>
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">Anti-Tarnish Storage</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Includes a protective zip pouch and silica sachet to maintain long-lasting shine.
              </p>
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">Discreet Invoicing</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Prices and invoices can be excluded from physical parcel on request during checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
}

export function generateStaticParams() {
  return contentLinks.map(link => ({ handle: link.handle }))
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  const page = pages[handle]
  if (!page) return { title: 'Page not found' }
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/pages/${handle}` },
  }
}

export default async function ContentPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const page = pages[handle]
  if (!page) notFound()

  // Try to load Shopify policy content if applicable
  let shopifyBody: string | null = null
  if (page.shopifyPolicy) {
    try {
      const shop = await getShop()
      const policy = shop[page.shopifyPolicy]
      if (policy?.body) shopifyBody = policy.body
    } catch {
      // Shopify not connected — fall back to local content
    }
  }

  return (
    <main id="main-content" className="site-width pb-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 py-6 text-sm text-muted-foreground">
        <Link href="/">Home</Link>
        <ChevronRight className="size-3" />
        <span aria-current="page">{page.title}</span>
      </nav>

      <article className="mx-auto max-w-3xl pb-10">
        <h1 className="display-heading mb-8 text-4xl sm:text-5xl">{page.title}</h1>

        {shopifyBody ? (
          <div className="policy-copy" dangerouslySetInnerHTML={{ __html: shopifyBody }} />
        ) : (
          page.body
        )}
      </article>
    </main>
  )
}
