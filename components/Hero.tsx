import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div id="hero" className="relative h-[807px] bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/slide-1.jpg-ePEAH6ALUgkwWM6R5cGoypfWWXObF8.png)",
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
          <h1 className="text-8xl text-white mb-8 font-qwigley">Zapraszamy do zamówień online!</h1>

          {/* Red Gradient Bar */}
          <div className="w-full max-w-4xl h-1.5 bg-gradient-to-r from-red-500/50 via-red-600 to-red-500/50 mb-8" />

          <Button
            onClick={() => {
              const menuElement = document.getElementById("menu")
              if (menuElement) {
                menuElement.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="mt-12 bg-[#E83419] hover:bg-[#E83419]/90 text-white px-8 py-6 text-lg rounded-lg font-medium uppercase"
          >
            Zobacz nasze menu
          </Button>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path d="M0 100H1440V50C1440 50 1320 0 720 0C120 0 0 50 0 50V100Z" fill="white" />
        </svg>
      </div>
    </div>
  )
}

