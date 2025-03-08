"use client";

import type React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import menu from "@/data/scheme";
import { CartItemSubItem } from "@/types/menu";

interface IngredientSelectionGroup {
  name: string;
  ingredients: { name: string; price: number }[];
}

interface CutlerySelection {
  [key: string]: number;
}

interface Ingredient {
  name: string;
  price: number;
}

//TODO: Change CartItem structure into CartProduct. CartMeal should be a combination of CartProducts?
export interface CartItem {
  cartItemId?: string;
  name: string;
  price: number;
  basePrice: number;
  quantity: number;
  photoUrl: string;
  selectedCutlery?: CartItemSubItem[];
  crossSaleItems?: CartItemSubItem[];
  // oos: boolean;
  type?: "PRODUCT" | "MEAL";
}
export interface CartProduct extends CartItem {
  productId: string;
  selectedIngredients?: CartItemSubItem[];
}
export interface CartMeal extends CartItem {
  mealId: string;
  products: CartProduct[];
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (
    id: number,
    selectedIngredients: Record<string, number>,
    selectedCutlery: Record<string, number>,
    selectedSize: string
  ) => void;
  updateQuantity: (
    id: number,
    selectedIngredients: Record<string, number>,
    selectedCutlery: Record<string, number>,
    selectedSize: string,
    quantity: number
  ) => void;
  totalItems: number;
  totalPrice: number;
  goToCart: () => void;
  editCartItem: (updatedItem: CartItem) => void;
  addOrUpdateCartItem: (updatedItem: CartItem) => void;
  updateCartItem: (updatedItem: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const areItemsEqual = (item1: CartItem, item2: CartItem) => {
  return (
    item1.id === item2.id &&
    item1.selectedSize === item2.selectedSize &&
    JSON.stringify(item1.selectedIngredients) ===
      JSON.stringify(item2.selectedIngredients) &&
    JSON.stringify(item1.selectedCutlery) ===
      JSON.stringify(item2.selectedCutlery) &&
    JSON.stringify(item1.crossSaleItems) ===
      JSON.stringify(item2.crossSaleItems)
  );
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: CartItem) => {
    if (product.oos) {
      console.warn(
        "Próba dodania niedostępnego produktu do koszyka:",
        product.name
      );
      return;
    }

    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex((item) =>
        areItemsEqual(item, product)
      );

      if (existingItemIndex > -1) {
        return currentItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback(
    (
      id: number,
      selectedIngredients: Record<string, number>,
      selectedCutlery: Record<string, number>,
      selectedSize: string
    ) => {
      setItems((currentItems) =>
        currentItems.filter(
          (item) =>
            !areItemsEqual(item, {
              ...item,
              id,
              selectedIngredients,
              selectedCutlery,
              selectedSize,
            })
        )
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (
      id: number,
      selectedIngredients: Record<string, number>,
      selectedCutlery: Record<string, number>,
      selectedSize: string,
      quantity: number
    ) => {
      setItems((currentItems) =>
        currentItems
          .map((item) =>
            areItemsEqual(item, {
              ...item,
              id,
              selectedIngredients,
              selectedCutlery,
              selectedSize,
            })
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    },
    []
  );

  const addOrUpdateCartItem = useCallback((updatedItem: CartItem) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex((item) =>
        areItemsEqual(item, updatedItem)
      );

      if (existingItemIndex > -1) {
        return currentItems.map((item, index) =>
          index === existingItemIndex
            ? { ...updatedItem, quantity: updatedItem.quantity }
            : item
        );
      }

      return [...currentItems, updatedItem];
    });
  }, []);

  const editCartItem = useCallback((updatedItem: CartItem) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        areItemsEqual(item, updatedItem) ? updatedItem : item
      )
    );
  }, []);

  const updateCartItem = useCallback((updatedItem: CartItem) => {
    setItems((currentItems) => {
      // Find the old item to get its quantity
      const oldItem = currentItems.find((item) => item.id === updatedItem.id);
      const quantity = oldItem?.quantity || 1;

      // Filter out the old version of this specific item
      const filteredItems = currentItems.filter(
        (item) => !areItemsEqual(item, oldItem)
      );

      // Get the original product from menu data
      const originalProduct = menu[0].products.find(
        (p) => p.id === updatedItem.id
      );
      if (!originalProduct) return currentItems;

      // Calculate the total price
      let basePrice = originalProduct.price;

      // Update base price if variant is selected
      if (updatedItem.selectedSize && originalProduct.variants) {
        const selectedVariant = originalProduct.variants.find(
          (v) => v.itemId === updatedItem.selectedSize
        );
        if (selectedVariant?.price) {
          basePrice = selectedVariant.price;
        }
      }

      // Add ingredient prices
      let additionalCost = 0;
      if (originalProduct.ingredientSelectionGroups) {
        originalProduct.ingredientSelectionGroups.forEach((group) => {
          group.ingredientSelections.forEach((selection) => {
            const count =
              updatedItem.selectedIngredients[selection.details.id] || 0;
            additionalCost += count * selection.details.price;
          });
        });
      }

      // Add cutlery costs (only for items exceeding free count)
      if (originalProduct.cutlerySelection) {
        originalProduct.cutlerySelection.options.forEach((option) => {
          const count = updatedItem.selectedCutlery[option.details.id] || 0;
          const extraCount = Math.max(0, count - option.maxFreeCount);
          if (extraCount > 0) {
            additionalCost += extraCount * option.details.price;
          }
        });
      }

      // Add cross-sale item costs
      if (originalProduct.crossSaleGroups) {
        originalProduct.crossSaleGroups.forEach((group) => {
          group.items.forEach((item) => {
            const count = updatedItem.crossSaleItems?.[item.id] || 0;
            if (count > 0) {
              additionalCost += count * item.price;
            }
          });
        });
      }

      // Add the new item with updated configuration
      return [
        ...filteredItems,
        {
          ...updatedItem,
          basePrice: basePrice,
          price: basePrice + additionalCost,
          quantity: quantity,
        },
      ];
    });
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const goToCart = useCallback(() => {
    window.location.href = "/cart";
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
        goToCart,
        editCartItem,
        addOrUpdateCartItem,
        updateCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
