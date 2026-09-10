import 'server-only'
import { cache } from 'react'
import type { Cart, Collection, Connection, Product, Shop, Variant } from './shopify-types'
import * as queries from './shopify-queries'
import { mockProducts } from './mock-data'
import { categoryCollections, editCollections, specialCollections, giftingCollections } from './site'

export function isShopifyConfigured(): boolean {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  return Boolean(domain && token)
}

export async function storefront<T>(query: string, variables: Record<string, unknown> = {}, noCache = false): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  if (!domain || !token) throw new Error('The Shopify connection is not ready. Please try again shortly.')
  const response = await fetch(`https://${domain}/api/2026-07/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
    body: JSON.stringify({ query, variables }),
    ...(noCache ? { cache: 'no-store' as const } : { next: { revalidate: 60, tags: ['shopify'] } }),
    signal: AbortSignal.timeout(12000),
  })
  if (!response.ok) throw new Error('Our shop is temporarily unavailable. Please try again.')
  const result = await response.json()
  if (result.errors?.length) {
    console.error('Shopify query failed:', result.errors.map((error: { message: string }) => error.message).join('; '))
    throw new Error('We could not load the shop. Please try again shortly.')
  }
  return result.data as T
}

function getMockProductsForCollection(handle: string): Product[] {
  switch (handle) {
    case 'earrings':
      return mockProducts.filter((p) => p.productType === 'Earrings')
    case 'necklaces-pendants':
      return mockProducts.filter((p) => p.productType === 'Necklaces & Pendants')
    case 'rings':
      return mockProducts.filter((p) => p.productType === 'Rings')
    case 'bracelets':
      return mockProducts.filter((p) => p.productType === 'Bracelets & Bangles')
    case 'anklets':
      return mockProducts.filter((p) => p.productType === 'Anklets')
    case 'sets':
      return mockProducts.filter((p) => p.tags.includes('Festive'))
    case 'everyday':
      return mockProducts.filter((p) => p.tags.includes('Everyday'))
    case 'festive':
      return mockProducts.filter((p) => p.tags.includes('Festive'))
    case 'gifting-edit':
    case 'gifts-for-her':
      return mockProducts.filter((p) => p.tags.includes('Gifting') || p.tags.includes('Everyday'))
    case 'gifts-under-999':
      return mockProducts.filter((p) => parseFloat(p.priceRange.minVariantPrice.amount) <= 999)
    case 'sale':
      return mockProducts.filter((p) => {
        const compareAt = p.variants.nodes[0]?.compareAtPrice?.amount
        const price = p.priceRange.minVariantPrice.amount
        return compareAt && parseFloat(compareAt) > parseFloat(price)
      })
    case 'bestsellers':
    case 'new-arrivals':
    case 'all':
    default:
      return mockProducts
  }
}

export const getProduct = cache(async (handle: string): Promise<Product | null> => {
  if (!isShopifyConfigured()) {
    return mockProducts.find((p) => p.handle === handle) ?? mockProducts[0] ?? null
  }
  try {
    return (await storefront<{ product: Product | null }>(queries.PRODUCT_QUERY, { handle })).product
  } catch {
    return mockProducts.find((p) => p.handle === handle) ?? null
  }
})

export const getCollections = cache(async (): Promise<Collection[]> => {
  if (!isShopifyConfigured()) {
    const allDefs = [...categoryCollections, ...editCollections, ...specialCollections, ...giftingCollections]
    return allDefs.map((c) => ({
      id: `coll_${c.handle}`,
      handle: c.handle,
      title: c.title,
      description: 'description' in c ? (c as { description: string }).description : `Handcrafted ${c.title} by Meedora`,
      image: null,
      seo: { title: `${c.title} | Meedora`, description: `Shop ${c.title} handcrafted jewelry` },
    }))
  }
  try {
    return (await storefront<{ collections: { nodes: Collection[] } }>(queries.COLLECTIONS_QUERY)).collections.nodes.filter(
      (c) => c.handle !== 'frontpage'
    )
  } catch {
    return []
  }
})

export const getShop = cache(async (): Promise<Shop> => {
  if (!isShopifyConfigured()) {
    return {
      name: 'Meedora',
      description: 'Your Everyday Adore — Handcrafted imitation jewelry for women who adorn themselves.',
      primaryDomain: { url: 'https://meedora.in' },
      privacyPolicy: null,
      refundPolicy: null,
      shippingPolicy: null,
      termsOfService: null,
    }
  }
  return (await storefront<{ shop: Shop }>(queries.SHOP_QUERY)).shop
})

export async function getProducts(
  options: { first?: number; after?: string; query?: string; sortKey?: string; reverse?: boolean } = {}
): Promise<Connection<Product>> {
  if (!isShopifyConfigured()) {
    let list = [...mockProducts]
    if (options.sortKey === 'PRICE') {
      list.sort((a, b) => {
        const pA = parseFloat(a.priceRange.minVariantPrice.amount)
        const pB = parseFloat(b.priceRange.minVariantPrice.amount)
        return options.reverse ? pB - pA : pA - pB
      })
    }
    const count = options.first ?? 24
    return {
      nodes: list.slice(0, count),
      pageInfo: { hasNextPage: list.length > count, endCursor: null },
    }
  }
  try {
    return (await storefront<{ products: Connection<Product> }>(queries.PRODUCTS_QUERY, { first: 24, sortKey: 'BEST_SELLING', ...options })).products
  } catch {
    return { nodes: mockProducts.slice(0, options.first ?? 24), pageInfo: { hasNextPage: false, endCursor: null } }
  }
}

export async function getCollection(
  handle: string,
  options: { first?: number; after?: string; sortKey?: string; reverse?: boolean } = {}
): Promise<(Collection & { products: Connection<Product> }) | null> {
  if (!isShopifyConfigured()) {
    const allDefs = [...categoryCollections, ...editCollections, ...specialCollections, ...giftingCollections]
    const found = allDefs.find((c) => c.handle === handle) || { handle, title: handle.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) }
    const filtered = getMockProductsForCollection(handle)

    if (options.sortKey === 'PRICE') {
      filtered.sort((a, b) => {
        const pA = parseFloat(a.priceRange.minVariantPrice.amount)
        const pB = parseFloat(b.priceRange.minVariantPrice.amount)
        return options.reverse ? pB - pA : pA - pB
      })
    }

    return {
      id: `coll_${handle}`,
      handle,
      title: found.title,
      description: 'description' in found ? (found as { description: string }).description : `Handcrafted ${found.title} collection by Meedora`,
      image: null,
      seo: { title: `${found.title} | Meedora`, description: `Handcrafted ${found.title} collection` },
      products: {
        nodes: filtered,
        pageInfo: { hasNextPage: false, endCursor: null },
      },
    }
  }
  try {
    return (await storefront<{ collection: (Collection & { products: Connection<Product> }) | null }>(queries.COLLECTION_QUERY, {
      handle,
      first: 24,
      sortKey: 'MANUAL',
      ...options,
    })).collection
  } catch {
    const filtered = getMockProductsForCollection(handle)
    return {
      id: `coll_${handle}`,
      handle,
      title: handle,
      description: '',
      image: null,
      seo: { title: handle, description: '' },
      products: { nodes: filtered, pageInfo: { hasNextPage: false, endCursor: null } },
    }
  }
}

export async function searchProducts(query: string, after?: string): Promise<Connection<Product>> {
  if (!isShopifyConfigured()) {
    const q = query.toLowerCase()
    const matches = mockProducts.filter((p) => p.title.toLowerCase().includes(q) || p.productType.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)))
    return { nodes: matches, pageInfo: { hasNextPage: false, endCursor: null } }
  }
  return (await storefront<{ search: Connection<Product> }>(queries.SEARCH_QUERY, { query, first: 24, after })).search
}

export async function getRelatedProducts(productId: string): Promise<Product[]> {
  if (!isShopifyConfigured()) {
    return mockProducts.filter((p) => p.id !== productId).slice(0, 4)
  }
  try {
    const data = await storefront<{ productRecommendations: Product[] | null }>(queries.RECOMMENDATIONS_QUERY, { productId })
    if (data.productRecommendations?.length) return data.productRecommendations.slice(0, 4)
    return (await getProducts({ first: 8 })).nodes.filter((p) => p.id !== productId).slice(0, 4)
  } catch {
    return mockProducts.filter((p) => p.id !== productId).slice(0, 4)
  }
}

export async function getCart(id: string) {
  if (!isShopifyConfigured()) return null
  return (await storefront<{ cart: Cart | null }>(queries.CART_QUERY, { id }, true)).cart
}

export async function getVariant(id: string) {
  if (!isShopifyConfigured()) {
    for (const p of mockProducts) {
      const v = p.variants.nodes.find((item) => item.id === id)
      if (v) return v
    }
    return null
  }
  return (await storefront<{ node: Variant | null }>(queries.VARIANT_QUERY, { id }, true)).node
}

export async function getAllHandles(): Promise<Product[]> {
  if (!isShopifyConfigured()) return mockProducts
  let after: string | undefined
  const products: Product[] = []
  do {
    const page = await getProducts({ first: 100, after, sortKey: 'ID' })
    products.push(...page.nodes)
    after = page.pageInfo.hasNextPage ? page.pageInfo.endCursor ?? undefined : undefined
  } while (after)
  return products
}
