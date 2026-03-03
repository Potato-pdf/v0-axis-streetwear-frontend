"use client"

import Image from "next/image"
import { Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-[#000000]">
      {/* Watermark */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "url('/images/axis-logo.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "150px",
      }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          {/* Logo & tagline */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/images/axis-logo.png"
              alt="AXIS Modern Streetwear"
              width={140}
              height={90}
              className="h-auto w-28 mb-3"
            />
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Modern Streetwear
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div>
              <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground">
                Tienda
              </h4>
              <ul className="flex flex-col gap-2">
                {["Camisetas", "Hoodies", "Chamarras", "Pantalones", "Accesorios"].map(item => (
                  <li key={item}>
                    <span className="cursor-pointer text-xs text-muted-foreground transition-colors hover:text-primary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground">
                Info
              </h4>
              <ul className="flex flex-col gap-2">
                {["Sobre nosotros", "Contacto", "Envios", "Devoluciones", "FAQ"].map(item => (
                  <li key={item}>
                    <span className="cursor-pointer text-xs text-muted-foreground transition-colors hover:text-primary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground">
              Siguenos
            </h4>
            <div className="flex gap-3">
              <span className="flex h-9 w-9 cursor-pointer items-center justify-center border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary">
                <Instagram className="h-4 w-4" />
              </span>
              <span className="flex h-9 w-9 cursor-pointer items-center justify-center border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary">
                <Twitter className="h-4 w-4" />
              </span>
              <span className="flex h-9 w-9 cursor-pointer items-center justify-center border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.99a8.21 8.21 0 004.78 1.53V7.1a4.85 4.85 0 01-1.02-.41z" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {'AXIS Modern Streetwear 2026. Todos los derechos reservados.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
