"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function EditSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-8 h-8 text-green-600" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-4">Produkt zaktualizowany</h1>
        <p className="text-gray-600 mb-8">Twój produkt został pomyślnie zaktualizowany i dodany do koszyka.</p>
        <div className="space-y-4">
          <Link href="/cart">
            <Button className="w-full bg-red-600 hover:bg-red-700">Przejdź do koszyka</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Kontynuuj zakupy
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

