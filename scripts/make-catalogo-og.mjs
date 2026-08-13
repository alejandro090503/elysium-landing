// Genera public/catalogo-og.png (1200x630): "Catálogo" + iPhone con la carátula
// de la primera invitación del carrusel (boda-cristal-y-humberto).
// Uso: node scripts/make-catalogo-og.mjs
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const COVER = join(ROOT, 'public', 'thumbnails', 'boda-cristal-y-humberto.png')
const OUT = join(ROOT, 'public', 'catalogo-og.png')

const cover = `data:image/png;base64,${(await readFile(COVER)).toString('base64')}`

const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Infant:wght@400;500;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;overflow:hidden;
    font-family:'Cormorant Infant',Georgia,serif;color:#2B1F14;
    background:
      radial-gradient(circle at 78% 12%, rgba(212,175,127,.42), transparent 55%),
      radial-gradient(circle at 8% 92%, rgba(212,175,127,.28), transparent 52%),
      linear-gradient(135deg,#EFE6D4 0%,#FBF8F1 45%,#F4ECDC 100%);
    display:flex;align-items:center;position:relative}
  body::after{content:'';position:absolute;inset:26px;border:1px solid rgba(155,123,67,.30);border-radius:14px;pointer-events:none}

  .left{width:660px;padding:0 0 0 84px}
  .brand{font-family:'Great Vibes',cursive;font-size:92px;line-height:1;padding-top:12px;
    background:linear-gradient(135deg,#D4AF7F,#9B7B43 52%,#2B1F14);
    -webkit-background-clip:text;background-clip:text;color:transparent}
  .rule{width:96px;height:1px;background:linear-gradient(90deg,#9B7B43,rgba(155,123,67,0));margin:18px 0 16px}
  .kicker{font-family:'Inter',sans-serif;font-size:15px;font-weight:700;letter-spacing:.34em;
    text-transform:uppercase;color:#9B7B43}
  .title{font-size:62px;font-weight:600;line-height:1.06;margin-top:10px;letter-spacing:.01em}
  .title em{font-style:italic;color:#9B7B43}
  .sub{font-size:27px;font-style:italic;color:#7C7059;margin-top:14px}
  .pill{display:inline-block;margin-top:30px;padding:15px 34px;border-radius:999px;
    background:linear-gradient(135deg,#D4AF7F,#9B7B43);color:#fff;
    font-family:'Inter',sans-serif;font-size:14px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
    box-shadow:0 12px 26px rgba(155,123,67,.38)}

  .right{flex:1;display:flex;align-items:center;justify-content:center;position:relative}
  .glow{position:absolute;width:430px;height:430px;border-radius:50%;
    background:radial-gradient(circle,rgba(212,175,127,.55),transparent 68%);filter:blur(6px)}
  .phone{position:relative;width:276px;height:566px;border-radius:44px;padding:9px;
    background:linear-gradient(160deg,#4a4a4e,#1b1b1e 30%,#39393d 62%,#151517);
    box-shadow:0 44px 84px rgba(43,31,20,.42), 0 10px 24px rgba(43,31,20,.24);
    transform:rotate(-5deg)}
  .screen{width:100%;height:100%;border-radius:36px;overflow:hidden;position:relative;background:#000}
  .screen img{width:100%;height:100%;object-fit:cover;display:block}
  .island{position:absolute;top:15px;left:50%;transform:translateX(-50%);
    width:86px;height:23px;border-radius:999px;background:#0a0a0c;z-index:3}
  .gloss{position:absolute;inset:0;z-index:2;
    background:linear-gradient(115deg,rgba(255,255,255,.30) 0%,rgba(255,255,255,0) 34%)}
</style></head><body>
  <div class="left">
    <div class="brand">Elysium</div>
    <div class="rule"></div>
    <div class="kicker">Invitaciones digitales</div>
    <div class="title">Catálogo <em>completo</em></div>
    <div class="sub">Más de 160 diseños reales · Bodas y XV años</div>
    <div class="pill">Ábrelo y deslízalo</div>
  </div>
  <div class="right">
    <div class="glow"></div>
    <div class="phone"><div class="screen"><div class="island"></div><div class="gloss"></div><img src="${cover}"></div></div>
  </div>
</body></html>`

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 })
await page.setContent(html, { waitUntil: 'networkidle0' })
await page.evaluate(() => document.fonts.ready).catch(() => {})
await new Promise((r) => setTimeout(r, 600))
await page.screenshot({ path: OUT, type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } })
await browser.close()
console.log(`✓ ${OUT}`)
