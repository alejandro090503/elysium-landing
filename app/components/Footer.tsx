import { WHATSAPP_URL } from '@/app/lib/constants'

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/5 py-12 px-6 text-gray-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-heading text-3xl bg-gradient-to-br from-rose-primary to-gold bg-clip-text text-transparent">
            Elysium
          </span>
          <span className="text-xs tracking-[0.2em] uppercase text-gray-600">
            Invitaciones
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 1.67c2.21 0 4.28.86 5.84 2.42a8.218 8.218 0 012.42 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.69-8.24 8.22-8.24z" />
            </svg>
          </a>
          <a
            href="https://instagram.com/elysium.invitaciones"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>

        <p className="text-xs tracking-wide">
          © {new Date().getFullYear()} Elysium · Hecho con cariño en México
        </p>
      </div>
    </footer>
  )
}
