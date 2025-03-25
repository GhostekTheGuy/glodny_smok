"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Product } from "@/types/interfaces";

interface VariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onVariantSelect: (variant: any) => void;
}

export function VariantModal({
  isOpen,
  onClose,
  product,
  onVariantSelect,
}: VariantModalProps) {
  const { addProductToCart } = useCart();

  const handleVariantSelect = (variant: any) => {
    onVariantSelect(variant);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-white rounded-xl">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-600 to-red-700 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=900')] bg-cover bg-center opacity-20 mix-blend-overlay" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            aria-label="Zamknij"
          >
            <X size={20} />
          </button>

          <DialogHeader className="relative z-[1] pt-10 px-6 pb-6">
            <DialogTitle className="text-3xl font-bold text-center text-white drop-shadow-sm">
              Wybierz wariant produktu {product.name}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {product.variants?.map((variant) => (
                <motion.div
                  key={variant.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col cursor-pointer relative group"
                  onClick={() => handleVariantSelect(variant)}
                >
                  <div className="flex flex-col h-full">
                    <div className="relative w-full h-52 overflow-hidden">
                      <Image
                        src={
                          product.photoUrl ||
                          "/placeholder.svg?height=300&width=400"
                        }
                        alt={`${product.name} - ${variant.name}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="flex flex-col flex-1 p-5">
                      <h3 className="font-bold text-gray-900 text-xl mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {variant.name}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between gap-4 mt-auto pt-3 border-t border-gray-100">
                        <span className="text-xl font-bold text-gray-900">
                          {variant.price} zł
                        </span>

                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 bg-gray-100 text-gray-800 group-hover:bg-red-600 group-hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVariantSelect(variant);
                          }}
                        >
                          Wybierz
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
