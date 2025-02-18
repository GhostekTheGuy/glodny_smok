"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "./ProductCard"

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
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const slider = sliderRef.current
    if (slider) {
      const scrollWidth = slider.scrollWidth - slider.clientWidth

      const scroll = () => {
        if (slider.scrollLeft >= scrollWidth) {
          slider.scrollLeft = 0
        } else {
          slider.scrollLeft += 1
        }
      }

      const intervalId = setInterval(scroll, 50)

      return () => clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="mb-12 -mx-4 sm:-mx-6 lg:-mx-8">
      <h2 className="text-3xl font-bold mb-6 px-4 sm:px-6 lg:px-8">GŁODNY SMOK POLECA</h2>
      <div ref={sliderRef} className="flex space-x-4 overflow-x-hidden pb-4 px-4 sm:px-6 lg:px-8">
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

