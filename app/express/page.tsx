import type { Metadata } from 'next'
import { ExpressPage } from './ExpressPage'

export const metadata: Metadata = {
  title: 'Elysium Express | Tu Invitación Digital por $450',
  description:
    'Elige tu plantilla favorita, mándanos tus datos y recibe tu invitación digital lista en 24-48 hrs. Diseño premium por solo $450 MXN.',
  openGraph: {
    title: 'Elysium Express — Invitación digital por $450',
    description:
      'Plantillas premium listas para personalizar. Elige, paga y recibe tu invitación en 24-48 hrs.',
    type: 'website',
    locale: 'es_MX',
  },
}

export default function Page() {
  return <ExpressPage />
}
