"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, X } from "lucide-react";

interface PaymentMethod {
  value: string;
  brandImageUrl: string;
  name: string;
  status: "ENABLED" | "DISABLED";
  minAmount?: number;
  maxAmount?: number;
}

interface PaymentMethodsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMethodSelect: (method: PaymentMethod) => void;
}

// Mock danych metod płatności
const mockPaymentMethods: PaymentMethod[] = [
  {
    value: "PAYU",
    brandImageUrl: "/payu.jpg",
    name: "Payu",
    status: "ENABLED",
  },
  {
    value: "CASH",
    brandImageUrl: "/cash.svg",
    name: "Płatność gotówką",
    status: "ENABLED",
  },
];

export function PaymentMethodsModal({
  isOpen,
  onClose,
  onMethodSelect,
}: PaymentMethodsModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [availableMethods, setAvailableMethods] = useState<PaymentMethod[]>([]);

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method.value);
  };
  useEffect(() => {
    // Filtrujemy metody płatności na podstawie kwoty i statusu
    const filteredMethods = mockPaymentMethods.filter(
      (method) => method.status !== "DISABLED"
    );

    setAvailableMethods(filteredMethods);
  }, []);

  const handleConfirm = () => {
    if (selectedMethod) {
      const selectedPaymentMethod = availableMethods.find(
        (method) => method.value === selectedMethod
      );
      if (selectedPaymentMethod) {
        onMethodSelect(selectedPaymentMethod);
        onClose();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white rounded-xl">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-red-600 to-red-700 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20 mix-blend-overlay" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            aria-label="Zamknij"
          >
            <X size={20} />
          </button>

          <DialogHeader className="relative z-[1] pt-10 px-6 pb-6">
            <DialogTitle className="text-2xl font-bold text-center text-white drop-shadow-sm">
              Wybierz metodę płatności
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto grid grid-cols-2 gap-3">
          {availableMethods.map((method) => (
            <motion.div
              key={method.value}
              className={`relative border rounded-lg p-3 cursor-pointer transition-all ${
                selectedMethod === method.value
                  ? "border-red-600 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleMethodSelect(method)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              data-value={method.value}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 relative flex-shrink-0 mb-2">
                  <Image
                    src={method.brandImageUrl}
                    alt={method.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">
                    {method.name.split("|")[0].trim()}
                  </p>
                  {method.minAmount > 0 && (
                    <p className="text-xs text-gray-500">
                      Min: {(method.minAmount / 100).toFixed(2)} zł
                    </p>
                  )}
                </div>
              </div>
              {selectedMethod === method.value && (
                <div className="absolute top-2 right-2 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-3 h-3"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <DialogFooter className="p-4 border-t">
          <Button
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={handleConfirm}
            disabled={!selectedMethod}
          >
            Potwierdź wybór
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
