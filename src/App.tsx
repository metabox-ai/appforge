import { useEffect, useState } from 'react'

import { Badge } from './components/badge'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Section,
  ShapeSection,
} from './components'
import { Intro, IntroDetailed } from './layout'

const SWATCHES = [
  { name: 'primary', varName: '--primary' },
  { name: 'secondary', varName: '--secondary' },
  { name: 'accent', varName: '--accent' },
  { name: 'muted', varName: '--muted' },
  { name: 'destructive', varName: '--destructive' },
  { name: 'success', varName: '--success' },
  { name: 'warning', varName: '--warning' },
  { name: 'info', varName: '--info' },
]

/* A gradient used as an image background, to show that the silhouette clips
   an image exactly like it clips a solid fill. */
const GRADIENT_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%236366f1'/%3E%3Cstop offset='1' stop-color='%2306b6d4'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='200' fill='url(%23g)'/%3E%3C/svg%3E"

function useTheme() {
  const [dark, setDark] = useState(
    () => localStorage.getItem('theme') === 'dark',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return [dark, setDark] as const
}

export default function App() {
  const [dark, setDark] = useTheme()

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Semantic UI
          </h1>
          <p className="text-content-secondary max-w-xl">
            React + Tailwind CSS v4. Global tokens live in{' '}
            <code className="bg-surface-secondary rounded px-1.5 py-0.5 text-sm">
              src/tokens/semantic.css
            </code>
            ; every component owns its own semantic tokens in{' '}
            <code className="bg-surface-secondary rounded px-1.5 py-0.5 text-sm">
              src/components/&lt;name&gt;/style.css
            </code>
            .
          </p>
        </div>
        <Button variant="outline" onClick={() => setDark(!dark)}>
          {dark ? 'Switch to light' : 'Switch to dark'}
        </Button>
      </header>

      {/* ── Buttons ────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Button</CardTitle>
          <CardDescription>
            Tokens are scoped as <code>--btn-*</code> inside the component
            stylesheet.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </CardContent>
        <CardFooter>
          <Badge variant="success">Tokens resolved</Badge>
          <Badge variant="info">@layer components</Badge>
        </CardFooter>
      </Card>

      {/* ── Badges ─────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Badge</CardTitle>
          <CardDescription>
            Status variants map onto the global feedback tokens.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Neutral</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </CardContent>
      </Card>

      {/* ── Section ────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Section</CardTitle>
          <CardDescription>
            A <code>&lt;section&gt;</code> wrapper with <code>px</code> /{' '}
            <code>py</code> spacing steps, and a <code>bg</code> applied through
            an inline style.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Section
            px={4}
            py={3}
            bg="var(--surface-secondary)"
            className="border-border rounded-lg border"
          >
            <p className="text-content-secondary text-sm">
              <code>px={'{4}'}</code> · <code>py={'{3}'}</code> ·{' '}
              <code>bg="var(--surface-secondary)"</code>
            </p>
          </Section>

          <Section
            px={6}
            py={5}
            bg="var(--primary-subtle)"
            className="border-border rounded-lg border"
          >
            <p className="text-sm">
              <code>px={'{6}'}</code> · <code>py={'{5}'}</code> ·{' '}
              <code>bg="var(--primary-subtle)"</code>
            </p>
          </Section>

          <Section className="border-border rounded-lg border">
            <p className="text-content-secondary text-sm">
              No props — falls back to <code>px={'{4}'}</code> /{' '}
              <code>py={'{4}'}</code> and no background.
            </p>
          </Section>
        </CardContent>
      </Card>

      {/* ── ShapeSection ───────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>ShapeSection</CardTitle>
          <CardDescription>
            A <code>&lt;section&gt;</code> whose edge is cut by a CSS mask or
            clip-path on its background layer. The cut applies to whatever fills
            that layer — solid colour or image.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <ShapeSection
            shape="slant"
            position="top"
            bg="var(--surface-secondary)"
            px={4}
            py={6}
          >
            <p className="text-content-secondary text-sm">
              <code>shape="slant"</code> · <code>position="top"</code>
            </p>
          </ShapeSection>

          <ShapeSection
            shape="slant"
            position="bottom"
            bg="var(--surface-secondary)"
            px={4}
            py={6}
          >
            <p className="text-content-secondary text-sm">
              <code>shape="slant"</code> · <code>position="bottom"</code>
            </p>
          </ShapeSection>

          <ShapeSection
            shape="cloud"
            position="top"
            bg="var(--primary-subtle)"
            px={4}
            py={6}
          >
            <p className="text-sm">
              <code>shape="cloud"</code> · <code>position="top"</code>
            </p>
          </ShapeSection>

          <ShapeSection
            shape="cloud"
            position="bottom"
            bg="var(--primary-subtle)"
            px={4}
            py={6}
          >
            <p className="text-sm">
              <code>shape="cloud"</code> · <code>position="bottom"</code>
            </p>
          </ShapeSection>

          <ShapeSection
            shape="cloud"
            position="bottom"
            bgImage={GRADIENT_IMAGE}
            px={4}
            py={6}
          >
            <p className="text-sm font-medium text-white">
              The same silhouette, clipping an image background.
            </p>
          </ShapeSection>
        </CardContent>
      </Card>

      {/* ── Layouts ─────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Intro</CardTitle>
          <CardDescription>
            An abstract layout — layers, order and geometry only. Every slot
            takes a component; the layout decides where it sits and how much
            room it gets.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <Intro
            subtitle={<Badge variant="info">Abstract layout</Badge>}
            title={
              <h2 className="text-2xl font-semibold tracking-tight">
                Slots hold components
              </h2>
            }
          />

          <IntroDetailed
            subtitle={<Badge variant="success">Component</Badge>}
            title={
              <h2 className="text-2xl font-semibold tracking-tight">
                IntroDetailed
              </h2>
            }
            slogan={<span className="text-content-muted text-sm">By Mavis</span>}
            detail="Subtitle, title, slogan and detail — the slogan attributes
            the block, the detail carries the body copy."
          />
        </CardContent>
      </Card>

      {/* ── Token swatches ─────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Global tokens</CardTitle>
          <CardDescription>
            Read straight from <code>src/tokens/semantic.css</code> — switch the
            theme to see them re-resolve.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SWATCHES.map((token) => (
              <div
                key={token.name}
                className="border-border flex flex-col gap-2 rounded-lg border p-3"
              >
                <span
                  className="h-10 w-full rounded-md"
                  style={{ backgroundColor: `var(${token.varName})` }}
                />
                <span className="text-sm font-medium">{token.name}</span>
                <span className="text-content-muted font-mono text-xs">
                  {token.varName}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
