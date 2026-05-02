export const WHATSAPP_NUMBER = '524421235312'
export const WHATSAPP_MESSAGE = 'Hola, me interesa una invitación digital ✨'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
export const FORM_URL = 'https://elysium-form.vercel.app'

export const EXAMPLES = [
  { name: 'Carlos & Victoria', slug: 'boda-carlos-victoria', type: 'Boda' },
  { name: 'Valentina & Rodrigo', slug: 'boda-valentina-rodrigo', type: 'Boda' },
  { name: 'Diego & Camila', slug: 'boda-diego-camila', type: 'Boda' },
  { name: 'Guillermo & Fátima', slug: 'boda-guillermo-fatima', type: 'Boda' },
  { name: 'Santiago & Valentina', slug: 'boda-santiago-valentina', type: 'Boda' },
  { name: 'Santiago & Ximena', slug: 'boda-santiago-ximena', type: 'Boda' },
  { name: 'XV de Renata', slug: 'xv-renata', type: 'XV Años' },
] as const

export type Example = (typeof EXAMPLES)[number]
