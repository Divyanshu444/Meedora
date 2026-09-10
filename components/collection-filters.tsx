'use client'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Check, ChevronDown, Filter, RotateCcw, SlidersHorizontal, X } from 'lucide-react'
import { priceFilters, metalFilters, styleFilters } from '@/lib/site'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export function CollectionFilters({
  totalCount,
}: {
  totalCount: number
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [mobileOpen, setMobileOpen] = useState(false)

  const activePrice = searchParams.get('price') ?? ''
  const activeMetal = searchParams.get('metal') ?? ''
  const activeStyle = searchParams.get('style') ?? ''

  const hasActiveFilters = Boolean(activePrice || activeMetal || activeStyle)

  const updateParam = (key: string, value: string) => {
    const current = new URLSearchParams(searchParams.toString())
    if (current.get(key) === value || !value) {
      current.delete(key)
    } else {
      current.set(key, value)
    }
    router.push(`${pathname}?${current.toString()}`, { scroll: false })
  }

  const clearAllFilters = () => {
    const current = new URLSearchParams(searchParams.toString())
    current.delete('price')
    current.delete('metal')
    current.delete('style')
    router.push(`${pathname}?${current.toString()}`, { scroll: false })
  }

  // Price label lookup
  const getPriceLabel = (val: string) => {
    if (val === '0-1000') return 'Under ₹1,000'
    if (val === '1000-2000') return '₹1,000 – ₹2,000'
    if (val === '2000-3500') return '₹2,000 – ₹3,500'
    if (val === '3500-inf') return 'Above ₹3,500'
    return val
  }

  const priceOptions = [
    { value: '0-1000', label: 'Under ₹1,000' },
    { value: '1000-2000', label: '₹1,000 – ₹2,000' },
    { value: '2000-3500', label: '₹2,000 – ₹3,500' },
    { value: '3500-inf', label: 'Above ₹3,500' },
  ]

  return (
    <div className="mb-6 flex flex-col gap-4">
      {/* Desktop Filter Bar & Mobile Trigger */}
      <div className="flex items-center justify-between gap-4 border-y border-border/80 py-3">
        {/* Mobile Filter Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setMobileOpen(true)}
          >
            <SlidersHorizontal className="size-3.5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {[activePrice, activeMetal, activeStyle].filter(Boolean).length}
              </span>
            )}
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetContent side="left" className="w-[320px] p-6 sm:w-[380px]">
              <SheetHeader>
                <SheetTitle className="font-serif text-2xl">Filter Pieces</SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">
                  Narrow by price, metal tone, or occasion
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-6 overflow-y-auto pr-1">
                {/* Price Section */}
                <div>
                  <p className="eyebrow mb-3">Price Range</p>
                  <div className="flex flex-col gap-2">
                    {priceOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updateParam('price', opt.value)}
                        className={cn(
                          'flex items-center justify-between rounded-sm border p-2.5 text-sm transition-colors text-left',
                          activePrice === opt.value
                            ? 'border-primary bg-primary/10 font-medium text-primary'
                            : 'border-border hover:bg-secondary/50'
                        )}
                      >
                        <span>{opt.label}</span>
                        {activePrice === opt.value && <Check className="size-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Metal Tone */}
                <div>
                  <p className="eyebrow mb-3">Metal Tone</p>
                  <div className="flex flex-wrap gap-2">
                    {metalFilters.map((metal) => {
                      const val = metal.toLowerCase().replace(/\s+/g, '-')
                      const isSelected = activeMetal === val
                      return (
                        <button
                          key={metal}
                          type="button"
                          onClick={() => updateParam('metal', val)}
                          className={cn(
                            'rounded-full border px-3 py-1.5 text-xs transition-colors',
                            isSelected
                              ? 'border-primary bg-primary text-primary-foreground font-medium'
                              : 'border-border hover:border-primary/40 bg-background'
                          )}
                        >
                          {metal}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Style / Occasion */}
                <div>
                  <p className="eyebrow mb-3">Style / Occasion</p>
                  <div className="flex flex-wrap gap-2">
                    {styleFilters.map((style) => {
                      const val = style.toLowerCase()
                      const isSelected = activeStyle === val
                      return (
                        <button
                          key={style}
                          type="button"
                          onClick={() => updateParam('style', val)}
                          className={cn(
                            'rounded-full border px-3 py-1.5 text-xs transition-colors',
                            isSelected
                              ? 'border-primary bg-primary text-primary-foreground font-medium'
                              : 'border-border hover:border-primary/40 bg-background'
                          )}
                        >
                          {style}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 flex gap-3 border-t border-border pt-4">
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={clearAllFilters}
                  >
                    Clear all
                  </Button>
                )}
                <Button
                  className="flex-1"
                  onClick={() => setMobileOpen(false)}
                >
                  View {totalCount} {totalCount === 1 ? 'piece' : 'pieces'}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Filter Pills */}
        <div className="hidden items-center gap-6 lg:flex">
          {/* Price dropdown pill */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price:</span>
            <div className="flex items-center gap-1.5">
              {priceOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateParam('price', opt.value)}
                  className={cn(
                    'rounded-full border px-3 py-1 text-xs transition-colors',
                    activePrice === opt.value
                      ? 'border-primary bg-primary text-primary-foreground font-medium'
                      : 'border-border hover:border-primary/40 bg-background'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-4 w-px bg-border" />

          {/* Metal Tone */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Metal:</span>
            <div className="flex items-center gap-1.5">
              {metalFilters.map((metal) => {
                const val = metal.toLowerCase().replace(/\s+/g, '-')
                const isSelected = activeMetal === val
                return (
                  <button
                    key={metal}
                    type="button"
                    onClick={() => updateParam('metal', val)}
                    className={cn(
                      'rounded-full border px-3 py-1 text-xs transition-colors',
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground font-medium'
                        : 'border-border hover:border-primary/40 bg-background'
                    )}
                  >
                    {metal}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="h-4 w-px bg-border" />

          {/* Style */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Style:</span>
            <div className="flex items-center gap-1.5">
              {styleFilters.map((style) => {
                const val = style.toLowerCase()
                const isSelected = activeStyle === val
                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() => updateParam('style', val)}
                    className={cn(
                      'rounded-full border px-3 py-1 text-xs transition-colors',
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground font-medium'
                        : 'border-border hover:border-primary/40 bg-background'
                    )}
                  >
                    {style}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Piece Count */}
        <p className="text-xs text-muted-foreground sm:text-sm">
          Showing <span className="font-semibold text-foreground">{totalCount}</span> {totalCount === 1 ? 'piece' : 'pieces'}
        </p>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {activePrice && (
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs text-foreground">
              {getPriceLabel(activePrice)}
              <button
                type="button"
                onClick={() => updateParam('price', activePrice)}
                className="hover:text-primary"
                aria-label="Remove price filter"
              >
                <X className="size-3" />
              </button>
            </span>
          )}
          {activeMetal && (
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs text-foreground">
              {activeMetal.replace(/-/g, ' ')}
              <button
                type="button"
                onClick={() => updateParam('metal', activeMetal)}
                className="hover:text-primary"
                aria-label="Remove metal filter"
              >
                <X className="size-3" />
              </button>
            </span>
          )}
          {activeStyle && (
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs text-foreground capitalize">
              {activeStyle}
              <button
                type="button"
                onClick={() => updateParam('style', activeStyle)}
                className="hover:text-primary"
                aria-label="Remove style filter"
              >
                <X className="size-3" />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs text-primary underline-offset-4 hover:underline ml-1"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
