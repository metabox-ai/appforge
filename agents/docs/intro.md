# Intro

An abstract layout: an eyebrow above a heading.

## What it is

`Intro` arranges two things in a fixed order and gives them the right amount
of room:

```
[subtitle]
   ↓
[title]
```

It renders no concrete components itself. Each slot takes a component you
supply — usually a [Badge](badge.md) for the subtitle and a heading element
for the title. The layout decides only where each one sits and how much
space separates them.

## When to use it

Use an Intro when you are opening a page or a region and want to announce
what it is: a hero, a section header, the title of a panel.

Reach for something else when:

- **You need body copy under the heading.** Use
  [IntroDetailed](intro-detailed.md), which adds a byline and a paragraph.
- **There is no heading to write.** A dashboard, a settings list or a table
  page does not want a 2rem heading above it. Use a plain
  [Section](section.md).
- **The heading is not the point.** If the content is the point, let the
  content lead and use a [Section](section.md) with a plain heading.
- **You need a specific order.** The order is fixed — subtitle above title.
  If your content needs the opposite, it is a different layout.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `subtitle` | `ReactNode` | — | Optional. Sits above the title. Usually a [Badge](badge.md) or a short label. |
| `title` | `ReactNode` | — | **Required.** The heading. Pass the heading element itself. |
| `className` | `string` | `''` | Appended to the component's own classes. |

All native `<div>` attributes are accepted and forwarded.

## Usage

```tsx
import { Intro } from './layout'
import { Badge } from './components'

<Intro
  subtitle={<Badge variant="info">New</Badge>}
  title={<h1 className="text-4xl font-semibold tracking-tight">Ship faster</h1>}
/>
```

A title on its own, with no eyebrow:

```tsx
<Intro title={<h2 className="text-2xl font-semibold">Recent activity</h2>} />
```

The subtitle does not have to be a Badge — any short element works:

```tsx
<Intro
  subtitle={<span className="text-content-muted text-sm">Case study</span>}
  title={<h1 className="text-4xl font-semibold">Rebuilding the editor</h1>}
/>
```

## Rendering guidance

- **Spacing is handled for you.** Do not add margins to the title or the
  subtitle — the layout already separates them, and adding your own will
  double it.
- **The layout is centred** and capped at a comfortable measure, so a long
  heading wraps instead of running off the screen. If you want it flush left,
  override it with layout utilities on `className`.
- **Pass the heading element yourself** so you control the level. The layout
  does not know whether it is inside a page (`h1`) or a panel (`h2`).
- Keep the subtitle short. It is an eyebrow, not a second heading.

## Composition

An Intro is a layout, so it sits inside something that provides the region:

```tsx
<Section px={6} py={10}>
  <Intro
    subtitle={<Badge variant="info">New</Badge>}
    title={<h1 className="text-4xl font-semibold tracking-tight">Ship faster</h1>}
  />
</Section>
```

- [Section](section.md) for a plain band around it.
- [ShapeSection](shape-section.md) when the band should have a cut edge.
- [Badge](badge.md) for the subtitle.

## Accessibility

- The layout renders a `div` and adds no heading of its own — so the heading
  level you pass is the heading level that gets rendered. Pass a real heading
  element, not a styled `div`; screen-reader users navigate by heading, and a
  visually identical `div` disappears from that structure.
- The subtitle is decorative context. If it carries information the heading
  does not, make sure it is not conveyed by colour alone.
