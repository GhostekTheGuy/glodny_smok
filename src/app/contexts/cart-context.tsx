'use client'

import React, { createContext, useContext, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  selectedIngredients?: string[]
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: { id: number; name: string; price: number }, selectedIngredients?: string[]) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (
    product: { id: number; name: string; price: number },
    selectedIngredients?: string[]
  ) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(
        item => 
          item.id === product.id && 
          JSON.stringify(item.selectedIngredients) === JSON.stringify(selectedIngredients)
      )
      
      if (existingItemIndex > -1) {
        return currentItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentItems, { ...product, quantity: 1, selectedIngredients }]
    })
  }

  const removeFromCart = (id: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      totalItems,
      totalPrice
    }}>
      {children}
      <CartSheet />
    </CartContext.Provider>
  )
}

function CartSheet() {
  const cart = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed bottom-4 right-4 h-16 w-16 rounded-full shadow-lg bg-white"
        >
          <ShoppingCart className="h-6 w-6" />
          {cart.totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {cart.totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Koszyk</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
          {cart.items.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">Koszyk jest pusty</p>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium">{item.name}</h4>
                    {item.selectedIngredients && item.selectedIngredients.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        {item.selectedIngredients.join(', ')}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => cart.updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-medium">{(item.price * item.quantity).toFixed(2)} zł</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => cart.removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {cart.items.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Razem:</span>
              <span className="font-medium">{cart.totalPrice.toFixed(2)} zł</span>
            </div>
            <Button className="w-full">
              Zamów ({cart.totalItems})
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}

