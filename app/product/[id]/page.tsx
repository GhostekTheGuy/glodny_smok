"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { products } from "@/data/products"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { ShoppingCart, Check } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Minus, Plus, Trash2 } from "lucide-react"

const ingredientCategories = [
  {
    name: "Sosy",
    items: ["Sos słodko-kwaśny", "Sos ostry", "Sos czosnkowy", "Sos sojowy"],
  },
  {
    name: "Napoje",
    items: ["Cola", "Sprite", "Fanta", "Woda"],
  },
  {
    name: "Surówki",
    items: ["Surówka z kapusty", "Surówka z marchewki", "Mix sałat", "Kimchi"],
  },
  {
    name: "Dodatki",
    items: ["Frytki", "Ryż", "Makaron", "Warzywa na parze"],
  },
]

export default function ProductPage() {
  const params = useParams()
  const { addToCart, items, removeFromCart, updateQuantity, totalItems, totalPrice, goToCart } = useCart()
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [buttonState, setButtonState] = useState<"neutral" | "success">("neutral")

  const product = products.find((p) => p.id.toString() === params.id)

  useEffect(() => {
    document.body.style.opacity = "1"
    document.body.style.transition = "opacity 0.5s"
    setIsVisible(true)
  }, [])

  if (!product) {
    return <div>Product not found</div>
  }

  const handleIngredientToggle = (ingredient: string) => {
    setSelectedIngredients((current) =>
      current.includes(ingredient) ? current.filter((i) => i !== ingredient) : [...current, ingredient],
    )
  }

  const handleAddToCart = async () => {
    if (buttonState !== "neutral") return

    addToCart(product, selectedIngredients)
    setSelectedIngredients([])
    setButtonState("success")

    setTimeout(() => {
      setButtonState("neutral")
    }, 2000)
  }

  const buttonClassNames = buttonState === "neutral" ? "bg-black hover:bg-gray-800" : "bg-green-500"

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <Breadcrumbs productName={product.name} />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg object-cover w-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-6">{product.price.toFixed(2)} zł</p>

          <Accordion type="single" collapsible className="w-full mb-6">
            {ingredientCategories.map((category, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{category.name}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {category.items.map((ingredient, idx) => (
                      <div className="flex items-center space-x-2" key={idx}>
                        <Checkbox
                          id={`ingredient-${index}-${idx}`}
                          checked={selectedIngredients.includes(ingredient)}
                          onCheckedChange={() => handleIngredientToggle(ingredient)}
                        />
                        <label
                          htmlFor={`ingredient-${index}-${idx}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {ingredient}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="space-y-4">
            <motion.button
              disabled={buttonState !== "neutral"}
              onClick={handleAddToCart}
              className={`relative w-full rounded-md px-4 py-2 font-medium text-white transition-all ${buttonClassNames}`}
            >
              <motion.span
                animate={{
                  y: buttonState === "neutral" ? 0 : 6,
                  opacity: buttonState === "neutral" ? 1 : 0,
                }}
                className="inline-block"
              >
                Dodaj do koszyka
              </motion.span>
              <IconOverlay Icon={Check} visible={buttonState === "success"} text="Dodano do koszyka" />
            </motion.button>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 text-base font-medium">
                  <ShoppingCart className="w-5 h-5" />
                  Przejdź do koszyka
                  {totalItems > 0 && (
                    <span className="ml-2 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Koszyk</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
                  {items.length === 0 ? (
                    <p className="text-center text-muted-foreground py-6">Koszyk jest pusty</p>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                          <div className="flex-1 space-y-1">
                            <h4 className="font-medium">{item.name}</h4>
                            {item.selectedIngredients.length > 0 && (
                              <p className="text-sm text-muted-foreground">{item.selectedIngredients.join(", ")}</p>
                            )}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.selectedIngredients, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.selectedIngredients, item.quantity + 1)}
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
                              onClick={() => removeFromCart(item.id, item.selectedIngredients)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
                    <Button className="w-full" onClick={goToCart}>
                      Zamów ({totalItems})
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
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

