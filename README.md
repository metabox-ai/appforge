# Semantic UI — React + Tailwind CSS v4

A React app where **every visual decision is a token**, and every component owns
its own tokens.

- **Tailwind CSS v4** (via `@tailwindcss/vite` — no `tailwind.config.js` needed)
- **Global design tokens** → `src/tokens/semantic.css` (your uploaded `semantic.css`, unmodified)
- **Component tokens** → `src/components/<name>/style.css`
- **Single stylesheet entry** → `src/style.css`

---

## The token model

There are two levels of tokens, and they never mix:

| Level | Where | Naming | Purpose |
|---|---|---|---|
| **Global** | `src/tokens/semantic.css` | `--primary`, `--surface-hover`, `--text-secondary` | Theme-wide meaning: *this color is "brand"*, *this surface is "recessed"*. |
| **Component** | `src/components/<name>/style.css` | `--btn-background`, `--card-padding` | Component-specific meaning: *this button's fill*, *this card's gutter*. |

Component tokens **reference** global tokens rather than hard-coding colors:

```css
/* src/components/button/style.css */
@layer components {
  .btn {
    --btn-background: var(--primary);      /* ← points at a global token */
    --btn-hover-background: var(--primary-hover);
    background-color: var(--btn-background);
  }
}
```

The payoff: swapping the theme (or `.dark`) re-resolves everything, and a
component's token can be overridden in one place without touching the rule that
uses it.

---

## Layout

```
src/
├── style.css                      ← Tailwind entry point (imports everything)
├── tokens/
│   └── semantic.css               ← GLOBAL tokens (light + .dark)
├── components/
│   ├── index.ts                   ← auto-generated barrel
│   ├── button/
│   │   ├── style.css              ← COMPONENT tokens, inside @layer components
│   │   ├── Button.tsx
│   │   └── index.ts
│   ├── card/
│   │   ├── style.css
│   │   ├── Card.tsx
│   │   └── index.ts
│   ├── badge/
│   │   ├── style.css
│   │   ├── Badge.tsx
│   │   └── index.ts
│   ├── section/
│   │   ├── style.css
│   │   ├── Section.tsx
│   │   └── index.ts
│   └── shape-section/
│       ├── style.css
│       ├── ShapeSection.tsx
│       └── index.ts
├── App.tsx
└── main.tsx
```

---

## How a component gets into Tailwind

Three steps, in this order:

**1 — Write the component's tokens and rules** in `src/components/<name>/style.css`.
Everything is wrapped in `@layer components` so it lands in Tailwind's
components layer and stays overridable by utilities:

```css
@layer components {
  .thing {
    --thing-background: var(--surface);
    --thing-foreground: var(--foreground);

    background-color: var(--thing-background);
    color: var(--thing-foreground);
  }
}
```

**2 — Import it** in `src/style.css`, right after the global tokens:

```css
@import "tailwindcss";
@import "./tokens/semantic.css";
@import "./components/button/style.css";   ← one line per component
@import "./components/card/style.css";
```

> All `@import` statements must come first in the file — CSS requires it, and
> Tailwind's `@source` / `@theme` directives go below them.

**3 — Use the classes** in the component's TSX. The TSX never mentions a color,
a radius, or a padding value — only class names:

```tsx
export function Thing({ className = '', children, ...rest }: ThingProps) {
  return (
    <div className={['thing', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  )
}
```

---

## Adding a new component

```bash
npm run new:component tooltip
```

This creates `src/components/tooltip/{style.css,Tooltip.tsx,index.ts}`, adds
the `@import` line to `src/style.css`, and regenerates `src/components/index.ts`.

Then fill in the semantic tokens in `style.css`:

```css
@layer components {
  .tooltip {
    --tooltip-background: var(--surface-elevated);
    --tooltip-foreground: var(--foreground);
    --tooltip-border: var(--border);
    --tooltip-radius: 0.5rem;
    --tooltip-padding: 0.5rem 0.75rem;

    background-color: var(--tooltip-background);
    color: var(--tooltip-foreground);
    border: 1px solid var(--tooltip-border);
    border-radius: var(--tooltip-radius);
    padding: var(--tooltip-padding);
  }
}
```

Rules that make this work:

- **Namespace every token** with the component prefix (`--tooltip-*`) so it can
  never collide with a global token or another component.
- **Express intent, not appearance**: `--tooltip-background`, not `--tooltip-blue`.
- **Prefer global tokens as the source value**: `var(--primary)`, not a hex code.

---

## Props that pick a token

`Section` and `ShapeSection` expose props, but none of them carry a raw value.
A prop selects a *token*, and the token carries the value — so the usual rule
still holds and the TSX never mentions a colour, radius or length.

`px` / `py` take a spacing-scale step. Each step is a token in the component's
stylesheet, and a modifier class points at it:

```css
/* src/components/section/style.css */
.section {
  --section-padding-inline: var(--section-padding-inline-4);
}
.section--px-6 {
  --section-padding-inline: var(--section-padding-inline-6);
}
```

```tsx
<Section px={6} py={4} />   /* → class="section section--px-6 section--py-4" */
```

The `bg` prop is the one deliberate exception. It is applied through an inline
style, which outranks the component layer:

```tsx
<Section bg="var(--surface-secondary)" />
```

An inline style still resolves `var(--token)` against the live theme, so the
surface re-themes with the rest of the page in dark mode.

---

## ShapeSection — cut edges

`ShapeSection` is a `<section>` whose edge is cut by a silhouette instead of
ending in a plain rectangle.

```tsx
<ShapeSection shape="cloud" position="bottom" bg="var(--primary)" py={8}>
  …
</ShapeSection>
```

| Prop | Values | Notes |
|---|---|---|
| `shape` | `slant` · `cloud` | The silhouette. |
| `position` | `top` · `bottom` | Which edge the silhouette is applied to. |
| `bg` | any CSS colour | Prefer a global token, e.g. `var(--primary)`. |
| `bgImage` | a URL | Background image. |
| `px` / `py` | spacing step | Same scale as `Section`. |

**The background lives on its own layer.** The component renders a masked
`.shape-section__bg` behind a `.shape-section__content` layer:

```html
<section class="shape-section shape-section--cloud-bottom">
  <div class="shape-section__bg"></div>   ← the fill + the cut
  <div class="shape-section__content">…</div>  ← never clipped
</section>
```

That split matters twice:

- The silhouette never clips the **content** — only the fill.
- A CSS `mask` (or `clip-path`) clips an element's *entire* painted output,
  including `background-image`. So `bgImage` is cut by exactly the same
  outline as a solid fill. One silhouette, either kind of background.

The two silhouettes use different tools, because they need different things:

- **`slant`** uses `clip-path: polygon(...)`. The cut needs a *fixed* depth — a
  depth that scaled with the section's height would flatten into an almost
  invisible lean across a wide, short section.
- **`cloud`** uses a `mask` made from an inline SVG tile of half-ellipse
  bumps, repeated with `mask-repeat: repeat-x`. The tile has a fixed width, so
  the bumps stay the same size however wide the section gets.

---

## Tailwind utilities from the same tokens

`src/style.css` maps the global tokens into Tailwind's theme with `@theme inline`,
so utilities and components read from one source of truth:

```css
@theme inline {
  --color-primary: var(--primary);
  --color-surface-hover: var(--surface-hover);
  --color-content-secondary: var(--text-secondary);
}
```

`inline` keeps the `var()` reference live, which is what makes light/dark work
at runtime. Naming rule: `--color-<token>` → `bg-<token>` / `text-<token>` /
`border-<token>`.

One exception: the `text-*` hierarchy tokens are exposed as `content-*`
(`text-content-secondary`) because `text-` is already Tailwind's text-color
utility namespace.

---

## Deterministic builds

`src/style.css` starts with `@import "tailwindcss" source(none);`, which turns
Tailwind's **automatic content detection off**. Without it, Tailwind v4 scans
every non-gitignored file in the project — Markdown, shell scripts, even
comments — for class-like words and emits utilities for whatever it finds, so
the CSS output depends on prose rather than on code.

With `source(none)`, the only sources are the explicit directives:

```css
@source "../index.html";
@source "./**/*.{ts,tsx}";
```

The result: a fresh clone and a working copy produce **byte-identical CSS**
(verified — same SHA-256), so a stray word in a README can't silently change
your bundle.

---

## Dark mode

`src/tokens/semantic.css` defines a `.dark` block. Toggle the class on `<html>`:

```tsx
document.documentElement.classList.toggle('dark', isDark)
```

`@custom-variant dark (&:where(.dark, .dark *));` is already declared in
`src/style.css` if you want `dark:` variants on utilities.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Serve the production build |
| `npm run typecheck` | TypeScript only |
| `npm run new:component <name>` | Scaffold a component following the token convention |
| `npm run verify` | Headless-browser check that tokens resolve in light + dark (needs `npm run preview` running) |

---

## Verified behaviour

`npm run verify` drives a real Chromium against the production build and asserts
20 checks, including:

- global tokens resolve on `:root`
- `--btn-background` resolves to `--primary`
- `.card` paints `--card`, `.badge--success` paints `--success-subtle`
- `@theme inline` utilities (`text-content-secondary`, `bg-surface-secondary`)
  resolve to the same variables the components use
- toggling `.dark` re-resolves every one of those
