# Badge

A small, non-interactive chip that labels or reports state.

## When to use it

Use a Badge for short, passive information attached to something else: a
status, a category, a count, a version, a "new" marker.

Reach for something else when:

- **The user can act on it.** A Badge is not a button. If it should be
  clickable, use a Button — a clickable chip that looks inert is a trap.
- **The text is long.** Badges are meant to be scannable in one glance. Past
  a word or two, you want a paragraph or a Card.
- **It labels a form field.** Use a real `<label>`, which is associated with
  its input for assistive technology.
- **It is the only thing in the row.** A lone Badge with nothing to label is
  decoration. Put it next to the thing it describes.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `'neutral' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'outline'` | `'neutral'` | See the variants table below. |
| `className` | `string` | `''` | Appended to the component's own classes. |
| `children` | `ReactNode` | — | The label. |

All native `<span>` attributes are accepted and forwarded.

## Variants

| Variant | Use it when |
|---|---|
| `neutral` | The status is normal and needs no emphasis — "Active", "Draft". |
| `success` | The state is good — "Healthy", "Deployed", "Paid". |
| `warning` | The state needs attention but nothing is broken — "Degraded", "Expiring". |
| `danger` | The state is bad — "Failed", "Offline", "Past due". |
| `info` | The state is neutral but worth surfacing — "Beta", "New", "Preview". |
| `outline` | You want the label without a filled background — on a busy surface, or when the colour would compete with content. |

Status colours are semantic, not decorative. `danger` means something is
wrong, so do not use it for a category that just happens to be red.

## Usage

```tsx
import { Badge } from './components'

// A status next to a name
<div className="flex items-center gap-2">
  <span>api-gateway</span>
  <Badge variant="success">Healthy</Badge>
</div>

// A count
<Badge variant="outline">12</Badge>

// A category, on a card
<Badge variant="info">Case study</Badge>
```

## Composition

Badges read best as a label for a sibling — a name, a version, a row title.
Place the Badge after the thing it describes.

Inside a Card header or footer, a Badge works well as a quiet status marker:

```tsx
<Card>
  <CardHeader>
    <CardTitle>api-gateway</CardTitle>
    <CardDescription>Edge routing for the EU region</CardDescription>
  </CardHeader>
  <CardFooter>
    <Badge variant="success">Healthy</Badge>
  </CardFooter>
</Card>
```

They also sit above a heading as the eyebrow of an
[Intro](intro.md) layout.

## Accessibility

- A Badge is a `<span>` and is not announced as a button, which is correct for
  a passive label.
- Do not rely on colour alone to convey meaning. Pair the colour with text
  that says the same thing — "Healthy" rather than a green dot.
- For a live-updating status, put the Badge in a live region so the change is
  announced rather than only painted.

## Theming

The variants are already themed and follow the page in light and dark mode.
You do not need to pass a colour.
