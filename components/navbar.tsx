"use client"

import Image from "next/image"
import { ShoppingBag, Heart, Menu, X } from "lucide-react"
import { useStore } from "@/lib/store-context"
import { useState, useEffect, useRef } from "react"

export function Navbar() {
  const { cartCount, setIsCartOpen, setActiveSection, activeSection, favorites } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [isAtTop, setIsAtTop] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY

      setIsAtTop(currentY < 20)

      if (currentY < 80) {
        setVisible(true)
      } else if (currentY > lastScrollY.current && currentY > 200) {
        // Scrolling down past 200px -> hide
        setVisible(false)
        setMobileMenuOpen(false)
      } else if (currentY < lastScrollY.current) {
        // Scrolling up -> show
        setVisible(true)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        isAtTop
          ? "bg-transparent border-b border-transparent"
          : "bg-[#000000]/60 backdrop-blur-xl border-b border-[#ffffff]/5"
      }`}
    >
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
          {[
            { key: "home" as const, label: "Inicio" },
            { key: "catalog" as const, label: "Catalogo" },
            { key: "checkout" as const, label: "Pago" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`relative text-sm font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                activeSection === item.key
                  ? "text-primary"
                  : "text-[#f5f5f5]/80 hover:text-[#f5f5f5]"
              }`}
            >
              {item.label}
              {activeSection === item.key && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveSection("catalog")}
            className="relative text-[#f5f5f5]/80 transition-colors hover:text-primary"
            aria-label="Favoritos"
          >
            <Heart className="h-5 w-5" />
            {favorites.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-[#ffffff]">
                {favorites.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-[#f5f5f5]/80 transition-colors hover:text-primary"
            aria-label="Carrito de compras"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-[#ffffff]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="text-[#f5f5f5] md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-[#ffffff]/5 bg-[#000000]/80 backdrop-blur-xl transition-all duration-300 md:hidden ${
          mobileMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 border-t-transparent"
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {(["home", "catalog", "checkout"] as const).map((section) => (
            <button
              key={section}
              onClick={() => {
                setActiveSection(section)
                setMobileMenuOpen(false)
              }}
              className={`py-3 text-left text-sm font-medium uppercase tracking-[0.2em] transition-colors ${
                activeSection === section
                  ? "text-primary"
                  : "text-[#f5f5f5]/70 hover:text-[#f5f5f5]"
              }`}
            >
              {section === "home" ? "Inicio" : section === "catalog" ? "Catalogo" : "Pago"}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
