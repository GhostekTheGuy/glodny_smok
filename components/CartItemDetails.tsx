"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import type { CartItem } from "@/contexts/cart-context"

interface CartItemDetailsProps {
  item: CartItem
  className?: string
}

export function CartItemDetails({ item, className = "" }: CartItemDetailsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const hasDetails =
    (Object.entries(item.selectedIngredients).length > 0 && item.ingredientSelectionGroups) ||
    (Object.entries(item.selectedCutlery).length > 0 && item.cutlerySelection) ||
    (item.crossSaleItems && Object.values(item.crossSaleItems).some((count) => count > 0))

  if (!hasDetails) return null

  return (
    <div className={className}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between hover:bg-gray-100 p-2 h-auto"
      >
        <span className="text-xs text-gray-600">Szczegóły zamówienia</span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 px-2 py-3 bg-gray-50 rounded-md text-sm">
              {/* Ingredients */}
              {Object.entries(item.selectedIngredients).length > 0 && item.ingredientSelectionGroups && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Składniki:</p>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(item.selectedIngredients).map(([id, count]) => {
                      const ingredient = item.ingredientSelectionGroups
                        ?.flatMap((group) => group.ingredientSelections)
                        .find((selection) => selection.details.id === id)

                      if (ingredient && count > 0) {
                        return (
                          <Badge key={id} variant="outline" className="text-xs">
                            {ingredient.details.name} x{count}
                          </Badge>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              )}

              {/* Cutlery */}
              {Object.entries(item.selectedCutlery).length > 0 && item.cutlerySelection && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Sztućce:</p>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(item.selectedCutlery).map(([id, count]) => {
                      const cutlery = item.cutlerySelection?.options.find((option) => option.details.id === id)

                      if (cutlery && count > 0) {
                        return (
                          <Badge key={id} variant="outline" className="text-xs">
                            {cutlery.details.name} x{count}
                          </Badge>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              )}

              {/* Cross-sale items */}
              {item.crossSaleItems &&
                Object.values(item.crossSaleItems).some((count) => count > 0) &&
                item.crossSaleGroups && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Dodatki:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.crossSaleGroups.map((group) =>
                        group.items.map((crossSaleItem) => {
                          const count = item.crossSaleItems?.[crossSaleItem.id] || 0
                          if (count > 0) {
                            return (
                              <Badge key={crossSaleItem.id} variant="outline" className="text-xs">
                                {crossSaleItem.name} x{count}
                              </Badge>
                            )
                          }
                          return null
                        }),
                      )}
                    </div>
                  </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

