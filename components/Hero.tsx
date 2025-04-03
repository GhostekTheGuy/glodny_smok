import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Hero() {
  const [font, setFont] = useState<string>("font-italiana");

  // Function to handle font change
  const handleFontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFont(event.target.value); // Update the font state
  };
  return (
    <div id="hero" className="relative h-[807px] bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(background.jpeg)",
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
          <h1 className={`text-8xl text-white mb-8 ${font}`}>
            Zapraszamy do zamówień online!
          </h1>
          {/* Font Change Checkboxes */}
          <div className="mb-8">
            <label className="text-white text-lg">Testowy Font:</label>
            <div className="flex justify-center space-x-6 mt-4">
              <div>
                <input
                  type="radio"
                  id="font-italiana"
                  name="font"
                  value="font-italiana"
                  checked={font === "font-italiana"}
                  onChange={handleFontChange}
                />
                <label htmlFor="font-italiana" className="text-white ml-2">
                  Italiana
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="font-merienda"
                  name="font"
                  value="font-merienda"
                  checked={font === "font-merienda"}
                  onChange={handleFontChange}
                />
                <label htmlFor="font-merienda" className="text-white ml-2">
                  Merienda
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="font-quattrocento"
                  name="font"
                  value="font-quattrocento"
                  checked={font === "font-quattrocento"}
                  onChange={handleFontChange}
                />
                <label htmlFor="font-quattrocento" className="text-white ml-2">
                  Quattrocento
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="font-alice"
                  name="font"
                  value="font-alice"
                  checked={font === "font-alice"}
                  onChange={handleFontChange}
                />
                <label htmlFor="font-alice" className="text-white ml-2">
                  Alice
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="font-serif"
                  name="font"
                  value="font-serif"
                  checked={font === "font-serif"}
                  onChange={handleFontChange}
                />
                <label htmlFor="font-serif" className="text-white ml-2">
                  Serif
                </label>
              </div>
            </div>
          </div>
          {/* Red Gradient Bar */}
          <div className="w-full max-w-4xl h-1.5 bg-gradient-to-r from-red-500/50 via-red-600 to-red-500/50 mb-8" />

          <div className="mb-16 md:mb-12">
            <Button
              onClick={() => {
                const menuElement = document.getElementById("menu");
                if (menuElement) {
                  menuElement.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="mt-12 bg-[#E83419] hover:bg-[#E83419]/90 text-white px-8 py-6 text-lg rounded-lg font-medium uppercase"
            >
              Zobacz nasze menu
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full md:h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 100H1440V50C1440 50 1320 0 720 0C120 0 0 50 0 50V100Z"
            fill="white"
            className="md:rounded-t-[50%]"
          />
        </svg>
      </div>
    </div>
  );
}
