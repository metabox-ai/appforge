# Component reference

Usage documentation for everything in this design system. One file per
component, in `docs/`.

**This folder describes how to use a component and when to reach for it. It
deliberately does not describe how components are built.** There is no CSS, no
token names, no class names and no file paths here — only the behaviour you
can rely on, the props you can pass, and the decision context you need to
pick the right one.

If you need to change a component rather than use one, read the source under
`src/`.

## The catalogue

| Component | File | What it is for |
|---|---|---|
| Button | [docs/button.md](docs/button.md) | Triggers an action |
| Badge | [docs/badge.md](docs/badge.md) | Small status or category chip |
| Card | [docs/card.md](docs/card.md) | Groups related content on a surface |
| Section | [docs/section.md](docs/section.md) | A page region with padding and a background |
| ShapeSection | [docs/shape-section.md](docs/shape-section.md) | A Section whose edge is cut by a silhouette |
| Intro | [docs/intro.md](docs/intro.md) | Layout: eyebrow above a heading |
| IntroDetailed | [docs/intro-detailed.md](docs/intro-detailed.md) | Layout: eyebrow, heading, byline and paragraph |

## How to read these

Each doc has the same four parts:

1. **When to use it** — the decision. What the component is for, and what to
   reach for instead when it does not fit. Read this first.
2. **Props** — the full surface area, with types and defaults.
3. **Usage** — copy-pasteable examples.
4. **Notes** — behaviour worth knowing before you rely on it.

## Two kinds of thing here

**Components** are concrete and visible — a Button looks like a button.

**Layouts** are abstract. They define the layers, their order and their
spacing, and they render nothing concrete themselves: each slot takes a
component you supply. Use a layout when you want a specific arrangement of
existing components; use a component when you want the thing itself.

## Colours

Every component takes colour through the global token set, so a surface
re-themes with the rest of the page when light and dark mode switch. Pass a
token reference rather than a literal:

```tsx
<Button variant="primary" />            // uses the brand colour
<Section bg="var(--surface-secondary)" /> // uses the recessed surface
```

The full set of names lives in the global token file: `src/tokens/semantic.css`.
The ones that matter most are `--primary`, `--secondary`, `--accent`,
`--surface`, `--surface-secondary`, `--surface-hover`, `--surface-selected`,
`--foreground`, `--muted-foreground`, and the status families `--success`,
`--warning`, `--danger` and `--info` (each with a `-subtle` and `-border`
companion for quiet surfaces).
