"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import menu from "@/data/scheme"
import { motion, AnimatePresence } from "framer-motion"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { ShoppingCart, Check, Plus, Minus } from "lucide-react"
import { CartPopup } from "@/components/CartPopup"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const { items, updateCartItem } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedIngredients, setSelectedIngredients] = useState<Record<string, number>>({})
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedCutlery, setSelectedCutlery] = useState<Record<string, number>>({})
  const [selectedCrossSaleItems, setSelectedCrossSaleItems] = useState<Record<string, number>>({})
  const [isVisible, setIsVisible] = useState(false)
  const [buttonState, setButtonState] = useState<"neutral" | "success" | "error">("neutral")

  const cartItem = items.find((item) => item.id === params.id)
  const product = cartItem || menu[0].products.find((p) => p.id === params.id) || null

  useEffect(() => {
    const initializeProduct = async () => {
      try {
        setIsLoading(true)
        if (!product) {
          toast({
            title: "Błąd",
            description: "Nie znaleziono produktu",
            variant: "destructive",
          })
          router.push("/cart")
          return
        }

        // Initialize with cart item data if available
        if (cartItem) {
          setSelectedIngredients(cartItem.selectedIngredients || {})
          setSelectedSize(cartItem.selectedSize || "")
          setSelectedCutlery(cartItem.selectedCutlery || {})
          setSelectedCrossSaleItems(cartItem.crossSaleItems || {})
        } else {
          // Initialize variants
          if (product.variants && product.variants.length > 0) {
            setSelectedSize(product.variants[0].itemId)
          }

          // Initialize ingredient selections
          if (product.ingredientSelectionGroups) {
            const initialIngredients: Record<string, number> = {}
            product.ingredientSelectionGroups.forEach((group) => {
              group.ingredientSelections.forEach((selection) => {
                initialIngredients[selection.details.id] = selection.defaultCount
              })
            })
            setSelectedIngredients(initialIngredients)
          }

          // Initialize cutlery
          if (product.cutlerySelection) {
            const initialCutlery: Record<string, number> = {}
            product.cutlerySelection.options.forEach((option) => {
              initialCutlery[option.details.id] = option.maxFreeCount
            })
            setSelectedCutlery(initialCutlery)
          }

          // Initialize cross-sale items
          if (product.crossSaleGroups) {
            const initialCrossSale: Record<string, number> = {}
            product.crossSaleGroups.forEach((group) => {
              group.items.forEach((item) => {
                initialCrossSale[item.id] = 0
              })
            })
            setSelectedCrossSaleItems(initialCrossSale)
          }
        }

        setIsVisible(true)
        setIsLoading(false)
      } catch (error) {
        console.error("Error initializing product:", error)
        toast({
          title: "Błąd",
          description: "Wystąpił problem podczas ładowania produktu",
          variant: "destructive",
        })
      }
    }

    initializeProduct()
  }, [product, cartItem, router, toast])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>Nie znaleziono produktu</AlertDescription>
        </Alert>
      </div>
    )
  }

  const handleIngredientChange = (ingredientId: string, count: number, maxCount: number) => {
    setSelectedIngredients((prev) => ({
      ...prev,
      [ingredientId]: Math.min(Math.max(0, count), maxCount),
    }))
  }

  const handleCutleryChange = (cutleryId: string, count: number, maxCount: number) => {
    setSelectedCutlery((prev) => ({
      ...prev,
      [cutleryId]: Math.min(Math.max(0, count), maxCount),
    }))
  }

  const handleCrossSaleChange = (itemId: string, count: number, maxCount: number) => {
    setSelectedCrossSaleItems((prev) => ({
      ...prev,
      [itemId]: Math.min(Math.max(0, count), maxCount),
    }))
  }

  const calculateTotalPrice = () => {
    // Get base price from variant or original product
    let total =
      selectedSize && product.variants
        ? product.variants.find((v) => v.itemId === selectedSize)?.price || product.price
        : product.price

    // Add ingredient prices (only for additional portions above default)
    if (product.ingredientSelectionGroups) {
      product.ingredientSelectionGroups.forEach((group) => {
        group.ingredientSelections.forEach((selection) => {
          const count = selectedIngredients[selection.details.id] || 0
          const defaultCount = selection.defaultCount || 0
          if (count > defaultCount) {
            total += (count - defaultCount) * selection.details.price
          }
        })
      })
    }

    // Rest of the function remains the same...
    if (product.cutlerySelection) {
      product.cutlerySelection.options.forEach((option) => {
        const count = selectedCutlery[option.details.id] || 0
        const extraCount = Math.max(0, count - option.maxFreeCount)
        if (extraCount > 0) {
          total += extraCount * option.details.price
        }
      })
    }

    if (product.crossSaleGroups) {
      product.crossSaleGroups.forEach((group) => {
        group.items.forEach((item) => {
          const count = selectedCrossSaleItems[item.id] || 0
          total += count * item.price
        })
      })
    }

    return total
  }

  const handleUpdateCart = async () => {
    try {
      if (buttonState !== "neutral" || product.oos) return

      const selectedVariant = product.variants?.find((v) => v.itemId === selectedSize)
      const basePrice = selectedVariant?.price || product.price
      const totalPrice = calculateTotalPrice()

      updateCartItem({
        ...product,
        price: totalPrice,
        basePrice, // Add base price to maintain original price
        selectedIngredients,
        selectedCutlery,
        selectedSize: selectedVariant?.type || "",
        crossSaleItems: selectedCrossSaleItems,
        quantity: cartItem?.quantity || 1,
      })

      setButtonState("success")
      toast({
        title: "Sukces",
        description: "Produkt został zaktualizowany",
      })

      setTimeout(() => {
        setButtonState("neutral")
        router.push("/cart")
      }, 1000)
    } catch (error) {
      console.error("Error updating cart:", error)
      setButtonState("error")
      toast({
        title: "Błąd",
        description: "Nie udało się zaktualizować produktu",
        variant: "destructive",
      })
      setTimeout(() => setButtonState("neutral"), 2000)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-[400px] w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8 min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <Breadcrumbs productName={product.name} />
      <div className="grid md:grid-cols-2 gap-8 flex-1">
        {/* Product Image Section */}
        <div className="relative h-[calc(40vh)] md:h-[calc(100vh-12rem)]">
          <div className="relative w-full h-full">
            <Image
              src={product.photoUrl || "/placeholder.svg"}
              alt={product.name}
              fill
              className="rounded-lg object-cover"
              loading="lazy"
              placeholder="blur"
              blurDataURL="/placeholder-blur.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-sm md:text-base text-gray-200">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Options Section */}
        <div className="relative flex flex-col min-h-[calc(60vh-8rem)] md:h-[calc(100vh-12rem)]">
          <ScrollArea className="flex-grow mt-4">
            <div className="space-y-6 pr-4 rounded-lg pb-4">
              <Accordion type="multiple" className="space-y-4">
                {/* Variants */}
                {product.variants && product.variants.length > 0 && (
                  <AccordionItem value="variants" className="border rounded-lg">
                    <AccordionTrigger className="px-4">Wybierz rozmiar</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                        <div className="space-y-2">
                          {product.variants.map((variant) => (
                            <div
                              key={variant.itemId}
                              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50"
                            >
                              <RadioGroupItem value={variant.itemId} id={variant.itemId} />
                              <Label htmlFor={variant.itemId} className="flex-1">
                                {variant.type}
                                {variant.price && (
                                  <span className="text-gray-600 ml-2">{variant.price.toFixed(2)} zł</span>
                                )}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {/* Ingredients */}
                {product.ingredientSelectionGroups?.map((group, groupIndex) => (
                  <AccordionItem key={groupIndex} value={`ingredients-${groupIndex}`} className="border rounded-lg">
                    <AccordionTrigger className="px-4">{group.name}</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-4">
                        {group.ingredientSelections.map((selection, selectionIndex) => (
                          <div
                            key={selectionIndex}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex-1">
                              <p className="font-medium">{selection.details.name}</p>
                              {selection.details.price > 0 && (
                                <p className="text-sm text-gray-600">
                                  {selection.details.price.toFixed(2)} zł za dodatkową porcję
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleIngredientChange(
                                    selection.details.id,
                                    (selectedIngredients[selection.details.id] || 0) - 1,
                                    selection.maxCount,
                                  )
                                }
                                disabled={(selectedIngredients[selection.details.id] || 0) <= 0}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">
                                {selectedIngredients[selection.details.id] || 0}
                                {selection.defaultCount > 0 && (
                                  <span className="text-xs text-gray-500 block">({selection.defaultCount})</span>
                                )}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleIngredientChange(
                                    selection.details.id,
                                    (selectedIngredients[selection.details.id] || 0) + 1,
                                    selection.maxCount,
                                  )
                                }
                                disabled={(selectedIngredients[selection.details.id] || 0) >= selection.maxCount}
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

                {/* Cutlery */}
                {product.cutlerySelection && (
                  <AccordionItem value="cutlery" className="border rounded-lg">
                    <AccordionTrigger className="px-4">Sztućce</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-4">
                        {product.cutlerySelection.options.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex-1">
                              <p className="font-medium">{option.details.name}</p>
                              <p className="text-sm text-gray-600">
                                {option.maxFreeCount > 0 && `${option.maxFreeCount} szt. gratis, `}
                                {option.details.price > 0 &&
                                  `${option.details.price.toFixed(2)} zł za dodatkową sztukę`}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleCutleryChange(
                                    option.details.id,
                                    (selectedCutlery[option.details.id] || 0) - 1,
                                    option.maxCount,
                                  )
                                }
                                disabled={(selectedCutlery[option.details.id] || 0) <= 0}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">
                                {selectedCutlery[option.details.id] || 0}
                                {option.maxFreeCount > 0 && (
                                  <span className="text-xs text-gray-500 block">({option.maxFreeCount})</span>
                                )}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleCutleryChange(
                                    option.details.id,
                                    (selectedCutlery[option.details.id] || 0) + 1,
                                    option.maxCount,
                                  )
                                }
                                disabled={(selectedCutlery[option.details.id] || 0) >= option.maxCount}
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

                {/* Cross-sale */}
                {product.crossSaleGroups?.map((group, groupIndex) => (
                  <AccordionItem key={groupIndex} value={`cross-sale-${groupIndex}`} className="border rounded-lg">
                    <AccordionTrigger className="px-4">{group.name}</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-4">
                        {group.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600">
                                {item.description}
                                {item.price > 0 && ` - ${item.price.toFixed(2)} zł`}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleCrossSaleChange(
                                    item.id,
                                    (selectedCrossSaleItems[item.id] || 0) - 1,
                                    group.maxCount,
                                  )
                                }
                                disabled={(selectedCrossSaleItems[item.id] || 0) <= 0}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{selectedCrossSaleItems[item.id] || 0}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleCrossSaleChange(
                                    item.id,
                                    (selectedCrossSaleItems[item.id] || 0) + 1,
                                    group.maxCount,
                                  )
                                }
                                disabled={(selectedCrossSaleItems[item.id] || 0) >= group.maxCount}
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
              </Accordion>
            </div>
          </ScrollArea>

          {/* Bottom Bar */}
          <div className="mt-auto border-t pt-4 space-y-4">
            <motion.div layout className="text-2xl font-bold flex items-center gap-2 text-gray-900">
              <span>Cena całkowita:</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={calculateTotalPrice()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center"
                >
                  <span>{calculateTotalPrice().toFixed(2)} zł</span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.button
              layout
              disabled={buttonState !== "neutral" || product.oos}
              onClick={handleUpdateCart}
              className={`relative w-full rounded-md px-4 py-2 font-medium text-white transition-all ${
                product.oos
                  ? "bg-gray-400 cursor-not-allowed"
                  : buttonState === "neutral"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-500"
              }`}
            >
              <motion.span
                animate={{
                  y: buttonState === "neutral" ? 0 : 6,
                  opacity: buttonState === "neutral" ? 1 : 0,
                }}
                className="inline-block"
              >
                {product.oos ? "Produkt niedostępny" : "Aktualizuj koszyk"}
              </motion.span>
              <AnimatePresence>
                {buttonState !== "neutral" && (
                  <motion.div
                    initial={{ y: -12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 12, opacity: 0 }}
                    className="absolute inset-0 grid place-content-center"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">
                        {buttonState === "success" ? "Zaktualizowano koszyk" : "Błąd aktualizacji"}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <CartPopup>
              <Button
                className="w-full bg-gray-500 hover:bg-gray-600 text-white flex items-center justify-center gap-2 text-base font-medium"
                disabled={product.oos}
              >
                <ShoppingCart className="w-5 h-5" />
                Przejdź do koszyka
              </Button>
            </CartPopup>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

