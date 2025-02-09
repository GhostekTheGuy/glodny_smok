"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"

export default function CartPage() {
  const cart = useCart()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Koszyk</h1>
      {cart.items.length === 0 ? (
        <p>Twój koszyk jest pusty.</p>
      ) : (
        <div>
          {cart.items.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex items-center justify-between border-b py-4">
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.selectedIngredients.join(", ")}</p>
              </div>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => cart.updateQuantity(item.id, item.selectedIngredients, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => cart.updateQuantity(item.id, item.selectedIngredients, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 ml-2"
                  onClick={() => cart.removeFromCart(item.id, item.selectedIngredients)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <span className="ml-4">{(item.price * item.quantity).toFixed(2)} zł</span>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right">
            <p className="text-xl font-bold">Razem: {cart.totalPrice.toFixed(2)} zł</p>
            <Button className="mt-4">Przejdź do zamówienia</Button>
          </div>
        </div>
      )}
    </div>
  )
}

