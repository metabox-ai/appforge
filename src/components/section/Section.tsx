import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

/**
 * Spacing-scale step used by the `px` / `py` props.
 * Each step maps to a `--section-padding-*` token in ./style.css.
 */
export type SectionSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Inline (horizontal) padding — selects a spacing-scale step. */
  px?: SectionSpacing
  /** Block (vertical) padding — selects a spacing-scale step. */
  py?: SectionSpacing
  /**
   * Background colour, applied through an inline style so it outranks the
   * component layer. Pass a global token to stay theme-aware, e.g.
   * `bg="var(--surface-secondary)"`.
   */
  bg?: string
  children?: ReactNode
}

/**
 * All visual styling lives in ./style.css as semantic tokens.
 * This file only wires the padding steps and the background to their styles.
 */
export function Section({
  px,
  py,
  bg,
  className = '',
  children,
  style,
  ...rest
}: SectionProps) {
  const classes = [
    'section',
    px !== undefined ? `section--px-${px}` : '',
    py !== undefined ? `section--py-${py}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const inlineStyle: CSSProperties | undefined = bg
    ? { ...style, backgroundColor: bg }
    : style

  return (
    <section className={classes} style={inlineStyle} {...rest}>
      {children}
    </section>
  )
}

export default Section
