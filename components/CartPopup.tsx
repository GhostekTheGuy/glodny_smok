import type React from "react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Minus, Plus, Trash2 } from "lucide-react"

export function CartPopup({ children }: { children: React.ReactNode }) {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, goToCart } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
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
  )
}

