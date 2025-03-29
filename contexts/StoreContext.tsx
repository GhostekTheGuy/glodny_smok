import { createContext, useContext, ReactNode } from 'react';

interface DeliverySettings {
  deliveryMinPriceOrder: number;
  deliveryPrice: number;
  deliveryPricingMethod: string;
}

interface StoreSettings {
  allowDelivery: boolean;
  allowInStore: boolean;
  allowPickup: boolean;
  defaultReadyTime: number;
  deliverySettings: DeliverySettings;
}

interface StoreStatus {
  id: string;
  allowInStore: boolean;
  allowPickup: boolean;
  allowDelivery: boolean;
  readyTimeModifier: number;
}

interface StoreAddress {
  id: string;
  country: string;
  state: string;
  postcode: string;
  city: string;
  streetName: string;
  streetNumber: string;
  timezone: string;
  secondaryAddress: string;
  geocoding: string;
}

interface StoreData {
  id: string;
  name: string;
  type: string;
  avatar: string;
  backgroundImage: string;
  storeSettings: StoreSettings;
  storeStatus: StoreStatus;
  address: StoreAddress;
}

interface StoreContextType {
  store: StoreData | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children, initialData }: { children: ReactNode; initialData: StoreData }) {
  return (
    <StoreContext.Provider value={{ store: initialData }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
} 