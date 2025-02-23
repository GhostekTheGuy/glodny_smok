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
import type { Variant } from "@/data/interfaces"

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
  const [selectedCrossSaleItems, setSelectedCrossSaleItems] = useState<Record<string, number>>({})
  const [isVisible, setIsVisible] = useState(false)
  const [buttonState, setButtonState] = useState<"neutral" | "success">("neutral")
  const [selectedBundles, setSelectedBundles] = useState<Record<string, number>>({})

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

      // Initialize cross-sale items
      if (product.crossSaleGroups) {
        const initialCrossSale: Record<string, number> = {}
        product.crossSaleGroups.forEach((group) => {
          group.items.forEach((item) => {
            initialCrossSale[item.item.id] = 0
          })
        })
        setSelectedCrossSaleItems(initialCrossSale)
      }
    }
  }, [product])

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>
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
    let total = product.price

    // Add variant price if selected
    if (selectedSize && product.variants) {
      const selectedVariant = product.variants.find((v) => v.itemId === selectedSize)
      if (selectedVariant?.price) {
        total = selectedVariant.price
      }
    }

    // Add ingredient prices with bundle support
    if (product.ingredientSelectionGroups) {
      product.ingredientSelectionGroups.forEach((group) => {
        group.ingredientSelections.forEach((selection) => {
          const count = selectedIngredients[selection.details.id] || 0
          if (count > 0 && selection.details.bundles) {
            const bundleIndex = selectedBundles[selection.details.id] || 0
            const bundle = selection.details.bundles[bundleIndex]
            if (bundle) {
              total += count * bundle.price
            }
          }
        })
      })
    }

    // Add cutlery prices
    if (product.cutlerySelection) {
      product.cutlerySelection.options.forEach((option) => {
        const count = selectedCutlery[option.details.id] || 0
        const extraCount = Math.max(0, count - option.maxFreeCount)
        if (extraCount > 0) {
          total += extraCount * option.details.price
        }
      })
    }

    // Add cross-sale items prices
    if (product.crossSaleGroups) {
      product.crossSaleGroups.forEach((group) => {
        group.items.forEach((item) => {
          const count = selectedCrossSaleItems[item.item.id] || 0
          total += count * item.price
        })
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
      selectedSize: selectedVariant?.name || "",
      crossSaleItems: selectedCrossSaleItems,
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
              <Accordion type="multiple" className="space-y-4">
                {[
                  ...(product.variants && product.variants.length > 0 ? [{ type: "variants" }] : []),
                  ...(product.ingredientSelectionGroups?.map((group, index) => ({
                    type: "ingredients",
                    index,
                  })) || []),
                  ...(product.cutlerySelection ? [{ type: "cutlery" }] : []),
                  ...(product.crossSaleGroups?.map((group, index) => ({
                    type: "crossSale",
                    index,
                  })) || []),
                ].map((section, index) => (
                  <motion.div
                    key={`${section.type}-${section.index || 0}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {section.type === "variants" && product.variants && product.variants.length > 0 && (
                      <AccordionItem value="variants" className="border border-gray-100 rounded-lg bg-gray-50/50">
                        <AccordionTrigger className="px-4">Wybierz wersję</AccordionTrigger>
                        <AccordionContent className="px-4">
                          <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                            {product.variants.map((variant: Variant) => (
                              <div
                                key={variant.itemId}
                                className="flex items-center space-x-2 p-2 hover:bg-white rounded-md transition-colors"
                              >
                                <RadioGroupItem value={variant.itemId} id={variant.itemId} />
                                <Label htmlFor={variant.itemId} className="flex-1">
                                  {variant.name}
                                  {variant.price && ` - ${variant.price.toFixed(2)} zł`}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </AccordionContent>
                      </AccordionItem>
                    )}

                    {section.type === "ingredients" &&
                      product.ingredientSelectionGroups &&
                      product.ingredientSelectionGroups[section.index]?.ingredientSelections?.length > 0 && (
                        <AccordionItem
                          key={section.index}
                          value={`ingredient-group-${section.index}`}
                          className="border border-gray-100 rounded-lg bg-gray-50/50"
                        >
                          <AccordionTrigger className="px-4">
                            {product.ingredientSelectionGroups[section.index].name}
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            <div className="space-y-4">
                              {product.ingredientSelectionGroups[section.index].ingredientSelections.map(
                                (selection, selectionIndex) => (
                                  <div
                                    key={selectionIndex}
                                    className="flex items-center justify-between p-2 hover:bg-white rounded-md transition-colors"
                                  >
                                    <div className="flex-1">
                                      <p className="font-medium">{selection.details.name}</p>
                                      <p className="text-sm text-gray-500">{selection.details.note}</p>
                                      {selection.details.bundles && selection.details.bundles.length > 1 ? (
                                        <div className="mt-2 space-y-2">
                                          <p className="text-sm font-medium text-gray-700">Wybierz porcję:</p>
                                          <RadioGroup
                                            value={String(selectedBundles[selection.details.id] || 0)}
                                            onValueChange={(value) =>
                                              setSelectedBundles((prev) => ({
                                                ...prev,
                                                [selection.details.id]: Number.parseInt(value),
                                              }))
                                            }
                                          >
                                            {selection.details.bundles.map((bundle, bundleIndex) => (
                                              <div
                                                key={bundleIndex}
                                                className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md"
                                              >
                                                <RadioGroupItem
                                                  value={String(bundleIndex)}
                                                  id={`${selection.details.id}-${bundleIndex}`}
                                                />
                                                <Label
                                                  htmlFor={`${selection.details.id}-${bundleIndex}`}
                                                  className="flex-1"
                                                >
                                                  {bundle.note} ({bundle.value} {selection.details.uom}) -{" "}
                                                  {bundle.price.toFixed(2)} zł
                                                </Label>
                                              </div>
                                            ))}
                                          </RadioGroup>
                                        </div>
                                      ) : (
                                        <p className="text-sm text-gray-500">
                                          {selection.details.bundles?.[0]?.price > 0 &&
                                            `${selection.details.bundles[0].price.toFixed(2)} zł za porcję`}
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
                                          <span className="text-xs text-gray-500 block">
                                            ({selection.defaultCount})
                                          </span>
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
                                        disabled={
                                          (selectedIngredients[selection.details.id] || 0) >= selection.maxCount
                                        }
                                      >
                                        <Plus className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )}

                    {section.type === "cutlery" && product.cutlerySelection && (
                      <AccordionItem value="cutlery" className="border border-gray-100 rounded-lg bg-gray-50/50">
                        <AccordionTrigger className="px-4">Sztućce</AccordionTrigger>
                        <AccordionContent className="px-4">
                          <div className="space-y-4">
                            {product.cutlerySelection.options.map((option, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 hover:bg-white rounded-md transition-colors"
                              >
                                <div className="flex-1">
                                  <p className="font-medium">{option.details.name}</p>
                                  <p className="text-sm text-gray-500">
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

                    {section.type === "crossSale" &&
                      product.crossSaleGroups &&
                      product.crossSaleGroups[section.index]?.items?.length > 0 && (
                        <AccordionItem
                          key={section.index}
                          value={`cross-sale-${section.index}`}
                          className="border border-gray-100 rounded-lg bg-gray-50/50"
                        >
                          <AccordionTrigger className="px-4">
                            {product.crossSaleGroups[section.index].name}
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            <div className="space-y-4">
                              {product.crossSaleGroups[section.index].items.map((item, itemIndex) => (
                                <div
                                  key={itemIndex}
                                  className="flex items-center justify-between p-2 hover:bg-white rounded-md transition-colors"
                                >
                                  <div className="flex-1">
                                    <p className="font-medium">{item.item.name}</p>
                                    <p className="text-sm text-gray-500">
                                      {item.item.description}
                                      {item.price > 0 && ` - ${item.price.toFixed(2)} zł`}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleCrossSaleChange(
                                          item.item.id,
                                          (selectedCrossSaleItems[item.item.id] || 0) - 1,
                                          product.crossSaleGroups[section.index].maxCount,
                                        )
                                      }
                                      disabled={(selectedCrossSaleItems[item.item.id] || 0) <= 0}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-8 text-center">{selectedCrossSaleItems[item.item.id] || 0}</span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleCrossSaleChange(
                                          item.item.id,
                                          (selectedCrossSaleItems[item.item.id] || 0) + 1,
                                          product.crossSaleGroups[section.index].maxCount,
                                        )
                                      }
                                      disabled={
                                        (selectedCrossSaleItems[item.item.id] || 0) >=
                                        product.crossSaleGroups[section.index].maxCount
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
                  </motion.div>
                ))}
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

