"use client"

import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function OrderConfirmation() {
  const router = useRouter()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full space-y-6 text-center">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Order Confirmed!</h2>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <ShoppingBag className="h-5 w-5" />
            <span>Estimated Delivery:</span>
            <span className="font-medium">2-3 Business Days</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={() => router.push("/orders")} className="w-full">
            View Order Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button variant="outline" onClick={() => router.push("/")} className="w-full">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  )
}

