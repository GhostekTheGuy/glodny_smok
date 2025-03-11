"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/cart-context";
import type React from "react";
import type { Product } from "../data/interfaces";
import { CartItemSubItem } from "@/types/menu";
import { NomNomSDK } from "@/jsrepo-blocks";
import { NNSdk } from "@/lib/sdk";
import { useState } from "react";
import { VariantModal } from "@/components/VariantModal";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addProductToCart } = useCart();
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);

  const handleVariantSelect = (variant: any) => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s";
    setTimeout(() => {
      router.push(`/product/${product.id}?type=add&variantId=${variant.itemId}`);
    }, 500);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.oos) {
      if (product.variants && product.variants.length > 0) {
        setIsVariantModalOpen(true);
      } else {
        document.body.style.opacity = "0";
        document.body.style.transition = "opacity 0.5s";
        setTimeout(() => {
          router.push(`/product/${product.id}?type=add`);
        }, 500);
      }
    }
  };

  const getDefaultConfiguration = () => {
    // Get default variant
    const defaultSize =
      product.variants && product.variants.length > 0
        ? product.variants[0].itemId
        : "";

    // Get default ingredients
    const defaultIngredients: CartItemSubItem[] = [];
    // const defaultIngredients: Record<string, CartItemSubItem> = {};
    product.ingredientSelection?.forEach((selection) => {
      selection.ingredientSelections.forEach((specifiedSelection) => {
        defaultIngredients.push({
          id: specifiedSelection.details.id,
          groupName: selection.name,
          price: specifiedSelection.details.price,
          name: specifiedSelection.details.name,
          count: specifiedSelection.defaultCount,
          defaultCount: specifiedSelection.defaultCount,
        });
      });
    });

    // Get default cutlery
    const defaultCutlery: CartItemSubItem[] = [];

    if (product.cutlerySelection) {
      product.cutlerySelection.forEach((selection) => {
        defaultCutlery.push({
          id: selection.details.id,
          name: selection.details.name,
          price: selection.details.price,
          count: selection.maxFreeCount,
          defaultCount: selection.maxFreeCount,
        });
      });
    }

    // No cross-sale items by default
    const defaultCrossSaleItems: CartItemSubItem[] = [];

    return {
      selectedSize: defaultSize,
      selectedIngredients: defaultIngredients,
      selectedCutlery: defaultCutlery,
      crossSaleItems: defaultCrossSaleItems,
    };
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.oos) {
      if (product.variants && product.variants.length > 0) {
        setIsVariantModalOpen(true);
      } else {
        const defaultConfig = getDefaultConfiguration();
        addProductToCart({
          productId: product.id,
          name: product.name,
          price: product.price,
          selectedIngredients: defaultConfig.selectedIngredients,
          selectedCutlery: defaultConfig.selectedCutlery,
          crossSaleItems: defaultConfig.crossSaleItems,
          quantity: 1,
          basePrice: product.price,
          photoUrl: product.photoUrl,
        });
      }
    }
  };

  const displayPrice = product.price;

  return (
    <>
      <motion.div
        layout
        className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-200 h-[420px] flex flex-col cursor-pointer relative"
        onClick={handleCardClick}
      >
        {/* {product.note && (
          <div className="absolute top-0 left-0 right-0 z-10">
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-t-lg font-medium text-sm flex items-center justify-center shadow-sm">
              <span className="mr-2">🌟</span>
              {product.note}
            </div>
          </div>
        )} */}
        {product.oos && (
          <div className="absolute top-0 left-0 right-0 bottom-0 z-20 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-lg">
              Niedostępny
            </div>
          </div>
        )}
        <div className="flex flex-col h-full">
          <motion.div layout className="relative w-full h-48 mb-4">
            <div className="absolute inset-0 border-2 border-dashed border-gray-200 rounded-lg">
              <Image
                src={product.photoUrl || "/placeholder.svg"}
                alt={product.name}
                fill
                className="rounded-lg object-cover p-1"
                loading="lazy"
                placeholder="blur"
                blurDataURL="/placeholder-blur.jpg"
              />
            </div>
          </motion.div>
          <motion.div layout className="flex flex-col flex-1">
            <motion.h3
              layout
              className="font-bold text-gray-900 text-lg mb-2 line-clamp-2"
            >
              {product.name}
            </motion.h3>
            <motion.p
              layout
              className="text-sm text-gray-500 mb-4 flex-1 line-clamp-3"
            >
              {product.description}
            </motion.p>
            <motion.div
              layout
              className="flex items-center justify-between gap-4 mt-auto"
            >
              <span className="text-lg font-bold text-gray-900">
                {displayPrice} zł
              </span>
              <button
                onClick={handleAddToCart}
                className={`bg-red-600 hover:bg-black text-white px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
                  product.oos
                    ? "opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400"
                    : ""
                }`}
                disabled={product.oos}
              >
                {product.oos ? "Niedostępny" : "Dodaj do koszyka"}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      <VariantModal
        isOpen={isVariantModalOpen}
        onClose={() => setIsVariantModalOpen(false)}
        product={product}
        onVariantSelect={handleVariantSelect}
      />
    </>
  );
}

export default ProductCard;
