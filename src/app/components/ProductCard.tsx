'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react'
import { useCart } from '../contexts/cart-context'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface ProductCardProps {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  isBestseller?: boolean
}

const SAMPLE_INGREDIENTS = [
  "Sos słodko-kwaśny",
  "Sos ostry",
  "Warzywa",
  "Ryż",
  "Sezam",
  "Szczypiorek"
]

export function ProductCard({ 
  id, 
  name, 
  description, 
  price, 
  image, 
  category,
  isBestseller = false 
}: ProductCardProps) {
  const { addToCart } = useCart()
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])

  const handleIngredientToggle = (ingredient: string) => {
    setSelectedIngredients(current =>
      current.includes(ingredient)
        ? current.filter(i => i !== ingredient)
        : [...current, ingredient]
    )
  }

  return (
  <motion.div 
    layout
    className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow duration-200 h-full flex flex-col"
  >
    <div className="relative flex-grow">
      {isBestseller && (
        <div className="absolute top-2 left-2 bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded">
          BESTSELLER
        </div>
      )}
      <motion.div layout className="relative aspect-square w-full mb-4">
        <div className="absolute inset-0 border-2 border-dashed border-gray-200 rounded-lg">
          <Image 
            src={image || "/placeholder.svg"} 
            alt={name} 
            fill
            className="rounded-lg object-cover p-1" 
          />
        </div>
      </motion.div>
      <motion.div layout className="space-y-2">
        <motion.h3 layout className="font-bold text-gray-900">{name}</motion.h3>
        <motion.p layout className="text-sm text-gray-500">{description}</motion.p>
        <motion.div layout className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-gray-900">
            {price.toFixed(2)} zł
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="pt-4 space-y-4 border-t">
            <div className="space-y-2">
              {SAMPLE_INGREDIENTS.map((ingredient) => (
                <div key={ingredient} className="flex items-center space-x-2">
                  <Checkbox
                    id={`ingredient-${id}-${ingredient}`}
                    checked={selectedIngredients.includes(ingredient)}
                    onCheckedChange={() => handleIngredientToggle(ingredient)}
                  />
                  <label
                    htmlFor={`ingredient-${id}-${ingredient}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {ingredient}
                  </label>
                </div>
              ))}
            </div>
            <Button
              className="w-full"
              onClick={() => {
                addToCart({ id, name, price }, selectedIngredients)
                setIsExpanded(false)
                setSelectedIngredients([])
              }}
            >
              Dodaj do koszyka
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)
}

