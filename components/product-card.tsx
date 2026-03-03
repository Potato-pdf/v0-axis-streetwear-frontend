"use client"

import Image from "next/image"
import { Heart, Eye, ShoppingBag } from "lucide-react"
import { useStore, type Product } from "@/lib/store-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleFavorite, favorites, setSelectedProduct, setIsProductModalOpen, addToCart } = useStore()

  const isFav = favorites.includes(product.id)
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discount = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  return (
    <div className="group relative flex flex-col overflow-hidden border border-border bg-card transition-all hover:border-primary/50">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-[#000000]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              Nuevo
            </span>
          )}
          {hasDiscount && (
            <span className="bg-[#dc2626] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground">
              -{discount}%
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(product.id)
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-[#000000]/50 backdrop-blur-sm transition-all hover:bg-primary/30"
          aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${isFav ? "fill-primary text-primary" : "text-foreground"}`}
          />
        </button>

        {/* Hover actions */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 transition-all duration-300 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
          <button
            onClick={() => {
              setSelectedProduct(product)
              setIsProductModalOpen(true)
            }}
            className="flex flex-1 items-center justify-center gap-2 bg-[#000000]/80 py-3 text-xs font-bold uppercase tracking-wider text-foreground backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Eye className="h-3.5 w-3.5" />
            Vista rapida
          </button>
          <button
            onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
            className="flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground transition-colors hover:bg-primary/80"
            aria-label="Agregar al carrito"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {product.category}
        </span>
        <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice!.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
