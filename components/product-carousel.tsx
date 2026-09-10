'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Product } from '@/lib/shopify-types'
import { ProductCard } from './product-card'
import { Button } from '@/components/ui/button'

export function ProductCarousel({
  products,
  id,
}: {
  products: Product[]
  id: string
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth ?? 280
    const gap = 16
    const distance = (cardWidth + gap) * 2
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative">
      {/* Scroll buttons — desktop only */}
      <div className="absolute -top-14 right-0 hidden gap-2 lg:flex">
        <Button
          variant="outline"
          size="icon-lg"
          aria-label={`Scroll ${id} left`}
          onClick={() => scroll('left')}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon-lg"
          aria-label={`Scroll ${id} right`}
          onClick={() => scroll('right')}
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 md:gap-6"
        role="region"
        aria-label={id}
        tabIndex={0}
      >
        {products.map((product, i) => (
          <div
            key={product.id}
            className="w-[calc(50%-8px)] shrink-0 snap-start md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
          >
            <ProductCard product={product} priority={i < 4} />
          </div>
        ))}
      </div>
    </div>
  )
}
