"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, Pencil, Plus, Minus, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartItemDetails } from "./CartItemDetails"

export function CartPopup({
  children,
  onItemAdded,
  isMenuPage = false,
}: {
  children: React.ReactNode
  onItemAdded?: () => void
  isMenuPage?: boolean
}) {
  const router = useRouter()
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [, forceUpdate] = useState({})

  useEffect(() => {
    forceUpdate({})
    if (onItemAdded) {
      onItemAdded()
    }
  }, [onItemAdded])

  const handleEditItem = (itemId: number) => {
    setIsOpen(false)
    router.push(`/edit-product/${itemId}`)
  }

  const handleQuantityChange = (
    itemId: number,
    selectedIngredients: Record<string, number>,
    selectedCutlery: Record<string, number>,
    selectedSize: string,
    newQuantity: number,
  ) => {
    updateQuantity(itemId, selectedIngredients, selectedCutlery, selectedSize, newQuantity)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l-0 sm:border-l">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <ShoppingBag className="h-6 w-6" />
                Twój koszyk
              </h2>
              <p className="text-white/80 text-sm mt-1">
                {totalItems === 0
                  ? "Twój koszyk jest pusty"
                  : `${totalItems} ${totalItems === 1 ? "produkt" : "produkty"} w koszyku`}
              </p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-grow px-6">
          <div className="py-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                  <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Twój koszyk jest pusty</h3>
                <p className="text-gray-500 mb-6">Dodaj produkty, aby rozpocząć zamówienie</p>
                <Button
                  onClick={() => {
                    setIsOpen(false)
                    router.push("/menu")
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Przejdź do menu
                </Button>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                <div className="space-y-6">
                  {items.map((item, idx) => (
                    <motion.div
                      key={`${item.id}-${idx}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white rounded-lg overflow-hidden shadow-sm border"
                    >
                      <div className="flex p-4">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.photoUrl || "/placeholder.svg?height=80&width=80"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <p className="font-medium text-gray-900">{(item.price * item.quantity).toFixed(2)} zł</p>
                          </div>

                          {item.selectedSize && (
                            <p className="text-sm text-gray-500 mt-1">
                              Rozmiar:{" "}
                              {item.variants.find((v) => v.itemId === item.selectedSize)?.type || item.selectedSize}
                            </p>
                          )}

                          <CartItemDetails item={item} className="mt-2" />
                        </div>
                      </div>

                      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-full"
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                item.selectedIngredients,
                                item.selectedCutlery,
                                item.selectedSize,
                                item.quantity - 1,
                              )
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center font-medium text-gray-900">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-full"
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                item.selectedIngredients,
                                item.selectedCutlery,
                                item.selectedSize,
                                item.quantity + 1,
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2 text-gray-500 hover:text-gray-700"
                            onClick={() => handleEditItem(item.id)}
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            <span className="text-xs">Edytuj</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2 text-gray-500 hover:text-red-600"
                            onClick={() =>
                              removeFromCart(item.id, item.selectedIngredients, item.selectedCutlery, item.selectedSize)
                            }
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            <span className="text-xs">Usuń</span>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>
        </ScrollArea>

        {items.length > 0 && (
          <div className="border-t p-6 space-y-4 bg-gray-50">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Suma częściowa</span>
                <span className="text-gray-900">{totalPrice.toFixed(2)} zł</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Dostawa</span>
                <span className="text-gray-900">0.00 zł</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium text-lg">
                <span className="text-gray-900">Razem</span>
                <span className="text-gray-900">{totalPrice.toFixed(2)} zł</span>
              </div>
            </div>

            <div className="flex flex-col space-y-2 w-full">
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  setIsOpen(false)
                  router.push("/cart")
                }}
              >
                Przejdź do kasy
              </Button>
              <Button
                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800"
                onClick={() => {
                  setIsOpen(false)
                  router.push(isMenuPage ? "/" : "/menu")
                }}
              >
                {isMenuPage ? "Powrót do strony głównej" : "Kontynuuj zakupy"}
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

