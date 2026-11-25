# Section

A page region with padding and an optional background.

## When to use it

Use a Section when you need to give a band of content room to breathe, and
optionally a surface of its own — a hero, a feature strip, a call to action, a
footer.

Reach for something else when:

- **The content is a self-contained item** — a record, a form, a teaser. Use a
  [Card](card.md). A Section is a region, not a box.
- **You want a group of related items in a row.** A Section does not lay out
  columns; that is the caller's job with layout utilities.
- **The edge of the region should not be a straight line.** Use a
  [ShapeSection](shape-section.md).
- **You only need spacing between two things.** A margin is not a Section.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `px` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8` | `4` | Inline (horizontal) padding, as a spacing step. |
| `py` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8` | `4` | Block (vertical) padding, as a spacing step. |
| `bg` | `string` | none | Background colour. Accepts any CSS colour. |
| `className` | `string` | `''` | Appended to the component's own classes. |
| `children` | `ReactNode` | — | The content. |

All native `<section>` attributes are accepted and forwarded.

## The spacing scale

`px` and `py` take a step number, not a length. The steps are the same
everywhere they appear in the system.

| Step | Size | Typical use |
|---|---|---|
| `0` | `0` | No padding — the caller is providing their own. |
| `1` | `0.25rem` (4px) | Tight — a chip row inside a band. |
| `2` | `0.5rem` (8px) | Dense — a compact toolbar. |
| `3` | `0.75rem` (12px) | Snug — a single short line. |
| `4` | `1rem` (16px) | **Default.** Ordinary content padding. |
| `5` | `1.5rem` (24px) | Comfortable — a hero with a heading. |
| `6` | `2rem` (32px) | Roomy — a full band. |
| `7` | `2.5rem` (40px) | Generous. |
| `8` | `3rem` (48px) | Maximum — a page hero. |

## Usage

```tsx
import { Section } from './components'

// A band with the default padding
<Section>
  <h2 className="text-2xl font-semibold">Ship faster</h2>
</Section>

// A roomy hero
<Section px={6} py={8}>
  <Intro
    subtitle={<Badge variant="info">New</Badge>}
    title={<h1 className="text-4xl font-semibold">Ship faster</h1>}
  />
</Section>

// A band on a recessed surface
<Section bg="var(--surface-secondary)" px={6} py={8}>
  <p>Everything below the fold.</p>
</Section>
```

## Backgrounds

`bg` takes any CSS colour. Pass a global token so the surface follows the
theme:

```tsx
<Section bg="var(--surface-secondary)" />
<Section bg="var(--primary)" />
```

A Section with no `bg` is transparent, so whatever is behind it shows
through. That is usually what you want when the Section is just adding space.

## Composition

- Sections stack vertically. Put the spacing between them on the Section
  itself with `py`, rather than adding margins to the content.
- For the opening of a page, put an [Intro](intro.md) inside.
- For a band that should not end in a hard edge, use a
  [ShapeSection](shape-section.md) instead.

## Accessibility

A Section renders a `<section>` element. That is an HTML landmark, and a page
with several sections should give each one an accessible name — use `aria-label`
or `aria-labelledby` pointing at its heading — so that landmark navigation is
useful rather than a list of identical "section" entries.

## Theming

Backgrounds follow the page in light and dark mode as long as you pass a token
reference rather than a literal colour.
