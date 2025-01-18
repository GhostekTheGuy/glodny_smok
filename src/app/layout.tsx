import type { Metadata } from "next";
import { Poppins, Qwigley, Pacifico } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const qwigley = Qwigley({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-qwigley',
  display: 'swap',
  adjustFontFallback: false
});

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Głodny Smok",
  description: "Restauracja Głodny Smok - zamów online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${qwigley.variable} ${poppins.variable} ${pacifico.variable}`}>
      <body className={`font-poppins antialiased`}>
        {children}
      </body>
    </html>
  );
}
