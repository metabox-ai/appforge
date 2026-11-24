import type { HTMLAttributes, ReactNode } from 'react'

/**
 * IntroDetailed — abstract layout.
 *
 * Same layering discipline as Intro, with two extra slots:
 *
 *   [subtitle] [title] [slogan] [detail]
 *
 * The subtitle and the slogan are the same kind of layer — a short line set
 * apart from the heading — but they sit in different places and answer
 * different questions. The subtitle labels the whole block; the slogan
 * attributes it (an author, a date, a category).
 *
 * The detail slot renders a `<p>`, because it is body copy.
 */
export interface IntroDetailedProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Slot — sits above the title. Typically a badge or an eyebrow label. */
  subtitle?: ReactNode
  /** Slot — the main heading. Pass the heading element itself. */
  title: ReactNode
  /** Slot — sits under the title. Typically an author, date or category. */
  slogan?: ReactNode
  /** Slot — the body copy. Rendered as a paragraph. */
  detail?: ReactNode
}

export function IntroDetailed({
  subtitle,
  title,
  slogan,
  detail,
  className = '',
  ...rest
}: IntroDetailedProps) {
  return (
    <div
      className={['intro', 'intro--detailed', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {subtitle !== undefined && (
        <div className="intro__subtitle">{subtitle}</div>
      )}
      {title !== undefined && <div className="intro__title">{title}</div>}
      {slogan !== undefined && (
        <div className="intro__slogan">{slogan}</div>
      )}
      {detail !== undefined && <p className="intro__detail">{detail}</p>}
    </div>
  )
}

export default IntroDetailed
