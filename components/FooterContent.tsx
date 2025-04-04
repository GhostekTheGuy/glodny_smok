"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { useStore } from "@/contexts/storeContext";

export function FooterContent() {
  const { store } = useStore();
  if (!store) return null;
  return (
    <footer className="bg-gray-100 py-12 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
        <div className="flex flex-col items-start">
          <Image
            src={store.avatar || "/logo.jpg"}
            alt="Logo"
            width={160}
            height={80}
            className="w-40 h-auto"
          />
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold text-black">Godziny zamówień</h3>
          <p className="text-black">
            <>
              Pon-Pt 11:00-22:00
              <br />
              Pt-Sob 11:00-23:00
              <br />
              Nd 11:00-22:00
            </>
          </p>
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold text-black">
            Nasza lokalizacja
          </h3>
          <p className="text-black">
            {store.name}
            <br />
            {store.address.postcode}, {store.address.city}
            <br />
            ul. {store.address.streetName} {store.address.streetNumber}
            <br />
            tel: +48 576 622 444
            <br />
            sztossiedlce@gmail.com
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-8 border-t pt-4 flex justify-between items-center text-sm text-black">
        <span>Copyright © 2025 {store.name}</span>
        <span>Designed by Hubert Kolejko</span>
      </div>
    </footer>
  );
}
