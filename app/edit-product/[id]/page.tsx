"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { menu } from "@/data/products"
import Image from "next/image"
import { Plus, Minus } from "lucide-react"
import type { Product, Variant, CutleryOption, IngredientSelection } from "@/data/products"
import { CartPopup } from "@/components/CartPopup"

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const { items, updateCartItem } = useCart()
  const [selectedIngredients, setSelectedIngredients] = useState<Record<string, number>>({})
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedCutlery, setSelectedCutlery] = useState<Record<string, number>>({})
  const [quantity, setQuantity] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const cartItemId = Array.isArray(params.id) ? params.id[0] : params.id
  const cartItem = items.find((item) => item.id.toString() === cartItemId)

  let product = cartItem

  if (!product) {
    product = menu.categories.flatMap((category) => category.products).find((p) => p.id === cartItemId) as
      | Product
      | undefined
  }

  useEffect(() => {
    if (product) {
      setSelectedIngredients(product.selectedIngredients || {})
      setSelectedSize(product.selectedSize || (product.variants.length > 0 ? product.variants[0].itemId : ""))
      setSelectedCutlery(product.selectedCutlery || {})
      setQuantity(product.quantity || 1)
    }
  }, [product])

  if (!product) {
    return <div>Product not found</div>
  }

  const handleIngredientChange = (ingredientId: string, count: number) => {
    setSelectedIngredients((prev) => ({
      ...prev,
      [ingredientId]: count,
    }))
  }

  const handleCutleryChange = (cutleryId: string, count: number) => {
    setSelectedCutlery((prev) => ({
      ...prev,
      [cutleryId]: count,
    }))
  }

  const calculateTotalPrice = () => {
    let total = product.price

    if (selectedSize) {
      const selectedVariant = product.variants.find((v) => v.itemId === selectedSize)
      if (selectedVariant) {
        total = selectedVariant.price
      }
    }

    Object.entries(selectedIngredients).forEach(([ingredientId, count]) => {
      const ingredient = product.ingredientSelectionGroups
        .flatMap((group) => group.ingredientSelections)
        .find((selection) => selection.details.id === ingredientId)

      if (ingredient) {
        const bundle = ingredient.details.bundles[0]
        total += bundle.price * count
      }
    })

    Object.entries(selectedCutlery).forEach(([cutleryId, count]) => {
      const cutleryOption = product.cutlerySelection?.options.find((option) => option.details.id === cutleryId)
      if (cutleryOption) {
        const extraCutlery = Math.max(0, count - cutleryOption.maxFreeCount)
        total += cutleryOption.details.price * extraCutlery
      }
    })

    return total * quantity
  }

  const handleUpdateCart = () => {
    const updatedItem = {
      ...product,
      selectedIngredients,
      selectedCutlery,
      selectedSize: product.variants.find((v) => v.itemId === selectedSize)?.type || selectedSize,
      quantity,
      price: calculateTotalPrice() / quantity,
    }
    updateCartItem(updatedItem)
    setIsCartOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs productName={product.name} />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.photoUrl || "/placeholder.svg"}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg object-cover w-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          {product.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Wybierz wersję:</h3>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                {product.variants.map((variant: Variant) => (
                  <div key={variant.itemId} className="flex items-center space-x-2">
                    <RadioGroupItem value={variant.itemId} id={variant.itemId} />
                    <Label htmlFor={variant.itemId}>
                      {variant.type} - {variant.price.toFixed(2)} zł
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          <Accordion type="single" collapsible className="w-full mb-6">
            {product.ingredientSelectionGroups.map((group, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{group.name}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {group.ingredientSelections.map((selection: IngredientSelection, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{selection.details.name}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-500">{selection.details.note}</p>
                            <span className="text-sm font-medium text-red-600">
                              {selection.details.bundles[0].price > 0
                                ? `${selection.details.bundles[0].price.toFixed(2)} zł`
                                : "Gratis"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleIngredientChange(
                                selection.details.id,
                                Math.max(0, (selectedIngredients[selection.details.id] || 0) - 1),
                              )
                            }
                            disabled={(selectedIngredients[selection.details.id] || 0) === 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span>{selectedIngredients[selection.details.id] || 0}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleIngredientChange(
                                selection.details.id,
                                Math.min(selection.maxCount, (selectedIngredients[selection.details.id] || 0) + 1),
                              )
                            }
                            disabled={(selectedIngredients[selection.details.id] || 0) === selection.maxCount}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}

            {product.cutlerySelection && (
              <AccordionItem value="cutlery">
                <AccordionTrigger>Sztućce</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {product.cutlerySelection.options.map((option: CutleryOption, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{option.details.name}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-500">
                              {option.maxFreeCount} bezpłatnie
                              {option.details.price > 0 && `, następnie ${option.details.price.toFixed(2)} zł/szt`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleCutleryChange(
                                option.details.id,
                                Math.max(0, (selectedCutlery[option.details.id] || 0) - 1),
                              )
                            }
                            disabled={(selectedCutlery[option.details.id] || 0) === 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span>{selectedCutlery[option.details.id] || 0}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleCutleryChange(
                                option.details.id,
                                Math.min(option.maxCount, (selectedCutlery[option.details.id] || 0) + 1),
                              )
                            }
                            disabled={(selectedCutlery[option.details.id] || 0) === option.maxCount}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>

          <div className="flex items-center space-x-4 mb-6">
            <span className="font-medium">Ilość:</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity === 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span>{quantity}</span>
            <Button size="sm" variant="outline" onClick={() => setQuantity(quantity + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-2xl font-bold mb-6">Cena całkowita: {calculateTotalPrice().toFixed(2)} zł</div>

          <CartPopup onItemAdded={() => setIsCartOpen(true)}>
            <Button onClick={handleUpdateCart} className="w-full">
              Aktualizuj koszyk
            </Button>
          </CartPopup>
        </div>
      </div>
    </div>
  )
}

