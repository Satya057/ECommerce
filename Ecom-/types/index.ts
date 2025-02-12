export interface User {
  id: string
  fullName: string
  email: string
}

export interface Product {
  id: string
  title: string
  price: number
  description: string
  image: string
  category: string
}

export interface CartItem {
  productId: string
  quantity: number
  product: Product
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  totalPrice: number
  shippingAddress: string
  paymentStatus: "Pending" | "Paid" | "Failed"
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered"
  createdAt: string
}

