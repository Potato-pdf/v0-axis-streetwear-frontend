"use client"

import Image from "next/image"
import { X, Heart, ShoppingBag, Minus, Plus } from "lucide-react"
import { useStore } from "@/lib/store-context"
import { useState } from "react"

export function ProductModal() {
  const {
    selectedProduct,
    isProductModalOpen,
    setIsProductModalOpen,
    setSelectedProduct,
    addToCart,
    toggleFavorite,
    favorites,
    setIsCartOpen,
  } = useStore()

  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  if (!isProductModalOpen || !selectedProduct) return null

  const isFav = favorites.includes(selectedProduct.id)
  const hasDiscount = selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price

  const handleAddToCart = () => {
    const size = selectedSize || selectedProduct.sizes[0]
    const color = selectedColor || selectedProduct.colors[0]
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedProduct, size, color)
    }
    setIsProductModalOpen(false)
    setSelectedProduct(null)
    setIsCartOpen(true)
    setQuantity(1)
    setSelectedSize("")
    setSelectedColor("")
  }

  const handleClose = () => {
    setIsProductModalOpen(false)
    setSelectedProduct(null)
    setQuantity(1)
    setSelectedSize("")
    setSelectedColor("")
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-[#000000]/85 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 z-50 m-auto flex max-h-[90vh] max-w-4xl flex-col overflow-hidden border border-border bg-[#0a0a0a] md:inset-8 lg:flex-row">
        {/* Image section */}
        <div className="relative h-64 flex-shrink-0 md:h-80 lg:h-auto lg:w-1/2">
          <Image
            src={selectedProduct.image}
            alt={selectedProduct.name}
            fill
            className="object-cover"
          />
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
            <Image
              src="/images/axis-logo.png"
              alt=""
              width={200}
              height={130}
              className="h-auto w-40"
            />
          </div>
          {/* Badges */}
          <div className="absolute left-4 top-4 flex gap-2">
            {selectedProduct.isNew && (
              <span className="bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                Nuevo
              </span>
            )}
            {hasDiscount && (
              <span className="bg-[#dc2626] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground">
                Oferta
              </span>
            )}
          </div>
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center bg-[#000000]/50 text-foreground backdrop-blur-sm transition-colors hover:bg-primary lg:hidden"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Details section */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6 lg:p-8">
          {/* Close desktop */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 hidden h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground lg:flex"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>

          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-primary">
            {selectedProduct.category}
          </span>

          <h2 className="mt-2 text-2xl font-black uppercase tracking-wide text-foreground">
            {selectedProduct.name}
          </h2>

          {/* Price */}
          <div className="mt-3 flex items-center gap-3">
            <span className="text-2xl font-black text-primary">
              ${selectedProduct.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-lg text-muted-foreground line-through">
                ${selectedProduct.originalPrice!.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {selectedProduct.description}
          </p>

          {/* Size selector */}
          <div className="mt-6">
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Talla
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-10 min-w-[40px] items-center justify-center px-3 text-xs font-bold uppercase transition-all ${
                    (selectedSize || selectedProduct.sizes[0]) === size
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color selector */}
          <div className="mt-5">
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    (selectedColor || selectedProduct.colors[0]) === color
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-5">
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Cantidad
            </label>
            <div className="flex w-fit items-center border border-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Reducir cantidad"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="flex h-10 w-12 items-center justify-center text-sm font-bold text-foreground">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Aumentar cantidad"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 bg-primary py-4 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary/80"
            >
              <ShoppingBag className="h-4 w-4" />
              Agregar al carrito
            </button>
            <button
              onClick={() => toggleFavorite(selectedProduct.id)}
              className={`flex h-14 w-14 items-center justify-center border transition-all ${
                isFav
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
              aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              <Heart className={`h-5 w-5 ${isFav ? "fill-primary" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
