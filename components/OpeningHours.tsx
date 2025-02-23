"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const weekHours = [
  { day: "Poniedziałek", hours: "11:00-23:00" },
  { day: "Wtorek", hours: "11:00-23:00" },
  { day: "Środa", hours: "11:00-23:00" },
  { day: "Czwartek", hours: "11:00-23:00" },
  { day: "Piątek", hours: "11:00-23:00" },
  { day: "Sobota", hours: "11:00-23:00" },
  { day: "Niedziela", hours: "11:00-23:00" },
]

const getCurrentDayHours = () => {
  const today = new Date().getDay()
  // Convert Sunday from 0 to 6 to match our array
  const adjustedDay = today === 0 ? 6 : today - 1
  return weekHours[adjustedDay].hours
}

export function OpeningHours() {
  const [isHoursOpen, setIsHoursOpen] = useState(false)

  return (
    <div className="relative -mt-32">
      {/* Biała fala na górze */}
      <div
        className="absolute -top-20 left-0 right-0 h-64 md:h-32 bg-white"
        style={{
          clipPath: "ellipse(80% 100% at 50% 100%)",
        }}
      />

      {/* Zawartość na białym tle */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-14 px-4 md:px-32 py-16">
            {/* Logo */}
            <div className="w-56">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo2-wt0Uvyl9RbKC1Z4YQtVFtSWcFv2xkI.png"
                alt="Głodny Smok Logo"
                width={224}
                height={100}
                className="h-auto w-full"
                loading="lazy"
              />
            </div>

            {/* Pionowe linie */}
            <div className="hidden md:block h-[120px] w-[1px] bg-black/50" />

            {/* Godziny otwarcia */}
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-black">Godziny otwarcia</h2>
              <div className="relative">
                <button
                  onClick={() => setIsHoursOpen(!isHoursOpen)}
                  className="flex items-center gap-2 text-black text-xl hover:text-gray-700"
                >
                  <span>Dzisiaj: {getCurrentDayHours()}</span>
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ rotate: isHoursOpen ? -180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="mt-1"
                  >
                    <path d="M8 12L2 4L14 4L8 12Z" fill="#000000" />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {isHoursOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-20 overflow-hidden"
                    >
                      {weekHours.map((item, index) => (
                        <motion.div
                          key={index}
                          className="py-2 text-black text-lg cursor-default rounded-md px-2"
                          whileHover={{
                            backgroundColor: "rgba(0,0,0,0.05)",
                            transition: { duration: 0.2 },
                          }}
                        >
                          <span className="font-medium">{item.day}:</span> {item.hours}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="w-[180px] h-[3px] mt-4 bg-gradient-to-r from-[#7D1E16]/50 via-[#E33729] to-[#B02A20]/50" />
            </div>

            <div className="hidden md:block h-[120px] w-[1px] bg-black/50" />

            {/* Kontakt */}
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-black">Kontakt</h2>
              <span className="text-black text-xl">+48 793 778 889</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

