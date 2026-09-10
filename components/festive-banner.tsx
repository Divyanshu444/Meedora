'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, X, ArrowRight } from 'lucide-react'

export function FestiveBanner() {
  const [dismissed, setDismissed] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ hours: 38, minutes: 24, seconds: 45 })

  useEffect(() => {
    try {
      if (sessionStorage.getItem('meedora_festive_dismissed')) {
        setDismissed(true)
      }
    } catch {
      // ignore
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem('meedora_festive_dismissed', 'true')
    } catch {
      // ignore
    }
  }

  return (
    <aside aria-label="Festive season offer" className="relative bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 text-white text-xs py-2 px-4 shadow-sm">
      <div className="site-width flex flex-wrap items-center justify-between gap-2 sm:justify-center">
        <div className="flex items-center gap-2">
          <Sparkles className="size-3.5 shrink-0 text-amber-200 animate-pulse" />
          <span>
            <strong className="font-semibold uppercase tracking-wider text-amber-200">
              Festive Season Special:
            </strong>{' '}
            Get Extra 10% OFF with code <span className="rounded bg-black/25 px-1.5 py-0.5 font-mono font-bold tracking-widest text-amber-100">ADORE10</span> on orders above ₹1,999
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-amber-100">
          <span className="hidden md:inline">
            Offer ends in: {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
          </span>
          <Link
            href="/collections/festive"
            className="underline underline-offset-2 hover:text-white font-medium inline-flex items-center gap-0.5"
          >
            Shop Festive Edit <ArrowRight className="size-3" />
          </Link>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss festive announcement"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white transition-colors"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </aside>
  )
}
