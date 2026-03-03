"use client"

import Image from "next/image"
import { useStore } from "@/lib/store-context"
import { ArrowDown, Play } from "lucide-react"
import { useState } from "react"

export function HeroSection() {
  const { setActiveSection } = useStore()
  const [videoPlaying, setVideoPlaying] = useState(false)

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#000000]">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/60 via-[#000000]/40 to-[#000000]" />
      </div>

      {/* Watermark pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "url('/images/axis-logo.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "300px",
      }} />

      {/* Spray paint texture */}
      <div className="absolute inset-0 spray-texture" />

      {/* Purple glow accents */}
      <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-primary/8 blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* Main Logo */}
        <div className="animate-fade-in-up mb-8 w-full max-w-lg">
          <Image
            src="/images/axis-logo.png"
            alt="AXIS Modern Streetwear"
            width={600}
            height={400}
            className="h-auto w-full"
            priority
          />
        </div>

        {/* Video preview area */}
        <div
          className="animate-fade-in-up relative mb-12 w-full max-w-2xl cursor-pointer overflow-hidden border border-border"
          style={{ animationDelay: "0.3s" }}
          onClick={() => setVideoPlaying(!videoPlaying)}
        >
          <div className="relative aspect-video bg-[#0a0a0a]">
            {!videoPlaying ? (
              <>
                <Image
                  src="/images/hero-bg.jpg"
                  alt="AXIS Collection Preview"
                  fill
                  className="object-cover opacity-60"
                />
                {/* Watermark on video */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <Image
                    src="/images/axis-logo.png"
                    alt=""
                    width={300}
                    height={200}
                    className="h-auto w-48"
                  />
                </div>
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-foreground/50 bg-[#000000]/50 backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/20">
                    <Play className="ml-1 h-6 w-6 text-foreground" />
                  </div>
                </div>
                {/* Label */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                    Coleccion 2026
                  </span>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                  poster="/images/hero-bg.jpg"
                >
                  <source src="https://videos.pexels.com/video-files/4488286/4488286-uhd_2560_1440_24fps.mp4" type="video/mp4" />
                </video>
                {/* Watermark overlay on video */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <Image
                    src="/images/axis-logo.png"
                    alt=""
                    width={300}
                    height={200}
                    className="h-auto w-48"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tagline */}
        <p
          className="animate-fade-in-up mb-8 text-center text-sm uppercase tracking-[0.4em] text-muted-foreground"
          style={{ animationDelay: "0.5s" }}
        >
          Define tu estilo en las calles
        </p>

        {/* CTA Button */}
        <button
          onClick={() => setActiveSection("catalog")}
          className="animate-fade-in-up group relative overflow-hidden border border-primary bg-primary/10 px-10 py-4 text-sm font-bold uppercase tracking-[0.3em] text-foreground transition-all hover:bg-primary hover:text-primary-foreground"
          style={{ animationDelay: "0.7s" }}
        >
          <span className="relative z-10">Explorar Coleccion</span>
        </button>

        {/* Scroll indicator */}
        <button
          onClick={() => setActiveSection("catalog")}
          className="absolute bottom-8 animate-bounce text-muted-foreground"
          aria-label="Ver catalogo"
        >
          <ArrowDown className="h-5 w-5" />
        </button>
      </div>

      {/* Side graffiti text decorations */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:block">
        <p className="text-xs font-bold uppercase tracking-[0.5em] text-[#1a1a1a] [writing-mode:vertical-lr]">
          Modern Streetwear 2026
        </p>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:block">
        <p className="text-xs font-bold uppercase tracking-[0.5em] text-[#1a1a1a] [writing-mode:vertical-lr]">
          Urban Collection
        </p>
      </div>
    </section>
  )
}
