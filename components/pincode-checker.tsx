'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, Clock, MapPin, ShieldCheck, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { siteConfig } from '@/lib/site'

const METRO_PREFIXES = ['11', '12', '20', '40', '41', '50', '56', '60', '70']

function getEstimatedDeliveryDate(isMetro: boolean): string {
  const daysToAdd = isMetro ? 3 : 5
  const date = new Date()
  date.setDate(date.getDate() + daysToAdd)
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export function PincodeChecker() {
  const [pincode, setPincode] = useState('')
  const [checkedPincode, setCheckedPincode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isMetro, setIsMetro] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('meedora_pincode')
      if (saved && /^\d{6}$/.test(saved)) {
        setPincode(saved)
        setCheckedPincode(saved)
        setIsMetro(METRO_PREFIXES.some((p) => saved.startsWith(p)))
      }
    } catch {
      // localStorage unavailable or restricted
    }
  }, [])

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = pincode.trim()
    if (!/^\d{6}$/.test(clean)) {
      setError('Please enter a valid 6-digit Indian pincode')
      setCheckedPincode(null)
      return
    }

    setError(null)
    setCheckedPincode(clean)
    const metro = METRO_PREFIXES.some((p) => clean.startsWith(p))
    setIsMetro(metro)

    try {
      localStorage.setItem('meedora_pincode', clean)
    } catch {
      // ignore storage error
    }
  }

  const deliveryDate = checkedPincode ? getEstimatedDeliveryDate(isMetro) : null

  return (
    <div className="rounded-sm border border-border/80 bg-secondary/30 p-4">
      <div className="mb-2.5 flex items-center gap-2">
        <MapPin className="size-4 text-primary" />
        <span className="text-xs font-medium tracking-wide text-foreground">
          Estimated delivery & pincode check
        </span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="Enter 6-digit pincode"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, ''))
              if (error) setError(null)
            }}
            aria-label="Delivery pincode"
            className="h-10 bg-background text-sm"
          />
        </div>
        <Button type="submit" variant="outline" size="sm" className="h-10 px-4 font-medium">
          Check
        </Button>
      </form>

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}

      {checkedPincode && (
        <div className="mt-3 flex flex-col gap-2 rounded-xs bg-background/80 p-3 text-xs">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
            <span>
              Delivery by <strong className="text-foreground">{deliveryDate}</strong> to {checkedPincode}
            </span>
          </div>

          <div className="mt-1 flex flex-col gap-1.5 border-t border-border/50 pt-2 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck className="size-3.5 text-primary" />
              <span>
                Free shipping on orders above ₹{siteConfig.freeShippingThreshold.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-3.5 text-primary" />
              <span>Cash on Delivery (COD) available across India</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-3.5 text-primary" />
              <span>Orders dispatched within 24–48 hours</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
