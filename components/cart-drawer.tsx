"use client"

import Image from "next/image"
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useStore } from "@/lib/store-context"

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    cartTotal,
    cartCount,
    removeFromCart,
    updateQuantity,
    setActiveSection,
  } = useStore()

  if (!isCartOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-[#000000]/80 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-[#0a0a0a]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">
              Carrito ({cartCount})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/30" />
              <p className="text-sm uppercase tracking-wider text-muted-foreground">
                Tu carrito esta vacio
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false)
                  setActiveSection("catalog")
                }}
                className="border border-primary px-6 py-2 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Explorar catalogo
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex gap-4 border border-border bg-card p-3"
                >
                  {/* Image */}
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wide text-foreground">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                          Talla: {item.selectedSize} / {item.selectedColor}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                        aria-label="Eliminar del carrito"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      {/* Quantity */}
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          aria-label="Reducir cantidad"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="flex h-7 w-8 items-center justify-center text-xs font-bold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-bold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-border px-6 py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Total
              </span>
              <span className="text-xl font-black text-foreground">${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false)
                setActiveSection("checkout")
              }}
              className="w-full bg-primary py-4 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Proceder al pago
            </button>
          </div>
        )}
      </div>
    </>
  )
}
