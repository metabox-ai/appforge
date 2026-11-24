import type { HTMLAttributes, ReactNode } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Remove inner padding and shadow — useful for edge-to-edge card content */
  flush?: boolean
  /** Add a hover affordance for cards that act as a link/target */
  interactive?: boolean
  children?: ReactNode
}

export function Card({
  flush = false,
  interactive = false,
  className = '',
  children,
  ...rest
}: CardProps) {
  const classes = [
    'card',
    flush ? 'card--flush' : '',
    interactive ? 'card--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

export function CardHeader({
  className = '',
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={['card__header', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  )
}

export function CardTitle({
  className = '',
  children,
  ...rest
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={['card__title', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </h3>
  )
}

export function CardDescription({
  className = '',
  children,
  ...rest
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={['card__description', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </p>
  )
}

export function CardContent({
  className = '',
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={['card__content', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  )
}

export function CardFooter({
  className = '',
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={['card__footer', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  )
}
