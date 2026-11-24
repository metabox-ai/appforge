import type { HTMLAttributes, ReactNode } from 'react'

/**
 * Intro — abstract layout.
 *
 * Defines the layers, their order and their geometry only. It renders no
 * concrete components: each slot is a place for the caller to drop one.
 *
 * `title` shadows the standard HTML `title` attribute, so it is omitted from
 * the base props and re-declared as a slot.
 */
export interface IntroProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Slot — sits above the title. Typically a badge or an eyebrow label. */
  subtitle?: ReactNode
  /** Slot — the main heading. Pass the heading element itself. */
  title: ReactNode
}

export function Intro({
  subtitle,
  title,
  className = '',
  ...rest
}: IntroProps) {
  return (
    <div className={['intro', className].filter(Boolean).join(' ')} {...rest}>
      {subtitle !== undefined && (
        <div className="intro__subtitle">{subtitle}</div>
      )}
      {title !== undefined && <div className="intro__title">{title}</div>}
    </div>
  )
}

export default Intro
