"use client"

import Image from "next/image"
import { useStore } from "@/lib/store-context"
import { ArrowDown, Volume2, VolumeX } from "lucide-react"
import { useState, useRef, useEffect, useLayoutEffect } from "react"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────
   Featured Section
   ────────────────────────────────────── */
function FeaturedSection() {
  const { setActiveSection } = useStore()
  const featured = products.filter((p) => p.isFeatured)
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-feat-card]", {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-[#000000] py-20 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "url('/images/axis-logo.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "250px",
        }}
      />
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-[150px]" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <div key={product.id} data-feat-card>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <button
            onClick={() => setActiveSection("catalog")}
            className="group relative overflow-hidden border border-[#262626] bg-transparent px-10 py-4 text-sm font-bold uppercase tracking-[0.3em] text-[#f5f5f5] transition-all hover:border-primary hover:bg-primary hover:text-[#ffffff]"
          >
            Ver todo el catalogo
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 lg:block">
        <p className="text-xs font-bold uppercase tracking-[0.5em] text-[#1a1a1a] [writing-mode:vertical-lr]">
          Featured Drops
        </p>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────
   Urban Banner
   ────────────────────────────────────── */
function UrbanBanner() {
  const { setActiveSection } = useStore()
  const bannerRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-banner-text]", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 70%",
        },
      })
    }, bannerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={bannerRef} className="relative overflow-hidden bg-[#000000]">
      <div className="relative flex min-h-[55vh] items-center justify-center">
        <Image src="/images/hero-bg.jpg" alt="" fill className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/50 to-[#000000]" />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
          <Image src="/images/axis-logo.png" alt="" width={800} height={500} className="h-auto w-[600px] max-w-full" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
          <span data-banner-text className="text-xs font-bold uppercase tracking-[0.4em] text-primary">
            Coleccion 2026
          </span>
          <h2 data-banner-text className="max-w-2xl text-balance text-3xl font-black uppercase leading-tight tracking-wide text-[#f5f5f5] lg:text-5xl">
            El arte de la calle se viste diferente
          </h2>
          <p data-banner-text className="max-w-lg text-sm leading-relaxed text-[#a3a3a3]">
            Cada pieza es una declaracion. Cada diseno nace en las calles. AXIS no es solo ropa, es identidad urbana.
          </p>
          <button
            data-banner-text
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

/* ──────────────────────────────────────
   New Arrivals
   ────────────────────────────────────── */
function NewArrivals() {
  const newItems = products.filter((p) => p.isNew)
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-new-card]", {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-[#050505] py-20 lg:py-28">
      <div className="absolute inset-0 spray-texture" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-14 flex flex-col items-center gap-4 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary">Recien llegados</span>
          <h2 className="text-3xl font-black uppercase tracking-wider text-[#f5f5f5] lg:text-5xl">Lo Nuevo</h2>
          <div className="h-px w-20 bg-primary" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newItems.map((product) => (
            <div key={product.id} data-new-card>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────
   HERO  – Apple / Tesla inspired
   fullscreen video + GSAP scroll anim
   ────────────────────────────────────── */
export function HeroSection() {
  const { setActiveSection } = useStore()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  // Refs for GSAP
  const heroRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const lineLeftRef = useRef<HTMLDivElement>(null)
  const lineRightRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLSpanElement>(null)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setMuted(videoRef.current.muted)
    }
  }

  /* ── Intro entrance animation ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

      // Start with everything invisible
      gsap.set([logoRef.current, taglineRef.current, ctaRef.current, subtitleRef.current, scrollHintRef.current, lineLeftRef.current, lineRightRef.current], {
        opacity: 0,
      })

      // Logo scales in from large
      tl.fromTo(
        logoRef.current,
        { scale: 1.6, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.4 }
      )
        // Horizontal lines slide in
        .fromTo(
          lineLeftRef.current,
          { scaleX: 0, transformOrigin: "right center" },
          { scaleX: 1, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          lineRightRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, opacity: 1, duration: 0.8 },
          "<"
        )
        // Subtitle
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4"
        )
        // Tagline fades up
        .fromTo(
          taglineRef.current,
          { y: 30, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9 },
          "-=0.3"
        )
        // CTA slides up
        .fromTo(
          ctaRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        // Scroll hint
        .fromTo(
          scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  /* ── Scroll‑driven parallax exit ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // As user scrolls past the hero, zoom logo + fade out everything
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          pin: false,
        },
      })

      scrollTl
        .to(logoRef.current, {
          scale: 2.5,
          opacity: 0,
          y: -60,
          ease: "none",
        }, 0)
        .to(taglineRef.current, {
          opacity: 0,
          y: -40,
          ease: "none",
        }, 0)
        .to(subtitleRef.current, {
          opacity: 0,
          y: -30,
          ease: "none",
        }, 0)
        .to(ctaRef.current, {
          opacity: 0,
          y: -30,
          ease: "none",
        }, 0)
        .to([lineLeftRef.current, lineRightRef.current], {
          scaleX: 3,
          opacity: 0,
          ease: "none",
        }, 0)
        .to(scrollHintRef.current, {
          opacity: 0,
          ease: "none",
        }, 0)
        .to(overlayRef.current, {
          opacity: 0.95,
          ease: "none",
        }, 0)
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ─── HERO: fullscreen video ─── */}
      <div ref={heroRef} className="relative h-[100svh] w-full overflow-hidden bg-[#000000]">
        {/* Video – covers entire viewport */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          poster="/images/hero-bg.jpg"
        >
          <source
            src="https://videos.pexels.com/video-files/4488286/4488286-uhd_2560_1440_24fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay (gets darker on scroll) */}
        <div ref={overlayRef} className="absolute inset-0 bg-[#000000]/55" />

        {/* Subtle purple vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(124,58,237,0.08)_100%)]" />

        {/* Watermark tiling */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "url('/images/axis-logo.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "280px",
          }}
        />

        {/* ── Center content ── */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
          {/* Decorative horizontal lines */}
          <div className="mb-8 flex w-full max-w-xl items-center gap-4">
            <div ref={lineLeftRef} className="h-px flex-1 bg-gradient-to-l from-primary/60 to-transparent" />
            <span
              ref={subtitleRef}
              className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.5em] text-primary/80"
            >
              Modern Streetwear
            </span>
            <div ref={lineRightRef} className="h-px flex-1 bg-gradient-to-r from-primary/60 to-transparent" />
          </div>

          {/* Main Logo – big & cinematic */}
          <div ref={logoRef} className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <Image
              src="/images/axis-logo.png"
              alt="AXIS Modern Streetwear"
              width={700}
              height={460}
              className="h-auto w-full drop-shadow-[0_0_60px_rgba(124,58,237,0.25)]"
              priority
            />
          </div>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="mt-6 text-center text-sm uppercase tracking-[0.35em] text-[#f5f5f5]/50 lg:text-base"
          >
            Define tu estilo en las calles
          </p>

          {/* CTA Button */}
          <button
            ref={ctaRef}
            onClick={() => setActiveSection("catalog")}
            className="animate-pulse-purple mt-10 border border-primary/50 bg-primary/10 px-12 py-4 text-sm font-bold uppercase tracking-[0.3em] text-[#f5f5f5] backdrop-blur-sm transition-all hover:border-primary hover:bg-primary hover:text-[#ffffff]"
          >
            Explorar Coleccion
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#f5f5f5]/30">
            Scroll
          </span>
          <ArrowDown className="h-4 w-4 animate-bounce text-[#f5f5f5]/30" />
        </div>

        {/* Mute / Unmute */}
        <button
          onClick={toggleMute}
          className="absolute bottom-10 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#ffffff]/10 bg-[#000000]/40 text-[#f5f5f5]/60 backdrop-blur-sm transition-all hover:border-primary/50 hover:text-[#f5f5f5]"
          aria-label={muted ? "Activar sonido" : "Silenciar"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>

        {/* Side text decorations */}
        <div className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 lg:block">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#ffffff]/[0.06] [writing-mode:vertical-lr]">
            Modern Streetwear 2026
          </p>
        </div>
        <div className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 lg:block">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#ffffff]/[0.06] [writing-mode:vertical-lr]">
            Urban Collection
          </p>
        </div>
      </div>

      {/* ─── Sections below ─── */}
      <div id="featured-section">
        <FeaturedSection />
      </div>
      <UrbanBanner />
      <NewArrivals />
    </>
  )
}
