import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export type LogoVariant = 'header' | 'footer' | 'full' | 'horizontal' | 'mark'

interface MeedoraLogoProps {
  variant?: LogoVariant
  className?: string
  priority?: boolean
  asLink?: boolean
  onClick?: () => void
}

/**
 * Meedora Official Brand Logo Component
 * - header: Horizontal emblem + typography lockup optimized for site navigation
 * - footer / full: Grand vertical emblem + wordmark + "ADORN YOURSELF" + star divider
 * - horizontal: Side-by-side emblem and wordmark
 * - mark: Standalone emblem mark (star + interlocking tulip petals)
 */
export function MeedoraLogo({
  variant = 'header',
  className,
  priority = false,
  asLink = true,
  onClick,
}: MeedoraLogoProps) {
  let content: React.ReactNode

  if (variant === 'mark') {
    content = (
      <div className={cn('relative inline-flex items-center justify-center', className)}>
        <Image
          src="/images/logo-mark.png"
          alt="Meedora"
          width={48}
          height={56}
          priority={priority}
          className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>
    )
  } else if (variant === 'footer' || variant === 'full') {
    content = (
      <div className={cn('flex flex-col items-start text-left', className)}>
        <div className="relative h-28 w-44 sm:h-32 sm:w-52 transition-transform duration-500 hover:scale-[1.02]">
          <Image
            src="/images/logo.png"
            alt="Meedora — Adorn Yourself"
            fill
            sizes="(max-width: 640px) 176px, 208px"
            priority={priority}
            className="object-contain object-left"
          />
        </div>
      </div>
    )
  } else {
    // 'header' or 'horizontal'
    content = (
      <div className={cn('flex items-center gap-2.5 sm:gap-3', className)}>
        {/* Emblem */}
        <div className="relative h-11 w-10 shrink-0 transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-11">
          <Image
            src="/images/logo-mark.png"
            alt=""
            fill
            sizes="48px"
            priority={priority}
            className="object-contain"
          />
        </div>

        {/* Wordmark typography */}
        <div className="flex flex-col justify-center">
          <span className="font-serif text-2xl font-normal leading-none tracking-[-0.03em] text-foreground sm:text-3xl">
            Meedora
          </span>
          <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.24em] text-amber-900/80 dark:text-amber-200/80 sm:text-[10px]">
            Adorn Yourself
          </span>
        </div>
      </div>
    )
  }

  if (asLink) {
    return (
      <Link
        href="/"
        onClick={onClick}
        aria-label="Meedora — Return to homepage"
        className="group inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xs"
      >
        {content}
      </Link>
    )
  }

  return content
}
