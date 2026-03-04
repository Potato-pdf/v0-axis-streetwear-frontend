"use client"

import Image from "next/image"
import { useStore } from "@/lib/store-context"
import { ArrowDown, Volume2, VolumeX } from "lucide-react"
import { useState, useRef } from "react"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"

function FeaturedSection() {
  const { setActiveSection } = useStore()
  const featured = products.filter((p) => p.isFeatured)

  return (
    <section className="relative bg-[#000000] py-20 lg:py-28">
      {/* Watermark */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "url('/images/axis-logo.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "250px",
        }}
      />

      {/* Purple glow */}
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-[150px]" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mb-14 flex flex-col items-center gap-4 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary">
            Lo mas buscado
          </span>
          <h2 className="text-3xl font-black uppercase tracking-wider text-[#f5f5f5] lg:text-5xl">
            Destacados
          </h2>
          <div className="h-px w-20 bg-primary" />
          <p className="max-w-md text-sm leading-relaxed text-[#a3a3a3]">
            Piezas seleccionadas que definen el streetwear. Estilo urbano sin compromisos.
          </p>
        </div>

        {/* Featured grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => setActiveSection("catalog")}
            className="group relative overflow-hidden border border-[#262626] bg-transparent px-10 py-4 text-sm font-bold uppercase tracking-[0.3em] text-[#f5f5f5] transition-all hover:border-primary hover:bg-primary hover:text-[#ffffff]"
          >
            Ver todo el catalogo
          </button>
        </div>
      </div>

      {/* Graffiti side decorations */}
      <div className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 lg:block">
        <p className="text-xs font-bold uppercase tracking-[0.5em] text-[#1a1a1a] [writing-mode:vertical-lr]">
          Featured Drops
        </p>
      </div>
    </section>
  )
}

function NewArrivals() {
  const newItems = products.filter((p) => p.isNew)

  return (
    <section className="relative bg-[#050505] py-20 lg:py-28">
      {/* Spray texture */}
      <div className="absolute inset-0 spray-texture" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mb-14 flex flex-col items-center gap-4 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary">
            Recien llegados
          </span>
          <h2 className="text-3xl font-black uppercase tracking-wider text-[#f5f5f5] lg:text-5xl">
            Lo Nuevo
          </h2>
          <div className="h-px w-20 bg-primary" />
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function UrbanBanner() {
  const { setActiveSection } = useStore()

  return (
    <section className="relative overflow-hidden bg-[#000000]">
      <div className="relative flex min-h-[50vh] items-center justify-center">
        {/* BG Image */}
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/50 to-[#000000]" />

        {/* Watermark logo overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
          <Image
            src="/images/axis-logo.png"
            alt=""
            width={800}
            height={500}
            className="h-auto w-[600px] max-w-full"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary">
            Coleccion 2026
          </span>
          <h2 className="max-w-2xl text-balance text-3xl font-black uppercase leading-tight tracking-wide text-[#f5f5f5] lg:text-5xl">
            El arte de la calle se viste diferente
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-[#a3a3a3]">
            Cada pieza es una declaracion. Cada diseno nace en las calles. AXIS no es solo ropa, es identidad urbana.
          </p>
          <button
            onClick={() => setActiveSection("catalog")}
            className="mt-4 border border-primary bg-primary/10 px-10 py-4 text-sm font-bold uppercase tracking-[0.3em] text-[#f5f5f5] transition-all hover:bg-primary hover:text-[#ffffff]"
          >
            Descubrir ahora
          </button>
        </div>
      </div>
    </section>
  )
}

export function HeroSection() {
  const { setActiveSection } = useStore()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setMuted(videoRef.current.muted)
    }
  }

  return (
    <>
      {/* HERO - Full screen video background */}
      <section className="relative h-screen overflow-hidden bg-[#000000]">
        {/* Video background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="/images/hero-bg.jpg"
        >
          <source
            src="https://videos.pexels.com/video-files/4488286/4488286-uhd_2560_1440_24fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlays */}
        <div className="absolute inset-0 bg-[#000000]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]/40" />

        {/* Watermark logo repeating */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "url('/images/axis-logo.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "300px",
          }}
        />

        {/* Purple glow accents */}
        <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 h-56 w-56 rounded-full bg-primary/6 blur-[120px]" />

        {/* Center content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
          {/* Main Logo */}
          <div className="animate-fade-in-up mb-6 w-full max-w-md lg:max-w-lg">
            <Image
              src="/images/axis-logo.png"
              alt="AXIS Modern Streetwear"
              width={600}
              height={400}
              className="h-auto w-full drop-shadow-[0_0_40px_rgba(124,58,237,0.3)]"
              priority
            />
          </div>

          {/* Tagline */}
          <p
            className="animate-fade-in-up mb-10 text-center text-sm uppercase tracking-[0.4em] text-[#f5f5f5]/60"
            style={{ animationDelay: "0.3s" }}
          >
            Define tu estilo en las calles
          </p>

          {/* CTA */}
          <button
            onClick={() => setActiveSection("catalog")}
            className="animate-fade-in-up group relative overflow-hidden border border-primary/60 bg-primary/10 px-10 py-4 text-sm font-bold uppercase tracking-[0.3em] text-[#f5f5f5] backdrop-blur-sm transition-all hover:border-primary hover:bg-primary hover:text-[#ffffff] animate-pulse-purple"
            style={{ animationDelay: "0.5s" }}
          >
            Explorar Coleccion
          </button>
        </div>

        {/* Mute/unmute button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-8 right-8 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#ffffff]/10 bg-[#000000]/40 text-[#f5f5f5]/60 backdrop-blur-sm transition-all hover:border-primary/50 hover:text-[#f5f5f5]"
          aria-label={muted ? "Activar sonido" : "Silenciar"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>

        {/* Scroll indicator */}
        <button
          onClick={() => {
            const el = document.getElementById("featured-section")
            el?.scrollIntoView({ behavior: "smooth" })
          }}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce text-[#f5f5f5]/40"
          aria-label="Ver mas"
        >
          <ArrowDown className="h-5 w-5" />
        </button>

        {/* Side text decorations */}
        <div className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 lg:block">
          <p className="text-xs font-bold uppercase tracking-[0.5em] text-[#ffffff]/[0.07] [writing-mode:vertical-lr]">
            Modern Streetwear 2026
          </p>
        </div>
        <div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 lg:block">
          <p className="text-xs font-bold uppercase tracking-[0.5em] text-[#ffffff]/[0.07] [writing-mode:vertical-lr]">
            Urban Collection
          </p>
        </div>
      </section>

      {/* Sections below the hero */}
      <div id="featured-section">
        <FeaturedSection />
      </div>
      <UrbanBanner />
      <NewArrivals />
    </>
  )
}
