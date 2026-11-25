# ShapeSection

A Section whose edge is cut by a silhouette instead of ending in a plain
rectangle.

## When to use it

Use a ShapeSection when a band of colour runs to the edge of the page and
should melt into the next block rather than stop at a hard line — a hero that
fades into the page, a call to action that leads somewhere, a colour band
between two sections.

Reach for something else when:

- **You want a plain rectangle.** Use a [Section](section.md). The silhouette
  is the whole point; do not pay for it if you do not want it.
- **The region is narrow.** The silhouette is designed for full-bleed width.
  In a column or inside a [Card](card.md), a cut edge reads as a rendering
  accident rather than a shape.
- **The content sits right against the cut.** The cut removes background at
  the edge, so keep a little padding between your content and the shaped
  edge. Use `px` and `py` to guarantee it.
- **You need a border or a shadow.** A Section is a plain surface; this one
  trades that for the silhouette.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `shape` | `'slant' \| 'cloud'` | `'slant'` | The silhouette. See below. |
| `position` | `'top' \| 'bottom'` | `'bottom'` | Which edge the silhouette is applied to. |
| `bg` | `string` | none | Background colour. Accepts any CSS colour. |
| `bgImage` | `string` | none | Background image URL. |
| `px` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8` | `4` | Inline (horizontal) padding, as a spacing step. |
| `py` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8` | `4` | Block (vertical) padding, as a spacing step. |
| `className` | `string` | `''` | Appended to the component's own classes. |
| `children` | `ReactNode` | — | The content. |

All native `<section>` attributes are accepted and forwarded.

`px` and `py` use the same spacing scale as
[Section](section.md) — see that doc for the step table.

## Shapes

| Shape | Looks like | Use it when |
|---|---|---|
| `slant` | A single diagonal cut across the edge. | You want a clean, directional transition. It is the quieter of the two. |
| `cloud` | A scalloped edge made of soft bumps. | You want something softer and more decorative. |

## Position

`position="top"` cuts the top edge, `position="bottom"` cuts the bottom edge.

Use `"bottom"` when the shape leads into the next block — a hero that hands
over to the page below it. Use `"top"` when the shape cuts into the block
above, so the band appears to rise out of the page.

Stacking two ShapeSections back to back — one cut at the bottom, the next cut
at the top — reads as one continuous surface with a rippled join.

## Backgrounds

`bg` takes a solid colour and `bgImage` takes a URL. **Both are cut by the
same silhouette**, so an image background is trimmed to the shape rather than
sitting in a rectangle behind it.

```tsx
<ShapeSection shape="cloud" position="bottom" bg="var(--primary)" py={8} />

<ShapeSection
  shape="slant"
  position="bottom"
  bgImage="/hero.jpg"
  px={6}
  py={10}
/>
```

A background image fills the region and is cropped to fit; you cannot
position or scale it separately.

## Usage

```tsx
import { ShapeSection } from './components'

// A hero that slopes into the page below
<ShapeSection
  shape="slant"
  position="bottom"
  bg="var(--primary)"
  px={6}
  py={10}
>
  <Intro
    subtitle={<Badge>Now available</Badge>}
    title={<h1 className="text-4xl font-semibold text-primary-foreground">Ship faster</h1>}
  />
</ShapeSection>
```

## The shape zone

The silhouette has room of its own. The section reserves a zone on the shaped
side, and the cut happens inside that zone — so the content always keeps its
full padding, whatever the content's length and whatever the silhouette is.

```
┌─────────────────────────┐
│  shape zone   (masked)  │  ← the silhouette lives here, and only here
├─────────────────────────┤
│  content + its padding  │  ← always fully backed by the fill
└─────────────────────────┘
```

This is why you never have to add extra padding to keep content clear of the
edge — the component does it for you. Two practical consequences:

- **The section is a little taller than its content.** The zone sits between
  the content and the edge of the section.
- **The silhouette keeps a fixed depth.** It does not grow as the section
  grows, so a long section and a short one get the same shape.

## Notes

- **The silhouette only affects the background.** Your content is never cut,
  clipped or hidden by the shape — only the fill behind it is.
- **A background image stays continuous.** The image covers the whole section
  and the silhouette is cut out of it, so there is no seam where the zone
  meets the content.
- Use `bg` for a flat fill and `bgImage` for a photograph. Setting both means
  the image paints over the colour.

## Composition

- Put an [Intro](intro.md) or [IntroDetailed](intro-detailed.md) inside for the
  headline.
- A [Badge](badge.md) works well as the eyebrow on a shaped band.
- Pair a `slant` with a [Section](section.md) below it — the straight edge
  gives the slant something to resolve into.

## Accessibility

A ShapeSection renders a `<section>` element, like a Section. If a page has
several, name each one with `aria-label` or `aria-labelledby` so landmark
navigation stays useful.

The silhouette is decorative. It carries no information of its own, so it
should never be the only thing distinguishing two regions.

## Theming

Backgrounds follow the page in light and dark mode as long as you pass a token
reference rather than a literal colour.
