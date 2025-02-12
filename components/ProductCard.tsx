"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useCart } from "@/contexts/cart-context"
import type React from "react"
import type { Product } from "../data/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { addToCart } = useCart()

  const handleClick = () => {
    // Start fade-out animation
    document.body.style.opacity = "0"
    document.body.style.transition = "opacity 0.5s"

    // Navigate after animation
    setTimeout(() => {
      router.push(`/product/${product.id}`)
    }, 500)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    const basePrice = product.variants.length > 0 ? product.variants[0].price : product.price
    addToCart(
      {
        ...product,
        price: basePrice,
        selectedIngredients: {},
        selectedCutlery: {},
        selectedSize: product.variants.length > 0 ? product.variants[0].type : "",
      },
      [],
    )
  }

  const displayPrice =
    product.variants.length > 0
      ? `${Math.min(...product.variants.map((v) => v.price)).toFixed(2)} zł`
      : `${product.price.toFixed(2)} zł`

  return (
    <motion.div
      layout
      className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-200 h-full flex flex-col cursor-pointer relative"
      onClick={handleClick}
    >
      {product.note && (
        <div className="absolute top-0 left-0 right-0 z-10">
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-t-lg font-medium text-sm flex items-center justify-center shadow-sm">
            <span className="mr-2">🌟</span>
            {product.note}
          </div>
        </div>
      )}
      <div className="flex flex-col h-full">
        <motion.div layout className="relative aspect-square w-full mb-4">
          <div className="absolute inset-0 border-2 border-dashed border-gray-200 rounded-lg">
            <Image
              src={product.photoUrl || "/placeholder.svg"}
              alt={product.name}
              fill
              className="rounded-lg object-cover p-1"
            />
          </div>
        </motion.div>
        <motion.div layout className="flex flex-col flex-grow">
          <motion.h3 layout className="font-bold text-gray-900 text-lg mb-2">
            {product.name}
          </motion.h3>
          <motion.p layout className="text-sm text-gray-500 mb-4 flex-grow">
            {product.description}
          </motion.p>
          <motion.div layout className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold text-gray-900">{displayPrice}</span>
            <button
              onClick={handleAddToCart}
              className="bg-red-600 hover:bg-black text-white px-4 py-2 rounded-full text-sm transition-colors duration-300"
            >
              Dodaj do koszyka
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProductCard

