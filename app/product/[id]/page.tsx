"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CartItemCutlery, useCart } from "@/contexts/cart-context";
import { menu } from "@/data/menu-data";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShoppingCart, Check, Plus, Minus } from "lucide-react";
import { CartPopup } from "@/components/CartPopup";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NNSdk } from "@/lib/sdk";
import {
  CartItemSubItem,
  CartSelectedIngredients,
  CrossSaleItem,
  IngredientSelectionOption,
} from "@/types/interfaces";
import {
  CutleryOption,
  CutlerySelectionOption,
  Product,
} from "@/types/interfaces";
import { defaultConfig } from "next/dist/server/config-shared";

interface SelectedBundle {
  ingredientId: string;
  bundleIndex: number;
}

function AnimatedPrice({ price }: { price: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(2));
  useEffect(() => {
    const animation = animate(count, price, {
      duration: 0.3,
      ease: "easeOut",
    });
    return animation.stop;
  }, [price, count]);

  return <motion.span>{rounded}</motion.span>;
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const { addProductToCart, updateCartItem } = useCart();
  const [selectedIngredients, setSelectedIngredients] = useState<
    Record<string, CartSelectedIngredients>
  >({});
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedCutlery, setSelectedCutlery] = useState<
    Record<string, CartItemCutlery>
  >({});
  const [selectedCrossSaleItems, setSelectedCrossSaleItems] = useState<
    Record<string, CartItemSubItem>
  >({});
  const [isVisible, setIsVisible] = useState(false);
  const [buttonState, setButtonState] = useState<"neutral" | "success">(
    "neutral"
  );
  const [selectedBundles, setSelectedBundles] = useState<
    Record<string, number>
  >({});

  const [isLoading, setIsLoading] = useState(true);
  const isEditing = type === "edit";
  if (isEditing) {
    var dataToEdit = NNSdk.getProductsFromCart().find(
      (item) => item.cartItemId === params.id
    );
  }
  function findProductById(productId: string) {
    var product = null;
    menu.forEach((menu) => {
      product = menu.products.find((p) => p.id === productId);
      if (product) return;
    });
    return product;
  }
  const product: Product = isEditing
    ? findProductById(dataToEdit?.productId)
    : findProductById(params.id as string);
  useEffect(() => {
    if (!product) return;
    document.body.style.opacity = "1";
    document.body.style.transition = "opacity 0.5s";
    setIsVisible(true);
    // Initialize variants
    // if (product.variants && product.variants.length > 0) {
    //   setSelectedSize(product.variants[0].itemId);
    // }

    // Initialize ingredient selections with default counts
    if (product.ingredientSelectionGroups) {
      const initialIngredients: Record<string, CartSelectedIngredients> = {};
      product.ingredientSelectionGroups.forEach((group) => {
        group.ingredientSelectionOptions.forEach((specifiedSelection) => {
          initialIngredients[specifiedSelection.details.id] = {
            count: specifiedSelection.defaultCount,
            name: specifiedSelection.details.name,
            defaultCount: specifiedSelection.defaultCount,
            id: specifiedSelection.details.id,
            groupId: group.id,
            price: specifiedSelection.details.price,
            uom: specifiedSelection.details.uom,
            value: specifiedSelection.details.value,
          };
        });
      });

      if (isEditing && dataToEdit) {
        dataToEdit.selectedIngredients.forEach((ingredient) => {
          initialIngredients[ingredient.id] = {
            ...ingredient,
            uom: ingredient.uom,
          };
        });
      }
      setSelectedIngredients(initialIngredients);
    }

    // Initialize cutlery with default free counts
    if (product.cutlerySelection) {
      const initialCutlery: Record<string, CartItemCutlery> = {};
      product.cutlerySelection.forEach((option) => {
        initialCutlery[option.details.id] = {
          count: option.maxFreeCount,
          id: option.details.id,
          name: option.details.name,
          defaultCount: option.maxFreeCount,
          price: option.details.price,
        };
      });

      if (isEditing && dataToEdit) {
        dataToEdit.selectedCutlery.forEach((cutlery) => {
          initialCutlery[cutlery.id] = {
            ...cutlery,
          };
        });
      }
      setSelectedCutlery(initialCutlery);
    }

    // Initialize cross-sale items with zero counts
    if (product.crossSaleGroups) {
      const initialCrossSale: Record<string, CartItemSubItem> = {};
      product.crossSaleGroups.forEach((group) => {
        group.items.forEach((item) => {
          initialCrossSale[item.id] = {
            count: 0,
            name: item.name,
            defaultCount: 0,
            id: item.id,
            groupId: group.id,
            price: item.price,
          };
        });
      });
      if (isEditing && dataToEdit) {
        dataToEdit.crossSaleItems.forEach((crossSaleItem) => {
          initialCrossSale[crossSaleItem.id] = {
            ...crossSaleItem,
          };
        });
      }
      setSelectedCrossSaleItems(initialCrossSale);
    }
    setIsLoading(false);
  }, [product]);
  if (isEditing && !dataToEdit) {
    router.push("/");
  }
  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  if (isLoading) {
    return <p>TODO: implement loading mechanism</p>;
  }
  const handleIngredientChange = (
    ingredient: IngredientSelectionOption,
    count: number,
    groupId: string
  ) => {
    setSelectedIngredients((prev) => ({
      ...prev,
      [ingredient.details.id]: {
        count: Math.min(Math.max(0, count), ingredient.maxCount),
        groupId,
        defaultCount: ingredient.defaultCount,
        name: ingredient.details.name,
        price: ingredient.details.price,
        id: ingredient.details.id,
        uom: ingredient.details.uom,
        value: ingredient.details.value,
      },
    }));
  };

  const handleCutleryChange = (
    cutlery: CutlerySelectionOption,
    count: number
  ) => {
    setSelectedCutlery((prev) => ({
      ...prev,
      [cutlery.details.id]: {
        count: Math.min(Math.max(0, count), cutlery.maxCount),
        name: cutlery.details.name,
        price: cutlery.details.price,
        defaultCount: cutlery.maxFreeCount,
        id: cutlery.details.id,
      },
    }));
  };

  const handleCrossSaleChange = (
    item: CrossSaleItem,
    count: number,
    maxCount: number,
    groupId: string
  ) => {
    setSelectedCrossSaleItems((prev) => ({
      ...prev,
      [item.id]: {
        count: Math.min(Math.max(0, count), maxCount),
        groupId,
        defaultCount: 0,
        name: item.name,
        price: item.price,
        id: item.id,
      },
    }));
  };

  const calculateTotalPrice = (): number => {
    // Get the original product from menu data
    if (!product) return 0;

    // Start with base price
    let total = product.price;

    // Add variant price if selected
    // if (selectedSize && originalProduct.variants) {
    //   const selectedVariant = originalProduct.variants.find((v) => v.itemId === selectedSize)
    //   if (selectedVariant?.price) {
    //     total = selectedVariant.price
    //   }
    // }

    // Add ingredient prices
    if (product.ingredientSelectionGroups) {
      product.ingredientSelectionGroups.forEach((group) => {
        group.ingredientSelectionOptions.forEach((option) => {
          const count = selectedIngredients[option.details.id].count || 0;
          if (count > option.defaultCount)
            total += (count - option.defaultCount) * option.details.price;
        });
      });
    }

    // Add cutlery prices (only for items exceeding free count)
    if (product.cutlerySelection) {
      product.cutlerySelection.forEach((option) => {
        const count = selectedCutlery[option.details.id].count || 0;
        const extraCount = Math.max(0, count - option.maxFreeCount);
        if (extraCount > 0) {
          total += extraCount * option.details.price;
        }
      });
    }

    // Add cross-sale items prices
    if (product.crossSaleGroups) {
      product.crossSaleGroups.forEach((group) => {
        group.items.forEach((item) => {
          const count = selectedCrossSaleItems[item.id].count || 0;
          if (count > 0) {
            total += count * item.price;
          }
        });
      });
    }
    return total;
  };

  const handleAddOrUpdate = () => {
    if (buttonState !== "neutral" || product.oos) return;

    const price = calculateTotalPrice();
    const productObject = {
      productId: product.id,
      name: product.name,
      price,
      basePrice: product.price,
      quantity: 1,
      photoUrl: product.photoUrl,
      selectedIngredients: Object.values(selectedIngredients),
      selectedCutlery: Object.values(selectedCutlery),
      crossSaleItems: Object.values(selectedCrossSaleItems),
    };
    isEditing
      ? updateCartItem(params.id as string, productObject)
      : addProductToCart(productObject);

    setButtonState("success");
    setTimeout(() => {
      setButtonState("neutral");
    }, 2000);
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8 min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <Breadcrumbs productName={product.name} />
      <div className="grid md:grid-cols-2 gap-8 flex-1">
        {/* Product Image Section */}
        <div className="relative h-[calc(40vh)] md:h-[calc(100vh-12rem)]">
          <div className="relative w-full h-full">
            <Image
              src={product.photoUrl || "/placeholder.svg"}
              alt={product.name}
              fill
              className="rounded-lg object-cover"
              loading="lazy"
              placeholder="blur"
              blurDataURL="/placeholder-blur.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {product.name}
              </h1>
              <p className="text-sm md:text-base text-gray-200">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Options Section */}
        <div className="relative flex flex-col min-h-[calc(60vh-8rem)] md:h-[calc(100vh-12rem)]">
          <ScrollArea className="flex-1 mb-[200px] md:mb-[180px]">
            <div className="space-y-6 pr-4 rounded-lg pb-4">
              <Accordion type="multiple" className="space-y-4">
                {/* Variants
                {product.variants && product.variants.length > 0 && (
                  <AccordionItem
                    value="variants"
                    className="border border-gray-100 rounded-lg bg-gray-50/50"
                  >
                    <AccordionTrigger className="font-bold text-lg px-4">
                      Wybierz wersję
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-2">
                        {product.variants.map((variant) => (
                          <div
                            key={variant.itemId}
                            className={`flex items-center space-x-2 p-2 rounded-md transition-colors hover:bg-white border border-transparent`}
                          >
                            <Checkbox
                              id={variant.itemId}
                              checked={selectedSize === variant.itemId}
                              onCheckedChange={(checked) => {
                                setSelectedSize(checked ? variant.itemId : "");
                              }}
                            />
                            <Label
                              htmlFor={variant.itemId}
                              className="flex-1 cursor-pointer"
                            >
                              {variant.type}{" "}
                              {variant.price
                                ? `- ${variant.price.toFixed(2)} zł`
                                : ""}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )} */}

                {/* All Ingredients in one accordion */}
                {product.ingredientSelectionGroups &&
                  product.ingredientSelectionGroups.length > 0 && (
                    <AccordionItem
                      value="ingredients"
                      className="border border-gray-100 rounded-lg bg-gray-50/50"
                    >
                      <AccordionTrigger className="font-bold text-lg px-4">
                        Składniki
                      </AccordionTrigger>
                      <AccordionContent className="px-4">
                        <div className="space-y-6">
                          {product.ingredientSelectionGroups.map(
                            (group, groupIndex) => (
                              <div key={groupIndex} className="space-y-4">
                                <div className="border-b pb-2 text-gray-800 text-base">
                                  {group.name}
                                </div>
                                {group.ingredientSelectionOptions.map(
                                  (selection, selectionIndex) => (
                                    <div
                                      key={selectionIndex}
                                      className="flex items-center justify-between p-2 hover:bg-white rounded-md transition-colors"
                                    >
                                      <div className="flex-1">
                                        <p className="font-medium">
                                          {selection.details.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          {selection.details.price} zł za porcję
                                          {selection.details.value &&
                                            selection.details.uom && (
                                              <span className="ml-1">
                                                ({selection.details.value}{" "}
                                                {selection.details.uom})
                                              </span>
                                            )}
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() =>
                                            handleIngredientChange(
                                              selection,
                                              (selectedIngredients[
                                                selection.details.id
                                              ].count || 0) - 1,
                                              group.id
                                            )
                                          }
                                          disabled={
                                            (selectedIngredients[
                                              selection.details.id
                                            ]?.count || 0) <= 0
                                          }
                                        >
                                          <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-8 text-center">
                                          {selectedIngredients[
                                            selection.details.id
                                          ].count || 0}
                                          {selection.defaultCount > 0 && (
                                            <span className="text-xs text-gray-500 block">
                                              ({selection.defaultCount})
                                            </span>
                                          )}
                                        </span>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() =>
                                            handleIngredientChange(
                                              selection,
                                              (selectedIngredients[
                                                selection.details.id
                                              ].count || 0) + 1,
                                              group.id
                                            )
                                          }
                                          disabled={
                                            (selectedIngredients[
                                              selection.details.id
                                            ].count || 0) >= selection.maxCount
                                          }
                                        >
                                          <Plus className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                {/* Cutlery */}
                {product.cutlerySelection && (
                  <AccordionItem
                    value="cutlery"
                    className="border border-gray-100 rounded-lg bg-gray-50/50"
                  >
                    <AccordionTrigger className="font-bold text-lg px-4">
                      Sztućce
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-4">
                        {product.cutlerySelection.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 hover:bg-white rounded-md transition-colors"
                          >
                            <div className="flex-1">
                              <p className="font-medium">
                                {option.details.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {option.maxFreeCount > 0 &&
                                  `${option.maxFreeCount} szt. gratis, `}
                                {option.details.price > 0 &&
                                  `${option.details.price} zł za dodatkową sztukę`}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleCutleryChange(
                                    option,
                                    (selectedCutlery[option.details.id].count ||
                                      0) - 1
                                  )
                                }
                                disabled={
                                  (selectedCutlery[option.details.id].count ||
                                    0) <= 0
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">
                                {selectedCutlery[option.details.id].count || 0}
                                {option.maxFreeCount > 0 && (
                                  <span className="text-xs text-gray-500 block">
                                    ({option.maxFreeCount})
                                  </span>
                                )}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleCutleryChange(
                                    option,
                                    (selectedCutlery[option.details.id].count ||
                                      0) + 1
                                  )
                                }
                                disabled={
                                  (selectedCutlery[option.details.id].count ||
                                    0) >= option.maxCount
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
                )}

                {/* Cross-sale */}
                {product.crossSaleGroups &&
                  product.crossSaleGroups.length > 0 && (
                    <AccordionItem
                      value={`cross-sale`}
                      className="border border-gray-100 rounded-lg bg-gray-50/50"
                    >
                      <AccordionTrigger className="font-bold text-lg px-4">
                        Dodatki
                      </AccordionTrigger>
                      <AccordionContent className="px-4">
                        <div className="space-y-6">
                          {product.crossSaleGroups.map((group, groupIndex) => (
                            <div key={groupIndex} className="space-y-4">
                              <div className="border-b pb-2 text-gray-800 text-base">
                                {group.name}
                              </div>
                              {group.items.map((item, selectionIndex) => (
                                <div
                                  key={selectionIndex}
                                  className="flex items-center justify-between p-2 hover:bg-white rounded-md transition-colors"
                                >
                                  <div className="flex-1">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                      {item.description}
                                      {item.price > 0 && ` - ${item.price} zł`}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleCrossSaleChange(
                                          item,
                                          (selectedCrossSaleItems[item.id]
                                            .count || 0) - 1,
                                          group.maxCount,
                                          group.id
                                        )
                                      }
                                      disabled={
                                        (selectedCrossSaleItems[item.id]
                                          .count || 0) <= 0
                                      }
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-8 text-center">
                                      {selectedCrossSaleItems[item.id].count ||
                                        0}
                                    </span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleCrossSaleChange(
                                          item,
                                          (selectedCrossSaleItems[item.id]
                                            .count || 0) + 1,
                                          group.maxCount,
                                          group.id
                                        )
                                      }
                                      disabled={
                                        (selectedCrossSaleItems[item.id]
                                          .count || 0) >= group.maxCount
                                      }
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
              </Accordion>
            </div>
          </ScrollArea>

          {/* Bottom Bar */}
          <div className="fixed left-0 right-0 bottom-0 md:absolute bg-white border-t pt-4 px-4 md:px-0 pb-4 space-y-4">
            <motion.div
              layout
              className="text-2xl font-bold flex items-center gap-2 text-gray-900"
            >
              <span>Cena całkowita:</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={calculateTotalPrice()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center"
                >
                  <AnimatedPrice price={calculateTotalPrice()} />
                  <span className="ml-1">zł</span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.button
              layout
              disabled={buttonState !== "neutral" || product.oos}
              onClick={handleAddOrUpdate}
              className={`relative w-full rounded-md px-4 py-2 font-medium text-white transition-all ${
                product.oos
                  ? "bg-gray-400 cursor-not-allowed"
                  : buttonState === "neutral"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-500"
              }`}
            >
              <motion.span
                animate={{
                  y: buttonState === "neutral" ? 0 : 6,
                  opacity: buttonState === "neutral" ? 1 : 0,
                }}
                className="inline-block"
              >
                {product.oos
                  ? "Produkt niedostępny"
                  : isEditing
                  ? "Zaktualizauj"
                  : "Dodaj do koszyka"}
              </motion.span>
              <IconOverlay
                Icon={Check}
                visible={buttonState === "success"}
                text={isEditing ? "Zaktualizowano" : "Dodano do koszyka"}
              />
            </motion.button>

            <CartPopup>
              <Button
                className="w-full bg-gray-500 hover:bg-gray-600 text-white flex items-center justify-center gap-2 text-base font-medium"
                disabled={product.oos}
              >
                <ShoppingCart className="w-5 h-5" />
                Przejdź do koszyka
              </Button>
            </CartPopup>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const IconOverlay = ({ Icon, visible, spin = false, text = "" }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          className="absolute inset-0 grid place-content-center"
        >
          <div className="flex items-center gap-2">
            <Icon
              className={`text-xl duration-300 ${spin ? "animate-spin" : ""}`}
            />
            {text && <span className="text-sm">{text}</span>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
