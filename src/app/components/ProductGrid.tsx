'use client'

import React from 'react'
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
  const filteredProducts = selectedCategory === 'Wszystkie'
    ? products
    : products.filter(product => product.category === selectedCategory)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      default:
        return 0
    }
  })

  return (
    <motion.div 
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <AnimatePresence>
        {sortedProducts.map((product) => (
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

