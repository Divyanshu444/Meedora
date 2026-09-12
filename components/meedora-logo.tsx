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
        <div className="relative h-14 w-60 sm:h-16 sm:w-72 transition-transform duration-500 hover:scale-[1.02]">
          <Image
            src="/images/Meedora_logomain_transparent.png"
            alt="Meedora — Adorn Yourself"
            fill
            sizes="(max-width: 640px) 240px, 288px"
            priority={priority}
            className="object-contain object-left"
          />
        </div>
      </div>
    )
  } else {
    // 'header' or 'horizontal'
    content = (
      <div className={cn('relative h-11 w-48 sm:h-12 sm:w-56 transition-transform duration-300 group-hover:scale-[1.02]', className)}>
        <Image
          src="/images/Meedora_logomain_transparent.png"
          alt="Meedora — Adorn Yourself"
          fill
          sizes="(max-width: 640px) 192px, 224px"
          priority={priority}
          className="object-contain object-left"
        />
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
