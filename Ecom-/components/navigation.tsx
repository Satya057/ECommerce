"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart, User } from "lucide-react"

export function Navigation() {
  const { user, logout } = useAuth()
  const { items } = useCart()

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-800">
            E-Commerce
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm font-medium">Cart ({items.length})</span>
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/orders" className="text-gray-600 hover:text-gray-900">
                  Orders
                </Link>
                <button onClick={logout} className="text-gray-600 hover:text-gray-900">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

