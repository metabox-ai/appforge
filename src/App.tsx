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
} from './components'

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
