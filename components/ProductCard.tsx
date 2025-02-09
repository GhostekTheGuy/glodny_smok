"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useCart } from "@/contexts/cart-context"
import type React from "react"

interface ProductCardProps {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  isBestseller?: boolean
}

export function ProductCard({ id, name, description, price, image, category, isBestseller = false }: ProductCardProps) {
  const router = useRouter()
  const { addToCart } = useCart()

  const handleClick = () => {
    // Start fade-out animation
    document.body.style.opacity = "0"
    document.body.style.transition = "opacity 0.5s"

    // Navigate after animation
    setTimeout(() => {
      router.push(`/product/${id}`)
    }, 500)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart({ id, name, price }, [])
  }

  return (
    <motion.div
      layout
      className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow duration-200 h-full flex flex-col cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col h-full">
        {isBestseller && (
          <div className="absolute top-2 left-2 bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded">
            BESTSELLER
          </div>
        )}
        <motion.div layout className="relative aspect-square w-full mb-4">
          <div className="absolute inset-0 border-2 border-dashed border-gray-200 rounded-lg">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="rounded-lg object-cover p-1" />
          </div>
        </motion.div>
        <motion.div layout className="flex flex-col flex-grow">
          <motion.h3 layout className="font-bold text-gray-900 text-lg mb-2">
            {name}
          </motion.h3>
          <motion.p layout className="text-sm text-gray-500 mb-4 flex-grow">
            {description}
          </motion.p>
          <motion.div layout className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold text-gray-900">{price.toFixed(2)} zł</span>
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

