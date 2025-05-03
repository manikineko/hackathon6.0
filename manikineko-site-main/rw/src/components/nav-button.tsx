'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavButtonProps {
  href: string
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function NavButton({ href, icon, children, className }: NavButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-800/50 text-mint hover:bg-gray-700/50 transition-colors",
        className
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}

