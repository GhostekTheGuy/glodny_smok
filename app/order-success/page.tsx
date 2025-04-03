import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center w-full h-[70vh]">
      <h1 className="text-4xl font-bold mb-4">
        Dziękujemy za złożenie zamówienia!
      </h1>
      <p className="text-xl mb-8">
        Aktualizacje statusu Twojego zamówienia będą przesyłane na podany w
        zamówieniu adres email.
      </p>
      <Link href="/">
        <Button>Wróć do menu</Button>
      </Link>
    </div>
  );
}
