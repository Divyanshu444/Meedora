'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    fbq?: (...args: any[]) => void
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/** Fires pageview events on route changes */
function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')

    // Meta Pixel pageview
    if (META_PIXEL_ID && window.fbq) {
      window.fbq('track', 'PageView')
    }

    // GA4 pageview
    if (GA4_ID && window.gtag) {
      window.gtag('config', GA4_ID, { page_path: url })
    }
  }, [pathname, searchParams])

  return null
}

/** Wraps PageViewTracker in Suspense to avoid useSearchParams SSR issue */
function PageViewTrackerWrapper() {
  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  )
}

/** Track add-to-cart events — call from CartProvider when an item is added */
export function trackAddToCart(item: {
  id: string
  name: string
  price: string
  currency: string
  quantity: number
}) {
  // Meta Pixel
  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_ids: [item.id],
      content_name: item.name,
      content_type: 'product',
      value: parseFloat(item.price) * item.quantity,
      currency: item.currency,
    })
  }

  // GA4
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: item.currency,
      value: parseFloat(item.price) * item.quantity,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          price: parseFloat(item.price),
          quantity: item.quantity,
        },
      ],
    })
  }
}

/** Track initiate checkout events — call when user clicks checkout in CartDrawer */
export function trackInitiateCheckout(cart: {
  totalAmount: string
  currency: string
  itemsCount: number
}) {
  // Meta Pixel
  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      value: parseFloat(cart.totalAmount),
      currency: cart.currency,
      num_items: cart.itemsCount,
    })
  }

  // GA4
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: cart.currency,
      value: parseFloat(cart.totalAmount),
    })
  }
}

export function AnalyticsScripts() {
  if (!META_PIXEL_ID && !GA4_ID) return null

  return (
    <>
      {/* Meta Pixel */}
      {META_PIXEL_ID && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {/* Google Analytics 4 */}
      {GA4_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      <PageViewTrackerWrapper />
    </>
  )
}
