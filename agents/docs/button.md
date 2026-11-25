# Button

Triggers an action. The primary interactive element of the system.

## When to use it

Use a Button when the user is doing something — submitting a form, opening a
dialog, saving, deleting.

Reach for something else when:

- **The action is navigation** (going to another page). Use a link. A button
  that navigates breaks middle-click, keyboard expectations and screen-reader
  link lists.
- **The control toggles a value** on or off. Use a checkbox or a switch —
  they expose their state, a button does not.
- **It is one of several actions behind a menu.** Use a dropdown menu, not a
  row of buttons.
- **It opens a disclosure** (a tooltip, a popover). Use the trigger for that
  rather than a Button, so the relationship is announced correctly.

Keep **one primary Button per view**. If you have two candidates, both are
secondary.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive'` | `'primary'` | See the variants table below. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | `sm` for dense toolbars, `lg` for a single hero action. |
| `fullWidth` | `boolean` | `false` | Stretches to the width of its container. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Defaults to `button` so it never submits a form by accident. |
| `disabled` | `boolean` | `false` | Native disabled state. |
| `className` | `string` | `''` | Appended to the component's own classes. |
| `children` | `ReactNode` | — | The label. |

All native `<button>` attributes are accepted and forwarded, including
`onClick`, `aria-label`, `form`, `name` and `value`.

## Variants

| Variant | Use it when |
|---|---|
| `primary` | The main action of the view. The one thing you want done. |
| `secondary` | A supporting action next to a primary one. |
| `outline` | A third action, or an action on a surface that is already busy. |
| `ghost` | Low-emphasis actions in a toolbar or a card header. |
| `destructive` | The action destroys something — delete, revoke, cancel a subscription. |

`destructive` is for the button that removes data. If a destructive action is
one of several options, confirm it — pair it with a dialog, and never make it
the default focus target.

## Usage

```tsx
import { Button } from './components'

// A form submit
<Button type="submit">Save changes</Button>

// A destructive action, de-emphasised until hover
<Button variant="destructive" onClick={remove}>Delete project</Button>

// A low-emphasis action in a card header
<Button variant="ghost" size="sm">Edit</Button>

// Full width inside a form
<Button fullWidth type="submit">
  {isPending ? 'Creating…' : 'Create project'}
</Button>
```

## Composition

A Button takes text, an icon, or both. Icon-only Buttons need an
`aria-label` — there is no visible text for a screen reader to announce.

```tsx
<Button variant="outline" size="sm" aria-label="Close">
  <CloseIcon aria-hidden="true" />
</Button>
```

Buttons work well next to a Badge when the label carries a status, and inside
a Card footer for the actions belonging to that card.

## Accessibility

- Defaults to `type="button"`. Set `type="submit"` deliberately inside forms.
- A disabled Button is removed from the tab order and cannot be focused. If a
  user should be able to reach it and read *why* it is unavailable, use
  `aria-disabled="true"` instead of `disabled` and handle the no-op yourself.
- Never put a Button inside another Button or inside a link.
- The label should describe the outcome ("Save changes"), not the mechanism
  ("Submit"). For destructive actions, name the thing being destroyed
  ("Delete project"), not just "Delete".

## Theming

The variants are already themed. If you need a colour outside the five
variants, prefer a different component over restyling a Button.
