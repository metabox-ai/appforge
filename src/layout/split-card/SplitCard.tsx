import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

/** Which of the two sides of the card. */
export type SplitCardSide = 'left' | 'right'

/** Corner-radius scale. */
export type SplitCardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

/**
 * Spacing-scale step used by the `py` prop.
 * Each step maps to a `--split-card-margin-block-*` token in ./style.css.
 */
export type SplitCardSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export interface SplitCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Draw a 1px border around the card. Off by default. */
  border?: boolean
  /** Corner radius of the card. Off by default. */
  radius?: SplitCardRadius
  /** Background colour. Pass a global token to stay theme-aware, e.g. `bg="var(--surface-secondary)"`. */
  bg?: string
  /** Which side moves to the top once the card stacks on a narrow viewport. */
  responsiveTop?: SplitCardSide
  /** Block spacing around the card — selects a spacing-scale step. */
  py?: SplitCardSpacing
  /** Remove the inner padding of one or both sides, so media can run edge to edge. */
  flush?: boolean | SplitCardSide
  /** Content of the left side. `children` is an alias for this. */
  left?: ReactNode
  /** Content of the right side. */
  right?: ReactNode
  children?: ReactNode
}

/**
 * All visual styling lives in ./style.css as semantic tokens.
 * This file only wires the props to their modifier classes.
 */
export function SplitCard({
  border = false,
  radius = 'none',
  bg,
  responsiveTop = 'left',
  py = 4,
  flush = false,
  left,
  right,
  className = '',
  children,
  style,
  ...rest
}: SplitCardProps) {
  const leftContent = left !== undefined ? left : children
  const flushLeft = flush === true || flush === 'left'
  const flushRight = flush === true || flush === 'right'

  const classes = [
    'split-card',
    border ? 'split-card--border' : '',
    `split-card--radius-${radius}`,
    `split-card--top-${responsiveTop}`,
    flushLeft && flushRight
      ? 'split-card--flush'
      : flushLeft
        ? 'split-card--flush-left'
        : flushRight
          ? 'split-card--flush-right'
          : '',
    leftContent !== undefined && right === undefined
      ? 'split-card--single'
      : '',
    py !== undefined ? `split-card--py-${py}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const inlineStyle: CSSProperties | undefined = bg
    ? { ...style, backgroundColor: bg }
    : style

  return (
    <div className={classes} style={inlineStyle} {...rest}>
      {leftContent !== undefined && (
        <div className="split-card__col split-card__col--left">{leftContent}</div>
      )}
      {right !== undefined && (
        <div className="split-card__col split-card__col--right">{right}</div>
      )}
    </div>
  )
}

export default SplitCard
