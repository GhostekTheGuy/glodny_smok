import { CartProvider } from "@/contexts/cart-context";
import "@/app/globals.css";
import { Poppins, Qwigley } from "next/font/google";
import type React from "react";
import { Toaster } from "@/components/ui/toaster";
import { StoreData, StoreProvider } from "@/contexts/StoreContext";
import { NNSdk } from "@/lib/sdk";
import { storeId } from "@/data/store-data";
import { Footer } from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const qwigley = Qwigley({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-qwigley",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeData = (await NNSdk.getStore(storeId)) as StoreData;

  return (
    <html
      lang="pl"
      className={`scroll-smooth ${poppins.variable} ${qwigley.variable}`}
    >
      <body className="min-h-screen bg-white font-poppins">
        <StoreProvider initialData={storeData}>
          <CartProvider>
            {children}
            <Footer />
          </CartProvider>
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
