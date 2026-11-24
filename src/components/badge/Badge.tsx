import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeVariant =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'outline'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual variant — maps to a `.badge--*` modifier in ./style.css */
  variant?: BadgeVariant
  children?: ReactNode
}

const VARIANT_CLASS: Record<BadgeVariant, string> = {
  neutral: 'badge--neutral',
  success: 'badge--success',
  warning: 'badge--warning',
  danger: 'badge--danger',
  info: 'badge--info',
  outline: 'badge--outline',
}

/** All visual styling lives in ./style.css as semantic tokens. */
export function Badge({
  variant = 'neutral',
  className = '',
  children,
  ...rest
}: BadgeProps) {
  const classes = ['badge', VARIANT_CLASS[variant], className]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  )
}

export default Badge
