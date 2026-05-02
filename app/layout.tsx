import type { Metadata } from 'next'
import { Great_Vibes, Cormorant_Infant } from 'next/font/google'
import './globals.css'

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-great-vibes',
  display: 'swap',
})

const cormorant = Cormorant_Infant({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Elysium Invitaciones | Invitaciones Digitales para Bodas, XV Años y Bautizos',
  description:
    'Invitaciones digitales elegantes para bodas, XV años y bautizos en México. Diseño personalizado, RSVP por WhatsApp, galería de fotos, cuenta regresiva y más. Todo por $750 MXN.',
  keywords: [
    'invitaciones digitales',
    'invitaciones boda',
    'invitaciones xv años',
    'invitaciones bautizo',
    'México',
  ],
  openGraph: {
    title: 'Elysium Invitaciones — Invitaciones digitales que cuentan tu historia',
    description:
      'Diseño personalizado, RSVP por WhatsApp, galería, cuenta regresiva y más. Todo por $750 MXN.',
    type: 'website',
    locale: 'es_MX',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${greatVibes.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  )
}
