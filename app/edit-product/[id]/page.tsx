"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import menu from "@/data/scheme"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { ShoppingCart, Check, Plus, Minus } from "lucide-react"
import { CartPopup } from "@/components/CartPopup"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Variant, CutleryOption } from "@/data/interfaces"

function AnimatedPrice({ price }: { price: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => latest.toFixed(2))

  useEffect(() => {
    const animation = animate(count, price, {
      duration: 0.3,
      ease: "easeOut",
    })

    return animation.stop
  }, [price, count])

  return <motion.span>{rounded}</motion.span>
}

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const { items, updateCartItem } = useCart()
  const [selectedIngredients, setSelectedIngredients] = useState<Record<string, number>>({})
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedCutlery, setSelectedCutlery] = useState<Record<string, number>>({})
  const [isVisible, setIsVisible] = useState(false)
  const [buttonState, setButtonState] = useState<"neutral" | "success">("neutral")

  const cartItemId = Array.isArray(params.id) ? params.id[0] : params.id
  const cartItem = items.find((item) => item.id === cartItemId)
  const product = cartItem || menu[0].products.find((p) => p.id === cartItemId) || null

  useEffect(() => {
    document.body.style.opacity = "1"
    document.body.style.transition = "opacity 0.5s"
    setIsVisible(true)

    if (product) {
      setSelectedIngredients(product.selectedIngredients || {})
      setSelectedSize(
        product.selectedSize || (product.variants && product.variants.length > 0 ? product.variants[0].itemId : ""),
      )
      setSelectedCutlery(product.selectedCutlery || {})

      // Initialize default ingredients
      if (product.defaultIngredients) {
        const initialIngredients: Record<string, number> = {}
        product.defaultIngredients.forEach((ingredient) => {
          initialIngredients[ingredient.id] = ingredient.quantity
        })
        setSelectedIngredients((prev) => ({ ...prev, ...initialIngredients }))
      }
    }
  }, [product])

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>
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
    let total = product?.price || 0

    if (selectedSize && product?.variants) {
      const selectedVariant = product.variants.find((v) => v.itemId === selectedSize)
      if (selectedVariant && typeof selectedVariant.price === "number") {
        total = selectedVariant.price
      }
    }

    if (product?.defaultIngredients) {
      product.defaultIngredients.forEach((ingredient) => {
        const count = selectedIngredients[ingredient.id] || 0
        if (count !== ingredient.quantity) {
          // Assume a fixed price for ingredient changes (you may want to adjust this logic)
          total += (count - ingredient.quantity) * 2 // 2 zł per unit change
        }
      })
    }

    if (product?.ingredientSelectionGroups) {
      product.ingredientSelectionGroups.forEach((group) => {
        group.ingredientSelections.forEach((selection) => {
          const count = selectedIngredients[selection.details.id] || 0
          if (count > 0 && selection.details.bundles && selection.details.bundles.length > 0) {
            const price = selection.details.bundles[0].price
            if (typeof price === "number") {
              total += price * count
            }
          }
        })
      })
    }

    if (product?.cutlerySelection) {
      Object.entries(selectedCutlery).forEach(([cutleryId, count]) => {
        const cutleryOption = product.cutlerySelection?.options.find((option) => option.details.id === cutleryId)
        if (cutleryOption && typeof cutleryOption.details.price === "number") {
          const extraCutlery = Math.max(0, count - (cutleryOption.maxFreeCount || 0))
          total += cutleryOption.details.price * extraCutlery
        }
      })
    }

    return total
  }

  const handleUpdateCart = async () => {
    if (buttonState !== "neutral" || product.oos) return

    const selectedVariant = product.variants?.find((v) => v.itemId === selectedSize)
    const price = calculateTotalPrice()

    updateCartItem({
      ...product,
      price,
      selectedIngredients,
      selectedCutlery,
      selectedSize: selectedVariant?.type || "",
    })

    setButtonState("success")

    setTimeout(() => {
      setButtonState("neutral")
      router.push("/cart")
    }, 2000)
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
        <div className="relative flex flex-col min-h-[calc(60vh-8rem)] md:h-[calc(100vh-12rem)]">
          <ScrollArea className="flex-1 mb-[200px] md:mb-[180px]">
            <div className="space-y-6 pr-4 rounded-lg pb-4">
              {/* Product Variants Section */}
              {product.variants && product.variants.length > 0 ? (
                <div className="bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4">Wybierz wersję:</h3>
                  <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                    {product.variants.map((variant: Variant) => (
                      <div
                        key={variant.itemId}
                        className="flex items-center space-x-2 p-2 hover:bg-white rounded-md transition-colors"
                      >
                        <RadioGroupItem value={variant.itemId} id={variant.itemId} />
                        <Label htmlFor={variant.itemId} className="flex-1">
                          {variant.type} - {typeof variant.price === "number" ? variant.price.toFixed(2) : "0.00"} zł
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ) : (
                <p className="text-2xl font-bold bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                  {typeof product.price === "number" ? product.price.toFixed(2) : "0.00"} zł
                </p>
              )}

              {/* Main Accordion for Sections */}
              <Accordion type="multiple" className="space-y-4">
                {/* Default Ingredients Section */}
                {product.defaultIngredients && product.defaultIngredients.length > 0 && (
                  <AccordionItem
                    value="default-ingredients"
                    className="border border-gray-100 rounded-lg bg-gray-50/50"
                  >
                    <AccordionTrigger className="text-lg font-semibold px-4">Składniki podstawowe</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-4">
                        {product.defaultIngredients.map((ingredient) => (
                          <div
                            key={ingredient.id}
                            className="flex items-center justify-between p-2 hover:bg-white rounded-md transition-colors"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{ingredient.name}</p>
                              <p className="text-sm text-gray-500">
                                Domyślnie: {ingredient.quantity} {ingredient.unit}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleIngredientChange(
                                    ingredient.id,
                                    Math.max(0, (selectedIngredients[ingredient.id] || 0) - 1),
                                  )
                                }
                                disabled={(selectedIngredients[ingredient.id] || 0) === 0}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span>{selectedIngredients[ingredient.id] || 0}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleIngredientChange(ingredient.id, (selectedIngredients[ingredient.id] || 0) + 1)
                                }
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

                {/* Additional Ingredients Section */}
                {product.ingredientSelectionGroups && product.ingredientSelectionGroups.length > 0 && (
                  <AccordionItem
                    value="additional-ingredients"
                    className="border border-gray-100 rounded-lg bg-gray-50/50"
                  >
                    <AccordionTrigger className="text-lg font-semibold px-4">Dodatkowe składniki</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-6">
                        {product.ingredientSelectionGroups.map((group, groupIndex) => (
                          <div key={groupIndex} className="space-y-4">
                            <h3 className="font-medium text-base border-b pb-2 text-gray-700">{group.name}</h3>
                            <div className="space-y-4">
                              {group.ingredientSelections.map((selection, selectionIndex) => (
                                <div
                                  key={selectionIndex}
                                  className="flex items-center justify-between p-2 hover:bg-white rounded-md transition-colors"
                                >
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-900">{selection.details.name}</p>
                                    <div className="flex items-center gap-2">
                                      <p className="text-sm text-gray-500">
                                        {selection.details.note}
                                        {selection.details.bundles[0] &&
                                          typeof selection.details.bundles[0].price === "number" &&
                                          selection.details.bundles[0].price > 0 &&
                                          ` - ${selection.details.bundles[0].price.toFixed(2)} zł`}
                                      </p>
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
                                          Math.min(
                                            selection.maxCount,
                                            (selectedIngredients[selection.details.id] || 0) + 1,
                                          ),
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
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {/* Cutlery Section */}
                {product.cutlerySelection && product.cutlerySelection.options.length > 0 && (
                  <AccordionItem value="cutlery" className="border border-gray-100 rounded-lg bg-gray-50/50">
                    <AccordionTrigger className="text-lg font-semibold px-4">Sztućce</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-4">
                        {product.cutlerySelection.options.map((option: CutleryOption, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 hover:bg-white rounded-md transition-colors"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{option.details.name}</p>
                              <div className="flex items-center gap-2">
                                <p className="text-sm text-gray-500">
                                  {option.maxFreeCount} bezpłatnie
                                  {typeof option.details.price === "number" &&
                                    option.details.price > 0 &&
                                    `, następnie ${option.details.price.toFixed(2)} zł/szt`}
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
            </div>
          </ScrollArea>

          <div className="fixed left-0 right-0 bottom-0 md:absolute bg-white border-t pt-4 px-4 md:px-0 pb-4 space-y-4">
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
                  <AnimatedPrice price={calculateTotalPrice() || 0} />
                  <span className="ml-1">zł</span>
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
              <IconOverlay Icon={Check} visible={buttonState === "success"} text="Zaktualizowano koszyk" />
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

const IconOverlay = ({ Icon, visible, spin = false, text = "" }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            y: -12,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: 12,
            opacity: 0,
          }}
          className="absolute inset-0 grid place-content-center"
        >
          <div className="flex items-center gap-2">
            <Icon className={`text-xl duration-300 ${spin ? "animate-spin" : ""}`} />
            {text && <span className="text-sm">{text}</span>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

