import type { MetadataRoute } from 'next'
import { getAllHandles, getCollections } from '@/lib/shopify'
import { contentLinks, siteUrl } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  // Home
  entries.push({
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })

  // Products
  try {
    const products = await getAllHandles()
    for (const product of products) {
      entries.push({
        url: `${siteUrl}/products/${product.handle}`,
        lastModified: new Date(product.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  } catch {
    // Shopify not connected — skip dynamic products
  }

  // Collections
  try {
    const collections = await getCollections()
    entries.push({
      url: `${siteUrl}/collections/all`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    })
    for (const collection of collections) {
      entries.push({
        url: `${siteUrl}/collections/${collection.handle}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  } catch {
    // Shopify not connected — skip collections
  }

  // Static content pages
  for (const link of contentLinks) {
    entries.push({
      url: `${siteUrl}/pages/${link.handle}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    })
  }

  return entries
}
