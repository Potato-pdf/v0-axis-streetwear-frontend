"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  sizes: string[]
  colors: string[]
  description: string
  isFeatured?: boolean
  isNew?: boolean
}

export interface CartItem extends Product {
  quantity: number
  selectedSize: string
  selectedColor: string
}

interface StoreState {
  cart: CartItem[]
  favorites: string[]
  activeSection: "home" | "catalog" | "checkout"
  selectedProduct: Product | null
  isCartOpen: boolean
  isProductModalOpen: boolean
  cartTotal: number
  cartCount: number
  addToCart: (product: Product, size: string, color: string) => void
  removeFromCart: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  toggleFavorite: (id: string) => void
  setActiveSection: (section: "home" | "catalog" | "checkout") => void
  setSelectedProduct: (product: Product | null) => void
  setIsCartOpen: (open: boolean) => void
  setIsProductModalOpen: (open: boolean) => void
  clearCart: () => void
}

const StoreContext = createContext<StoreState | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [activeSection, setActiveSection] = useState<"home" | "catalog" | "checkout">("home")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)

  const addToCart = useCallback((product: Product, size: string, color: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size)
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }]
    })
  }, [])

  const removeFromCart = useCallback((id: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)))
  }, [])

  const updateQuantity = useCallback((id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)))
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.selectedSize === size ? { ...item, quantity } : item
      )
    )
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <StoreContext.Provider
      value={{
        cart,
        favorites,
        activeSection,
        selectedProduct,
        isCartOpen,
        isProductModalOpen,
        cartTotal,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleFavorite,
        setActiveSection,
        setSelectedProduct,
        setIsCartOpen,
        setIsProductModalOpen,
        clearCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}
