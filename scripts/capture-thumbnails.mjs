// Captures sobre (cover) thumbnails for every Elysium invitation project.
// Output: public/thumbnails/{slug}.png  (540x960 @ 2x DPR = 1080x1920, 9:16 portrait)
//         public/catalog.json           (used by flyer.html for the 3D coverflow)
//
// Usage: node scripts/capture-thumbnails.mjs
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = join(__dirname, '..')
const THUMB_DIR = join(PROJECT_ROOT, 'public', 'thumbnails')
const CATALOG_PATH = join(PROJECT_ROOT, 'public', 'catalog.json')

const SLUG_TO_TITLE = (slug) =>
  slug
    .replace(/^(boda|xv|65)-?/, '')
    .replace(/-y-/g, ' & ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

// ─── Master catalog (verified from Vercel + memory) ──────────────────────────
const PROJECTS = [
  // ── BODAS ──
  ...[
    'boda-hector-y-cecilia', 'boda-faustino-y-sandra', 'boda-tania-leonardo',
    'boda-diana-olivares', 'boda-irais-y-jesus', 'boda-jonathan-y-maria',
    'boda-fabi-y-rafa', 'boda-cristal-y-humberto', 'boda-romy-y-miguel',
    'boda-iveth-y-eduardo', 'boda-nao-leo', 'boda-gustavo-y-paola',
    'boda-cesar-y-beatriz', 'boda-karen-y-manuel', 'boda-erika-vera',
    'boda-mariana-y-aldo', 'boda-samantha-y-alexander', 'boda-mariana-y-pedro',
    'boda-fernanda-y-guillermo', 'boda-adry-y-heri', 'boda-fer-y-lupita',
    'boda-isaac-y-claudia', 'boda-damaris-y-jesus', 'boda-karla-y-leonel',
    'boda-osvaldo-y-carolina', 'boda-tania-y-gus', 'boda-blanca-y-abdiel',
    'boda-lucia-y-abner', 'boda-rogelio-y-yesenia', 'boda-griselda-y-jorge',
    'boda-michel-y-lesly', 'boda-leilani-y-jose', 'boda-veronica-y-andres',
    'boda-enma-y-uziel', 'boda-jennyfer-y-jonathan', 'boda-sandra-y-alfredo',
    'boda-guillermo-y-fernanda', 'boda-olivia-y-carlos', 'boda-mario-e-ileana',
    'boda-juana-y-eduardo', 'boda-barbara-y-esteban', 'boda-fernanda-y-ricardo',
    'boda-zaira-y-alexis', 'boda-carolina-y-alfonso', 'boda-nelly-y-anyelo',
    'boda-cynthia-y-arturo', 'boda-alejandro-y-mayreli', 'boda-jennifer',
    'boda-santiago-valentina', 'boda-valentina-rodrigo', 'boda-lupita-faisal',
    'boda-santiago-ximena', 'boda-jorge-eva',
  ].map((slug) => ({ slug, type: 'boda' })),

  // ── XV ──
  ...[
    'xv-ailin', 'xv-melissa', 'xv-daphne', 'xv-valentina-three',
    'xv-julia-sofia', 'xv-natalia', 'xv-paola-yamelly',
  ].map((slug) => ({ slug, type: 'xv' })),

  // ── CUMPLEAÑOS ──
  { slug: '65-olivia-fierro', type: 'cumple' },
]

const urlFor = (slug) => `https://${slug}.vercel.app`

// ─── HEAD check (skip dead URLs) ─────────────────────────────────────────────
async function isLive(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' })
    return res.ok || res.status === 401 // 401 = password-protected but live
  } catch {
    return false
  }
}

await mkdir(THUMB_DIR, { recursive: true })

console.log(`Checking which of ${PROJECTS.length} projects are live...`)
const liveChecks = await Promise.all(
  PROJECTS.map(async (p) => ({ ...p, live: await isLive(urlFor(p.slug)) }))
)
const live = liveChecks.filter((p) => p.live)
const dead = liveChecks.filter((p) => !p.live)
console.log(`✓ ${live.length} live, ✗ ${dead.length} dead`)
if (dead.length) console.log(`  Skipped: ${dead.map((d) => d.slug).join(', ')}`)

// ─── Launch headless and capture ─────────────────────────────────────────────
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

const catalog = []

try {
  for (const project of live) {
    const url = urlFor(project.slug)
    console.log(`→ ${project.slug}`)
    let page
    try {
      page = await browser.newPage()
      await page.setViewport({
        width: 540,
        height: 960,
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      })
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 45_000 })
      await page.evaluate(() => document.fonts.ready).catch(() => {})
      // Let intro animations settle but DO NOT click anything (sobre stays closed)
      await new Promise((r) => setTimeout(r, 2500))

      const thumbPath = join(THUMB_DIR, `${project.slug}.png`)
      await page.screenshot({
        path: thumbPath,
        type: 'png',
        clip: { x: 0, y: 0, width: 540, height: 960 },
      })

      catalog.push({
        slug: project.slug,
        type: project.type,
        title: SLUG_TO_TITLE(project.slug),
        url,
        thumbnail: `/thumbnails/${project.slug}.png`,
      })
      console.log(`   ✓ saved`)
    } catch (err) {
      console.log(`   ✗ failed: ${err.message}`)
    } finally {
      if (page) await page.close().catch(() => {})
    }
  }
} finally {
  await browser.close()
}

await writeFile(CATALOG_PATH, JSON.stringify(catalog, null, 2), 'utf8')
console.log(`\n✓ Catalog written (${catalog.length} entries): ${CATALOG_PATH}`)
