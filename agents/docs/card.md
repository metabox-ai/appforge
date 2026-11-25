# Card

Groups related content onto a raised surface.

## When to use it

Use a Card when several things belong together and the grouping should be
visible: a settings panel, a record with its metadata, an article teaser, a
form.

Reach for something else when:

- **The content is one block of text.** A Card adds a border and a shadow
  around a single paragraph, which reads as clutter. Use a
  [Section](section.md).
- **You are nesting.** Cards inside cards turn a page into a set of boxes. If
  the inner group needs a surface, consider a different hierarchy — a
  [Section](section.md) with a border, or a divider.
- **The content is a list of equally-weighted items.** Use a table or a grid
  of sections instead of one card per item.
- **It is a whole page region.** A Card is a component; a full-bleed band is a
  [Section](section.md) or a [ShapeSection](shape-section.md).

## Parts

A Card is composed from six parts. Use only the ones you need.

| Part | Renders | Use it for |
|---|---|---|
| `Card` | `div` | The surface itself. |
| `CardHeader` | `div` | Top region, holding the title and description. |
| `CardTitle` | `h3` | The title of the card. |
| `CardDescription` | `p` | A short supporting line under the title. |
| `CardContent` | `div` | The main body. Stacks its children vertically. |
| `CardFooter` | `div` | Actions or metadata. Separated by a divider. |

## Props

### `Card`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `flush` | `boolean` | `false` | Removes the inner padding and shadow, for edge-to-edge content such as an image or a table. |
| `interactive` | `boolean` | `false` | Adds a hover affordance, for cards that act as a link or a target. |
| `className` | `string` | `''` | Appended to the component's own classes. |
| `children` | `ReactNode` | — | The parts. |

### The parts

`CardHeader`, `CardTitle`, `CardDescription`, `CardContent` and `CardFooter`
each accept `className` and `children`, plus the native attributes for the
element they render.

## Usage

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components'

<Card>
  <CardHeader>
    <CardTitle>api-gateway</CardTitle>
    <CardDescription>Edge routing for the EU region</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-content-secondary text-sm">
      Routes traffic across three availability zones.
    </p>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm">Configure</Button>
  </CardFooter>
</Card>
```

A card with no header — just content and actions:

```tsx
<Card>
  <CardContent className="flex flex-col gap-4">
    <p>Traffic is spread unevenly across zones.</p>
    <Button variant="secondary">Rebalance</Button>
  </CardContent>
</Card>
```

## Composition

- Pair with [Badge](badge.md) in the header or footer for a status.
- Put a [Button](button.md) in the footer for the actions that belong to that
  card.
- A card that opens a record uses `interactive`, and should contain a link or
  be the link target — not a Button that navigates.

## Accessibility

**`CardTitle` renders an `h3`.** That is often wrong: a card inside a page
whose main heading is an `h1` usually needs an `h2`, and a card in a sidebar
may need a lower level still. Check the heading outline of the page you are
dropping it into, and adjust the level accordingly.

A Card is a `div` and carries no landmark role. If a card is a meaningful
region of the page, give it `aria-labelledby` pointing at its title.

## Theming

The surface, border and text colours follow the page in light and dark mode.
You do not need to pass a colour.
