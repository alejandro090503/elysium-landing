'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { WHATSAPP_NUMBER } from '@/app/lib/constants'
import { Footer } from '@/app/components/Footer'

const TEMPLATES = [
  {
    id: 'clasica-elegante',
    name: 'Clásica Elegante',
    description: 'Tonos crema y dorado con tipografía serif. Atemporal y sofisticada.',
    palette: ['#F5F0EB', '#C9A664', '#374151', '#FFFDF9'],
    demoUrl: 'https://boda-paulina-leonardo.vercel.app',
    tag: 'Boda',
  },
  {
    id: 'romantica-floral',
    name: 'Romántica Floral',
    description: 'Rosa pastel, sage y detalles botánicos. Delicada y femenina.',
    palette: ['#F7CAE4', '#A3B18A', '#FFFAF5', '#D4A574'],
    demoUrl: 'https://boda-carlos-victoria.vercel.app',
    tag: 'Boda',
  },
  {
    id: 'moderna-minimal',
    name: 'Moderna Minimal',
    description: 'Blanco, negro y acentos dorados. Limpia y contemporánea.',
    palette: ['#FFFFFF', '#1A1A1A', '#C9A664', '#F5F5F5'],
    demoUrl: 'https://boda-guillermo-fatima.vercel.app',
    tag: 'Boda',
  },
  {
    id: 'boho-rustica',
    name: 'Boho Rústica',
    description: 'Terracotta, sage y texturas naturales. Cálida y orgánica.',
    palette: ['#C4956A', '#A3B18A', '#F5F0EB', '#8B6F47'],
    demoUrl: 'https://boda-santiago-valentina.vercel.app',
    tag: 'Boda',
  },
  {
    id: 'elegante-oscura',
    name: 'Elegante Oscura',
    description: 'Navy, dorado y detalles luminosos. Dramática y lujosa.',
    palette: ['#1A2E4A', '#C9A664', '#F5F0EB', '#2D4A6F'],
    demoUrl: 'https://boda-santiago-ximena.vercel.app',
    tag: 'Boda',
  },
  {
    id: 'xv-princesa',
    name: 'XV Años Princesa',
    description: 'Rosa, plata y toques de brillo. Mágica y juvenil.',
    palette: ['#F9C6D9', '#C0C0C0', '#FFFAF5', '#E8A0BF'],
    demoUrl: 'https://xv-carolina.vercel.app',
    tag: 'XV Años',
  },
]

function whatsappUrl(templateName: string) {
  const msg = `Hola! Me interesa el paquete Express ($450) con la plantilla "${templateName}" ✨`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function ExpressPage() {
  const reduced = useReducedMotion()
  const anim = reduced ? {} : { initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-40px' } }

  return (
    <main className="min-h-svh bg-rose-bg">
      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center min-h-[85svh] px-5 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-bg-dark/60 via-rose-bg to-rose-bg" />

        <motion.div
          className="relative z-10 max-w-3xl mx-auto"
          initial={reduced ? undefined : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/60 backdrop-blur-md px-4 py-1.5 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            Paquete Express
          </span>

          <h1 className="font-heading text-[18vw] sm:text-8xl md:text-9xl bg-gradient-to-br from-rose-primary via-rose-dark to-gold bg-clip-text text-transparent leading-[1.1] mt-4" style={{ paddingBlock: '0.05em' }}>
            Elysium
          </h1>

          <p className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mt-6 leading-tight tracking-tight">
            <span className="font-light">Tu invitación digital por </span>
            <span className="font-bold bg-gradient-to-br from-rose-primary to-gold bg-clip-text text-transparent">$450</span>
          </p>

          <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-lg mx-auto mt-4 font-light leading-relaxed">
            Elige una plantilla, mándanos tus datos y recibe tu invitación lista en 24-48 hrs.
          </p>

          <motion.a
            href="#plantillas"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-primary to-rose-dark text-white font-semibold text-sm tracking-wide shadow-lg shadow-rose-primary/25 hover:shadow-xl hover:shadow-rose-primary/30 transition-shadow"
            whileHover={reduced ? undefined : { scale: 1.03 }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
          >
            Ver plantillas
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.a>
        </motion.div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-center font-heading text-5xl sm:text-6xl bg-gradient-to-br from-rose-primary to-gold bg-clip-text text-transparent mb-16"
            style={{ paddingBlock: '0.05em' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            {...anim}
          >
            Así de fácil
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Elige', desc: 'Explora las plantillas y elige la que más te guste.' },
              { step: '2', title: 'Envía tus datos', desc: 'Nombres, fecha, lugar, fotos y lo que necesites. Todo por WhatsApp.' },
              { step: '3', title: 'Recibe tu invitación', desc: 'En 24-48 hrs te enviamos el link listo para compartir.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center border border-rose-primary/10"
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                {...anim}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-primary to-gold flex items-center justify-center text-white font-bold text-lg mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Templates ── */}
      <section id="plantillas" className="py-20 px-5 scroll-mt-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-center font-heading text-5xl sm:text-6xl bg-gradient-to-br from-rose-primary to-gold bg-clip-text text-transparent mb-4"
            style={{ paddingBlock: '0.05em' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            {...anim}
          >
            Plantillas
          </motion.h2>
          <motion.p
            className="text-center text-gray-500 text-sm sm:text-base font-light max-w-md mx-auto mb-14"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            {...anim}
          >
            Cada plantilla incluye animaciones, cuenta regresiva, galería de fotos, mapa y más.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((t, i) => (
              <motion.div
                key={t.id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-rose-primary/10 transition-shadow duration-300"
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                {...anim}
              >
                {/* Color palette preview */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                    {t.palette.map((color, ci) => (
                      <div
                        key={ci}
                        className="transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-[10px] font-semibold tracking-[0.15em] uppercase text-gold px-3 py-1 rounded-full border border-gold/20">
                    {t.tag}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{t.name}</h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed mb-5">{t.description}</p>

                  <div className="flex gap-3">
                    <a
                      href={t.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 rounded-full border border-gray-200 text-gray-600 text-xs font-semibold tracking-wide hover:border-rose-primary/40 hover:text-rose-primary transition-colors"
                    >
                      Ver demo
                    </a>
                    <a
                      href={whatsappUrl(t.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 rounded-full bg-gradient-to-r from-rose-primary to-rose-dark text-white text-xs font-semibold tracking-wide shadow-md shadow-rose-primary/20 hover:shadow-lg hover:shadow-rose-primary/30 transition-shadow"
                    >
                      Quiero esta
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="py-20 px-5 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-center font-heading text-5xl sm:text-6xl bg-gradient-to-br from-rose-primary to-gold bg-clip-text text-transparent mb-14"
            style={{ paddingBlock: '0.05em' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            {...anim}
          >
            ¿Qué incluye?
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              'Diseño premium personalizado',
              'Cuenta regresiva animada',
              'Galería de fotos',
              'Mapa interactivo del evento',
              'Confirmación por WhatsApp',
              'Link único para compartir',
              'Animaciones elegantes',
              'Optimizada para celular',
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 bg-white/80 rounded-xl px-5 py-4 border border-rose-primary/8"
                variants={fadeUp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                {...anim}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-rose-primary to-gold flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 text-center"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            {...anim}
          >
            <p className="text-xs text-gray-400 font-light">
              No incluye: revisiones adicionales después de la entrega, panel de invitados ni RSVP avanzado.
              <br />
              ¿Necesitas más? Pregunta por nuestro paquete premium.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Price CTA ── */}
      <section className="py-24 px-5">
        <motion.div
          className="max-w-xl mx-auto text-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-10 sm:p-14 shadow-2xl relative overflow-hidden"
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          {...anim}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(219,39,119,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(161,98,7,0.15),transparent_50%)]" />

          <div className="relative z-10">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Paquete Express</p>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-5xl sm:text-7xl font-bold text-white">$450</span>
              <span className="text-gray-400 text-sm font-light">MXN</span>
            </div>
            <p className="text-gray-400 text-sm font-light mb-8">Pago único · Sin suscripciones</p>

            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Me interesa el paquete Express ($450) ✨')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-gradient-to-r from-rose-primary to-rose-dark text-white font-semibold text-sm tracking-wide shadow-lg shadow-rose-primary/30 hover:shadow-xl hover:shadow-rose-primary/40 transition-shadow"
              whileHover={reduced ? undefined : { scale: 1.03 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 1.67c2.21 0 4.28.86 5.84 2.42a8.218 8.218 0 012.42 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.69-8.24 8.22-8.24zm-3.2 4.53c-.14 0-.37.05-.56.27-.19.2-.74.72-.74 1.76s.76 2.04.86 2.18c.11.14 1.47 2.34 3.6 3.19.5.2.9.33 1.2.42.51.16.97.14 1.33.08.41-.06 1.25-.51 1.43-1 .18-.5.18-.92.13-1.01-.06-.09-.2-.14-.41-.25-.22-.11-1.26-.62-1.46-.69-.19-.07-.33-.11-.47.11-.14.2-.56.69-.68.84-.13.14-.25.16-.47.05-.22-.11-.91-.34-1.74-1.07-.64-.57-1.08-1.27-1.2-1.49-.13-.2-.01-.32.1-.43.1-.09.22-.25.33-.37.11-.13.14-.2.22-.34.07-.14.04-.27-.02-.37-.05-.11-.47-1.13-.64-1.55-.17-.4-.34-.35-.47-.36h-.4z" />
              </svg>
              Solicitar por WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-5 bg-white/50">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            className="text-center font-heading text-5xl sm:text-6xl bg-gradient-to-br from-rose-primary to-gold bg-clip-text text-transparent mb-14"
            style={{ paddingBlock: '0.05em' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            {...anim}
          >
            Preguntas frecuentes
          </motion.h2>

          <div className="space-y-4">
            {[
              {
                q: '¿Qué datos necesitan de mí?',
                a: 'Nombres de los novios/festejada, fecha, hora, lugares del evento, fotos que quieras incluir y tu canción favorita (opcional).',
              },
              {
                q: '¿Puedo elegir otra plantilla que no esté aquí?',
                a: 'Estas son las plantillas disponibles para el paquete Express. Si buscas un diseño 100% personalizado, pregunta por nuestro paquete premium.',
              },
              {
                q: '¿Cuánto tarda en estar lista?',
                a: 'Normalmente entre 24 y 48 horas después de recibir tus datos y confirmar tu pago.',
              },
              {
                q: '¿Puedo pedir cambios después?',
                a: 'El paquete Express incluye una entrega final. Si necesitas correcciones menores (errores en nombres o fechas) las hacemos sin costo. Cambios de diseño tienen costo adicional.',
              },
              {
                q: '¿Cómo pago?',
                a: 'Por transferencia bancaria. Te enviamos los datos de pago por WhatsApp al confirmar tu pedido.',
              },
              {
                q: '¿Qué recibo exactamente?',
                a: 'Un link único (tuevento.vercel.app) que puedes compartir por WhatsApp, Instagram, o donde quieras. Funciona en cualquier celular sin instalar nada.',
              },
            ].map((faq, i) => (
              <motion.details
                key={i}
                className="group bg-white/80 rounded-2xl border border-rose-primary/8 overflow-hidden"
                variants={fadeUp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                {...anim}
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer select-none list-none">
                  <span className="text-sm font-semibold text-gray-800 pr-4">{faq.q}</span>
                  <svg
                    className="flex-shrink-0 w-4 h-4 text-gray-400 transition-transform duration-300 group-open:rotate-45"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-sm text-gray-500 font-light leading-relaxed">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
