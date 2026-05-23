// Renders public/flyer.html into public/flyer.png (high-DPI mobile) and public/flyer.pdf (A4).
// Usage: node scripts/generate-flyer.mjs [--url=<live-url>]
//
// Default: uses the deployed URL https://elysium-landing-bice.vercel.app/flyer.html
// so the Google Fonts (Great Vibes, Cormorant Infant) and inline SVG backgrounds
// resolve correctly.
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = join(__dirname, '..')
const OUT_DIR = join(PROJECT_ROOT, 'public')

const urlArg = process.argv.find((a) => a.startsWith('--url='))
const URL = urlArg
  ? urlArg.slice('--url='.length)
  : 'https://elysium-landing-bice.vercel.app/flyer.html'

console.log(`Rendering flyer from: ${URL}`)

await mkdir(OUT_DIR, { recursive: true })

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

try {
  const page = await browser.newPage()

  // Mobile-like viewport at 2x DPR for crisp output
  await page.setViewport({
    width: 540,
    height: 1200,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    isLandscape: false,
  })

  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60_000 })

  // Wait for webfonts to load
  await page.evaluate(() => document.fonts.ready)

  // Small delay to let any animations settle
  await new Promise((r) => setTimeout(r, 500))

  // PNG — full page, transparent? No, keep background
  const pngPath = join(OUT_DIR, 'flyer.png')
  await page.screenshot({
    path: pngPath,
    fullPage: true,
    type: 'png',
    omitBackground: false,
  })
  console.log(`✓ PNG written: ${pngPath}`)

  // PDF — A4 portrait
  const pdfPath = join(OUT_DIR, 'flyer.pdf')
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  })
  console.log(`✓ PDF written: ${pdfPath}`)
} finally {
  await browser.close()
}
