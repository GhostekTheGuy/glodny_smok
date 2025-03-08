"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import type { CartItem, CartMeal, CartProduct } from "@/contexts/cart-context";

interface CartItemDetailsProps {
  product: CartProduct;
  className?: string;
}

export function CartProductDetails({
  product,
  className = "",
}: CartItemDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasDetails =
    Object.entries(product.selectedIngredients).length > 0 ||
    Object.entries(product.selectedCutlery).length > 0 ||
    (product.crossSaleItems &&
      Object.values(product.crossSaleItems).some((CSI) => CSI.count > 0));

  if (!hasDetails) return null;

  return (
    <div className={className}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between hover:bg-gray-100 p-2 h-auto"
      >
        <span className="text-xs text-gray-600">Szczegóły zamówienia</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
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
              {product.selectedIngredients &&
                Object.values(product.selectedIngredients).some(
                  (ingredient) => ingredient.count > 0
                ) && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      Składniki:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {product.selectedIngredients.map((ingredient) => {
                        if (ingredient && ingredient.count > 0) {
                          return (
                            <Badge
                              key={ingredient.id}
                              variant="outline"
                              className="text-xs"
                            >
                              {ingredient.name} x{ingredient.count}
                            </Badge>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                )}

              {/* Cutlery */}
              {product.selectedCutlery &&
                Object.values(product.selectedCutlery).some(
                  (cutlery) => cutlery.count > 0
                ) && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      Sztućce:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {product.selectedCutlery.map((cutlery) => {
                        if (cutlery && cutlery.count > 0) {
                          return (
                            <Badge
                              key={cutlery.id}
                              variant="outline"
                              className="text-xs"
                            >
                              {cutlery.name} x{cutlery.count}
                            </Badge>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                )}

              {/* Cross-sale items */}
              {product.crossSaleItems &&
                Object.values(product.crossSaleItems).some(
                  (CSI) => CSI.count > 0
                ) && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      Dodatki:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {product.crossSaleItems.map((crossSaleItem) => {
                        const count = crossSaleItem.count || 0;
                        if (count > 0) {
                          return (
                            <Badge
                              key={crossSaleItem.id}
                              variant="outline"
                              className="text-xs"
                            >
                              {crossSaleItem.name} x{count}
                            </Badge>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
