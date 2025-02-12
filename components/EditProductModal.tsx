import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Minus, Plus } from "lucide-react"
import type { CartItem } from "@/contexts/cart-context"

interface EditProductModalProps {
  item: CartItem
  onClose: () => void
  onSave: (updatedItem: CartItem) => void
}

export function EditProductModal({ item, onClose, onSave }: EditProductModalProps) {
  const [editedItem, setEditedItem] = useState<CartItem>({ ...item })

  const handleSizeChange = (size: string) => {
    const variant = item.variants.find((v) => v.type === size)
    if (variant) {
      setEditedItem((prev) => ({
        ...prev,
        selectedSize: size,
        price: variant.price,
      }))
    }
  }

  const handleIngredientChange = (ingredientId: string, count: number) => {
    setEditedItem((prev) => ({
      ...prev,
      selectedIngredients: {
        ...prev.selectedIngredients,
        [ingredientId]: count,
      },
    }))
  }

  const handleCutleryChange = (cutleryId: string, count: number) => {
    setEditedItem((prev) => ({
      ...prev,
      selectedCutlery: {
        ...prev.selectedCutlery,
        [cutleryId]: count,
      },
    }))
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edytuj produkt</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {item.variants.length > 0 && (
            <div className="grid gap-2">
              <Label htmlFor="size">Rozmiar</Label>
              <RadioGroup id="size" value={editedItem.selectedSize} onValueChange={handleSizeChange}>
                {item.variants.map((variant) => (
                  <div key={variant.itemId} className="flex items-center space-x-2">
                    <RadioGroupItem value={variant.type} id={variant.itemId} />
                    <Label htmlFor={variant.itemId}>
                      {variant.type} - {variant.price.toFixed(2)} zł
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
          <Accordion type="single" collapsible className="w-full">
            {item.ingredientSelectionGroups.map((group, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{group.name}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {group.ingredientSelections.map((selection, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{selection.details.name}</p>
                          <p className="text-sm text-gray-500">{selection.details.note}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleIngredientChange(
                                selection.details.id,
                                Math.max(0, (editedItem.selectedIngredients[selection.details.id] || 0) - 1),
                              )
                            }
                            disabled={(editedItem.selectedIngredients[selection.details.id] || 0) === 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span>{editedItem.selectedIngredients[selection.details.id] || 0}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleIngredientChange(
                                selection.details.id,
                                Math.min(
                                  selection.maxCount,
                                  (editedItem.selectedIngredients[selection.details.id] || 0) + 1,
                                ),
                              )
                            }
                            disabled={
                              (editedItem.selectedIngredients[selection.details.id] || 0) === selection.maxCount
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
            ))}
            {item.cutlerySelection && (
              <AccordionItem value="cutlery">
                <AccordionTrigger>Sztućce</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {item.cutlerySelection.options.map((option, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{option.details.name}</p>
                          <p className="text-sm text-gray-500">
                            {option.maxFreeCount} bezpłatnie
                            {option.details.price > 0 && `, następnie ${option.details.price.toFixed(2)} zł/szt`}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleCutleryChange(
                                option.details.id,
                                Math.max(0, (editedItem.selectedCutlery[option.details.id] || 0) - 1),
                              )
                            }
                            disabled={(editedItem.selectedCutlery[option.details.id] || 0) === 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span>{editedItem.selectedCutlery[option.details.id] || 0}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleCutleryChange(
                                option.details.id,
                                Math.min(option.maxCount, (editedItem.selectedCutlery[option.details.id] || 0) + 1),
                              )
                            }
                            disabled={(editedItem.selectedCutlery[option.details.id] || 0) === option.maxCount}
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
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Anuluj
          </Button>
          <Button type="button" onClick={() => onSave(editedItem)}>
            Zapisz zmiany
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

