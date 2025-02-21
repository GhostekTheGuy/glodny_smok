"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { menu } from "@/data/products"
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

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [selectedIngredients, setSelectedIngredients] = useState<Record<string, number>>({})
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedCutlery, setSelectedCutlery] = useState<Record<string, number>>({})
  const [isVisible, setIsVisible] = useState(false)
  const [buttonState, setButtonState] = useState<"neutral" | "success">("neutral")

  const product = menu.categories.flatMap((category) => category.products).find((p) => p.id === params.id) || null

  useEffect(() => {
    document.body.style.opacity = "1"
    document.body.style.transition = "opacity 0.5s"
    setIsVisible(true)

    if (product) {
      if (product.variants && product.variants.length > 0) {
        setSelectedSize(product.variants[0].itemId)
      }

      const initialIngredients: Record<string, number> = {}
      if (product.ingredientGroups) {
        product.ingredientGroups.forEach((group) => {
          group.ingredients.forEach((ingredient) => {
            initialIngredients[ingredient.id] = ingredient.default
          })
        })
      }

      if (product.ingredientSelectionGroups) {
        product.ingredientSelectionGroups.forEach((group) => {
          group.ingredientSelections.forEach((selection) => {
            initialIngredients[selection.details.id] = selection.defaultCount
          })
        })
      }

      setSelectedIngredients(initialIngredients)

      if (product.cutlerySelection) {
        const initialCutlery: Record<string, number> = {}
        product.cutlerySelection.options.forEach((option) => {
          initialCutlery[option.details.id] = option.maxFreeCount
        })
        setSelectedCutlery(initialCutlery)
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
    let total = product.price

    if (selectedSize) {
      const selectedVariant = product.variants?.find((v) => v.itemId === selectedSize)
      if (selectedVariant) {
        total = selectedVariant.price
      }
    }

    if (product.ingredientGroups) {
      product.ingredientGroups.forEach((group) => {
        group.ingredients.forEach((ingredient) => {
          const count = selectedIngredients[ingredient.id] || 0
          if (count > ingredient.default) {
            total += ingredient.price * (count - ingredient.default)
          }
        })
      })
    }

    if (product.ingredientSelectionGroups) {
      product.ingredientSelectionGroups.forEach((group) => {
        group.ingredientSelections.forEach((selection) => {
          const count = selectedIngredients[selection.details.id] || 0
          if (count > 0) {
            total += selection.details.bundles[0].price * count
          }
        })
      })
    }

    if (product.cutlerySelection) {
      Object.entries(selectedCutlery).forEach(([cutleryId, count]) => {
        const cutleryOption = product.cutlerySelection?.options.find((option) => option.details.id === cutleryId)
        if (cutleryOption) {
          const extraCutlery = Math.max(0, count - cutleryOption.maxFreeCount)
          total += cutleryOption.details.price * extraCutlery
        }
      })
    }

    return total
  }

  const handleAddToCart = async () => {
    if (buttonState !== "neutral" || product.oos) return

    const selectedVariant = product.variants.find((v) => v.itemId === selectedSize)
    const price = calculateTotalPrice()

    addToCart({
      ...product,
      price,
      selectedIngredients,
      selectedCutlery,
      selectedSize: selectedVariant?.type || "",
    })

    setButtonState("success")

    setTimeout(() => {
      setButtonState("neutral")
    }, 2000)
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <Breadcrumbs productName={product.name} />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-[calc(100vh-16rem)] md:h-[calc(100vh-12rem)]">
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
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-200">{product.description}</p>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col h-[calc(100vh-16rem)] md:h-[calc(100vh-12rem)]">
          <ScrollArea className="flex-grow">
            <div className="space-y-6 pr-4 rounded-lg">
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
                          {variant.type} - {variant.price.toFixed(2)} zł
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ) : (
                <p className="text-2xl font-bold bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                  {product.price.toFixed(2)} zł
                </p>
              )}

              {/* Main Accordion for Sections */}
              <Accordion type="multiple" className="space-y-4">
                {/* Ingredients Section */}
                {product.ingredientGroups && product.ingredientGroups.length > 0 && (
                  <AccordionItem value="ingredients" className="border border-gray-100 rounded-lg bg-gray-50/50">
                    <AccordionTrigger className="text-lg font-semibold px-4">Składniki</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-6">
                        {product.ingredientGroups.map((group, groupIndex) => (
                          <div key={groupIndex} className="space-y-4">
                            <h3 className="font-medium text-base border-b pb-2 text-gray-700">{group.name}</h3>
                            <div className="space-y-4">
                              {group.ingredients.map((ingredient) => (
                                <div
                                  key={ingredient.id}
                                  className="flex items-center justify-between p-2 hover:bg-white rounded-md transition-colors"
                                >
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-900">{ingredient.name}</p>
                                    <div className="flex items-center gap-2">
                                      <p className="text-sm text-gray-500">
                                        {ingredient.default} w cenie, dodatkowe: {ingredient.price.toFixed(2)} zł
                                      </p>
                                    </div>
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
                                        handleIngredientChange(
                                          ingredient.id,
                                          Math.min(ingredient.max, (selectedIngredients[ingredient.id] || 0) + 1),
                                        )
                                      }
                                      disabled={(selectedIngredients[ingredient.id] || 0) === ingredient.max}
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

                {/* Add-ons Section */}
                {product.ingredientSelectionGroups && product.ingredientSelectionGroups.length > 0 && (
                  <AccordionItem value="addons" className="border border-gray-100 rounded-lg bg-gray-50/50">
                    <AccordionTrigger className="text-lg font-semibold px-4">Dodatki</AccordionTrigger>
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
                                        {selection.details.bundles[0].price > 0 &&
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
                {product.cutlerySelection && (
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
            </div>
          </ScrollArea>

          <div className="flex-none pt-4 border-t mt-4 space-y-4 bg-white sticky bottom-0">
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
                  <AnimatedPrice price={calculateTotalPrice()} />
                  <span className="ml-1">zł</span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.button
              layout
              disabled={buttonState !== "neutral" || product.oos}
              onClick={handleAddToCart}
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
                {product.oos ? "Produkt niedostępny" : "Dodaj do koszyka"}
              </motion.span>
              <IconOverlay Icon={Check} visible={buttonState === "success"} text="Dodano do koszyka" />
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

