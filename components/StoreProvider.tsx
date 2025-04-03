"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  StoreProvider as StoreContextProvider,
  StoreData,
} from "@/contexts/storeContext";
import { NNSdk } from "@/lib/sdk";
import { storeId } from "@/data/store-data";
import { LoadingSpinner } from "./LoadingSpinner";

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [storeData, setStoreData] = useState<StoreData | null>(null);

  useEffect(() => {
    NNSdk.getStore(storeId).then(setStoreData);
  }, []);

  if (!storeData) return <LoadingSpinner />;

  return (
    <StoreContextProvider initialData={storeData}>
      {children}
    </StoreContextProvider>
  );
}
