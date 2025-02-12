import { getProducts } from "@/services/product-service"
import { ProductGrid } from "@/components/product-grid"

export default async function HomePage() {
  const products = await getProducts()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <ProductGrid products={products} />
    </div>
  )
}

