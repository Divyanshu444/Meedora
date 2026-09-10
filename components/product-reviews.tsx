'use client'

import { useState } from 'react'
import { CheckCircle2, Star, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'

type Review = {
  id: string
  name: string
  location: string
  date: string
  rating: number
  title: string
  content: string
  verified: boolean
  likes: number
}

const sampleReviews: Record<string, Review[]> = {
  default: [
    {
      id: 'rev_1',
      name: 'Pooja R.',
      location: 'Mumbai, MH',
      date: '3 days ago',
      rating: 5,
      title: 'Even prettier in person',
      content:
        'The 18k tone looks warm and genuinely premium, not yellow or brassy at all. Wore it to work three days straight and received so many compliments. The blush box packaging is lovely too!',
      verified: true,
      likes: 14,
    },
    {
      id: 'rev_2',
      name: 'Ananya S.',
      location: 'Bengaluru, KA',
      date: '1 week ago',
      rating: 5,
      title: 'Feather-light and comfortable',
      content:
        'Usually statement pieces weigh down my ears or neckline, but Meedora got the weight balance just right. Extremely comfortable for all-day wear.',
      verified: true,
      likes: 9,
    },
    {
      id: 'rev_3',
      name: 'Meera K.',
      location: 'Jaipur, RJ',
      date: '2 weeks ago',
      rating: 4,
      title: 'High quality finish, prompt delivery',
      content:
        'Arrived in 3 days in Jaipur with the anti-tarnish pouch. Finish has held up completely through humid evenings. Will definitely buy for gifting next.',
      verified: true,
      likes: 6,
    },
  ],
}

export function ProductReviews({
  productTitle,
  productType,
}: {
  productTitle: string
  productType?: string
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [helpfulLikes, setHelpfulLikes] = useState<Record<string, number>>({})

  const reviews = sampleReviews.default

  const toggleLike = (id: string, initial: number) => {
    setHelpfulLikes((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : initial + 1,
    }))
  }

  return (
    <section className="mt-16 border-t border-border pt-12" aria-labelledby="customer-reviews-heading">
      <div className="flex flex-col gap-8">
        {/* Header and Summary */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Customer Experiences</p>
            <h2 id="customer-reviews-heading" className="display-heading text-2xl sm:text-3xl">
              Verified Reviews for {productTitle}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Real thoughts from women adorning themselves daily.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setModalOpen(true)}
            className="w-fit"
          >
            Write a review
          </Button>
        </div>

        {/* Rating Breakdown Card */}
        <div className="grid gap-6 rounded-sm border border-border/80 bg-secondary/20 p-6 sm:grid-cols-3 sm:items-center">
          {/* Average Score */}
          <div className="flex flex-col items-center justify-center text-center sm:border-r sm:border-border/60 sm:pr-6">
            <span className="font-serif text-5xl font-medium text-foreground">4.9</span>
            <div className="mt-1.5 flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-current text-current" />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Based on 38 verified customer reviews
            </p>
          </div>

          {/* Distribution Bars */}
          <div className="flex flex-col gap-2 sm:col-span-2 sm:pl-4">
            <div className="flex items-center gap-3 text-xs">
              <span className="w-8 text-muted-foreground">5 star</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[88%] rounded-full bg-amber-500" />
              </div>
              <span className="w-8 text-right text-muted-foreground font-medium">88%</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="w-8 text-muted-foreground">4 star</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[10%] rounded-full bg-amber-500" />
              </div>
              <span className="w-8 text-right text-muted-foreground font-medium">10%</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="w-8 text-muted-foreground">3 star</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[2%] rounded-full bg-amber-500" />
              </div>
              <span className="w-8 text-right text-muted-foreground font-medium">2%</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="w-8 text-muted-foreground">2 star</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[0%] rounded-full bg-amber-500" />
              </div>
              <span className="w-8 text-right text-muted-foreground font-medium">0%</span>
            </div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="flex flex-col divide-y divide-border/60">
          {reviews.map((rev) => {
            const count = helpfulLikes[rev.id] ?? rev.likes
            return (
              <article key={rev.id} className="py-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="size-3.5 fill-current text-current" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-foreground">{rev.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{rev.date}</span>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {rev.content}
                </p>

                <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{rev.name}</span>
                    <span>·</span>
                    <span>{rev.location}</span>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="size-3" /> Verified Buyer
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleLike(rev.id, rev.likes)}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ThumbsUp className="size-3" />
                    <span>Helpful ({count})</span>
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Write a Review Sheet */}
      <Sheet open={modalOpen} onOpenChange={setModalOpen}>
        <SheetContent className="w-[340px] sm:w-[420px]">
          <SheetHeader>
            <SheetTitle className="font-serif text-2xl">Write a Review</SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground">
              Share your thoughts on {productTitle}
            </SheetDescription>
          </SheetHeader>

          {submitted ? (
            <div className="mt-8 flex flex-col items-center gap-3 text-center py-10">
              <CheckCircle2 className="size-12 text-primary" />
              <p className="font-serif text-xl">Thank you for sharing!</p>
              <p className="text-xs text-muted-foreground">
                Your feedback helps other women choose their everyday adore.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSubmitted(false)
                  setModalOpen(false)
                }}
              >
                Close
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              className="mt-6 flex flex-col gap-4"
            >
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Overall Rating
                </label>
                <div className="mt-1.5 flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className="p-1 hover:scale-110 transition-transform"
                      aria-label={`${i + 1} star`}
                    >
                      <Star className="size-6 fill-current text-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Review Title
                </label>
                <Input
                  required
                  placeholder="e.g. Gorgeous everyday piece"
                  className="mt-1 bg-background"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Review
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How does the jewelry feel? How is the finish and comfort?"
                  className="mt-1 w-full rounded-md border border-input bg-background p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Name
                </label>
                <Input
                  required
                  placeholder="e.g. Aditi Sharma"
                  className="mt-1 bg-background"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  City / Location
                </label>
                <Input
                  placeholder="e.g. New Delhi"
                  className="mt-1 bg-background"
                />
              </div>

              <Button type="submit" className="mt-2 w-full">
                Submit Review
              </Button>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </section>
  )
}
