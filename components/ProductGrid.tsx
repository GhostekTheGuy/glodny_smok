"use client"

import { useMemo } from "react"
import ProductCard from "./ProductCard"
import { motion, AnimatePresence } from "framer-motion"
import type { Menu, Product } from "../data/interfaces"

interface ProductGridProps {
  menu: Menu[]
  selectedCategory: string
  sortOrder: string
}

export function ProductGrid({ menu, selectedCategory, sortOrder }: ProductGridProps) {
  const filteredAndSortedProducts = useMemo(() => {
    let result: Product[] = []

    if (selectedCategory === "Wszystkie") {
      result = menu[0].products
    } else {
      result = menu[0].products.filter((product) =>
        product.categories.some((category) => category.name === selectedCategory),
      )
    }

    // First, sort products with notes to the beginning
    result.sort((a, b) => {
      if (a.note && !b.note) return -1
      if (!a.note && b.note) return 1
      return 0
    })

    // Then apply the user-selected sorting
    switch (sortOrder) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      default:
        // If no specific sort order is selected, keep the notes-first sorting
        break
    }

    return result
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

