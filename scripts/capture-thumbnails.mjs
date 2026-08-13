// Captura el sobre (portada) de cada invitación listada en scripts/invitations.json.
// Incremental: si el thumbnail ya existe, lo reusa (no recaptura).
// Salida: public/thumbnails/{slug}.png  (540x960 @2x = 1080x1920, 9:16)
//         public/catalog.json           (consumido por el catálogo)
//
// Uso: node scripts/capture-thumbnails.mjs
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const THUMB_DIR = join(ROOT, 'public', 'thumbnails')
const CATALOG = join(ROOT, 'public', 'catalog.json')
const LIST = join(__dirname, 'invitations.json')

const title = (slug) =>
  slug
    .replace(/^(boda|xv|15|50|60|65|aniversario|babyshower|bautizo|cumple|save-the-date|std)-?/, '')
    .replace(/-y-/g, ' & ')
    .replace(/-\d+$/, '')
    .replace(/-/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase()) || slug

async function isLive(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' })
    return res.ok || res.status === 401
  } catch { return false }
}

const PROJECTS = JSON.parse(await readFile(LIST, 'utf8'))
await mkdir(THUMB_DIR, { recursive: true })

console.log(`Revisando ${PROJECTS.length} invitaciones…`)
const checks = await Promise.all(PROJECTS.map(async (p) => ({ ...p, live: await isLive(p.url) })))
const live = checks.filter((p) => p.live)
const dead = checks.filter((p) => !p.live)
console.log(`✓ ${live.length} vivas, ✗ ${dead.length} caídas`)
if (dead.length) console.log(`  Saltadas: ${dead.map((d) => d.slug).join(', ')}`)

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
const catalog = []

try {
  for (const p of live) {
    const thumbFile = join(THUMB_DIR, `${p.slug}.png`)
    const entry = { slug: p.slug, type: p.type, title: title(p.slug), url: p.url, thumbnail: `/thumbnails/${p.slug}.png` }

    if (existsSync(thumbFile)) {
      catalog.push(entry)
      console.log(`↷ ${p.slug} (existente)`)
      continue
    }

    console.log(`→ ${p.slug}`)
    let page
    try {
      page = await browser.newPage()
      await page.setViewport({ width: 540, height: 960, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
      await page.goto(p.url, { waitUntil: 'networkidle2', timeout: 45_000 })
      await page.evaluate(() => document.fonts.ready).catch(() => {})
      await new Promise((r) => setTimeout(r, 2500)) // deja asentar el sobre, sin clic
      await page.screenshot({ path: thumbFile, type: 'png', clip: { x: 0, y: 0, width: 540, height: 960 } })
      catalog.push(entry)
      console.log(`   ✓ guardada`)
    } catch (err) {
      console.log(`   ✗ falló: ${err.message}`)
    } finally {
      if (page) await page.close().catch(() => {})
    }
  }
} finally {
  await browser.close()
}

// Orden: más reciente primero se pierde aquí (van por slug); dejamos por tipo y título.
catalog.sort((a, b) => a.type.localeCompare(b.type) || a.title.localeCompare(b.title))
await writeFile(CATALOG, JSON.stringify(catalog, null, 2), 'utf8')
console.log(`\n✓ Catálogo escrito (${catalog.length}): ${CATALOG}`)
