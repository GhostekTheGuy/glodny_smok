'use client'

import React, { useMemo } from 'react'
import { ProductCard } from './ProductCard'
import { motion, AnimatePresence } from "framer-motion"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  isBestseller?: boolean
}

interface ProductGridProps {
  products: Product[]
  selectedCategory: string
  sortOrder: string
}

export function ProductGrid({ products, selectedCategory, sortOrder }: ProductGridProps) {
  const filteredAndSortedProducts = useMemo(() => {
    let result = selectedCategory === 'Wszystkie'
      ? products
      : products.filter(product => product.category === selectedCategory)

    switch (sortOrder) {
      case 'name-asc':
        return result.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return result.sort((a, b) => b.name.localeCompare(a.name))
      case 'price-asc':
        return result.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return result.sort((a, b) => b.price - a.price)
      default:
        return result
    }
  }, [products, selectedCategory, sortOrder])

  return (
    <motion.div 
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <AnimatePresence>
        {filteredAndSortedProducts.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ProductCard {...product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

