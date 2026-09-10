import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { getCollections, getShop } from '@/lib/shopify'
import { CartProvider } from '@/components/cart-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AnalyticsScripts } from '@/components/analytics'
import { siteUrl } from '@/lib/site'
import './globals.css'

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-heading',
})

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: {
    default: 'Meedora — Your Everyday Adore',
    template: '%s | Meedora',
  },
  description:
    'Handcrafted imitation jewelry for the woman who adorns herself. Explore everyday earrings, necklaces, rings & more — designed with quiet love, in India.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Meedora',
    title: 'Meedora — Your Everyday Adore',
    description:
      'Handcrafted imitation jewelry for the woman who adorns herself. Explore everyday earrings, necklaces, rings & more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meedora — Your Everyday Adore',
    description:
      'Handcrafted imitation jewelry for the woman who adorns herself.',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fffaf6',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let collections: Awaited<ReturnType<typeof getCollections>> = []
  let shopUrl = ''

  try {
    const [cols, shop] = await Promise.all([getCollections(), getShop()])
    collections = cols
    shopUrl = shop.primaryDomain.url
  } catch {
    // Shopify may not be connected yet — render layout without nav data
  }

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg"
          >
            Skip to content
          </a>
          <SiteHeader collections={collections} shopUrl={shopUrl} />
          {children}
          <SiteFooter collections={collections} />
        </CartProvider>
        <AnalyticsScripts />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
