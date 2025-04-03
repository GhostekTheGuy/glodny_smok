"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const heroSection = document.getElementById("hero");
        if (heroSection) {
          const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
          if (window.scrollY > heroBottom) {
            setIsVisible(false);
          } else if (window.scrollY <= heroBottom) {
            setIsVisible(true);
          }
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  width={147}
                  height={66}
                  className="h-[66px] w-auto"
                />
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-12">
                <div className="flex items-center gap-12 text-white">
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-gray-300 transition-colors"
                  >
                    O NAS
                  </button>
                  <button
                    onClick={() => scrollToSection("menu")}
                    className="hover:text-gray-300 transition-colors"
                  >
                    MENU
                  </button>
                  <a
                    href="https://www.facebook.com/profile.php?id=61568420429841"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300 transition-colors"
                  >
                    FACEBOOK
                  </a>
                </div>
                {/* Removed ZAMÓW ONLINE button */}
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[300px] sm:w-[400px] text-white"
                  >
                    <nav className="flex flex-col gap-4 h-full">
                      <button
                        onClick={() => scrollToSection("about")}
                        className="block px-2 py-1 text-lg"
                      >
                        O NAS
                      </button>
                      <button
                        onClick={() => scrollToSection("menu")}
                        className="block px-2 py-1 text-lg"
                      >
                        MENU
                      </button>
                      <div className="flex-grow flex items-center justify-center">
                        <a
                          href="https://www.facebook.com/profile.php?id=61568420429841"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-2 py-1 text-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          FACEBOOK
                        </a>
                      </div>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
