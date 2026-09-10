import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getCart, getVariant, storefront } from '@/lib/shopify'
import { CART_ADD, CART_CREATE, CART_REMOVE, CART_UPDATE } from '@/lib/shopify-queries'
import type { Cart } from '@/lib/shopify-types'

const COOKIE = 'meedora_cart'
const schema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('add'), merchandiseId: z.string().regex(/^gid:\/\/shopify\/ProductVariant\/\d+$/), quantity: z.number().int().min(1).max(10) }),
  z.object({ action: z.literal('update'), lineId: z.string().min(1).max(1000), quantity: z.number().int().min(1).max(10) }),
  z.object({ action: z.literal('remove'), lineId: z.string().min(1).max(1000) }),
])
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'private, no-store' } })
export async function GET() {
  try {
    const id = (await cookies()).get(COOKIE)?.value
    return json({ cart: id ? await getCart(id) : null })
  } catch { return json({ error: 'Your bag could not be loaded. Please try again.' }, 503) }
}
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin')
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  if (request.headers.get('sec-fetch-site') === 'cross-site' || (origin && new URL(origin).host !== host)) return json({ error: 'Request not allowed.' }, 403)
  try {
    const parsed = schema.safeParse(await request.json())
    if (!parsed.success) return json({ error: 'Please choose a valid item and a quantity between 1 and 10.' }, 400)
    const input = parsed.data
    const jar = await cookies()
    const id = jar.get(COOKIE)?.value
    const cart = id ? await getCart(id) : null
    let query: string
    let variables: Record<string, unknown>
    if (input.action === 'add') {
      const variant = await getVariant(input.merchandiseId)
      if (!variant?.availableForSale) return json({ error: 'This piece is currently out of stock.' }, 409)
      const existing = cart?.lines.nodes.filter(l => l.merchandise.id === input.merchandiseId).reduce((sum, l) => sum + l.quantity, 0) ?? 0
      if (existing + input.quantity > 10 || (cart?.totalQuantity ?? 0) + input.quantity > 50) return json({ error: 'A maximum of 10 of each piece and 50 pieces per bag is allowed.' }, 400)
      if (variant.quantityAvailable != null && existing + input.quantity > variant.quantityAvailable) return json({ error: 'There are not enough pieces available for this quantity.' }, 409)
      const lines = [{ merchandiseId: input.merchandiseId, quantity: input.quantity }]
      query = cart ? CART_ADD : CART_CREATE
      variables = cart ? { cartId: cart.id, lines } : { input: { lines } }
    } else {
      const line = cart?.lines.nodes.find(l => l.id === input.lineId)
      if (!cart || !line) return json({ error: 'This item is no longer in your bag. Please refresh.' }, 409)
      if (input.action === 'update') {
        const sameVariantOtherLines = cart.lines.nodes.filter(l => l.merchandise.id === line.merchandise.id && l.id !== line.id).reduce((sum, l) => sum + l.quantity, 0)
        if (sameVariantOtherLines + input.quantity > 10 || cart.totalQuantity - line.quantity + input.quantity > 50) return json({ error: 'The quantity limit for your bag has been reached.' }, 400)
        const variant = await getVariant(line.merchandise.id)
        if (!variant?.availableForSale || (variant.quantityAvailable != null && sameVariantOtherLines + input.quantity > variant.quantityAvailable)) return json({ error: 'This quantity is no longer available.' }, 409)
      }
      query = input.action === 'remove' ? CART_REMOVE : CART_UPDATE
      variables = input.action === 'remove' ? { cartId: cart.id, lineIds: [input.lineId] } : { cartId: cart.id, lines: [{ id: input.lineId, quantity: input.quantity }] }
    }
    const data = await storefront<Record<string, { cart: Cart | null; userErrors: { message: string }[]; warnings?: { message: string }[] }>>(query, variables, true)
    const result = Object.values(data)[0]
    if (result.userErrors.length || !result.cart) return json({ error: result.userErrors[0]?.message ?? 'Could not update your bag.' }, 400)
    jar.set(COOKIE, result.cart.id, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 })
    return json({ cart: result.cart, warnings: result.warnings?.map(w => w.message) ?? [] })
  } catch { return json({ error: 'We could not update your bag. Please try again.' }, 503) }
}
