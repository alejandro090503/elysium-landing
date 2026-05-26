// Quick mobile screenshot for visual verification at narrow viewport
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public')
await mkdir(OUT_DIR, { recursive: true })

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

const page = await browser.newPage()
await page.setViewport({
  width: 375,
  height: 800,
  deviceScaleFactor: 2,
  isMobile: true,
})
await page.goto('https://elysium-landing-bice.vercel.app/flyer.html', {
  waitUntil: 'networkidle0',
  timeout: 60_000,
})
await page.evaluate(() => document.fonts.ready)
await new Promise((r) => setTimeout(r, 600))

const path = join(OUT_DIR, 'flyer-mobile-check.png')
await page.screenshot({ path, fullPage: true, type: 'png' })
console.log(`Mobile screenshot: ${path}`)
await browser.close()
