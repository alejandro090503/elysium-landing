import type { Metadata } from 'next'
import { ResetScroll } from '@/app/components/ResetScroll'
import { IPhoneFrame } from '@/app/components/ui/IPhoneFrame'

// Meta Ads–specific WhatsApp pre-fill so the source can be tracked.
const WHATSAPP_NUMBER = '524421235312'
const WHATSAPP_MSG = 'Hola, vengo del anuncio Hot Sale ⚡ Quiero conocer los paquetes de Elysium'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`

interface ShowcaseExample {
  name: string
  slug: string
  query?: string
}

const SHOWCASE: ShowcaseExample[] = [
  { name: 'Cristal & Humberto', slug: 'boda-cristal-y-humberto' },
  { name: 'Damaris & Jesús', slug: 'boda-damaris-y-jesus' },
  { name: 'Jennifer', slug: 'boda-jennifer', query: 'pases=1' },
]

export const metadata: Metadata = {
  title: 'Elysium · Hot Sale -21% · Invitaciones Digitales',
  description:
    'Hot Sale: 21% off en ambos paquetes hasta el 2 de junio. Invitación digital desde $750 MXN. RSVP por WhatsApp incluido.',
  openGraph: {
    title: 'Elysium · Hot Sale -21%',
    description: '21% off en ambos paquetes hasta el 2 de junio. Desde $750 MXN.',
    type: 'website',
    locale: 'es_MX',
    images: [{ url: '/flyer-og.png', width: 1200, height: 630, alt: 'Elysium Hot Sale' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elysium · Hot Sale -21%',
    description: '21% off en ambos paquetes hasta el 2 de junio.',
    images: ['/flyer-og.png'],
  },
}

const ESSENTIAL_FEATURES = [
  'Invitación digital 100% personalizada',
  'Cuenta regresiva, galería, mapa y música',
  'Mesa de regalos, padrinos y hospedaje',
  'RSVP por WhatsApp',
  'Cambios ilimitados',
]

const ETERNA_FEATURES = [
  'Todo lo del paquete Esencial',
  'Panel personalizado para invitados',
  'Pases personalizados por invitado',
  'Confirmaciones en tiempo real',
  'Lista de asistentes automática',
]

export default function PromoPage() {
  return (
    <>
      <ResetScroll />
      <main
        className="min-h-svh"
        style={{
          background:
            'radial-gradient(circle at 100% 0%, rgba(212,175,127,0.22), transparent 45%), radial-gradient(circle at 0% 100%, rgba(155,123,67,0.14), transparent 45%), linear-gradient(180deg, #FBF8F1 0%, #EAE0CC 50%, #FBF8F1 100%)',
          color: '#2B1F14',
          fontFamily: "'Cormorant Infant', Georgia, serif",
        }}
      >
        <HotSaleMarquee />

        <PromoHero />

        <PricingSection />

        <ShowcaseSection />

        <FinalCTA />

        <Footer />

        <StickyWhatsApp />
      </main>
    </>
  )
}

/* ───────── MARQUEE ───────── */
function HotSaleMarquee() {
  const segment = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 22,
        paddingRight: 22,
        whiteSpace: 'nowrap',
      }}
    >
      <span>Hot Sale</span>
      <span style={{ color: '#D4AF7F', fontSize: 9 }}>◆</span>
      <span>21% off en ambos paquetes</span>
      <span style={{ color: '#D4AF7F', fontSize: 9 }}>◆</span>
      <span>Últimos días</span>
      <span style={{ color: '#D4AF7F', fontSize: 9 }}>◆</span>
      <span>Hasta el 2 de junio</span>
      <span style={{ color: '#D4AF7F', fontSize: 9 }}>◆</span>
    </span>
  )

  return (
    <div
      role="region"
      aria-label="Promoción Hot Sale"
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        background: '#1F1611',
        color: '#FBF8F1',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.32em',
        textTransform: 'uppercase',
        borderBottom: '1px solid #D4AF7F',
        overflow: 'hidden',
        zIndex: 40,
      }}
    >
      <div
        className="promo-marquee-track"
        style={{
          display: 'flex',
          width: 'max-content',
          padding: '11px 0',
          animation: 'promo-marquee 32s linear infinite',
        }}
      >
        {segment}
        <span aria-hidden="true">{segment}</span>
      </div>
    </div>
  )
}

/* ───────── HERO ───────── */
function PromoHero() {
  return (
    <section className="px-5 pt-10 pb-14 text-center max-w-xl mx-auto">
      {/* Eyebrow pill */}
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
        style={{
          background: '#FBF8F1',
          border: '1px solid #D4AF7F',
          color: '#9B7B43',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          boxShadow: '0 4px 12px rgba(155,123,67,0.08)',
        }}
      >
        <span
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#9B7B43' }}
        />
        Invitaciones Digitales
      </div>

      {/* Brand */}
      <h1
        className="leading-none"
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(80px, 22vw, 120px)',
          backgroundImage:
            'linear-gradient(135deg, #D4AF7F 0%, #9B7B43 50%, #2B1F14 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          padding: '0.04em 0',
        }}
      >
        Elysium
      </h1>

      <p
        style={{
          color: '#8B7E66',
          fontSize: 18,
          fontStyle: 'italic',
          marginTop: 6,
        }}
      >
        Invitaciones que cuentan tu historia
      </p>

      {/* Hot Sale price hero */}
      <div className="mt-8 inline-block">
        <div
          style={{
            color: '#8B7E66',
            fontSize: 16,
            textDecoration: 'line-through',
            textDecorationColor: '#D4AF7F',
          }}
        >
          Desde $950 MXN
        </div>
        <div
          className="flex items-baseline justify-center gap-1.5 mt-1"
          style={{ lineHeight: 1 }}
        >
          <span style={{ fontSize: 24, color: '#9B7B43', paddingTop: 8 }}>$</span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              backgroundImage: 'linear-gradient(135deg, #D4AF7F 0%, #9B7B43 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.03em',
            }}
          >
            750
          </span>
          <span
            style={{
              fontSize: 13,
              color: '#8B7E66',
              letterSpacing: '0.15em',
              fontWeight: 600,
              alignSelf: 'flex-end',
              paddingBottom: 10,
            }}
          >
            MXN
          </span>
        </div>
        <div
          className="inline-block mt-3"
          style={{
            padding: '4px 14px',
            borderRadius: 999,
            background: '#EAE0CC',
            border: '1px solid #D4AF7F',
            color: '#9B7B43',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          −21% Hot Sale · Ahorras $200
        </div>
      </div>

      {/* Primary CTA */}
      <WhatsAppButton variant="primary" label="Aprovecha el Hot Sale" className="mt-8" />

      <p
        className="mt-4 text-xs"
        style={{ color: '#8B7E66', letterSpacing: '0.05em' }}
      >
        Respuesta en menos de 24 horas · Cambios ilimitados
      </p>
    </section>
  )
}

/* ───────── PRICING ───────── */
function PricingSection() {
  return (
    <section className="px-5 py-12">
      <div className="max-w-xl mx-auto">
        <Ornament />
        <p
          className="text-center mb-2"
          style={{
            color: '#9B7B43',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          Elige tu paquete
        </p>
        <h2
          className="text-center mb-10"
          style={{
            fontWeight: 300,
            fontSize: 'clamp(28px, 7vw, 36px)',
            letterSpacing: '-0.018em',
            lineHeight: 1.1,
          }}
        >
          Hot Sale en ambos
        </h2>

        <div className="space-y-9">
          <PricingCard
            tag="Esencial"
            name="Invitación Digital"
            originalPrice="$950"
            price="750"
            save="$200"
            features={ESSENTIAL_FEATURES}
            featured={false}
          />
          <PricingCard
            tag="Eterna · Recomendado"
            name="Invitación + Panel"
            originalPrice="$1,200"
            price="950"
            save="$250"
            features={ETERNA_FEATURES}
            featured
          />
        </div>
      </div>
    </section>
  )
}

interface PricingCardProps {
  tag: string
  name: string
  originalPrice: string
  price: string
  save: string
  features: string[]
  featured: boolean
}

function PricingCard({
  tag,
  name,
  originalPrice,
  price,
  save,
  features,
  featured,
}: PricingCardProps) {
  return (
    <article
      className="relative rounded-3xl"
      style={{
        background: featured
          ? 'radial-gradient(circle at 100% 0%, rgba(212,175,127,0.18), transparent 55%), radial-gradient(circle at 0% 100%, rgba(155,123,67,0.12), transparent 55%), #FBF8F1'
          : '#FBF8F1',
        padding: '64px 22px 26px',
        border: featured ? '1.5px solid #D4AF7F' : '1px solid #EAE0CC',
        boxShadow: featured
          ? '0 16px 44px rgba(155,123,67,0.18)'
          : '0 10px 28px rgba(155,123,67,0.08)',
      }}
    >
      {/* Pkg tag */}
      <span
        className="absolute"
        style={{
          top: -13,
          left: 20,
          padding: '6px 16px',
          borderRadius: 999,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          background: featured
            ? 'linear-gradient(135deg, #D4AF7F 0%, #9B7B43 100%)'
            : '#FBF8F1',
          color: featured ? '#FBF8F1' : '#9B7B43',
          border: featured ? 'none' : '1px solid #D4AF7F',
          boxShadow: featured ? '0 4px 12px rgba(155,123,67,0.28)' : 'none',
        }}
      >
        {tag}
      </span>

      {/* Discount medallion */}
      <DiscountMedallion featured={featured} />

      <h3
        className="text-center mb-4"
        style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.012em' }}
      >
        {name}
      </h3>

      <div className="text-center mb-5">
        <div
          style={{
            color: '#8B7E66',
            fontSize: 18,
            textDecoration: 'line-through',
            textDecorationColor: '#D4AF7F',
            marginBottom: 2,
          }}
        >
          {originalPrice} MXN
        </div>
        <div
          className="flex items-baseline justify-center gap-1.5"
          style={{ lineHeight: 1 }}
        >
          <span style={{ fontSize: 26, color: '#9B7B43', paddingTop: 12 }}>$</span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              backgroundImage: 'linear-gradient(135deg, #D4AF7F 0%, #9B7B43 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.04em',
            }}
          >
            {price}
          </span>
          <span
            style={{
              fontSize: 12,
              color: '#8B7E66',
              letterSpacing: '0.15em',
              fontWeight: 600,
              alignSelf: 'flex-end',
              paddingBottom: 10,
            }}
          >
            MXN
          </span>
        </div>
        <div
          className="inline-block mt-2"
          style={{
            padding: '3px 12px',
            borderRadius: 999,
            background: '#EAE0CC',
            border: '1px solid #D4AF7F',
            color: '#9B7B43',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Ahorras {save}
        </div>
      </div>

      <div
        style={{
          height: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(155,123,67,0.18), transparent)',
          margin: '16px 0 12px',
        }}
      />

      <ul className="space-y-2">
        {features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3"
            style={{ fontSize: 15, lineHeight: 1.5 }}
          >
            <Checkmark />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <WhatsAppButton
          variant={featured ? 'primary' : 'outline'}
          label={featured ? 'Quiero el paquete Eterna' : 'Quiero el paquete Esencial'}
        />
      </div>
    </article>
  )
}

function DiscountMedallion({ featured }: { featured: boolean }) {
  return (
    <div
      className="absolute"
      style={{
        top: -32,
        right: -10,
        width: 88,
        height: 88,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 32% 28%, #FBF8F1 0%, #D4AF7F 45%, #9B7B43 100%)',
        boxShadow:
          'inset 0 2px 3px rgba(251,248,241,0.55), inset 0 -5px 12px rgba(43,31,20,0.35), 0 0 0 2px #FBF8F1, 0 12px 22px rgba(43,31,20,0.32)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FBF8F1',
        transform: 'rotate(-10deg)',
        zIndex: 10,
      }}
    >
      <span
        style={{
          fontSize: 26,
          fontWeight: 700,
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
          textShadow: '0 1px 2px rgba(43,31,20,0.4)',
        }}
      >
        −21<span style={{ fontSize: '0.72em' }}>%</span>
      </span>
      <span
        style={{
          fontSize: 8,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginTop: 2,
          whiteSpace: 'nowrap',
        }}
      >
        Hot Sale
      </span>
    </div>
  )
}

function Checkmark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 22 22"
      aria-hidden
      style={{ flexShrink: 0, marginTop: 2 }}
    >
      <defs>
        <linearGradient id="check-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF7F" />
          <stop offset="100%" stopColor="#9B7B43" />
        </linearGradient>
      </defs>
      <circle cx="11" cy="11" r="11" fill="url(#check-grad)" />
      <path
        d="M6.5 11.5 9.5 14.5 15.5 8"
        fill="none"
        stroke="#FBF8F1"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ───────── SHOWCASE ───────── */
function ShowcaseSection() {
  return (
    <section className="px-5 py-12" style={{ background: '#FBF8F1' }}>
      <div className="max-w-xl mx-auto">
        <Ornament />
        <p
          className="text-center mb-2"
          style={{
            color: '#9B7B43',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          Vista previa
        </p>
        <h2
          className="text-center mb-3"
          style={{
            fontWeight: 300,
            fontSize: 'clamp(28px, 7vw, 36px)',
            letterSpacing: '-0.018em',
            lineHeight: 1.1,
          }}
        >
          Invitaciones que ya entregamos
        </h2>
        <p
          className="text-center mb-8 italic"
          style={{ color: '#8B7E66', fontSize: 14 }}
        >
          Desliza para verlas
        </p>
      </div>

      <div
        className="flex gap-4 overflow-x-auto pb-6 px-5 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollPaddingInline: '50%' }}
      >
        {SHOWCASE.map((ex) => (
          <ShowcasePhone key={ex.slug} slug={ex.slug} name={ex.name} query={ex.query} />
        ))}
      </div>
    </section>
  )
}

function ShowcasePhone({
  slug,
  name,
  query,
}: {
  slug: string
  name: string
  query?: string
}) {
  // Render iframe at iPhone Pro Max width then scale to fit our display phone.
  const IFRAME_W = 430
  const PHONE_W = 270
  const SCALE = PHONE_W / IFRAME_W
  const PHONE_H = 540

  // Build iframe URL: preserve any required query params (e.g. ?pases=1)
  // and add cache-buster v=hot
  const params = new URLSearchParams(query ?? '')
  params.set('v', 'hot')
  const iframeSrc = `https://${slug}.vercel.app/?${params.toString()}`

  return (
    <div className="snap-center flex-shrink-0 flex flex-col items-center">
      <IPhoneFrame className="w-[270px] h-[540px]">
        <iframe
          src={iframeSrc}
          title={`Vista previa: ${name}`}
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
          className="border-0 origin-top-left"
          style={{
            width: IFRAME_W,
            height: Math.ceil(PHONE_H / SCALE),
            transform: `scale(${SCALE}) translateZ(0)`,
            willChange: 'transform',
          }}
        />
      </IPhoneFrame>
      <p
        className="mt-4 text-center"
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 22,
          color: '#9B7B43',
        }}
      >
        {name}
      </p>
    </div>
  )
}

/* ───────── FINAL CTA ───────── */
function FinalCTA() {
  return (
    <section
      className="px-5 py-16 text-center"
      style={{ background: '#1F1611', color: '#FBF8F1' }}
    >
      <p
        className="mb-3"
        style={{
          color: '#D4AF7F',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}
      >
        Hot Sale termina pronto
      </p>
      <h2
        className="mb-4"
        style={{
          fontFamily: "'Cormorant Infant', serif",
          fontWeight: 300,
          fontSize: 'clamp(32px, 8vw, 48px)',
          letterSpacing: '-0.018em',
          lineHeight: 1.05,
        }}
      >
        Tu invitación, antes del 2 de junio
      </h2>
      <p
        className="mb-8 mx-auto max-w-md"
        style={{ color: '#8B7E66', fontSize: 15, lineHeight: 1.5 }}
      >
        Escríbenos por WhatsApp y aparta tu paquete con el 21% de descuento.
        Empezamos a diseñar tu invitación de inmediato.
      </p>

      <WhatsAppButton variant="primary" label="Aprovecha el Hot Sale" />

      <p
        className="mt-4 text-xs"
        style={{ color: '#8B7E66', letterSpacing: '0.05em' }}
      >
        Respuesta en menos de 24 horas
      </p>
    </section>
  )
}

/* ───────── STICKY WHATSAPP (mobile) ───────── */
function StickyWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="md:hidden fixed bottom-5 right-5 z-50 flex items-center gap-2 px-5 py-3 rounded-full font-semibold"
      style={{
        background: 'linear-gradient(135deg, #D4AF7F 0%, #9B7B43 100%)',
        color: '#FBF8F1',
        boxShadow:
          '0 14px 32px rgba(155,123,67,0.42), 0 2px 6px rgba(43,31,20,0.18)',
        border: '1px solid #FBF8F1',
        fontSize: 14,
      }}
    >
      <WhatsAppIcon size={18} />
      WhatsApp
    </a>
  )
}

/* ───────── FOOTER ───────── */
function Footer() {
  return (
    <footer
      className="text-center py-8 px-5"
      style={{ background: '#1F1611', color: '#8B7E66', borderTop: '1px solid rgba(212,175,127,0.2)' }}
    >
      <a
        href="https://instagram.com/elysium.invitaciones"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mb-2"
        style={{
          color: '#D4AF7F',
          fontWeight: 700,
          textDecoration: 'none',
          letterSpacing: '0.02em',
        }}
      >
        @elysium.invitaciones
      </a>
      <p style={{ fontSize: 11, letterSpacing: '0.04em' }}>
        © 2026 Elysium · Hecho con cariño en México
      </p>
    </footer>
  )
}

/* ───────── SHARED PRIMITIVES ───────── */
function WhatsAppButton({
  variant,
  label,
  className = '',
}: {
  variant: 'primary' | 'outline'
  label: string
  className?: string
}) {
  const isPrimary = variant === 'primary'
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 rounded-full font-semibold ${className}`}
      style={{
        padding: '16px 30px',
        minHeight: 54,
        fontSize: 16,
        textDecoration: 'none',
        background: isPrimary
          ? 'linear-gradient(135deg, #D4AF7F 0%, #9B7B43 100%)'
          : '#FBF8F1',
        color: isPrimary ? '#FBF8F1' : '#9B7B43',
        border: isPrimary ? '1px solid #FBF8F1' : '1.5px solid #D4AF7F',
        boxShadow: isPrimary
          ? '0 14px 32px rgba(155,123,67,0.32), 0 2px 6px rgba(43,31,20,0.04)'
          : '0 8px 20px rgba(155,123,67,0.10)',
        letterSpacing: '0.01em',
      }}
    >
      <WhatsAppIcon size={20} color={isPrimary ? '#FBF8F1' : '#9B7B43'} />
      {label}
    </a>
  )
}

function WhatsAppIcon({ size = 20, color }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color ?? 'currentColor'}
      aria-hidden
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 1.67c2.21 0 4.28.86 5.84 2.42a8.218 8.218 0 012.42 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.69-8.24 8.22-8.24z" />
    </svg>
  )
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 mb-4 mx-auto max-w-[220px]">
      <span
        style={{
          height: 1,
          flex: 1,
          background:
            'linear-gradient(90deg, transparent, #D4AF7F, transparent)',
        }}
      />
      <span style={{ color: '#9B7B43', fontSize: 10, letterSpacing: '0.4em' }}>
        ◆
      </span>
      <span
        style={{
          height: 1,
          flex: 1,
          background:
            'linear-gradient(90deg, transparent, #D4AF7F, transparent)',
        }}
      />
    </div>
  )
}
