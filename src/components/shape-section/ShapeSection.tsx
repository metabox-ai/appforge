import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

/** Silhouette applied to the section's edge. */
export type ShapeSectionShape = 'slant' | 'cloud'

/** Which edge of the section the silhouette is applied to. */
export type ShapeSectionPosition = 'top' | 'bottom'

/**
 * Spacing-scale step used by the `px` / `py` props.
 * Each step maps to a `--shape-section-padding-*` token in ./style.css.
 */
export type ShapeSectionSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export interface ShapeSectionProps extends HTMLAttributes<HTMLElement> {
  /** Silhouette — maps to a `.shape-section--<shape>-<position>` modifier. */
  shape?: ShapeSectionShape
  /** Edge the silhouette is applied to. */
  position?: ShapeSectionPosition
  /** Background colour. Pass a global token to stay theme-aware, e.g. `bg="var(--primary)"`. */
  bg?: string
  /**
   * Background image URL. The silhouette clips it exactly like it clips the
   * solid fill, so the image is cut by the same outline.
   */
  bgImage?: string
  /** Inline (horizontal) padding — selects a spacing-scale step. */
  px?: ShapeSectionSpacing
  /** Block (vertical) padding — selects a spacing-scale step. */
  py?: ShapeSectionSpacing
  children?: ReactNode
}

/** Quotes a URL for safe use in a CSS `url()` value. */
function toCssUrl(value: string) {
  if (value.startsWith('url(')) return value
  return `url("${value.replace(/"/g, '\\"')}")`
}

/**
 * All visual styling lives in ./style.css as semantic tokens.
 * The background sits on its own masked layer, so the silhouette never clips
 * the content.
 */
export function ShapeSection({
  shape = 'slant',
  position = 'bottom',
  bg,
  bgImage,
  px,
  py,
  className = '',
  children,
  style,
  ...rest
}: ShapeSectionProps) {
  const classes = [
    'shape-section',
    `shape-section--${shape}-${position}`,
    px !== undefined ? `shape-section--px-${px}` : '',
    py !== undefined ? `shape-section--py-${py}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const layerStyle: CSSProperties = {}
  if (bg !== undefined) layerStyle.backgroundColor = bg
  if (bgImage !== undefined) layerStyle.backgroundImage = toCssUrl(bgImage)

  return (
    <section className={classes} style={style} {...rest}>
      <div className="shape-section__bg" style={layerStyle} aria-hidden="true" />
      <div className="shape-section__content">{children}</div>
    </section>
  )
}

export default ShapeSection
