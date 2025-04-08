"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
  CreditCard,
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
import { PaymentMethodsModal } from "@/components/PaymentMethodsModal";
import { NNSdk } from "@/lib/sdk";
import { storeId } from "@/data/store-data";
import { SdkError, SdkErrorKey } from "@/jsrepo-blocks/errors";
import { useStore } from "@/contexts/storeContext";
import { ErrorModal } from "@/components/ErrorModal";
import { ErrorAlert } from "@/components/ErrorAlert";
import { Checkbox } from "@/components/ui/checkbox";

export default function CartPage() {
  //TODO: Move those to context
  const { store } = useStore();
  const minOrderValueForDelivery =
    store.storeSettings.deliverySettings.deliveryMinPriceOrder;
  const deliveryPrice = store.storeSettings.deliverySettings.deliveryPrice;
  const allowDelivery =
    store.storeSettings.allowDelivery && store.storeStatus.allowDelivery;
  const allowPickup =
    store.storeSettings.allowPickup && store.storeStatus.allowPickup;
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
    city: "",
    street: "",
    streetNumber: "",
    postcode: "",
    notes: "",
    privacyAccepted: false,
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState("pickup");
  const [addressError, setAddressError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<{ key: string; message: string } | null>(
    null
  );
  const [showAlert, setShowAlert] = useState(false);
  const [isFirstError, setIsFirstError] = useState(true);

  // Minimalna wartość zamówienia dla dostawy (w zł)
  const isDeliveryAvailable =
    totalPrice >= store.storeSettings.deliverySettings.deliveryMinPriceOrder &&
    allowDelivery;

  // Zmiana typu dostawy na odbiór osobisty jeśli wartość zamówienia jest poniżej minimum
  useEffect(() => {
    if (deliveryType === "delivery" && !isDeliveryAvailable) {
      setDeliveryType("pickup");
    }
  }, [totalPrice, isDeliveryAvailable]);

  // Konwersja ceny na grosze dla PayU
  // const amountInSmallestUnit = Math.round(totalPrice * 100);

  // Obliczenie kosztów dostawy
  const deliveryCost = deliveryType === "delivery" ? deliveryPrice : 0.0;
  // Całkowita kwota z dostawą
  const totalWithDelivery = totalPrice + deliveryCost;

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddressError(""); // Reset błędu przy każdym submicie
    setError(null); // Reset błędu przy każdym submicie
    setShowAlert(false); // Reset alertu przy każdym submicie

    if (isSubmitting) return;
    setIsSubmitting(true);

    // Sprawdź czy adres jest wymagany i podany
    if (
      deliveryType === "delivery" &&
      (!orderFormData.city ||
        !orderFormData.street ||
        !orderFormData.streetNumber)
    ) {
      setError({
        key: "MISSING_ADDRESS",
        message: "Proszę podać adres dostawy",
      });
      setIsSubmitting(false);
      return;
    }

    const formattedPhoneNumber = orderFormData.phone.trim().startsWith("+")
      ? orderFormData.phone.trim()
      : `+48${orderFormData.phone.trim()}`;

    try {
      const res = await NNSdk.placeOrder(
        storeId,
        {
          fullName: orderFormData.name,
          email: orderFormData.email,
          phoneNumber: formattedPhoneNumber,
        },
        selectedPaymentMethod.value,
        deliveryType.toLocaleUpperCase(),
        {
          city: orderFormData.city,
          streetName: orderFormData.street,
          streetNumber: orderFormData.streetNumber,
        }
      );
      const paymentUrl = res.data.paymentDetails?.paymentUrl;
      if (paymentUrl) {
        window.open(paymentUrl, "_blank");
      }
    } catch (error) {
      if (
        error instanceof SdkError &&
        error.key === SdkErrorKey.DELIVERY_OUT_OF_RANGE
      ) {
        setAddressError(
          "Ten adres znajduje się poza obszarem dostawy. Proszę wybrać inny adres lub opcję odbioru osobistego."
        );
      } else {
        setError({
          key: error.key || "UNKNOWN_ERROR",
          message: error.message || "Wystąpił nieoczekiwany błąd",
        });
      }
      return;
    } finally {
      setIsSubmitting(false);
    }
    router.push("/order-success");
    items.forEach((item) => removeFromCart(item.cartItemId));
    setOrderFormData({
      name: "",
      email: "",
      phone: "",
      city: "",
      street: "",
      streetNumber: "",
      postcode: "",
      notes: "",
      privacyAccepted: false,
    });
  };

  const handleEditItem = (itemId: string) => {
    router.push(`/product/${itemId}?type=edit`);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    // dodatkowe operacje po wybraniu metody płatności
  };

  const handleModalClose = () => {
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/#menu"
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
                onClick={() => router.push("/#menu")}
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
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingBag className="h-6 w-6" />
                <h1 className="text-2xl font-semibold">
                  Twój koszyk ({totalItems})
                </h1>
              </div>

              <ScrollArea className="flex-grow overflow-y-auto">
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
              <h2 className="text-lg font-semibold mb-4">Sposób dostawy</h2>
              <div className="flex flex-col space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="delivery"
                    name="deliveryType"
                    value="delivery"
                    checked={deliveryType === "delivery"}
                    onChange={() => setDeliveryType("delivery")}
                    disabled={!isDeliveryAvailable}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 disabled:opacity-50"
                  />
                  <label
                    htmlFor="delivery"
                    className={`font-medium ${
                      !isDeliveryAvailable ? "text-gray-400" : ""
                    }`}
                  >
                    Dostawa pod wskazany adres (+
                    {store.storeSettings.deliverySettings.deliveryPrice.toFixed(
                      2
                    )}{" "}
                    zł)
                    {!isDeliveryAvailable && allowDelivery && (
                      <span className="block text-sm text-red-500 mt-1">
                        Wymagana minimalna wartość zamówienia:{" "}
                        {store.storeSettings.deliverySettings.deliveryMinPriceOrder.toFixed(
                          2
                        )}{" "}
                        zł
                      </span>
                    )}
                    {!allowDelivery && (
                      <span className="block text-sm text-red-500 mt-1">
                        Dostawy są aktualnie wyłączone.
                      </span>
                    )}
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="pickup"
                    name="deliveryType"
                    value="pickup"
                    checked={deliveryType === "pickup" && allowPickup}
                    onChange={() => setDeliveryType("pickup")}
                    disabled={!allowPickup}
                    className="h-4 w-4 text-red-600 focus:ring-red-500"
                  />
                  <label
                    htmlFor="pickup"
                    className={`font-medium ${
                      !allowPickup ? "text-gray-400" : ""
                    }`}
                  >
                    Odbiór osobisty w restauracji (0.00 zł)
                    {!allowPickup && (
                      <span className="block text-sm text-red-500 mt-1">
                        Odbiór osobisty jest aktualnie niedostępny
                      </span>
                    )}
                  </label>
                </div>
              </div>

              {/* Adres dostawy - pokazuj tylko gdy wybrana jest dostawa */}
              {deliveryType === "delivery" && (
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Miasto"
                      value={orderFormData.city}
                      onChange={(e) =>
                        setOrderFormData({
                          ...orderFormData,
                          city: e.target.value,
                        })
                      }
                      className={`w-full p-2 border rounded ${
                        addressError ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Ulica"
                      value={orderFormData.street}
                      onChange={(e) =>
                        setOrderFormData({
                          ...orderFormData,
                          street: e.target.value,
                        })
                      }
                      className={`w-full p-2 border rounded ${
                        addressError ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Numer"
                      value={orderFormData.streetNumber}
                      onChange={(e) =>
                        setOrderFormData({
                          ...orderFormData,
                          streetNumber: e.target.value,
                        })
                      }
                      className={`w-full p-2 border rounded ${
                        addressError ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Kod pocztowy"
                      value={orderFormData.postcode}
                      onChange={(e) =>
                        setOrderFormData({
                          ...orderFormData,
                          postcode: e.target.value,
                        })
                      }
                      className={`w-full p-2 border rounded ${
                        addressError ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>

                  {addressError && (
                    <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                      <p>{addressError}</p>
                      <p className="mt-1">
                        Możesz:
                        <ul className="list-disc list-inside ml-2">
                          <li>Wprowadzić inny adres dostawy</li>
                          <li>Wybrać opcję odbioru osobistego</li>
                        </ul>
                      </p>
                    </div>
                  )}
                </div>
              )}

              <h2 className="text-lg font-semibold mb-4">
                Podsumowanie zamówienia
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Suma częściowa</span>
                  <span className="text-gray-900">
                    {totalPrice.toFixed(2)} zł
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Dostawa</span>
                  <span className="text-gray-900">
                    {deliveryCost.toFixed(2)} zł
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-lg">
                  <span className="text-gray-900">Razem</span>
                  <span className="text-gray-900">
                    {totalWithDelivery.toFixed(2)} zł
                  </span>
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
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Metoda płatności</h3>

                  {selectedPaymentMethod ? (
                    <div className="flex items-center justify-between border rounded-lg p-4 mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 relative flex-shrink-0">
                          <Image
                            src={selectedPaymentMethod.brandImageUrl}
                            alt={selectedPaymentMethod.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">
                            {selectedPaymentMethod.name}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsPaymentModalOpen(true)}
                      >
                        Zmień
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 py-6"
                      onClick={() => setIsPaymentModalOpen(true)}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Wybierz metodę płatności</span>
                    </Button>
                  )}
                </div>
                <div className="mt-4 flex items-start gap-2">
                  <Checkbox
                    id="privacy"
                    checked={orderFormData.privacyAccepted}
                    onCheckedChange={(checked) =>
                      setOrderFormData({
                        ...orderFormData,
                        privacyAccepted: checked as boolean,
                      })
                    }
                    className="mt-1"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    Zapoznałem się z{" "}
                    <Link href="/polityka-prywatnosci" className="text-red-600 hover:underline" target="_blank">
                      polityką prywatności
                    </Link>{" "}
                    i{" "}
                    <Link href="/regulamin" className="text-red-600 hover:underline" target="_blank">
                      regulaminem
                    </Link>{" "}
                    oraz akceptuję ich warunki.
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
                  disabled={
                    isSubmitting ||
                    !selectedPaymentMethod ||
                    !orderFormData.privacyAccepted ||
                    (deliveryType === "delivery" &&
                      (!orderFormData.city ||
                        !orderFormData.street ||
                        !orderFormData.streetNumber ||
                        !orderFormData.postcode))
                  }
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Przetwarzanie...
                    </span>
                  ) : (
                    "Złóż zamówienie"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        <PaymentMethodsModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onMethodSelect={handlePaymentMethodSelect}
        />
        <ErrorModal
          isOpen={!!error}
          onClose={handleModalClose}
          error={error}
        />
        <ErrorAlert
          error={showAlert ? error : null}
          onClose={handleAlertClose}
        />
      </div>
    </div>
  );
}
