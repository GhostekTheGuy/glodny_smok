import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Dziękujemy za złożenie zamówienia!</h1>
      <p className="text-xl mb-8">Twoje zamówienie zostało przyjęte do realizacji.</p>
      <Link href="/">
        <Button>Wróć do menu</Button>
      </Link>
    </div>
  )
}

