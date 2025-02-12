"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { OrderConfirmation } from "@/components/order-confirmation"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("https://ecom-backend-pzc3.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("token=")[1]}`,
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
          totalPrice: total,
          shippingAddress: user?.address || "Default Shipping Address",
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to create order")
      }

      clearCart()
      setShowConfirmation(true)
      toast.success("Order placed successfully!")
    } catch (error) {
      console.error("Checkout error:", error)
      toast.error("Failed to place order. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (showConfirmation) {
    return <OrderConfirmation />
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Add some products to your cart to continue shopping.</p>
        <Button onClick={() => router.push("/")}>Continue Shopping</Button>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
                <div className="relative h-24 w-24">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.title}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium">{item.product.title}</h3>
                  <p className="text-gray-600">${item.product.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button size="icon" variant="destructive" onClick={() => removeItem(item.productId)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 font-bold flex justify-between">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button onClick={handleCheckout} className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

