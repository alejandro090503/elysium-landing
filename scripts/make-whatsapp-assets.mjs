// Genera los assets de WhatsApp Business:
//   public/wa-portada.jpg  1125x600 — portada del perfil de negocio
//   public/wa-perfil.jpg    640x640 — foto de perfil (se recorta en círculo)
// Uso: node scripts/make-whatsapp-assets.mjs
import { readFile, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
// Versiones reducidas de las carátulas (embeberlas a tamaño completo hace
// que setContent tarde una eternidad).
const THUMBS = join(ROOT, 'scripts', 'wa-covers')
const FONTDIR = join(ROOT, 'scripts', 'fonts')

// Carátulas elegidas por variedad cromática: blanco/azul, vino, verde salvia,
// negro con constelaciones y coral.
const COVERS = [
  'boda-edwin-y-karina',
  'boda-marcos-y-diana',
  'boda-cristal-y-humberto',
  'boda-metzli-y-rodolfo',
  'boda-america-y-ricardo',
]

const dataUri = async (slug) =>
  `data:image/jpeg;base64,${(await readFile(join(THUMBS, `${slug}.jpg`))).toString('base64')}`
const imgs = await Promise.all(COVERS.map(dataUri))

// Fuentes embebidas: pedirlas a Google desde puppeteer fallaba a veces y la
// portada salía con la tipografía de respaldo.
const face = async (file, family, weight, style = 'normal') =>
  `@font-face{font-family:'${family}';font-weight:${weight};font-style:${style};src:url(data:font/woff2;base64,${(
    await readFile(join(FONTDIR, file))
  ).toString('base64')}) format('woff2')}`

const FONTS = `<style>${(
  await Promise.all([
    face('GreatVibes-400.woff2', 'Great Vibes', 400),
    face('Cormorant-400.woff2', 'Cormorant Infant', 400),
    face('Cormorant-600.woff2', 'Cormorant Infant', 600),
    face('Cormorant-400i.woff2', 'Cormorant Infant', 400, 'italic'),
    face('Cormorant-600i.woff2', 'Cormorant Infant', 600, 'italic'),
    face('Inter-700.woff2', 'Inter', 700),
  ])
).join('')}</style>`

const BASE = `
  *{margin:0;padding:0;box-sizing:border-box}
  body{overflow:hidden;font-family:'Cormorant Infant',Georgia,serif;color:#2B1F14}
  .gold{background:linear-gradient(135deg,#D4AF7F,#9B7B43 52%,#2B1F14);
    -webkit-background-clip:text;background-clip:text;color:transparent}
`

// ---------- Portada 1125x600 ----------
// Los teléfonos van escalonados: el central al frente y más grande.
const phone = (i) => {
  const off = i - 2 // -2..2
  const abs = Math.abs(off)
  const scale = [0.74, 0.87, 1, 0.87, 0.74][i]
  const rot = off * 7
  const x = off * 132
  const y = abs * 26
  return `<div class="phone" style="
      transform:translate(${x}px,${y}px) rotate(${rot}deg) scale(${scale});
      z-index:${10 - abs}; opacity:${1 - abs * 0.06}">
      <div class="screen"><div class="island"></div><div class="gloss"></div><img src="${imgs[i]}"></div>
    </div>`
}

const portada = `<!DOCTYPE html><html><head><meta charset="utf-8">${FONTS}<style>${BASE}
  body{width:1125px;height:600px;display:flex;align-items:center;position:relative;
    background:
      radial-gradient(circle at 72% 8%, rgba(212,175,127,.42), transparent 56%),
      radial-gradient(circle at 6% 94%, rgba(212,175,127,.26), transparent 50%),
      linear-gradient(135deg,#EFE6D4 0%,#FBF8F1 46%,#F3EBDA 100%)}
  body::after{content:'';position:absolute;inset:22px;border:1px solid rgba(155,123,67,.28);
    border-radius:12px;pointer-events:none}
  .left{width:412px;padding-left:64px;position:relative;z-index:20}
  .brand{font-family:'Great Vibes',cursive;font-size:86px;line-height:1;padding-top:10px}
  .rule{width:88px;height:1px;background:linear-gradient(90deg,#9B7B43,rgba(155,123,67,0));margin:16px 0 14px}
  .kicker{font-family:'Inter',sans-serif;font-size:13px;font-weight:700;letter-spacing:.32em;
    text-transform:uppercase;color:#9B7B43}
  .tag{font-size:32px;white-space:nowrap;font-weight:600;line-height:1.16;margin-top:12px}
  .tag em{font-style:italic;color:#9B7B43}
  .sub{font-size:21px;font-style:italic;color:#7C7059;margin-top:10px}
  .right{flex:1;height:100%;position:relative;display:flex;align-items:center;justify-content:center}
  .glow{position:absolute;width:560px;height:560px;border-radius:50%;
    background:radial-gradient(circle,rgba(212,175,127,.5),transparent 66%);filter:blur(10px)}
  .fan{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center}
  .phone{position:absolute;width:196px;height:402px;border-radius:31px;padding:6px;
    background:linear-gradient(160deg,#4a4a4e,#1b1b1e 30%,#39393d 62%,#151517);
    box-shadow:0 30px 60px rgba(43,31,20,.40), 0 8px 18px rgba(43,31,20,.22)}
  .screen{width:100%;height:100%;border-radius:26px;overflow:hidden;position:relative;background:#000}
  .screen img{width:100%;height:100%;object-fit:cover;display:block}
  .island{position:absolute;top:10px;left:50%;transform:translateX(-50%);
    width:60px;height:16px;border-radius:999px;background:#0a0a0c;z-index:3}
  .gloss{position:absolute;inset:0;z-index:2;
    background:linear-gradient(115deg,rgba(255,255,255,.28) 0%,rgba(255,255,255,0) 36%)}
</style></head><body>
  <div class="left">
    <div class="brand gold">Elysium</div>
    <div class="rule"></div>
    <div class="kicker">Invitaciones digitales</div>
    <div class="tag">Bodas, XV años <em>y más</em></div>
    <div class="sub">Diseño único para cada evento</div>
  </div>
  <div class="right"><div class="glow"></div><div class="fan">
    ${[0, 4, 1, 3, 2].map(phone).join('')}
  </div></div>
</body></html>`

// ---------- Perfil 640x640 ----------
// Se recorta en círculo y se ve a 40px en la lista de chats: fondo oscuro y
// monograma dorado grande para que siga leyéndose en miniatura.
const perfil = `<!DOCTYPE html><html><head><meta charset="utf-8">${FONTS}<style>${BASE}
  body{width:640px;height:640px;position:relative;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    background:
      radial-gradient(circle at 50% 32%, #4A3826 0%, #2B1F14 58%, #1A1209 100%)}
  .ring{position:absolute;width:566px;height:566px;border-radius:50%;
    border:3px solid rgba(212,175,127,.55)}
  .ring2{position:absolute;width:524px;height:524px;border-radius:50%;
    border:1px solid rgba(212,175,127,.30)}
  .mono{font-family:'Great Vibes',cursive;font-size:300px;line-height:.78;
    background:linear-gradient(140deg,#F0D9AC,#D4AF7F 40%,#9B7B43);
    -webkit-background-clip:text;background-clip:text;color:transparent;
    filter:drop-shadow(0 8px 16px rgba(0,0,0,.45))}
  .word{margin-top:26px;font-family:'Inter',sans-serif;font-size:30px;font-weight:700;
    letter-spacing:.40em;text-transform:uppercase;color:#D4AF7F;text-indent:.40em}
</style></head><body>
  <div class="ring"></div><div class="ring2"></div>
  <div class="mono">E</div>
  <div class="word">Elysium</div>
</body></html>`

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
async function shoot(html, w, h, out, quality = 88) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 })
  await page.setContent(html, { waitUntil: 'domcontentloaded' })
  await page.evaluate(() =>
    Promise.all([...document.images].filter((i) => !i.complete).map((i) => i.decode().catch(() => {})))
  )
  await page
    .evaluate(async () => {
      await Promise.all([
        document.fonts.load('400 300px "Great Vibes"'),
        document.fonts.load('600 40px "Cormorant Infant"'),
        document.fonts.load('700 30px "Inter"'),
      ])
      await document.fonts.ready
    })
    .catch(() => {})
  await new Promise((r) => setTimeout(r, 600))
  await page.screenshot({ path: out, type: 'jpeg', quality, clip: { x: 0, y: 0, width: w, height: h } })
  await page.close()
  const { size } = await stat(out)
  console.log(`✓ ${out} — ${w}x${h} — ${Math.round(size / 1024)} KB`)
}
await shoot(portada, 1125, 600, join(ROOT, 'public', 'wa-portada.jpg'))
await shoot(perfil, 640, 640, join(ROOT, 'public', 'wa-perfil.jpg'))
await browser.close()
