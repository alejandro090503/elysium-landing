// 15 variantes del preview del portafolio: 3 iPhones apilados (uno al frente, dos detras).
// Salida: scripts/og-variantes/v01.jpg ... v15.jpg + hoja.jpg
// Uso: node scripts/og-variantes.mjs
import { readFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { execFileSync } from 'node:child_process'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const FONTDIR = join(ROOT, 'scripts', 'fonts')
const THUMBS = join(ROOT, 'public', 'thumbnails')
const OUT = join(ROOT, 'scripts', 'og-variantes')
const MINI = join(OUT, 'mini')
await mkdir(MINI, { recursive: true })

// [frente, atras-izquierda, atras-derecha]
const COMBOS = [
  ['boda-cristal-y-humberto', 'boda-edwin-y-karina', 'boda-marcos-y-diana'],
  ['boda-cristal-y-humberto', 'boda-metzli-y-rodolfo', 'boda-america-y-ricardo'],
  ['boda-metzli-y-rodolfo', 'boda-cristal-y-humberto', 'boda-edwin-y-karina'],
  ['babyshower-jayden', 'boda-cristal-y-humberto', 'xv-valentina-govea'],
  ['boda-victoria-y-eduardo', 'boda-marcos-y-diana', 'boda-cristal-y-humberto'],
  ['boda-nao-leo', 'boda-edwin-y-karina', 'boda-metzli-y-rodolfo'],
  ['boda-daniela-y-rafael', 'boda-jessica-y-jessica', 'xv-layla-y-litzy'],
  ['xv-valentina-govea', 'boda-metzli-y-rodolfo', 'boda-edwin-y-karina'],
  ['boda-america-y-ricardo', 'boda-daniela-y-rafael', 'boda-cristal-y-humberto'],
  ['boda-zeltzin-y-gabriel', 'boda-victoria-y-eduardo', 'boda-marcos-y-diana'],
  ['boda-neidy-y-cesar', 'boda-carlos-y-yesenia', 'boda-cristal-y-humberto'],
  ['xv-fatima-vazquez', 'xv-ariadne-hernandez', 'xv-alia-valeshka'],
  ['boda-alexis-y-edgar', 'boda-abraham-y-america', 'boda-amanda-y-jorge'],
  ['boda-marcos-y-diana', 'boda-nao-leo', 'boda-victoria-y-eduardo'],
  ['boda-edwin-y-karina', 'babyshower-jayden', 'boda-neidy-y-cesar'],
]

// Miniaturas reducidas (las originales pesan MBs y setContent se atora)
const slugs = [...new Set(COMBOS.flat())]
const py = `
from PIL import Image
import os, sys
src, dst = sys.argv[1], sys.argv[2]
for s in sys.argv[3:]:
    im = Image.open(os.path.join(src, s + '.png')).convert('RGB').resize((540, 960), Image.LANCZOS)
    im.save(os.path.join(dst, s + '.jpg'), 'JPEG', quality=88)
`
execFileSync('python', ['-c', py, THUMBS, MINI, ...slugs], { stdio: 'inherit' })
const img = async (s) => `data:image/jpeg;base64,${(await readFile(join(MINI, s + '.jpg'))).toString('base64')}`

const face = async (file, family, weight, style = 'normal') =>
  `@font-face{font-family:'${family}';font-weight:${weight};font-style:${style};src:url(data:font/woff2;base64,${(
    await readFile(join(FONTDIR, file))
  ).toString('base64')}) format('woff2')}`
const FONTS = (await Promise.all([
  face('GreatVibes-400.woff2', 'Great Vibes', 400),
  face('Cormorant-600.woff2', 'Cormorant Infant', 600),
  face('Cormorant-400i.woff2', 'Cormorant Infant', 400, 'italic'),
  face('Cormorant-600i.woff2', 'Cormorant Infant', 600, 'italic'),
  face('Inter-700.woff2', 'Inter', 700),
])).join('')

const phone = (src, cls) =>
  `<div class="phone ${cls}"><div class="screen"><div class="island"></div><div class="gloss"></div><img src="${src}"></div></div>`

const html = (front, left, right) => `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;font-family:'Cormorant Infant',Georgia,serif;color:#2B1F14;
  background:radial-gradient(circle at 78% 12%,rgba(212,175,127,.42),transparent 55%),
    radial-gradient(circle at 8% 92%,rgba(212,175,127,.28),transparent 52%),
    linear-gradient(135deg,#EFE6D4 0%,#FBF8F1 45%,#F4ECDC 100%);
  display:flex;align-items:center;position:relative}
body::after{content:'';position:absolute;inset:26px;border:1px solid rgba(155,123,67,.30);border-radius:14px}
.left{width:600px;padding-left:84px;position:relative;z-index:5}
.brand{font-family:'Great Vibes',cursive;font-size:92px;line-height:1;padding-top:12px;
  background:linear-gradient(135deg,#D4AF7F,#9B7B43 52%,#2B1F14);-webkit-background-clip:text;background-clip:text;color:transparent}
.rule{width:96px;height:1px;background:linear-gradient(90deg,#9B7B43,transparent);margin:18px 0 16px}
.kicker{font-family:'Inter';font-size:15px;font-weight:700;letter-spacing:.34em;text-transform:uppercase;color:#9B7B43}
.title{font-size:62px;font-weight:600;line-height:1.06;margin-top:10px}
.title em{font-style:italic;color:#9B7B43}
.sub{font-size:25px;font-style:italic;color:#7C7059;margin-top:14px;line-height:1.35}
.pill{display:inline-block;margin-top:30px;padding:15px 34px;border-radius:999px;background:linear-gradient(135deg,#D4AF7F,#9B7B43);
  color:#fff;font-family:'Inter';font-size:14px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;box-shadow:0 12px 26px rgba(155,123,67,.38)}
.right{flex:1;height:100%;position:relative}
.glow{position:absolute;left:50%;top:50%;width:480px;height:480px;margin:-240px 0 0 -240px;border-radius:50%;
  background:radial-gradient(circle,rgba(212,175,127,.55),transparent 68%)}
.phone{position:absolute;left:50%;top:50%;width:250px;height:514px;margin:-257px 0 0 -125px;border-radius:40px;padding:8px;
  background:linear-gradient(160deg,#4a4a4e,#1b1b1e 30%,#39393d 62%,#151517)}
.screen{width:100%;height:100%;border-radius:33px;overflow:hidden;position:relative;background:#000}
.screen img{width:100%;height:100%;object-fit:cover;display:block}
.island{position:absolute;top:13px;left:50%;transform:translateX(-50%);width:78px;height:21px;border-radius:999px;background:#0a0a0c;z-index:3}
.gloss{position:absolute;inset:0;z-index:2;background:linear-gradient(115deg,rgba(255,255,255,.28),transparent 36%)}
.back-l{transform:translate(-118px,26px) rotate(-13deg) scale(.84);z-index:1;box-shadow:0 26px 50px rgba(43,31,20,.30)}
.back-r{transform:translate(118px,26px) rotate(13deg) scale(.84);z-index:1;box-shadow:0 26px 50px rgba(43,31,20,.30)}
.back-l .screen::after,.back-r .screen::after{content:'';position:absolute;inset:0;background:rgba(43,31,20,.10);z-index:4}
.front{transform:translateY(-4px) rotate(-2deg);z-index:3;box-shadow:0 44px 84px rgba(43,31,20,.45),0 10px 24px rgba(43,31,20,.24)}
</style></head><body>
<div class="left">
  <div class="brand">Elysium</div><div class="rule"></div>
  <div class="kicker">Invitaciones digitales</div>
  <div class="title">Portafolio <em>Elysium</em></div>
  <div class="sub">Más de 170 invitaciones entregadas<br>a clientes satisfechos</div>
  <div class="pill">Ábrelo y deslízalo</div>
</div>
<div class="right"><div class="glow"></div>${phone(left, 'back-l')}${phone(right, 'back-r')}${phone(front, 'front')}</div>
</body></html>`

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
const files = []
for (let i = 0; i < COMBOS.length; i++) {
  const [f, l, r] = COMBOS[i]
  await page.setContent(html(await img(f), await img(l), await img(r)), { waitUntil: 'domcontentloaded' })
  await page.evaluate(async () => {
    await Promise.all([...document.images].map((im) => im.decode().catch(() => {})))
    await document.fonts.ready
  })
  const out = join(OUT, `v${String(i + 1).padStart(2, '0')}.jpg`)
  await page.screenshot({ path: out, type: 'jpeg', quality: 84 })
  files.push(out)
  console.log('✓', out.split(/[\\/]/).pop(), '-', COMBOS[i].join(' | '))
}
await browser.close()

// Hoja de contacto numerada
execFileSync('python', ['-c', `
from PIL import Image, ImageDraw
import sys
fs = sys.argv[1:-1]; out = sys.argv[-1]
W, H, C = 600, 315, 3
sh = Image.new('RGB', (C*W + (C+1)*12, ((len(fs)+C-1)//C)*(H+12) + 12), '#1e1a15')
d = ImageDraw.Draw(sh)
for i, f in enumerate(fs):
    x = 12 + (i % C)*(W+12); y = 12 + (i//C)*(H+12)
    sh.paste(Image.open(f).resize((W, H)), (x, y))
    d.rectangle([x+8, y+8, x+52, y+40], fill='#2B1F14'); d.text((x+18, y+16), str(i+1), fill='#fff')
sh.save(out, quality=86)
`, ...files, join(OUT, 'hoja.jpg')], { stdio: 'inherit' })
console.log('✓ hoja.jpg')
