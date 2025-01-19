'use client'

import React, { useRef, useEffect } from 'react'
import { ProductCard } from './ProductCard'
import { useCart } from '../contexts/cart-context'
import { motion } from 'framer-motion'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  isBestseller?: boolean
}

interface RecommendationsSliderProps {
  products: Product[]
}

export function RecommendationsSlider({ products }: RecommendationsSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      const scrollAnimation = () => {
        if (scrollElement.scrollLeft >= scrollElement.scrollWidth - scrollElement.clientWidth) {
          scrollElement.scrollLeft = 0
        } else {
          scrollElement.scrollLeft += 1
        }
      }

      const animationInterval = setInterval(scrollAnimation, 50)

      return () => clearInterval(animationInterval)
    }
  }, [])

  return (
    <div className="mb-12 -mx-4 sm:-mx-6 lg:-mx-8">
      <h2 className="text-3xl font-bold mb-6 px-4 sm:px-6 lg:px-8">GŁODNY SMOK POLECA</h2>
      <div 
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 hide-scrollbar"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="flex-none w-64"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductCard {...product} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

