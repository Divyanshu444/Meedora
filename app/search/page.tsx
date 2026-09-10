import type { Metadata } from 'next'
import Link from 'next/link'
import { Search as SearchIcon } from 'lucide-react'
import { searchProducts } from '@/lib/shopify'
import { ProductGrid } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel } from '@/components/ui/field'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search the Meedora jewelry collection — find earrings, necklaces, rings, and more.',
  robots: { index: false },
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q?.trim().slice(0, 100) || ''
  const results = query ? await searchProducts(query) : null

  return (
    <main id="main-content" className="site-width pb-16">
      <div className="mx-auto max-w-2xl py-10">
        <h1 className="display-heading mb-6 text-center text-3xl sm:text-4xl">
          {query ? `Results for "${query}"` : 'Search our collection'}
        </h1>

        <form action="/search" className="flex gap-3">
          <Field className="flex-1">
            <FieldLabel htmlFor="search-input" className="sr-only">
              Search jewelry
            </FieldLabel>
            <Input
              id="search-input"
              name="q"
              type="search"
              defaultValue={query}
              required
              maxLength={100}
              placeholder="Try hoops, jhumkas, a little gold…"
              className="h-12"
            />
          </Field>
          <Button type="submit" size="lg" aria-label="Search">
            <SearchIcon />
          </Button>
        </form>
      </div>

      {results && results.nodes.length > 0 && (
        <section>
          <p className="mb-6 text-sm text-muted-foreground">
            {results.nodes.length} {results.nodes.length === 1 ? 'piece' : 'pieces'} found
          </p>
          <ProductGrid products={results.nodes} />
        </section>
      )}

      {results && results.nodes.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="font-serif text-2xl">No pieces found for &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-muted-foreground">
            Try a different search, or explore our full collection.
          </p>
          <Button variant="outline" size="lg" render={<Link href="/collections/all" />}>
            Browse all jewelry
          </Button>
        </div>
      )}
    </main>
  )
}
