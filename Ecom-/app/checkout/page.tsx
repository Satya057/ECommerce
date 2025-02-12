"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      toast.error("Please login to continue checkout")
      router.push("/login")
    }
  }, [user, router])

  // Redirect to cart if empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  if (!user || items.length === 0) {
    return null
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const shippingAddress = formData.get("address") as string

    try {
      const res = await fetch("https://ecom-backend-pzc3.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
          totalPrice: total,
          shippingAddress,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to create order")
      }

      clearCart()
      toast.success("Order placed successfully!")
      router.push("/orders")
    } catch (error) {
      console.error("Checkout error:", error)
      setError(error instanceof Error ? error.message : "Failed to place order")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>

        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between">
              <span>
                {item.product.title} x {item.quantity}
              </span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="border-t pt-2 font-bold flex justify-between">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Shipping Address
          </label>
          <textarea
            id="address"
            name="address"
            required
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
            placeholder="Enter your shipping address"
          />
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md">{error}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  )
}

