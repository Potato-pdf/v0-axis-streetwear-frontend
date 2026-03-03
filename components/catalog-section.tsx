"use client"

import { useState } from "react"
import { products, categories } from "@/lib/products"
import { ProductCard } from "./product-card"
import { useStore } from "@/lib/store-context"
import { SlidersHorizontal, Grid3X3, LayoutList } from "lucide-react"

export function CatalogSection() {
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "name">("default")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const { favorites } = useStore()

  const filtered = products
    .filter(p => activeCategory === "Todos" || p.category === activeCategory)
    .filter(p => !showFavoritesOnly || favorites.includes(p.id))
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return 0
    })

  const featuredProducts = products.filter(p => p.isFeatured)

  return (
    <section className="watermark-bg relative min-h-screen bg-[#000000] pt-24 pb-16">
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.4em] text-primary">
            Streetwear Collection
          </span>
          <h2 className="text-balance text-4xl font-black uppercase tracking-wide text-foreground md:text-5xl">
            Catalogo
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-primary" />
        </div>

        {/* Featured Row */}
        {!showFavoritesOnly && activeCategory === "Todos" && (
          <div className="mb-16">
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
              / Destacados
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Filters Bar */}
        <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Favorites toggle */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                showFavoritesOnly
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              Favoritos
              {favorites.length > 0 && (
                <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-[10px]">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="appearance-none border border-border bg-card px-3 py-2 pr-8 text-xs font-bold uppercase tracking-wider text-foreground"
                aria-label="Ordenar por"
              >
                <option value="default">Ordenar</option>
                <option value="price-asc">Precio: menor</option>
                <option value="price-desc">Precio: mayor</option>
                <option value="name">Nombre A-Z</option>
              </select>
              <SlidersHorizontal className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
            </div>

            {/* View mode */}
            <div className="hidden items-center border border-border md:flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                aria-label="Vista de cuadricula"
              >
                <Grid3X3 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                aria-label="Vista de lista"
              >
                <LayoutList className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "flex flex-col gap-4"
          }>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 border border-dashed border-border">
            <p className="text-sm uppercase tracking-wider text-muted-foreground">
              {showFavoritesOnly ? "No tienes favoritos aun" : "No se encontraron productos"}
            </p>
            <button
              onClick={() => {
                setActiveCategory("Todos")
                setShowFavoritesOnly(false)
              }}
              className="border border-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Ver todo
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
