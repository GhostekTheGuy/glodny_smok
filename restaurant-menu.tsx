"use client"

import { useState } from "react"
import { MenuHeader } from "./components/MenuHeader"
import { RecommendationsSlider } from "./components/RecommendationsSlider"
import { ProductGrid } from "./components/ProductGrid"
import { SubMenu } from "./components/SubMenu"
import { products } from "./data/products"
import { CartProvider } from "./contexts/cart-context"
import { CategoryDisplay } from "./components/CategoryDisplay"

export default function RestaurantMenu() {
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie")
  const [sortOrder, setSortOrder] = useState("default")

  const categories = [
    "Wszystkie",
    "Chrupiące specjały",
    "Kubełki",
    "Przekąski",
    "Z kurczakiem",
    "Z wołowiną",
    "Wege",
    "Z krewetkami",
    "Ryż smażony",
    "Zupy",
    "Thai Curry",
    "Makarony",
    "Pad Thai",
    "Kebab",
    "Sałatki",
    "Napoje",
  ]

  return (
    <CartProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MenuHeader />
        <RecommendationsSlider products={products.filter((p) => p.isBestseller)} />
        <CategoryDisplay category={selectedCategory} />
        <SubMenu
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <ProductGrid products={products} selectedCategory={selectedCategory} sortOrder={sortOrder} />
      </div>
    </CartProvider>
  )
}

