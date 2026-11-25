# SplitCard

An abstract layout: a two-column card that reads like a big postcard — one
side describes, the other side shows.

## What it is

`SplitCard` gives you two slots and puts them side by side:

```
[ left ] [ right ]
```

It renders no concrete components itself. Each side takes whatever you supply
— a heading and a paragraph on one side, an image on the other. The layout
decides only the geometry: the columns, the gutter between them, the radius,
the border and the order once the card stacks on a narrow viewport.

It is designed to live inside a [Section](section.md). There it takes the
full width of the section by cancelling the section's inline padding, so the
card reaches the section's own edges instead of floating in the middle of its
content column.

## When to use it

Use a SplitCard for a feature that has a description and a visual: one side
explains, the other shows the product, a screenshot, a diagram.

Reach for something else when:

- **There is only one piece of content.** Use a [Card](card.md).
- **The two sides are not peers.** If one is a heading and the other is body
  copy, use an [IntroDetailed](intro-detailed.md).
- **You need the content in a band, not a card.** Use a
  [Section](section.md) or a [ShapeSection](shape-section.md).
- **The order matters more than the pairing.** This layout is two columns;
  for stacked, ordered layers use one of the Intro layouts.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `left` | `ReactNode` | — | Content of the left side. `children` is an alias for this. |
| `right` | `ReactNode` | — | Content of the right side. Omit it and the left side takes the full width. |
| `border` | `boolean` | `false` | Draws a 1px border, and the divider line between the two sides. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'none'` | Corner radius of the card. |
| `bg` | `string` | `transparent` | Background colour. Pass a token, e.g. `bg="var(--surface-secondary)"`. |
| `responsiveTop` | `'left' \| 'right'` | `'left'` | Which side comes first once the card stacks on a narrow viewport. |
| `py` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8` | `4` | Block spacing around the card — the same rhythm a section child gets by default. |
| `flush` | `boolean \| 'left' \| 'right'` | `false` | Removes the inner padding of one or both sides, so media can run edge to edge. |
| `className` | `string` | `''` | Appended to the layout's own classes. |

All native `<div>` attributes are accepted and forwarded.

## Usage

```tsx
import { Section } from './components'
import { SplitCard } from './layout'

<Section px={6} py={8} bg="var(--surface-secondary)">
  <SplitCard border radius="lg" bg="var(--surface)">
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">Ship faster</h3>
      <p className="text-content-secondary text-sm">
        One side describes it, the other side shows it.
      </p>
    </div>
    <img src="/screenshot.png" alt="" className="w-full rounded-md" />
  </SplitCard>
</Section>
```

Media that should run to the card's edge, with the description side keeping
its own padding:

```tsx
<SplitCard border radius="lg" bg="var(--surface)" flush="right">
  <div className="flex flex-col gap-2">
    <h3 className="text-lg font-semibold">Ship faster</h3>
    <p className="text-content-secondary text-sm">The media runs edge to edge.</p>
  </div>
  <img src="/screenshot.png" alt="" className="h-full w-full object-cover" />
</SplitCard>
```

A card that stacks with the media first on mobile:

```tsx
<SplitCard border radius="lg" bg="var(--surface)" responsiveTop="right">
  <p>Description</p>
  <img src="/screenshot.png" alt="" />
</SplitCard>
```

## Rendering guidance

- **Do not add your own margins around the card.** `py` already sets the
  block spacing, and the layout sits flush against its section's edges.
- **Do not add your own padding inside a side.** The inner spacing is
  handled for you. Use `flush` when you want a side to run edge to edge,
  and give the other side its own padding inside its content.
- **The card takes the full width of its section.** That is deliberate — it
  is the reason the layout lives inside a section rather than replacing one.
  To keep it narrower, constrain the section, not the card.
- **Pass the heading element yourself** so you control the level; the layout
  never invents one.

## Accessibility

- The layout renders a `div` and adds no heading of its own — pass a real
  heading element, not a styled `div`.
- The order of the two sides is swapped on narrow viewports when
  `responsiveTop` says so. Reading order follows the visual order, so the
  swap is intentional and announced in the same sequence it is seen.
- If a side is purely decorative media, give it an empty `alt` rather than
  describing the visual a second time in the text.

## Composition

- [Section](section.md) for the band around it.
- [Card](card.md) for grouping content inside one side.
- [Badge](badge.md) for a small label in the description side.
