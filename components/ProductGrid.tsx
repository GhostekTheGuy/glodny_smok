"use client"

import { useMemo } from "react"
import ProductCard from "./ProductCard"
import { motion, AnimatePresence } from "framer-motion"
import type { Menu, Product } from "../data/products"

interface ProductGridProps {
  menu: Menu
  selectedCategory: string
  sortOrder: string
}

export function ProductGrid({ menu, selectedCategory, sortOrder }: ProductGridProps) {
  const filteredAndSortedProducts = useMemo(() => {
    let result: Product[] = []

    if (selectedCategory === "Wszystkie") {
      result = menu.categories.flatMap((category) => category.products)
    } else {
      const category = menu.categories.find((cat) => cat.name === selectedCategory)
      result = category ? category.products : []
    }

    switch (sortOrder) {
      case "name-asc":
        return result.sort((a, b) => a.name.localeCompare(b.name))
      case "name-desc":
        return result.sort((a, b) => b.name.localeCompare(a.name))
      case "price-asc":
        return result.sort((a, b) => a.price - b.price)
      case "price-desc":
        return result.sort((a, b) => b.price - a.price)
      default:
        return result
    }
  }, [menu, selectedCategory, sortOrder])

  // Calculate minimum grid height based on the number of products
  const minGridHeight = Math.max(Math.ceil(filteredAndSortedProducts.length / 4) * 440, 880)

  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      style={{ minHeight: minGridHeight }}
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
            className={product.oos ? "opacity-75" : ""}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default ProductGrid

