import { Button } from "@/components/ui/button";
import { useState } from "react";

export function AboutUs() {
  //Suwak
  const [opacity, setOpacity] = useState(0.6);

  // Function to update opacity based on slider value
  const handleOpacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity(parseFloat(event.target.value));
  };
  //End Suwak
  const scrollToMenu = () => {
    const menuElement = document.getElementById("menu");
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-[600px] flex items-center justify-center"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, ${opacity})), url(backgroundv2.jpeg)`,
        }}
      />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-8xl text-white mb-8 font-italiana">O nas</h2>

        {/* Red gradient bar */}
        <div className="w-full max-w-4xl h-1.5 bg-gradient-to-r from-red-500/50 via-red-600 to-red-500/50 mb-8 mx-auto" />

        <div className="space-y-6 text-white text-lg sm:text-xl">
          <p>
            Doskonale wiemy jak ważny jest proces przygotowania jedzenia, to w
            nim kryje się tajemnica smaku, dlatego w naszej restauracji robimy
            wszystko od podstaw i kurczowo trzymamy się każdego etapu.
          </p>
          <p>
            Codziennie sami przygotowujemy wszystkie składniki do naszych
            potraw, które są podawane zaraz po przyrządzeniu. Doskonale wiemy,
            że aby potrawy były smaczne i aromatyczne, to ważna jest świeżość i
            jakość produktów.
          </p>
        </div>
        {/* Slider for adjusting opacity */}
        <div className="mt-6">
          <label className="text-white text-xl mb-2 block">Testowy Suwak</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={opacity}
            onChange={handleOpacityChange}
            className="w-full"
          />
        </div>
        <p className="mt-2 text-white text-xl">Do skopiowania: {opacity}</p>
        {/* Button */}
        <Button
          onClick={scrollToMenu}
          className="mt-12 bg-[#E83419] hover:bg-[#E83419]/90 text-white px-8 py-6 text-lg rounded-lg font-medium uppercase"
        >
          Zobacz nasze menu
        </Button>
      </div>
    </section>
  );
}
