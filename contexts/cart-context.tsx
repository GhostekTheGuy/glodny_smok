"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface IngredientSelectionGroup {
  name: string
  ingredients: { name: string; price: number }[]
}

interface CutlerySelection {
  [key: string]: number
}

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  selectedIngredients: Record<string, number>
  selectedCutlery: Record<string, number>
  selectedSize: string
  photoUrl: string
  ingredientSelectionGroups: IngredientSelectionGroup[]
  cutlerySelection?: CutlerySelection
  variants: { itemId: string; type: string; price: number }[]
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (
    id: number,
    selectedIngredients: Record<string, number>,
    selectedCutlery: Record<string, number>,
    selectedSize: string,
  ) => void
  updateQuantity: (
    id: number,
    selectedIngredients: Record<string, number>,
    selectedCutlery: Record<string, number>,
    selectedSize: string,
    quantity: number,
  ) => void
  editCartItem: (updatedItem: CartItem) => void
  totalItems: number
  totalPrice: number
  goToCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = useCallback((product: CartItem) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedSize === product.selectedSize &&
          JSON.stringify(item.selectedIngredients) === JSON.stringify(product.selectedIngredients) &&
          JSON.stringify(item.selectedCutlery) === JSON.stringify(product.selectedCutlery),
      )

      if (existingItemIndex > -1) {
        return currentItems.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...currentItems, { ...product, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback(
    (
      id: number,
      selectedIngredients: Record<string, number>,
      selectedCutlery: Record<string, number>,
      selectedSize: string,
    ) => {
      setItems((currentItems) =>
        currentItems.filter(
          (item) =>
            !(
              item.id === id &&
              item.selectedSize === selectedSize &&
              JSON.stringify(item.selectedIngredients) === JSON.stringify(selectedIngredients) &&
              JSON.stringify(item.selectedCutlery) === JSON.stringify(selectedCutlery)
            ),
        ),
      )
    },
    [],
  )

  const updateQuantity = useCallback(
    (
      id: number,
      selectedIngredients: Record<string, number>,
      selectedCutlery: Record<string, number>,
      selectedSize: string,
      quantity: number,
    ) => {
      setItems((currentItems) =>
        currentItems
          .map((item) =>
            item.id === id &&
            item.selectedSize === selectedSize &&
            JSON.stringify(item.selectedIngredients) === JSON.stringify(selectedIngredients) &&
            JSON.stringify(item.selectedCutlery) === JSON.stringify(selectedCutlery)
              ? { ...item, quantity: Math.max(0, quantity) }
              : item,
          )
          .filter((item) => item.quantity > 0),
      )
    },
    [],
  )

  const editCartItem = useCallback((updatedItem: CartItem) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === updatedItem.id &&
        item.selectedSize === updatedItem.selectedSize &&
        JSON.stringify(item.selectedIngredients) === JSON.stringify(updatedItem.selectedIngredients) &&
        JSON.stringify(item.selectedCutlery) === JSON.stringify(updatedItem.selectedCutlery)
          ? { ...updatedItem }
          : item,
      ),
    )
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const goToCart = useCallback(() => {
    window.location.href = "/cart"
  }, [])

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        editCartItem,
        totalItems,
        totalPrice,
        goToCart,
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

