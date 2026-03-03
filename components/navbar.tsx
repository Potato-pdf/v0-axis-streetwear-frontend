"use client"

import Image from "next/image"
import { ShoppingBag, Heart, Menu, X } from "lucide-react"
import { useStore } from "@/lib/store-context"
import { useState } from "react"

export function Navbar() {
  const { cartCount, setIsCartOpen, setActiveSection, activeSection, favorites } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-[#000000]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => setActiveSection("home")}
          className="relative h-10 w-28 flex-shrink-0"
          aria-label="Ir a inicio"
        >
          <Image
            src="/images/axis-logo.png"
            alt="AXIS Modern Streetwear"
            fill
            className="object-contain"
            priority
          />
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          <button
            onClick={() => setActiveSection("home")}
            className={`text-sm font-medium uppercase tracking-[0.2em] transition-colors ${
              activeSection === "home" ? "text-primary" : "text-foreground hover:text-primary"
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => setActiveSection("catalog")}
            className={`text-sm font-medium uppercase tracking-[0.2em] transition-colors ${
              activeSection === "catalog" ? "text-primary" : "text-foreground hover:text-primary"
            }`}
          >
            Catalogo
          </button>
          <button
            onClick={() => setActiveSection("checkout")}
            className={`text-sm font-medium uppercase tracking-[0.2em] transition-colors ${
              activeSection === "checkout" ? "text-primary" : "text-foreground hover:text-primary"
            }`}
          >
            Pago
          </button>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveSection("catalog")}
            className="relative text-foreground transition-colors hover:text-primary"
            aria-label="Favoritos"
          >
            <Heart className="h-5 w-5" />
            {favorites.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {favorites.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-foreground transition-colors hover:text-primary"
            aria-label="Carrito de compras"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-[#000000]/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {(["home", "catalog", "checkout"] as const).map(section => (
              <button
                key={section}
                onClick={() => {
                  setActiveSection(section)
                  setMobileMenuOpen(false)
                }}
                className={`py-3 text-left text-sm font-medium uppercase tracking-[0.2em] transition-colors ${
                  activeSection === section ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                {section === "home" ? "Inicio" : section === "catalog" ? "Catalogo" : "Pago"}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
