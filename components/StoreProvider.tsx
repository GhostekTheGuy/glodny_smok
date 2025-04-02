"use client";

import { ReactNode } from "react";
import { StoreProvider as StoreContextProvider, StoreData } from "@/contexts/StoreContext";

// Przykładowe dane sklepu - w rzeczywistej aplikacji powinny być pobierane z API
const mockStoreData: StoreData = {
  id: "1",
  name: "Głodny Smok",
  type: "restaurant",
  avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo2-wt0Uvyl9RbKC1Z4YQtVFtSWcFv2xkI.png",
  backgroundImage: "",
  storeSettings: {
    allowDelivery: true,
    allowInStore: true,
    allowPickup: true,
    defaultReadyTime: 30,
    deliverySettings: {
      deliveryMinPriceOrder: 30,
      deliveryPrice: 10,
      deliveryPricingMethod: "fixed"
    }
  },
  storeStatus: {
    id: "1",
    allowInStore: true,
    allowPickup: true,
    allowDelivery: true,
    readyTimeModifier: 1
  },
  address: {
    id: "1",
    country: "Polska",
    state: "Małopolska",
    postcode: "30-001",
    city: "Kraków",
    streetName: "Floriańska",
    streetNumber: "1",
    timezone: "Europe/Warsaw",
    secondaryAddress: "",
    geocoding: ""
  }
};

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return (
    <StoreContextProvider initialData={mockStoreData}>
      {children}
    </StoreContextProvider>
  );
} 