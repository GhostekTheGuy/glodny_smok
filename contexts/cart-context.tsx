"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import menu from "@/data/scheme";

import { NNSdk } from "@/lib/sdk";
import { CartItemSubItem } from "@/types/interfaces";

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
  selectedCutlery: CartItemCutlery[];
  crossSaleItems: CartItemSubItem[];
  // oos: boolean;
  type?: "PRODUCT" | "MEAL";
}

export interface CartItemCutlery {
  id: string;
  defaultCount: number;
  name: string;
  price: number;
  count: number;
}
export interface CartProduct extends CartItem {
  productId: string;
  selectedIngredients: CartItemSubItem[];
}
export interface CartMeal extends CartItem {
  mealId: string;
  products: CartProduct[];
}

interface CartContextType {
  items: CartItem[];
  products: CartProduct[];
  meals: CartMeal[];
  addProductToCart: (product: CartProduct) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
  goToCart: () => void;
  updateCartItem: (itemId: string, updatedItem: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [meals, setMeals] = useState<CartMeal[]>([]);

  useEffect(() => {
    const storedProducts = NNSdk.getProductsFromCart();
    const storedMeals = NNSdk.getMealsFromCart();
    const allItems = NNSdk.getItemsFromCart();
    if (storedProducts) setProducts(storedProducts);
    if (storedMeals) setMeals(storedMeals);
    if (allItems) setItems(allItems);
  }, []);

  const addProductToCart = useCallback((product: CartProduct) => {
    NNSdk.addProductToCart(product);
    setProducts(NNSdk.getProductsFromCart());
  }, []);

  // const addMealToCart = useCallback((meal: CartMeal) => {
  //   NNSdk.addMealToCart(meal);
  //   setMeals(NNSdk.getMealsFromCart());
  // }, []);

  const removeFromCart = useCallback((id: string) => {
    NNSdk.removeItemFromCart(id);
    setItems(NNSdk.getItemsFromCart());
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    NNSdk.updateItemQuantity(id, quantity);
    setItems(NNSdk.getItemsFromCart());
  }, []);

  useEffect(() => {
    setProducts(
      items.filter((item): item is CartProduct => item.type === "PRODUCT")
    );
    setMeals(items.filter((item): item is CartMeal => item.type === "MEAL"));
  }, [items]);

  const updateCartItem = useCallback(
    (itemId: string, updatedItem: CartItem) => {
      setItems(NNSdk.updateItemInCart(itemId, updatedItem));
    },
    []
  );
  const calculateTotalPrice = (items: { price: number; quantity: number }[]) =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalItems = products.length + meals.length;
  const productPrice = calculateTotalPrice(products);
  const mealsPrice = calculateTotalPrice(meals);
  const totalPrice = productPrice + mealsPrice;

  const goToCart = useCallback(() => {
    window.location.href = "/cart";
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        products,
        meals,
        addProductToCart,
        removeFromCart,
        updateQuantity,
        updateCartItem,
        totalItems,
        totalPrice,
        goToCart,
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
