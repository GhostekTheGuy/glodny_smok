"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Clock, MapPin, Phone, Check, Share2, Copy, ExternalLink } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const [orderId, setOrderId] = useState("")
  const [orderData, setOrderData] = useState({
    id: "",
    status: "Przyjęte do realizacji",
    readyTime: new Date(Date.now() + 30 * 60000), // 30 minut od teraz
    items: [
      // Te dane powinny pochodzić z koszyka/zamówienia
      { name: "Zupa Pho", quantity: 1, price: 32.99, options: ["Duża", "Dodatkowy makaron"] },
      { name: "Spring Rolls", quantity: 2, price: 5.99, options: [] },
    ],
    deliveryMethod: "Odbiór osobisty",
    address: "ul. Henryka Sienkiewicza 26, 08-110 Siedlce",
    paymentMethod: "Płatność przy odbiorze",
    totalPrice: 44.97,
    deliveryCost: 0, // Dodane pole kosztu dostawy
    subtotal: 44.97, // Dodane pole sumy częściowej
  })

  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState("")
  const [promoCode, setPromoCode] = useState("SMOK10")
  const [promoCodeCopied, setPromoCodeCopied] = useState(false)

  useEffect(() => {
    const generatedId = searchParams.get("id") || "ORD-" + Math.floor(100000 + Math.random() * 900000)
    setOrderId(generatedId)
    setOrderData(prev => ({
      ...prev,
      id: generatedId
    }))
  }, [searchParams])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const diff = orderData.readyTime.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft("Zamówienie powinno być już gotowe!")
        return
      }

      const minutes = Math.floor(diff / 60000)
      setTimeLeft(`${minutes} min`)
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 60000)

    return () => clearInterval(interval)
  }, [orderData.readyTime])

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyPromoCode = () => {
    navigator.clipboard.writeText(promoCode)
    setPromoCodeCopied(true)
    setTimeout(() => setPromoCodeCopied(false), 2000)
  }

  const shareOrder = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Moje zamówienie w Głodny Smok',
          text: `Sprawdź moje zamówienie (${orderId}) w Głodny Smok! Całkowita kwota: ${orderData.totalPrice.toFixed(2)} zł`,
          url: window.location.href
        })
      } catch (err) {
        console.log('Błąd podczas udostępniania:', err)
      }
    } else {
      alert("Twoja przeglądarka nie wspiera funkcji udostępniania")
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-3xl mx-auto" 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants}
      >
        {/* Logo */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <Link href="/" className="inline-block">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo2-wt0Uvyl9RbKC1Z4YQtVFtSWcFv2xkI.png"
              alt="Głodny Smok Logo"
              width={200}
              height={89}
              className="h-auto w-auto mx-auto"
            />
          </Link>
        </motion.div>

        {/* Główna sekcja */}
        <motion.div className="bg-white shadow-lg rounded-2xl overflow-hidden mb-8" variants={itemVariants}>
          <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-8 text-white text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
              <Check className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Dziękujemy za zamówienie!</h1>
            <p className="text-lg opacity-90">Twoje zamówienie zostało przyjęte do realizacji.</p>
          </div>

          <div className="p-6">
            {/* Numer zamówienia i status */}
            <div className="flex justify-between items-center mb-6 pb-6 border-b">
              <div>
                <p className="text-sm text-gray-500">Numer zamówienia</p>
                <div className="flex items-center mt-1">
                  <p className="font-bold text-lg">{orderId}</p>
                  <button 
                    onClick={copyOrderId} 
                    className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium text-green-600 flex items-center justify-end mt-1">
                  <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  {orderData.status}
                </p>
              </div>
            </div>

            {/* Informacje o zamówieniu */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-start">
                <div className="bg-red-50 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Czas odbioru</p>
                  <p className="font-bold">{formatTime(orderData.readyTime)}</p>
                  <p className="text-sm text-red-600">{timeLeft}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-red-50 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sposób dostawy</p>
                  <p className="font-bold">{orderData.deliveryMethod}</p>
                  <p className="text-sm text-gray-600 mt-1">{orderData.address}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-red-50 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kontakt</p>
                  <p className="font-bold">+48 793 778 889</p>
                  <p className="text-sm text-gray-600 mt-1">W razie pytań</p>
                </div>
              </div>
            </div>

            {/* Szczegóły zamówienia z dodatkowymi informacjami */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Szczegóły zamówienia</h2>
              <div className="space-y-4">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between pb-4 border-b">
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">{item.name}</span>
                        <span className="ml-2 text-gray-500">x{item.quantity}</span>
                      </div>
                      {item.options.length > 0 && (
                        <p className="text-sm text-gray-500 mt-1">{item.options.join(", ")}</p>
                      )}
                    </div>
                    <p className="font-medium">{(item.price * item.quantity).toFixed(2)} zł</p>
                  </div>
                ))}

                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Suma częściowa</span>
                    <span>{orderData.subtotal.toFixed(2)} zł</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Koszt dostawy</span>
                    <span>{orderData.deliveryCost.toFixed(2)} zł</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Razem</span>
                    <span>{orderData.totalPrice.toFixed(2)} zł</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mapa dla odbioru osobistego 
            {orderData.deliveryMethod === "Odbiór osobisty" && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Lokalizacja odbioru</h2>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=800"
                    alt="Mapa lokalizacji"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link
                      href="https://maps.google.com/?q=Henryka+Sienkiewicza+26+Siedlce"
                      target="_blank"
                      className="bg-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Otwórz w Google Maps</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}*/}

            {/* Sekcja promocyjna 
            <div className="bg-red-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold mb-2 text-center">Odbierz 10% rabatu na następne zamówienie!</h2>
              <p className="text-gray-600 mb-4 text-center">Użyj kodu promocyjnego przy następnym zamówieniu:</p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="bg-white py-3 px-4 rounded-lg font-mono font-bold text-lg">
                  {promoCode}
                </div>
                <button
                  onClick={copyPromoCode}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                >
                  {promoCodeCopied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-sm text-gray-500 text-center">Kod ważny przez 7 dni od daty zamówienia.</p>
            </div>*/}

            {/* Informacje o płatności */}
            <div className="bg-gray-50 p-4 rounded-lg mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Metoda płatności</p>
                  <p className="font-medium">{orderData.paymentMethod}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Status płatności</p>
                  <p className="font-medium text-yellow-600">Oczekująca</p>
                </div>
              </div>
            </div>

            {/* Przyciski akcji */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={() => window.location.href = "/"}
              >
                Wróć do menu
              </Button>
              <Button
                variant="outline"
                className="flex-1 flex items-center justify-center gap-2"
                onClick={shareOrder}
              >
                <Share2 className="h-4 w-4" />
                <span>Udostępnij zamówienie</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

