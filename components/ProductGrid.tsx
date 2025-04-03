"use client";

import { useMemo } from "react";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Product } from "@/types/interfaces";

interface ProductGridProps {
  menu: Menu[];
  selectedCategory: string;
  sortOrder: string;
  categoryMap: Map<string, Product[]>;
}

export function ProductGrid({
  menu,
  selectedCategory,
  sortOrder,
  categoryMap,
}: ProductGridProps) {
  const filteredAndSortedProducts = useMemo(() => {
    if (!categoryMap || categoryMap.size === 0) return [];
    let resultMap = new Map<string, Product[]>();

    if (selectedCategory === "Wszystkie") {
      resultMap = new Map(categoryMap);
    } else {
      const selectedProducts = categoryMap.get(selectedCategory) || [];
      resultMap.set(selectedCategory, selectedProducts);
    }

    // First, sort products with notes to the beginning
    // result.sort((a, b) => {
    //   if (a.note && !b.note) return -1
    //   if (!a.note && b.note) return 1
    //   return 0
    // })

    // Then apply the user-selected sorting
    for (const [category, products] of resultMap) {
      products.sort((a, b) => {
        switch (sortOrder) {
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          default:
            return 0;
        }
      });
    }

    return Array.from(resultMap.entries()).map(([categoryName, products]) => ({
      categoryName,
      products,
    }));
  }, [selectedCategory, sortOrder, categoryMap]);

  // Calculate minimum grid height based on the number of products
  const minGridHeight = Math.max(
    Math.ceil(filteredAndSortedProducts?.length / 4) * 440,
    880
  );

  return (
    <div>
      {filteredAndSortedProducts.map(({ categoryName, products }) => (
        <div key={categoryName} className="mb-6">
          <h2 className="text-3xl font-bold mb-2">{categoryName}</h2>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            style={{ gridTemplateRows: "auto" }}
          >
            <AnimatePresence>
              {products.map((product) => (
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
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
