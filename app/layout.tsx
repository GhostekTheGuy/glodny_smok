import { CartProvider } from "@/contexts/cart-context";
import "@/app/globals.css";
import {
  Alice,
  Italiana,
  Merienda,
  Poppins,
  Quattrocento,
  Qwigley,
} from "next/font/google";
import type React from "react";
import { Toaster } from "@/components/ui/toaster";
import { StoreProvider } from "@/contexts/storeContext";
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

const italiana = Italiana({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-italiana",
});

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-quattrocento",
});

const alice = Alice({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alice",
});

const merienda = Merienda({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-merienda",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeData = await NNSdk.getStore(storeId);
  return (
    <html
      lang="pl"
      className={`scroll-smooth ${poppins.variable} ${qwigley.variable}`}
    >
      <body className="min-h-screen bg-white font-poppins">
        <StoreProvider initialData={storeData}>
          <CartProvider>
            {children} <Footer />
          </CartProvider>
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
