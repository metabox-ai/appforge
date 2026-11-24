const { chromium } = require('playwright')

// Chromium reports computed colors as `oklch(L C H)` with L as a 0..1 decimal,
// matching how the tokens are authored in src/tokens/semantic.css.
;(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN || '/usr/local/bin/chromium',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  })
  const page = await browser.newPage({ viewport: { width: 1280, height: 1200 } })
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(String(e)))

  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' })

  const probe = () =>
    page.evaluate(() => {
      const cs = getComputedStyle(document.documentElement)
      const pick = (sel) => document.querySelector(sel)
      const styleOf = (sel) => {
        const el = pick(sel)
        return el ? getComputedStyle(el) : null
      }
      const primary = styleOf('.btn--primary')
      const card = styleOf('.card')
      const badge = styleOf('.badge--success')
      const title = styleOf('.card__title')
      return {
        dark: document.documentElement.classList.contains('dark'),
        tokenBackground: cs.getPropertyValue('--background').trim(),
        tokenPrimary: cs.getPropertyValue('--primary').trim(),
        bodyBg: getComputedStyle(document.body).backgroundColor,
        bodyFg: getComputedStyle(document.body).color,
        primaryBtnBg: primary ? primary.backgroundColor : null,
        primaryBtnFg: primary ? primary.color : null,
        primaryBtnBgToken: primary
          ? primary.getPropertyValue('--btn-background').trim()
          : null,
        resolvedPrimary: cs.getPropertyValue('--primary').trim(),
        primaryBtnRadius: primary ? primary.borderRadius : null,
        secondaryBtnBg: styleOf('.btn--secondary')?.backgroundColor ?? null,
        outlineBtnBg: styleOf('.btn--outline')?.backgroundColor ?? null,
        outlineBtnBorder: styleOf('.btn--outline')?.borderColor ?? null,
        disabledBtnBg: styleOf('.btn:disabled')?.backgroundColor ?? null,
        cardBg: card ? card.backgroundColor : null,
        cardBorder: card ? card.borderColor : null,
        cardTitleColor: title ? title.color : null,
        badgeBg: badge ? badge.backgroundColor : null,
        badgeFg: badge ? badge.color : null,
        utilityContentSecondary: styleOf('.text-content-secondary')?.color ?? null,
        utilitySurfaceSecondary:
          styleOf('.bg-surface-secondary')?.backgroundColor ?? null,
        utilitySurfaceHover: styleOf('.bg-surface-secondary')
          ? null
          : null,
      }
    })

  const light = await probe()
  await page.screenshot({ path: '/workspace/screenshots/light.png', fullPage: true })

  // Flip to dark through the real UI button, not a synthetic class toggle.
  await page.getByRole('button', { name: /switch to dark/i }).click()
  await page.waitForTimeout(400)
  const dark = await probe()
  await page.screenshot({ path: '/workspace/screenshots/dark.png', fullPage: true })

  console.log('CONSOLE ERRORS:', errors.length ? errors : 'none')
  console.log('\n--- LIGHT ---\n' + JSON.stringify(light, null, 2))
  console.log('\n--- DARK ---\n' + JSON.stringify(dark, null, 2))

  const checks = []
  const t = (name, ok) => checks.push([ok ? 'PASS' : 'FAIL', name])

  // ── light theme ──
  t('global tokens resolve on :root', light.tokenPrimary.startsWith('oklch'))
  t(
    'body background = --background',
    light.bodyBg === 'oklch(0.985 0.002 247)',
  )
  t('body foreground = --foreground', light.bodyFg === 'oklch(0.145 0.015 257)')
  t(
    'primary button uses --btn-background token',
    light.primaryBtnBgToken === light.resolvedPrimary,
  )
  t(
    'primary button paints --primary',
    light.primaryBtnBg === 'oklch(0.546 0.215 262)',
  )
  t(
    'secondary button paints --secondary',
    light.secondaryBtnBg === 'oklch(0.965 0.006 257)',
  )
  t('outline button is transparent', light.outlineBtnBg === 'rgba(0, 0, 0, 0)')
  t(
    'outline button border = --border',
    light.outlineBtnBorder === 'oklch(0.91 0.01 257)',
  )
  t('card surface = --card', light.cardBg === 'oklch(1 0 0)')
  t('card title = --foreground', light.cardTitleColor === 'oklch(0.145 0.015 257)')
  t(
    'badge success = --success-subtle',
    light.badgeBg === 'oklch(0.95 0.045 155)',
  )
  t(
    'theme inline utility: text-content-secondary',
    light.utilityContentSecondary === 'oklch(0.39 0.02 257)',
  )
  t(
    'theme inline utility: bg-surface-secondary',
    light.utilitySurfaceSecondary === 'oklch(0.965 0.006 257)',
  )

  // ── dark theme ──
  t('dark class applied by the toggle', dark.dark === true)
  t(
    'dark --background resolves',
    dark.tokenBackground.startsWith('oklch(16%'),
  )
  t(
    'dark body background differs',
    dark.bodyBg === 'oklch(0.16 0.015 257)',
  )
  t(
    'dark primary button differs',
    dark.primaryBtnBg === 'oklch(0.72 0.16 260)',
  )
  t('dark card surface differs', dark.cardBg === 'oklch(0.205 0.018 257)')
  t('dark badge differs', dark.badgeBg === 'oklch(0.27 0.045 155)')
  t(
    'dark content utility differs',
    dark.utilityContentSecondary === 'oklch(0.82 0.012 257)',
  )

  console.log('\n--- CHECKS ---')
  checks.forEach(([s, n]) => console.log(`${s}  ${n}`))
  const failed = checks.filter(([s]) => s === 'FAIL')
  console.log(`\n${checks.length - failed.length}/${checks.length} passed`)

  await browser.close()
  process.exit(failed.length ? 1 : 0)
})()
