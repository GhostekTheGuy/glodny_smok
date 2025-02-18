"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Minus, Plus, Trash2, X, Pencil } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function CartPopup({
  children,
  onItemAdded,
  isMenuPage = false,
}: { children: React.ReactNode; onItemAdded?: () => void; isMenuPage?: boolean }) {
  const router = useRouter()
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, editCartItem } = useCart()
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false)
  const [orderFormData, setOrderFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })
  const [, forceUpdate] = useState({})

  useEffect(() => {
    // Force re-render when items change
    forceUpdate({})
    if (onItemAdded) {
      onItemAdded()
    }
  }, [onItemAdded])

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the order data to your backend
    console.log("Order submitted:", { items, totalPrice, ...orderFormData })
    // Reset cart and form
    items.forEach((item) => removeFromCart(item.id, item.selectedIngredients, item.selectedCutlery, item.selectedSize))
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

  const handleEditItem = (itemId: number) => {
    router.push(`/edit-product/${itemId}`)
  }

  return (
    <Sheet onOpenChange={(open) => !open && isMenuPage && router.push("/")}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Koszyk</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-grow mt-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">Koszyk jest pusty</p>
          ) : (
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Image
                    src={item.photoUrl || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                    loading="lazy"
                  />
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium">{item.name}</h4>
                    {item.selectedSize && (
                      <p className="text-sm text-muted-foreground">
                        Wersja: {item.variants.find((v) => v.itemId === item.selectedSize)?.type || item.selectedSize}
                      </p>
                    )}
                    {Object.entries(item.selectedIngredients).map(([id, count]) => {
                      const ingredient = item.ingredientSelectionGroups
                        .flatMap((group) => group.ingredientSelections)
                        .find((selection) => selection.details.id === id)
                      if (ingredient && count > 0) {
                        return (
                          <p key={id} className="text-sm text-muted-foreground">
                            {ingredient.details.name}: {count}
                          </p>
                        )
                      }
                      return null
                    })}
                    {item.customizedIngredients &&
                      Object.entries(item.customizedIngredients).map(([id, included]) => {
                        const ingredient = item.customizableIngredients?.find((i) => i.id === id)
                        if (ingredient) {
                          return (
                            <p key={id} className="text-sm text-muted-foreground">
                              {ingredient.name}: {included ? "Tak" : "Nie"}
                            </p>
                          )
                        }
                        return null
                      })}
                    {Object.entries(item.selectedCutlery).map(([id, count]) => {
                      const cutlery = item.cutlerySelection?.options.find((option) => option.details.id === id)
                      if (cutlery && count > 0) {
                        return (
                          <p key={id} className="text-sm text-muted-foreground">
                            {cutlery.details.name}: {count}
                          </p>
                        )
                      }
                      return null
                    })}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(
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
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(
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
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-medium">{(item.price * item.quantity).toFixed(2)} zł</p>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          removeFromCart(item.id, item.selectedIngredients, item.selectedCutlery, item.selectedSize)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditItem(item.id)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {items.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Razem:</span>
              <span className="font-medium">{totalPrice.toFixed(2)} zł</span>
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={() => setIsOrderModalVisible(true)}
              >
                Złóż zamówienie ({totalItems})
              </Button>
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white"
                onClick={() => (isMenuPage ? router.push("/") : router.push("/menu"))}
              >
                {isMenuPage ? "Powrót do strony głównej" : "Powrót do Menu"}
              </Button>
            </div>
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
                {items.map((item, index) => (
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
                    <span>{totalPrice.toFixed(2)} zł</span>
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

