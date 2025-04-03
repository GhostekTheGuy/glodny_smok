"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { OpeningHours } from "@/components/OpeningHours";
import { AboutUs } from "@/components/AboutUs";
import RestaurantMenu from "@/components/restaurant-menu";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartPopup } from "@/components/CartPopup";
import { StoreProvider } from "@/components/StoreProvider";
export default function Home() {
  const { totalItems } = useCart();
  const [showCartButton, setShowCartButton] = useState(false);

  useEffect(() => {
    setShowCartButton(totalItems > 0);
  }, [totalItems]);

  return (
    <StoreProvider>
      <Head>
        <title>Sztos Siedlce - Strona Główna</title>
        <meta
          name="description"
          content="Poznaj naszą restaurację i sprawdź nasze menu!"
        />
      </Head>
      <main className="relative min-h-screen">
        <Navbar />
        <Hero />
        <OpeningHours />
        <AboutUs />
        <section id="menu" className="relative z-10">
          <RestaurantMenu />
        </section>

        {/* Global Cart Button */}
        <AnimatePresence>
          {showCartButton && (
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
              <CartPopup>
                <Button className="bg-red-600 hover:bg-black text-white flex items-center justify-center gap-2 rounded-full w-16 h-16 shadow-lg transition-colors duration-300">
                  <ShoppingCart className="w-6 h-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </CartPopup>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </StoreProvider>
  );
}
