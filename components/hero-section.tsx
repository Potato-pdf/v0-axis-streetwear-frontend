"use client"

import Image from "next/image"
import { useStore } from "@/lib/store-context"
import { Volume2, VolumeX, ChevronDown } from "lucide-react"
import { useState, useRef, useLayoutEffect } from "react"
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
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#7c3aed]/5 blur-[150px]" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#7c3aed]/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-14 flex flex-col items-center gap-4 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#7c3aed]">
            Lo mas buscado
          </span>
          <h2 className="text-3xl font-black uppercase tracking-wider text-[#f5f5f5] lg:text-5xl">
            Destacados
          </h2>
          <div className="h-px w-20 bg-[#7c3aed]" />
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
            className="group relative overflow-hidden border border-[#262626] bg-transparent px-10 py-4 text-sm font-bold uppercase tracking-[0.3em] text-[#f5f5f5] transition-all hover:border-[#7c3aed] hover:bg-[#7c3aed] hover:text-[#ffffff]"
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
          <span data-banner-text className="text-xs font-bold uppercase tracking-[0.4em] text-[#7c3aed]">
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
            className="mt-4 border border-[#7c3aed] bg-[#7c3aed]/10 px-10 py-4 text-sm font-bold uppercase tracking-[0.3em] text-[#f5f5f5] transition-all hover:bg-[#7c3aed] hover:text-[#ffffff]"
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
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#7c3aed]">Recien llegados</span>
          <h2 className="text-3xl font-black uppercase tracking-wider text-[#f5f5f5] lg:text-5xl">Lo Nuevo</h2>
          <div className="h-px w-20 bg-[#7c3aed]" />
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
   Multi-phase pinned scroll animation
   ────────────────────────────────────── */
export function HeroSection() {
  const { setActiveSection } = useStore()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  /* Element refs */
  const pinWrapRef = useRef<HTMLDivElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  /* Phase 1 – Title text "AXIS" individual letters */
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleLineRef = useRef<HTMLDivElement>(null)

  /* Phase 2 – Tagline words */
  const tagline1Ref = useRef<HTMLDivElement>(null)
  const tagline2Ref = useRef<HTMLDivElement>(null)
  const tagline3Ref = useRef<HTMLDivElement>(null)

  /* Phase 3 – CTA & details */
  const ctaBlockRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const lineTopRef = useRef<HTMLDivElement>(null)
  const lineBotRef = useRef<HTMLDivElement>(null)

  /* Vertical side labels */
  const sideLeftRef = useRef<HTMLParagraphElement>(null)
  const sideRightRef = useRef<HTMLParagraphElement>(null)

  /* Corner accents */
  const cornerTLRef = useRef<HTMLDivElement>(null)
  const cornerTRRef = useRef<HTMLDivElement>(null)
  const cornerBLRef = useRef<HTMLDivElement>(null)
  const cornerBRRef = useRef<HTMLDivElement>(null)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setMuted(videoRef.current.muted)
    }
  }

  /* ── MASTER GSAP SCROLL ANIMATION ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Hide everything initially */
      gsap.set(
        [
          titleRef.current,
          subtitleLineRef.current,
          tagline1Ref.current,
          tagline2Ref.current,
          tagline3Ref.current,
          ctaBlockRef.current,
          scrollHintRef.current,
          lineTopRef.current,
          lineBotRef.current,
          sideLeftRef.current,
          sideRightRef.current,
          cornerTLRef.current,
          cornerTRRef.current,
          cornerBLRef.current,
          cornerBRRef.current,
        ],
        { opacity: 0 }
      )

      /* ─ Quick intro (no scroll) ─ */
      const intro = gsap.timeline({ delay: 0.3 })

      intro
        .to(cornerTLRef.current, { opacity: 1, duration: 0.3 })
        .to(cornerTRRef.current, { opacity: 1, duration: 0.3 }, "<0.1")
        .to(cornerBLRef.current, { opacity: 1, duration: 0.3 }, "<0.1")
        .to(cornerBRRef.current, { opacity: 1, duration: 0.3 }, "<0.1")
        .to(scrollHintRef.current, { opacity: 1, duration: 0.5 }, "<0.2")
        .to(sideLeftRef.current, { opacity: 0.06, duration: 0.8 }, "<")
        .to(sideRightRef.current, { opacity: 0.06, duration: 0.8 }, "<0.1")

      /* ─ Scroll-driven pinned timeline ─ */
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapRef.current,
          start: "top top",
          end: "+=350%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      })

      /* Phase 1: 0% - 25% – Video clip expands, "AXIS" letters fly in */
      master
        /* Video clip starts small circle → fullscreen */
        .fromTo(
          videoWrapRef.current,
          { clipPath: "circle(8% at 50% 50%)" },
          { clipPath: "circle(75% at 50% 50%)", duration: 1, ease: "power2.inOut" },
          0
        )
        /* Overlay lightens */
        .fromTo(overlayRef.current, { opacity: 0.9 }, { opacity: 0.5, duration: 1 }, 0)
        /* Title: each letter */
        .to(titleRef.current, { opacity: 1, duration: 0.1 }, 0.15)
        .fromTo(
          "[data-axis-letter]",
          { y: 120, opacity: 0, rotateX: -90, scale: 0.5 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.4)",
          },
          0.2
        )
        /* Subtitle line */
        .fromTo(
          subtitleLineRef.current,
          { scaleX: 0, opacity: 0, transformOrigin: "center" },
          { scaleX: 1, opacity: 1, duration: 0.4, ease: "power3.inOut" },
          0.6
        )

      /* Phase 2: 25% - 55% – Taglines appear one by one, big & cinematic */
      master
        .fromTo(
          tagline1Ref.current,
          { y: 80, opacity: 0, filter: "blur(10px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" },
          1.1
        )
        .fromTo(
          tagline2Ref.current,
          { y: 80, opacity: 0, filter: "blur(10px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" },
          1.5
        )
        .fromTo(
          tagline3Ref.current,
          { y: 80, opacity: 0, filter: "blur(10px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" },
          1.9
        )
        /* Lines expand */
        .fromTo(
          lineTopRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, ease: "power3.inOut" },
          1.3
        )
        .fromTo(
          lineBotRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, ease: "power3.inOut" },
          1.7
        )

      /* Phase 3: 55% - 75% – CTA appears, everything settles */
      master
        .fromTo(
          ctaBlockRef.current,
          { y: 50, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
          2.4
        )

      /* Phase 4: 75% - 100% – Everything zooms & fades out as overlay darkens */
      master
        .to(
          titleRef.current,
          { scale: 3, opacity: 0, duration: 1, ease: "power2.in" },
          3
        )
        .to(
          [subtitleLineRef.current, tagline1Ref.current, tagline2Ref.current, tagline3Ref.current],
          { opacity: 0, y: -40, duration: 0.6, stagger: 0.05, ease: "power2.in" },
          3
        )
        .to(
          [lineTopRef.current, lineBotRef.current],
          { scaleX: 3, opacity: 0, duration: 0.8 },
          3
        )
        .to(ctaBlockRef.current, { opacity: 0, y: -30, duration: 0.5 }, 3.1)
        .to(
          [cornerTLRef.current, cornerTRRef.current, cornerBLRef.current, cornerBRRef.current],
          { opacity: 0, duration: 0.5 },
          3
        )
        .to(overlayRef.current, { opacity: 0.95, duration: 1 }, 3)
        .to(scrollHintRef.current, { opacity: 0, duration: 0.3 }, 3)
        .to(videoWrapRef.current, { scale: 1.15, duration: 1 }, 3)
    }, pinWrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ─── HERO PIN WRAPPER ─── */}
      <div ref={pinWrapRef} className="relative h-[100svh] w-full overflow-hidden bg-[#000000]">
        {/* Video – full viewport background */}
        <div ref={videoWrapRef} className="absolute inset-0" style={{ clipPath: "circle(8% at 50% 50%)" }}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none h-full w-full object-cover"
            poster="/images/hero-bg.jpg"
          >
            <source
              src="https://videos.pexels.com/video-files/4488286/4488286-uhd_2560_1440_24fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Dark overlay */}
        <div ref={overlayRef} className="absolute inset-0 bg-[#000000]" style={{ opacity: 0.9 }} />

        {/* Purple vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(124,58,237,0.10)_100%)]" />

        {/* Subtle watermark */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "url('/images/axis-logo.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "300px",
          }}
        />

        {/* Corner accents – geometric urban framing */}
        <div ref={cornerTLRef} className="absolute left-6 top-6 z-20 h-12 w-12 border-l-2 border-t-2 border-[#7c3aed]/40 lg:left-10 lg:top-10 lg:h-16 lg:w-16" />
        <div ref={cornerTRRef} className="absolute right-6 top-6 z-20 h-12 w-12 border-r-2 border-t-2 border-[#7c3aed]/40 lg:right-10 lg:top-10 lg:h-16 lg:w-16" />
        <div ref={cornerBLRef} className="absolute bottom-6 left-6 z-20 h-12 w-12 border-b-2 border-l-2 border-[#7c3aed]/40 lg:bottom-10 lg:left-10 lg:h-16 lg:w-16" />
        <div ref={cornerBRRef} className="absolute bottom-6 right-6 z-20 h-12 w-12 border-b-2 border-r-2 border-[#7c3aed]/40 lg:bottom-10 lg:right-10 lg:h-16 lg:w-16" />

        {/* ── CENTER CONTENT ── */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
          {/* Top decorative line */}
          <div ref={lineTopRef} className="mb-6 h-px w-full max-w-xs bg-gradient-to-r from-transparent via-[#7c3aed]/50 to-transparent lg:max-w-md" />

          {/* Phase 1: Big bold "AXIS" title letters */}
          <div ref={titleRef} className="flex items-center gap-1 lg:gap-3" style={{ perspective: "600px" }}>
            {["A", "X", "I", "S"].map((letter, i) => (
              <span
                key={letter + i}
                data-axis-letter
                className="inline-block text-[clamp(5rem,18vw,14rem)] font-black uppercase leading-none tracking-tight text-[#f5f5f5]"
                style={{
                  textShadow: "0 0 80px rgba(124,58,237,0.3), 0 0 160px rgba(124,58,237,0.1)",
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Subtitle bar */}
          <div
            ref={subtitleLineRef}
            className="mt-4 flex items-center gap-4 lg:mt-6"
          >
            <div className="h-px w-12 bg-[#7c3aed]/60 lg:w-20" />
            <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.6em] text-[#7c3aed]/80 lg:text-xs">
              Modern Streetwear
            </span>
            <div className="h-px w-12 bg-[#7c3aed]/60 lg:w-20" />
          </div>

          {/* Phase 2: Taglines – stacked, cinematic, large */}
          <div className="mt-10 flex flex-col items-center gap-3 lg:mt-14 lg:gap-4">
            <div ref={tagline1Ref}>
              <p className="text-center text-lg font-light uppercase tracking-[0.3em] text-[#f5f5f5]/90 lg:text-2xl">
                No seguimos tendencias
              </p>
            </div>
            <div ref={tagline2Ref}>
              <p className="text-center text-lg font-light uppercase tracking-[0.3em] text-[#f5f5f5]/70 lg:text-2xl">
                Las creamos en la calle
              </p>
            </div>
            <div ref={tagline3Ref}>
              <p className="text-center text-sm uppercase tracking-[0.4em] text-[#7c3aed]/80 lg:text-base">
                Coleccion 2026 disponible ahora
              </p>
            </div>
          </div>

          {/* Bottom decorative line */}
          <div ref={lineBotRef} className="mt-6 h-px w-full max-w-xs bg-gradient-to-r from-transparent via-[#7c3aed]/50 to-transparent lg:max-w-md" />

          {/* Phase 3: CTA block */}
          <div ref={ctaBlockRef} className="mt-10 flex flex-col items-center gap-4 lg:mt-14">
            <button
              onClick={() => setActiveSection("catalog")}
              className="animate-pulse-purple border border-[#7c3aed]/50 bg-[#7c3aed]/10 px-14 py-4 text-sm font-bold uppercase tracking-[0.3em] text-[#f5f5f5] backdrop-blur-sm transition-all hover:border-[#7c3aed] hover:bg-[#7c3aed] hover:text-[#ffffff] lg:px-16 lg:py-5 lg:text-base"
            >
              Explorar Coleccion
            </button>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#f5f5f5]/30">
              Envio gratis en pedidos +$999
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.5em] text-[#f5f5f5]/25">
            Scroll para descubrir
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce text-[#f5f5f5]/25" />
        </div>

        {/* Mute / Unmute */}
        <button
          onClick={toggleMute}
          className="absolute bottom-8 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#ffffff]/10 bg-[#000000]/40 text-[#f5f5f5]/50 backdrop-blur-sm transition-all hover:border-[#7c3aed]/50 hover:text-[#f5f5f5]"
          aria-label={muted ? "Activar sonido" : "Silenciar"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>

        {/* Side vertical text */}
        <p
          ref={sideLeftRef}
          className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.5em] text-[#ffffff]/[0.06] [writing-mode:vertical-lr] lg:block"
        >
          AXIS Streetwear 2026
        </p>
        <p
          ref={sideRightRef}
          className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.5em] text-[#ffffff]/[0.06] [writing-mode:vertical-lr] lg:block"
        >
          Urban Collection
        </p>
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
