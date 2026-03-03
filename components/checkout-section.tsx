"use client"

import Image from "next/image"
import { useState } from "react"
import { useStore } from "@/lib/store-context"
import {
  CreditCard,
  Store,
  MapPin,
  Truck,
  ChevronLeft,
  Check,
  ShoppingBag,
  Lock,
} from "lucide-react"

type DeliveryMethod = "online" | "pickup"
type CheckoutStep = "review" | "delivery" | "payment" | "confirmation"

export function CheckoutSection() {
  const { cart, cartTotal, setActiveSection, clearCart } = useStore()
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("online")
  const [step, setStep] = useState<CheckoutStep>("review")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  })

  const shippingCost = deliveryMethod === "online" ? 99.0 : 0
  const total = cartTotal + shippingCost

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleConfirmOrder = () => {
    setStep("confirmation")
    clearCart()
  }

  if (cart.length === 0 && step !== "confirmation") {
    return (
      <section className="watermark-bg relative min-h-screen bg-[#000000] pt-24 pb-16">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 lg:px-8">
          <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground/30" />
          <h2 className="mb-2 text-2xl font-black uppercase tracking-wide text-foreground">
            Carrito vacio
          </h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Agrega productos a tu carrito para continuar
          </p>
          <button
            onClick={() => setActiveSection("catalog")}
            className="border border-primary px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Ir al catalogo
          </button>
        </div>
      </section>
    )
  }

  if (step === "confirmation") {
    return (
      <section className="watermark-bg relative min-h-screen bg-[#000000] pt-24 pb-16">
        <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-32 text-center lg:px-8">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-primary/10 animate-pulse-purple">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mb-3 text-3xl font-black uppercase tracking-wide text-foreground">
            Pedido confirmado
          </h2>
          <p className="mb-2 text-sm text-muted-foreground">
            {deliveryMethod === "online"
              ? "Tu pedido sera enviado a la direccion proporcionada. Recibiras un correo de confirmacion."
              : "Tu pedido estara listo para recoger en tienda. Te notificaremos cuando este disponible."}
          </p>
          <p className="mb-8 text-xs uppercase tracking-[0.2em] text-primary">
            Orden #{Math.random().toString(36).substring(2, 10).toUpperCase()}
          </p>
          <button
            onClick={() => {
              setStep("review")
              setActiveSection("catalog")
            }}
            className="bg-primary px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Seguir comprando
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="watermark-bg relative min-h-screen bg-[#000000] pt-24 pb-16">
      <div className="relative z-10 mx-auto max-w-6xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.4em] text-primary">
            Checkout
          </span>
          <h2 className="text-4xl font-black uppercase tracking-wide text-foreground">
            Finalizar compra
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-primary" />
        </div>

        {/* Progress Steps */}
        <div className="mb-10 flex items-center justify-center gap-2">
          {(["review", "delivery", "payment"] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => {
                  const order = ["review", "delivery", "payment"] as const
                  if (order.indexOf(s) <= order.indexOf(step)) setStep(s)
                }}
                className={`flex h-8 w-8 items-center justify-center text-xs font-bold transition-all ${
                  step === s
                    ? "bg-primary text-primary-foreground"
                    : (["review", "delivery", "payment"] as const).indexOf(s) <
                      (["review", "delivery", "payment"] as const).indexOf(step)
                    ? "bg-primary/30 text-primary"
                    : "border border-border text-muted-foreground"
                }`}
              >
                {i + 1}
              </button>
              <span className={`hidden text-xs font-bold uppercase tracking-wider sm:block ${
                step === s ? "text-primary" : "text-muted-foreground"
              }`}>
                {s === "review" ? "Revision" : s === "delivery" ? "Entrega" : "Pago"}
              </span>
              {i < 2 && <div className="h-px w-8 bg-border sm:w-16" />}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left - Form area */}
          <div className="flex-1">
            {/* Step 1: Review */}
            {step === "review" && (
              <div className="border border-border bg-card p-6">
                <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                  Resumen del pedido
                </h3>
                <div className="flex flex-col gap-4">
                  {cart.map(item => (
                    <div
                      key={`${item.id}-${item.selectedSize}`}
                      className="flex items-center gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-wide text-foreground">
                          {item.name}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {item.selectedSize} / {item.selectedColor} / x{item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStep("delivery")}
                  className="mt-6 w-full bg-primary py-3 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/80"
                >
                  Continuar
                </button>
              </div>
            )}

            {/* Step 2: Delivery */}
            {step === "delivery" && (
              <div className="border border-border bg-card p-6">
                <button
                  onClick={() => setStep("review")}
                  className="mb-6 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Volver
                </button>

                <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                  Metodo de entrega
                </h3>

                {/* Delivery options */}
                <div className="mb-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => setDeliveryMethod("online")}
                    className={`flex flex-1 items-center gap-3 border p-4 transition-all ${
                      deliveryMethod === "online"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Truck className={`h-5 w-5 ${deliveryMethod === "online" ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="text-left">
                      <p className="text-xs font-bold uppercase tracking-wide text-foreground">
                        Envio a domicilio
                      </p>
                      <p className="text-[10px] text-muted-foreground">$99.00 MXN</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setDeliveryMethod("pickup")}
                    className={`flex flex-1 items-center gap-3 border p-4 transition-all ${
                      deliveryMethod === "pickup"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Store className={`h-5 w-5 ${deliveryMethod === "pickup" ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="text-left">
                      <p className="text-xs font-bold uppercase tracking-wide text-foreground">
                        Recoger en tienda
                      </p>
                      <p className="text-[10px] text-muted-foreground">Gratis</p>
                    </div>
                  </button>
                </div>

                {/* Contact info */}
                <div className="mb-6">
                  <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                    Informacion de contacto
                  </h4>
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      value={formData.name}
                      onChange={e => handleInputChange("name", e.target.value)}
                      className="w-full border border-border bg-[#000000] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    />
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={e => handleInputChange("email", e.target.value)}
                        className="flex-1 border border-border bg-[#000000] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      />
                      <input
                        type="tel"
                        placeholder="Telefono"
                        value={formData.phone}
                        onChange={e => handleInputChange("phone", e.target.value)}
                        className="flex-1 border border-border bg-[#000000] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Address (only for online) */}
                {deliveryMethod === "online" && (
                  <div className="mb-6">
                    <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                      Direccion de envio
                    </h4>
                    <div className="flex flex-col gap-3">
                      <input
                        type="text"
                        placeholder="Direccion"
                        value={formData.address}
                        onChange={e => handleInputChange("address", e.target.value)}
                        className="w-full border border-border bg-[#000000] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      />
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                          type="text"
                          placeholder="Ciudad"
                          value={formData.city}
                          onChange={e => handleInputChange("city", e.target.value)}
                          className="flex-1 border border-border bg-[#000000] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Codigo postal"
                          value={formData.zip}
                          onChange={e => handleInputChange("zip", e.target.value)}
                          className="w-32 border border-border bg-[#000000] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Pickup info */}
                {deliveryMethod === "pickup" && (
                  <div className="mb-6 border border-border bg-secondary/50 p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-foreground">
                          AXIS Store - Sucursal Centro
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Av. Principal #123, Col. Centro, Ciudad
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-wider text-primary">
                          Lun-Sab: 10:00 - 21:00
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setStep("payment")}
                  className="w-full bg-primary py-3 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/80"
                >
                  Continuar al pago
                </button>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === "payment" && (
              <div className="border border-border bg-card p-6">
                <button
                  onClick={() => setStep("delivery")}
                  className="mb-6 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Volver
                </button>

                <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                  Metodo de pago
                </h3>

                {deliveryMethod === "online" ? (
                  <>
                    {/* Card form */}
                    <div className="mb-6 flex flex-col gap-3">
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Numero de tarjeta"
                          value={formData.cardNumber}
                          onChange={e => handleInputChange("cardNumber", e.target.value)}
                          className="w-full border border-border bg-[#000000] py-3 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="MM/AA"
                          value={formData.cardExpiry}
                          onChange={e => handleInputChange("cardExpiry", e.target.value)}
                          className="flex-1 border border-border bg-[#000000] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={formData.cardCvv}
                          onChange={e => handleInputChange("cardCvv", e.target.value)}
                          className="w-24 border border-border bg-[#000000] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
                      <Lock className="h-3 w-3" />
                      <span>Pago seguro con encriptacion SSL</span>
                    </div>
                  </>
                ) : (
                  <div className="mb-6 border border-border bg-secondary/50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-foreground">
                      Pago al recoger en tienda
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      Aceptamos efectivo, tarjeta de credito/debito y transferencia bancaria al momento de recoger tu pedido en la sucursal.
                    </p>
                  </div>
                )}

                <button
                  onClick={handleConfirmOrder}
                  className="w-full bg-primary py-4 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/80"
                >
                  {deliveryMethod === "online" ? "Pagar ahora" : "Confirmar pedido"}
                  {" - "}${total.toFixed(2)}
                </button>
              </div>
            )}
          </div>

          {/* Right - Order summary */}
          <div className="w-full lg:w-80">
            <div className="sticky top-24 border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                Resumen
              </h3>

              {/* Items list */}
              <div className="mb-4 flex flex-col gap-2">
                {cart.map(item => (
                  <div
                    key={`${item.id}-${item.selectedSize}`}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs text-muted-foreground">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-xs font-bold text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-border" />

              {/* Subtotal */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Subtotal
                </span>
                <span className="text-sm font-bold text-foreground">${cartTotal.toFixed(2)}</span>
              </div>

              {/* Shipping */}
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Envio
                </span>
                <span className="text-sm font-bold text-foreground">
                  {deliveryMethod === "pickup" ? "Gratis" : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className="mt-3 h-px bg-border" />

              {/* Total */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                  Total
                </span>
                <span className="text-xl font-black text-primary">${total.toFixed(2)}</span>
              </div>

              {/* Watermark */}
              <div className="mt-6 flex justify-center opacity-10">
                <Image
                  src="/images/axis-logo.png"
                  alt=""
                  width={100}
                  height={65}
                  className="h-auto w-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
