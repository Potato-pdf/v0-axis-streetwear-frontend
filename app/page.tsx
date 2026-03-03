"use client"

import { StoreProvider, useStore } from "@/lib/store-context"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CatalogSection } from "@/components/catalog-section"
import { CheckoutSection } from "@/components/checkout-section"
import { CartDrawer } from "@/components/cart-drawer"
import { ProductModal } from "@/components/product-modal"
import { Footer } from "@/components/footer"

function StoreContent() {
  const { activeSection } = useStore()

  return (
    <div className="min-h-screen bg-[#000000]">
      <Navbar />
      <main>
        {activeSection === "home" && <HeroSection />}
        {activeSection === "catalog" && <CatalogSection />}
        {activeSection === "checkout" && <CheckoutSection />}
      </main>
      <Footer />
      <CartDrawer />
      <ProductModal />
    </div>
  )
}

export default function Home() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  )
}
