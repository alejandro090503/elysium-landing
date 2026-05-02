import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt =
  'Elysium Invitaciones — Invitaciones digitales para bodas, XV años y bautizos'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function loadGoogleFont(query: string, text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${query}&text=${encodeURIComponent(
    text
  )}`
  const css = await (await fetch(url)).text()
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)
  if (!match) throw new Error(`Could not load font ${query}`)
  const fontRes = await fetch(match[1])
  if (!fontRes.ok) throw new Error(`Font fetch failed: ${fontRes.status}`)
  return fontRes.arrayBuffer()
}

const ALL_NON_BRAND_TEXT =
  'INVITACIONES DIGITALES Invitaciones que cuentan tu historia BODAS XV AÑOS BAUTIZOS·'

export default async function Image() {
  const [greatVibes, interRegular, interSemibold] = await Promise.all([
    loadGoogleFont('Great+Vibes', 'Elysium'),
    loadGoogleFont('Inter:wght@400', ALL_NON_BRAND_TEXT),
    loadGoogleFont('Inter:wght@600', ALL_NON_BRAND_TEXT),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          background:
            'linear-gradient(135deg, #FCE7F3 0%, #FDF2F8 50%, #FEF3C7 100%)',
          fontFamily: 'Inter',
          position: 'relative',
        }}
      >
        {/* Decorative orbs */}
        <div
          style={{
            position: 'absolute',
            top: -250,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'rgba(219, 39, 119, 0.18)',
            filter: 'blur(100px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -250,
            left: -200,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'rgba(161, 98, 7, 0.18)',
            filter: 'blur(100px)',
          }}
        />

        {/* Eyebrow pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '12px 28px',
            borderRadius: 999,
            border: '1px solid rgba(161, 98, 7, 0.35)',
            background: 'rgba(255, 255, 255, 0.55)',
            color: '#A16207',
            fontFamily: 'Inter',
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#A16207',
            }}
          />
          Invitaciones digitales
        </div>

        {/* Brand wordmark */}
        <div
          style={{
            fontFamily: 'Great Vibes',
            fontSize: 320,
            lineHeight: 1,
            backgroundImage:
              'linear-gradient(135deg, #DB2777 0%, #BE185D 45%, #A16207 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            padding: '24px 0',
            marginTop: -10,
          }}
        >
          Elysium
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontFamily: 'Inter',
            fontSize: 36,
            fontWeight: 400,
            color: '#374151',
            marginTop: 8,
          }}
        >
          Invitaciones que cuentan tu historia
        </div>

        {/* Bottom accent */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginTop: 40,
            color: '#A16207',
            fontFamily: 'Inter',
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Bodas · XV Años · Bautizos
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Great Vibes',
          data: greatVibes,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: interRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: interSemibold,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  )
}
