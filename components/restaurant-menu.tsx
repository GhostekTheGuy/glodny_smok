"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MenuHeader } from "./MenuHeader";
import { ProductGrid } from "./ProductGrid";
import { menu } from "@/data/menu-data";
import { CategoryDisplay } from "./CategoryDisplay";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

export default function RestaurantMenu() {
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
  const [sortOrder, setSortOrder] = useState("default");
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { totalItems } = useCart();
  const router = useRouter();

  const categories = [
    "Wszystkie",
    ...Array.from(
      new Set(
        menu[0].products.flatMap((product) =>
          product.categories?.map((category) => category.name)
        )
      )
    ),
  ];

  useEffect(() => {
    const animateArrow = async () => {
      await controls.start({
        x: [0, 20, 0],
        transition: {
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 1,
        },
      });
    };
    animateArrow();

    const handleScroll = () => {
      if (scrollContainerRef.current) {
        if (scrollContainerRef.current.scrollLeft > 0) {
          setShowScrollIndicator(false);
        }
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [controls]);

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <div id="menu" ref={menuRef} className="relative bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MenuHeader />
        <CategoryDisplay category={selectedCategory} />

        {/* Mobile Categories (with scroll) */}
        <div className="relative mb-6 md:hidden">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
          >
            <div className="flex space-x-2 py-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg border text-sm whitespace-nowrap flex-none ${
                    selectedCategory === category
                      ? "border-red-600 text-red-600 bg-red-50"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  } font-medium transition-colors`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Animated scroll indicator */}
          <AnimatePresence>
            {showScrollIndicator && (
              <motion.div
                className="absolute left-0 right-0 flex items-center justify-center mt-2 mb-4 space-x-2"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-red-600 text-sm">
                  Przesuń, aby wybrać kategorię
                </span>
                <motion.svg
                  width="40"
                  height="12"
                  viewBox="0 0 40 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  animate={controls}
                  initial={{ x: 0 }}
                >
                  <path
                    d="M0 6H38M38 6L33 1M38 6L33 11"
                    stroke="#E83419"
                    strokeWidth="2"
                  />
                </motion.svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Categories (grid) */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg border text-sm ${
                selectedCategory === category
                  ? "border-red-600 text-red-600 bg-red-50"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              } font-medium transition-colors`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <ProductGrid
          menu={menu}
          selectedCategory={selectedCategory}
          sortOrder={sortOrder}
        />

        {/* Cart Button */}
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              className="fixed bottom-8 right-8 z-50"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <Button
                onClick={handleCartClick}
                className="bg-red-600 hover:bg-black text-white flex items-center justify-center gap-2 rounded-full w-16 h-16 shadow-lg transition-colors duration-300"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
