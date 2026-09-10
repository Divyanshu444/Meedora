import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="site-width flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center"
    >
      <p className="eyebrow">Page not found</p>
      <h1 className="display-heading text-5xl sm:text-6xl">
        This page has wandered off
      </h1>
      <p className="max-w-md text-base text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist — but your next
        favourite piece might be just a click away.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button size="lg" render={<Link href="/collections/all" />}>
          Browse all jewelry <ArrowRight data-icon="inline-end" />
        </Button>
        <Button size="lg" variant="outline" render={<Link href="/" />}>
          Back to home
        </Button>
      </div>
    </main>
  )
}
