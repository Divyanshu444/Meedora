'use client'

import { createContext, useContext, useRef, useState } from 'react'
import useSWR from 'swr'
import { toast, Toaster } from 'sonner'
import type { Cart } from '@/lib/shopify-types'

type CartAction = { action: 'add'; merchandiseId: string; quantity: number } | { action: 'update'; lineId: string; quantity: number } | { action: 'remove'; lineId: string }
type CartContextValue = { cart: Cart | null; open: boolean; setOpen: (open: boolean) => void; pending: boolean; loading: boolean; error: boolean; retry: () => void; update: (action: CartAction) => Promise<boolean> }
const CartContext = createContext<CartContextValue | null>(null)
async function fetchCart(url: string) {
  const response = await fetch(url)
  const data = await response.json()
  if (!response.ok) throw new Error(data.error)
  return data as { cart: Cart | null }
}
export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data, error, isLoading, mutate } = useSWR('/api/cart', fetchCart, { revalidateOnFocus: true, shouldRetryOnError: false })
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const lock = useRef(false)
  async function update(action: CartAction) {
    if (lock.current) return false
    lock.current = true
    setPending(true)
    try {
      const response = await fetch('/api/cart', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(action) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error)
      await mutate({ cart: result.cart }, { revalidate: false })
      if (action.action === 'add') setOpen(true)
      result.warnings?.forEach((warning: string) => toast.info(warning))
      return true
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Please try again.')
      await mutate()
      return false
    } finally { lock.current = false; setPending(false) }
  }
  return <CartContext.Provider value={{ cart: data?.cart ?? null, open, setOpen, pending, loading: isLoading, error: Boolean(error), retry: () => { void mutate() }, update }}>{children}<Toaster position="bottom-center" richColors={false} toastOptions={{ style: { background: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--border)' } }} /></CartContext.Provider>
}
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
