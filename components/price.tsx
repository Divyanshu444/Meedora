'use client'

import { Money } from '@shopify/hydrogen-react'
import type { Money as MoneyType } from '@/lib/shopify-types'

export function Price({ money, className }: { money: MoneyType; className?: string }) {
  return <Money data={money as Parameters<typeof Money>[0]['data']} withoutTrailingZeros className={className} />
}
