"use client";

import type React from "react";
import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Trash2,
  Pencil,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { CartProductDetails } from "@/components/CartProductDetails";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    products,
    meals,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();
  const [orderFormData, setOrderFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", { items, totalPrice, ...orderFormData });
    items.forEach((item) => removeFromCart(item.cartItemId));
    setOrderFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
    });
    router.push("/order-success");
  };

  const handleEditItem = (itemId: string) => {
    router.push(`/product/${itemId}?type=edit`);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/menu"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Powrót do menu
          </Link>
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                Twój koszyk jest pusty
              </h3>
              <p className="text-gray-500 mb-6">
                Dodaj produkty, aby rozpocząć zamówienie
              </p>
              <Button
                onClick={() => router.push("/menu")}
                className="bg-red-600 hover:bg-red-700"
              >
                Przejdź do menu
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link
          href="/menu"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Powrót do menu
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingBag className="h-6 w-6" />
                <h1 className="text-2xl font-semibold">
                  Twój koszyk ({totalItems})
                </h1>
              </div>

              <ScrollArea className="h-[calc(100vh-400px)]">
                <div className="space-y-6">
                  {products.map((product, idx) => (
                    <motion.div
                      key={`${product.cartItemId}-${idx}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white rounded-lg overflow-hidden shadow-sm border"
                    >
                      <div className="flex p-4">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={
                              product.photoUrl ||
                              "/placeholder.svg?height=96&width=96"
                            }
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-gray-900">
                              {product.name}
                            </h3>
                            <p className="font-medium text-gray-900">
                              {(product.price * product.quantity).toFixed(2)} zł
                            </p>
                          </div>

                          {/* {item.selectedSize && (
                            <p className="text-sm text-gray-500 mt-1">
                              Rozmiar:{" "}
                              {item.variants.find(
                                (v) => v.itemId === item.selectedSize
                              )?.type || item.selectedSize}
                            </p>
                          )} */}

                          <CartProductDetails
                            product={product}
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-full"
                            onClick={() =>
                              handleQuantityChange(
                                product.cartItemId,
                                product.quantity - 1
                              )
                            }
                            disabled={product.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center font-medium">
                            {product.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-full"
                            onClick={() =>
                              handleQuantityChange(
                                product.cartItemId,
                                product.quantity + 1
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2 text-gray-500 hover:text-gray-700"
                            onClick={() => handleEditItem(product.cartItemId)}
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            <span className="text-xs">Edytuj</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2 text-gray-500 hover:text-red-600"
                            onClick={() => removeFromCart(product.cartItemId)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            <span className="text-xs">Usuń</span>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">
                Podsumowanie zamówienia
              </h2>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Suma częściowa</span>
                  <span>{totalPrice.toFixed(2)} zł</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Dostawa</span>
                  <span>0.00 zł</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-lg">
                  <span>Razem</span>
                  <span>{totalPrice.toFixed(2)} zł</span>
                </div>
              </div>

              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Imię i nazwisko</Label>
                  <Input
                    id="name"
                    value={orderFormData.name}
                    onChange={(e) =>
                      setOrderFormData({
                        ...orderFormData,
                        name: e.target.value,
                      })
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={orderFormData.email}
                    onChange={(e) =>
                      setOrderFormData({
                        ...orderFormData,
                        email: e.target.value,
                      })
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={orderFormData.phone}
                    onChange={(e) =>
                      setOrderFormData({
                        ...orderFormData,
                        phone: e.target.value,
                      })
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Adres dostawy</Label>
                  <Textarea
                    id="address"
                    value={orderFormData.address}
                    onChange={(e) =>
                      setOrderFormData({
                        ...orderFormData,
                        address: e.target.value,
                      })
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Uwagi do zamówienia</Label>
                  <Textarea
                    id="notes"
                    value={orderFormData.notes}
                    onChange={(e) =>
                      setOrderFormData({
                        ...orderFormData,
                        notes: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Złóż zamówienie
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
