// Flyer de la promoción extendida (Eterna $2,200 -> $1,800, hasta el 6 de septiembre).
// Genera dos formatos: post 1080x1350 y story 1080x1920.
// Uso: node scripts/make-flyer-promo.mjs
import { readFile, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const FONTDIR = join(ROOT, 'scripts', 'fonts')
const COVER = join(ROOT, 'scripts', 'wa-covers', 'boda-cristal-y-humberto.jpg')

const cover = `data:image/jpeg;base64,${(await readFile(COVER)).toString('base64')}`

const face = async (file, family, weight, style = 'normal') =>
  `@font-face{font-family:'${family}';font-weight:${weight};font-style:${style};src:url(data:font/woff2;base64,${(
    await readFile(join(FONTDIR, file))
  ).toString('base64')}) format('woff2')}`

const FONTS = (
  await Promise.all([
    face('GreatVibes-400.woff2', 'Great Vibes', 400),
    face('Cormorant-400.woff2', 'Cormorant Infant', 400),
    face('Cormorant-600.woff2', 'Cormorant Infant', 600),
    face('Cormorant-400i.woff2', 'Cormorant Infant', 400, 'italic'),
    face('Cormorant-600i.woff2', 'Cormorant Infant', 600, 'italic'),
    face('Inter-700.woff2', 'Inter', 700),
  ])
).join('')

// k = factor de escala: el story es más alto, todo crece un poco.
const page = (w, h, k) => `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;overflow:hidden;position:relative;
  font-family:'Cormorant Infant',Georgia,serif;color:#2B1F14;
  display:flex;flex-direction:column;align-items:center;
  padding:${64 * k}px ${60 * k}px ${56 * k}px;
  background:
    radial-gradient(circle at 50% 4%, rgba(212,175,127,.44), transparent 52%),
    radial-gradient(circle at 92% 96%, rgba(212,175,127,.26), transparent 46%),
    linear-gradient(160deg,#EFE6D4 0%,#FBF8F1 44%,#F2E9D7 100%)}
body::after{content:'';position:absolute;inset:${28 * k}px;pointer-events:none;
  border:1px solid rgba(155,123,67,.32);border-radius:${16 * k}px}

.brand{font-family:'Great Vibes',cursive;font-size:${104 * k}px;line-height:1;
  background:linear-gradient(135deg,#D4AF7F,#9B7B43 52%,#2B1F14);
  -webkit-background-clip:text;background-clip:text;color:transparent}
.kicker{font-family:'Inter',sans-serif;font-size:${17 * k}px;font-weight:700;
  letter-spacing:.34em;text-transform:uppercase;color:#9B7B43;margin-top:${6 * k}px}

.banda{margin-top:${30 * k}px;padding:${13 * k}px ${34 * k}px;border-radius:999px;
  background:linear-gradient(135deg,#D4AF7F,#9B7B43);color:#fff;
  font-family:'Inter',sans-serif;font-size:${20 * k}px;font-weight:700;
  letter-spacing:.20em;text-transform:uppercase;
  box-shadow:0 ${12 * k}px ${28 * k}px rgba(155,123,67,.42)}
.fecha{margin-top:${16 * k}px;font-size:${40 * k}px;font-style:italic;color:#7C7059}
.fecha b{font-style:normal;font-weight:600;color:#2B1F14}

.medio{flex:1;display:flex;align-items:center;justify-content:center;gap:${48 * k}px;
  width:100%;margin:${18 * k}px 0}
.phone{position:relative;width:${268 * k}px;height:${550 * k}px;flex:none;
  border-radius:${42 * k}px;padding:${8 * k}px;
  background:linear-gradient(160deg,#4a4a4e,#1b1b1e 30%,#39393d 62%,#151517);
  box-shadow:0 ${34 * k}px ${64 * k}px rgba(43,31,20,.40);transform:rotate(-4deg)}
.screen{width:100%;height:100%;border-radius:${35 * k}px;overflow:hidden;position:relative;background:#000}
.screen img{width:100%;height:100%;object-fit:cover;display:block}
.island{position:absolute;top:${13 * k}px;left:50%;transform:translateX(-50%);
  width:${80 * k}px;height:${21 * k}px;border-radius:999px;background:#0a0a0c;z-index:3}
.gloss{position:absolute;inset:0;z-index:2;
  background:linear-gradient(115deg,rgba(255,255,255,.26) 0%,rgba(255,255,255,0) 34%)}

.precio{display:flex;flex-direction:column;align-items:flex-start}
.paq{font-family:'Inter',sans-serif;font-size:${16 * k}px;font-weight:700;
  letter-spacing:.28em;text-transform:uppercase;color:#9B7B43}
.paqn{font-size:${62 * k}px;font-weight:600;line-height:1;margin-top:${4 * k}px}
.antes{font-size:${46 * k}px;color:#9C8E76;margin-top:${20 * k}px;margin-bottom:${2 * k}px;position:relative;display:inline-block}
.antes::after{content:'';position:absolute;left:${-4 * k}px;right:${-4 * k}px;top:52%;
  height:${4 * k}px;background:#C0392B;transform:rotate(-7deg);border-radius:2px}
.ahora{font-size:${112 * k}px;font-weight:600;line-height:1;letter-spacing:-.02em;
  background:linear-gradient(135deg,#D4AF7F,#9B7B43 55%,#6E5426);
  -webkit-background-clip:text;background-clip:text;color:transparent}
.moneda{font-family:'Inter',sans-serif;font-size:${17 * k}px;font-weight:700;
  letter-spacing:.24em;color:#8B7E66;margin-top:${8 * k}px}
.ahorro{margin-top:${16 * k}px;padding:${9 * k}px ${20 * k}px;border-radius:999px;
  background:rgba(192,57,43,.10);border:1px solid rgba(192,57,43,.34);
  font-family:'Inter',sans-serif;font-size:${15 * k}px;font-weight:700;
  letter-spacing:.14em;text-transform:uppercase;color:#A5342A}

.incluye{display:flex;gap:${14 * k}px;flex-wrap:wrap;justify-content:center;
  max-width:${820 * k}px;margin-bottom:${26 * k}px}
.chip{padding:${10 * k}px ${20 * k}px;border-radius:999px;background:#fff;
  border:1px solid rgba(212,175,127,.62);color:#6E5F45;
  font-family:'Inter',sans-serif;font-size:${15 * k}px;font-weight:700;letter-spacing:.06em;
  box-shadow:0 ${4 * k}px ${10 * k}px rgba(43,31,20,.06)}

.wa{display:flex;align-items:center;gap:${16 * k}px;
  padding:${18 * k}px ${34 * k}px;border-radius:999px;
  background:linear-gradient(140deg,#2AE372,#25D366 42%,#12A150);
  box-shadow:0 ${14 * k}px ${32 * k}px rgba(18,140,80,.46)}
.wa svg{width:${40 * k}px;height:${40 * k}px;fill:#fff;flex:none}
.wa .num{color:#fff;font-family:'Inter',sans-serif;font-weight:700;
  font-size:${34 * k}px;letter-spacing:.04em;line-height:1.15}
.wa .lbl{color:rgba(255,255,255,.9);font-family:'Inter',sans-serif;font-weight:700;
  font-size:${14 * k}px;letter-spacing:.20em;text-transform:uppercase}
</style></head><body>
  <div class="brand">Elysium</div>
  <div class="kicker">Invitaciones digitales</div>

  <div class="banda">Promoción extendida de agosto</div>
  <div class="fecha">Solo hasta el <b>6 de septiembre</b></div>

  <div class="medio">
    <div class="phone"><div class="screen"><div class="island"></div><div class="gloss"></div><img src="${cover}"></div></div>
    <div class="precio">
      <div class="paq">Paquete</div>
      <div class="paqn">Eterna</div>
      <div class="antes">$2,200</div>
      <div class="ahora">$1,800</div>
      <div class="moneda">MXN · PAGO ÚNICO</div>
      <div class="ahorro">Ahorras $400</div>
    </div>
  </div>

  <div class="incluye">
    <span class="chip">Sobre animado</span>
    <span class="chip">Diseño a tu medida</span>
    <span class="chip">Confirmaciones en vivo</span>
    <span class="chip">Música y galería</span>
    <span class="chip">Mapa e itinerario</span>
    <span class="chip">Invitados ilimitados</span>
  </div>

  <div class="wa">
    <svg viewBox="0 0 24 24"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 2.5c-5.23 0-9.48 4.25-9.48 9.48 0 1.67.44 3.3 1.27 4.74L2.5 21.5l4.9-1.28a9.44 9.44 0 0 0 4.64 1.21h.01c5.23 0 9.48-4.25 9.48-9.48s-4.25-9.45-9.49-9.45zm0 17.35h-.01a7.87 7.87 0 0 1-4.01-1.1l-.29-.17-2.98.78.8-2.91-.19-.3a7.85 7.85 0 0 1-1.2-4.19c0-4.35 3.54-7.88 7.89-7.88 2.11 0 4.09.82 5.58 2.31a7.83 7.83 0 0 1 2.31 5.58c0 4.35-3.54 7.88-7.9 7.88z"/></svg>
    <div><div class="lbl">Escríbenos</div><div class="num">442 111 8867</div></div>
  </div>
</body></html>`

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
async function shoot(w, h, k, out) {
  const p = await browser.newPage()
  await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 })
  await p.setContent(page(w, h, k), { waitUntil: 'domcontentloaded' })
  await p.evaluate(() =>
    Promise.all([...document.images].filter((i) => !i.complete).map((i) => i.decode().catch(() => {})))
  )
  await p.evaluate(async () => {
    await Promise.all([
      document.fonts.load('400 100px "Great Vibes"'),
      document.fonts.load('600 60px "Cormorant Infant"'),
      document.fonts.load('700 20px "Inter"'),
    ])
    await document.fonts.ready
  })
  await new Promise((r) => setTimeout(r, 500))
  await p.screenshot({ path: out, type: 'jpeg', quality: 90, clip: { x: 0, y: 0, width: w, height: h } })
  await p.close()
  const { size } = await stat(out)
  console.log(`✓ ${out} — ${w}x${h} — ${Math.round(size / 1024)} KB`)
}
await shoot(1080, 1350, 1, join(ROOT, 'public', 'flyer-promo.jpg'))
await shoot(1080, 1920, 1.18, join(ROOT, 'public', 'flyer-promo-story.jpg'))
await browser.close()
