"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  selectedIngredients: string[]
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: { id: number; name: string; price: number }, selectedIngredients: string[]) => void
  removeFromCart: (id: number, selectedIngredients: string[]) => void
  updateQuantity: (id: number, selectedIngredients: string[], quantity: number) => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (product: { id: number; name: string; price: number }, selectedIngredients: string[]) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) =>
          item.id === product.id && JSON.stringify(item.selectedIngredients) === JSON.stringify(selectedIngredients),
      )

      if (existingItemIndex > -1) {
        return currentItems.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...currentItems, { ...product, quantity: 1, selectedIngredients }]
    })
  }

  const removeFromCart = (id: number, selectedIngredients: string[]) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => !(item.id === id && JSON.stringify(item.selectedIngredients) === JSON.stringify(selectedIngredients)),
      ),
    )
  }

  const updateQuantity = (id: number, selectedIngredients: string[], quantity: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id && JSON.stringify(item.selectedIngredients) === JSON.stringify(selectedIngredients)
            ? { ...item, quantity: Math.max(0, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}

