# IntroDetailed

An abstract layout: an eyebrow, a heading, a byline and a paragraph.

## What it is

`IntroDetailed` arranges four things in a fixed order and gives them the
right amount of room:

```
[subtitle]
   ↓
[title]
   ↓
[slogan]
   ↓
[detail]
```

It renders no concrete components itself. Each slot takes a component you
supply. The layout decides only where each one sits and how much space
separates them.

The subtitle and the slogan are the same kind of layer — a short line set
apart from the heading — but they sit in different places and answer
different questions. The **subtitle** labels the whole block ("Case study",
"New"). The **slogan** attributes it: an author, a date, a category.

## When to use it

Use an IntroDetailed when you are opening an article, a case study or a page
that needs both attribution and a summary: a title, who wrote it, and a
paragraph saying what it is about.

Reach for something else when:

- **You only need an eyebrow and a heading.** Use [Intro](intro.md) — the
  lighter version of this same layout.
- **There is no author or category to attribute.** The slogan slot is
  optional; if you leave it out, use [Intro](intro.md) and pass your
  paragraph differently.
- **The content is a list.** A layout with one paragraph in it is the wrong
  tool for a list of items — use a [Section](section.md) with a heading.
- **You need a specific order.** The order is fixed.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `subtitle` | `ReactNode` | — | Optional. Sits above the title. Usually a [Badge](badge.md) or a short label. |
| `title` | `ReactNode` | — | **Required.** The heading. Pass the heading element itself. |
| `slogan` | `ReactNode` | — | Optional. Sits under the title. An author, a date, a category. |
| `detail` | `ReactNode` | — | Optional. The body copy. Rendered as a paragraph. |
| `className` | `string` | `''` | Appended to the component's own classes. |

All native `<div>` attributes are accepted and forwarded.

## Usage

```tsx
import { IntroDetailed } from './layout'
import { Badge } from './components'

<IntroDetailed
  subtitle={<Badge variant="success">Case study</Badge>}
  title={<h1 className="text-4xl font-semibold tracking-tight">Rebuilding the editor</h1>}
  slogan={<span className="text-content-muted text-sm">By Ada Lovelace · 12 March</span>}
  detail="A look at how we moved the editor to a streaming renderer without
  changing a single public API."
/>
```

With no byline — just the label, the heading and the summary:

```tsx
<IntroDetailed
  subtitle={<Badge variant="info">Release notes</Badge>}
  title={<h1 className="text-3xl font-semibold">Version 2.4</h1>}
  detail="Faster sync, a new command palette, and 40% smaller bundles."
/>
```

## Rendering guidance

- **Spacing is handled for you.** Do not add margins to the slots — the layout
  already separates them, and adding your own will double the space.
- **The layout is centred** and capped at a comfortable measure, so a long
  heading and a long paragraph both wrap rather than running off the screen.
  The paragraph gets a tighter measure than the heading, which is what makes
  the block readable.
- **Pass the heading element yourself** so you control the level. The layout
  does not know whether it is inside a page (`h1`) or a panel (`h2`).
- **The detail renders as a paragraph.** Pass plain text or inline elements;
  do not pass a block element such as a `div` or another paragraph into it.

## Composition

An IntroDetailed is a layout, so it sits inside something that provides the
region:

```tsx
<Section px={6} py={10}>
  <IntroDetailed
    subtitle={<Badge variant="success">Case study</Badge>}
    title={<h1 className="text-4xl font-semibold tracking-tight">Rebuilding the editor</h1>}
    slogan={<span className="text-content-muted text-sm">By Ada Lovelace</span>}
    detail="A look at how we moved the editor to a streaming renderer."
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
- The detail renders as a `<p>`, so it is announced as a paragraph.
- The slogan is usually metadata. If it carries information that matters on
  its own — an author whose work matters — make sure it is text, not an
  avatar or an icon with no accessible name.
