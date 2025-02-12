"use client"

import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addItem } = useCart()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-48">
            <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-contain" />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{product.title}</h2>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">${product.price}</span>
              <Button onClick={() => addItem(product)} size="sm" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

