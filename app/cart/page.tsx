"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, Pencil, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type React from "react" // Added import for React

export default function CartPage() {
  const cart = useCart()
  const router = useRouter()

  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false)
  const [orderFormData, setOrderFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })

  const handleEditItem = (itemId: number) => {
    router.push(`/edit-product/${itemId}`)
  }

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the order data to your backend
    console.log("Order submitted:", { items: cart.items, totalPrice: cart.totalPrice, ...orderFormData })
    // Reset cart and form
    cart.items.forEach((item) =>
      cart.removeFromCart(item.id, item.selectedIngredients, item.selectedCutlery, item.selectedSize),
    )
    setOrderFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
    })
    setIsOrderModalVisible(false)
    // Redirect to a thank you page
    router.push("/order-success")
  }

  return (
    <Sheet open={true}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="flex justify-between items-center">
          <SheetTitle>Koszyk</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-grow mt-4">
          {cart.items.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">Twój koszyk jest pusty.</p>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex items-start justify-between border-b py-4">
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    {item.selectedSize && (
                      <p className="text-sm text-gray-500">
                        Rozmiar: {item.variants.find((v) => v.itemId === item.selectedSize)?.type || item.selectedSize}
                      </p>
                    )}
                    {Object.entries(item.selectedIngredients).map(([id, count]) => {
                      const ingredient = item.ingredientSelectionGroups
                        .flatMap((group) => group.ingredientSelections)
                        .find((selection) => selection.details.id === id)
                      if (ingredient && count > 0) {
                        return (
                          <p key={id} className="text-sm text-gray-500">
                            {ingredient.details.name}: {count}
                          </p>
                        )
                      }
                      return null
                    })}
                    {Object.entries(item.selectedCutlery).map(([id, count]) => {
                      const cutlery = item.cutlerySelection?.options.find((option) => option.details.id === id)
                      if (cutlery && count > 0) {
                        return (
                          <p key={id} className="text-sm text-gray-500">
                            {cutlery.details.name}: {count}
                          </p>
                        )
                      }
                      return null
                    })}
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        cart.updateQuantity(
                          item.id,
                          item.selectedIngredients,
                          item.selectedCutlery,
                          item.selectedSize,
                          item.quantity - 1,
                        )
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        cart.updateQuantity(
                          item.id,
                          item.selectedIngredients,
                          item.selectedCutlery,
                          item.selectedSize,
                          item.quantity + 1,
                        )
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 ml-2"
                      onClick={() =>
                        cart.removeFromCart(item.id, item.selectedIngredients, item.selectedCutlery, item.selectedSize)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 ml-2"
                      onClick={() => handleEditItem(item.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <span className="ml-4">{(item.price * item.quantity).toFixed(2)} zł</span>
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
            <Button className="w-full" onClick={() => setIsOrderModalVisible(true)}>
              Przejdź do zamówienia ({cart.totalItems})
            </Button>
          </div>
        )}
        {/* Order Modal */}
        {isOrderModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Podsumowanie zamówienia</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOrderModalVisible(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Zamówione produkty:</h3>
                {cart.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>{(item.price * item.quantity).toFixed(2)} zł</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center font-bold">
                    <span>Suma:</span>
                    <span>{cart.totalPrice.toFixed(2)} zł</span>
                  </div>
                </div>
              </div>
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Imię i nazwisko</Label>
                  <Input
                    id="name"
                    value={orderFormData.name}
                    onChange={(e) => setOrderFormData({ ...orderFormData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={orderFormData.email}
                    onChange={(e) => setOrderFormData({ ...orderFormData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={orderFormData.phone}
                    onChange={(e) => setOrderFormData({ ...orderFormData, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Adres dostawy</Label>
                  <Textarea
                    id="address"
                    value={orderFormData.address}
                    onChange={(e) => setOrderFormData({ ...orderFormData, address: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Uwagi do zamówienia</Label>
                  <Textarea
                    id="notes"
                    value={orderFormData.notes}
                    onChange={(e) => setOrderFormData({ ...orderFormData, notes: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setIsOrderModalVisible(false)}>
                    Anuluj
                  </Button>
                  <Button type="submit">Złóż zamówienie</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

