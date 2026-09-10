import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { getProduct, getRelatedProducts } from '@/lib/shopify'
import { ProductDetail } from '@/components/product-detail'
import { ProductGrid } from '@/components/product-card'
import { siteUrl } from '@/lib/site'

export const revalidate = 60
export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) return { title: 'Piece not found' }
  return { title: product.seo.title || product.title, description: product.seo.description || product.description.slice(0, 160), alternates: { canonical: `/products/${product.handle}` }, openGraph: { title: product.title, description: product.description.slice(0, 160), images: product.featuredImage ? [product.featuredImage.url] : [] } }
}
export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) notFound()
  const related = await getRelatedProducts(product.id)
  const schema = { '@context': 'https://schema.org', '@type': 'Product', name: product.title, description: product.description, image: product.images.nodes.map(i => i.url), brand: { '@type': 'Brand', name: 'Meedora' }, offers: product.variants.nodes.map(v => ({ '@type': 'Offer', url: `${siteUrl}/products/${product.handle}`, priceCurrency: v.price.currencyCode, price: v.price.amount, availability: `https://schema.org/${v.availableForSale ? 'InStock' : 'OutOfStock'}`, itemCondition: 'https://schema.org/NewCondition' })) }
  return <main id="main-content" className="site-width pb-28 lg:pb-16"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /><nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 py-6 text-sm text-muted-foreground"><Link href="/">Home</Link><ChevronRight className="size-3" /><Link href="/collections/all">All jewelry</Link><ChevronRight className="size-3" /><span aria-current="page">{product.title}</span></nav><ProductDetail product={product} />{related.length > 0 && <section className="mt-20"><h2 className="display-heading mb-8 text-3xl md:text-4xl">A little more to adore</h2><ProductGrid products={related} /></section>}</main>
}
