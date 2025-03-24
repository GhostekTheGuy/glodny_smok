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
  DialogFooter
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
  amount: number;
  onMethodSelect: (method: PaymentMethod) => void;
}

// Mock danych metod płatności
const mockPaymentMethods: PaymentMethod[] = [
  {
    value: "dpp",
    brandImageUrl: "https://static.payu.com/images/mobile/logos/pbl_dpp.png",
    name: "PayPo | PayU Płacę później",
    status: "ENABLED",
    minAmount: 1000,
    maxAmount: 200000
  },
  {
    value: "jp",
    brandImageUrl: "https://static.payu.com/images/mobile/logos/pbl_jp.png",
    name: "Apple Pay",
    status: "ENABLED"
  },
  {
    value: "dpt",
    brandImageUrl: "https://static.payu.com/images/mobile/logos/pbl_dpt.png",
    name: "Twisto | PayU Płacę później",
    status: "ENABLED",
    minAmount: 37,
    maxAmount: 200000
  },
  {
    value: "ai",
    brandImageUrl: "https://static.payu.com/images/mobile/logos/pbl_ai.png",
    name: "Raty PayU",
    status: "ENABLED",
    minAmount: 30000,
    maxAmount: 2000000
  },
  {
    value: "ap",
    brandImageUrl: "https://static.payu.com/images/mobile/logos/pbl_ap.png",
    name: "Google Pay",
    status: "ENABLED"
  },
  {
    value: "blik",
    brandImageUrl: "https://static.payu.com/images/mobile/logos/pbl_blik.png",
    name: "BLIK",
    status: "ENABLED",
    minAmount: 1,
    maxAmount: 4999999
  },
  {
    value: "p",
    brandImageUrl: "https://static.payu.com/images/mobile/logos/pbl_p.png",
    name: "Płacę z iPKO",
    status: "ENABLED",
    minAmount: 50,
    maxAmount: 99999999
  },
  {
    value: "m",
    brandImageUrl: "https://static.payu.com/images/mobile/logos/pbl_m.png",
    name: "mTransfer",
    status: "ENABLED",
    minAmount: 50,
    maxAmount: 99999999
  },
  {
    value: "o",
    brandImageUrl: "https://static.payu.com/images/mobile/logos/pbl_o.png",
    name: "Płacę z Bankiem Pekao S.A.",
    status: "ENABLED",
    minAmount: 50,
    maxAmount: 99999999
  },
  {
    value: "wys",
    brandImageUrl: "https://static.payu.com/images/mobile/logos/pbl_wys_off.png",
    name: "Bank Pocztowy",
    status: "DISABLED",
    minAmount: 37,
    maxAmount: 99999999
  },
  {
    value: "c",
    brandImageUrl: "https://static.payu.com/images/mobile/logos/pbl_c.png",
    name: "Płatność online kartą płatniczą",
    status: "ENABLED",
    minAmount: 0,
    maxAmount: 99999999
  },
  {
    value: "CASH",
    brandImageUrl: "/cash.svg",
    name: "Płatność gotówką",
    status: "ENABLED",
    minAmount: 0,
    maxAmount: 99999999
  }
];

export function PaymentMethodsModal({ isOpen, onClose, amount, onMethodSelect }: PaymentMethodsModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [availableMethods, setAvailableMethods] = useState<PaymentMethod[]>([]);
  
  useEffect(() => {
    // Filtrujemy metody płatności na podstawie kwoty i statusu
    const filteredMethods = mockPaymentMethods.filter(method => {
      if (method.status === "DISABLED") return false;
      
      const isAboveMin = !method.minAmount || amount >= method.minAmount;
      const isBelowMax = !method.maxAmount || amount <= method.maxAmount;
      
      return isAboveMin && isBelowMax;
    });
    
    setAvailableMethods(filteredMethods);
  }, [amount]);

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method.value);
  };

  const handleConfirm = () => {
    if (selectedMethod) {
      const selectedPaymentMethod = availableMethods.find(
        method => method.value === selectedMethod
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
                  ? 'border-red-600 bg-red-50' 
                  : 'border-gray-200 hover:border-gray-300'
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
                  <p className="text-sm font-medium">{method.name.split("|")[0].trim()}</p>
                  {method.minAmount > 0 && (
                    <p className="text-xs text-gray-500">
                      Min: {(method.minAmount / 100).toFixed(2)} zł
                    </p>
                  )}
                </div>
              </div>
              {selectedMethod === method.value && (
                <div className="absolute top-2 right-2 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3 h-3">
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