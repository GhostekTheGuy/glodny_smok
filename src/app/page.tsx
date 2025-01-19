'use client'

import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { MenuHeader } from './components/MenuHeader';
import { RecommendationsSlider } from './components/RecommendationsSlider';
import { ProductGrid } from './components/ProductGrid';
import { SubMenu } from './components/SubMenu';
import { CategoryDisplay } from './components/CategoryDisplay';
import { CartProvider } from './contexts/cart-context';
import { products } from './data/products';
import { Footer } from './components/Footer';

export default function Home() {
  const [isHoursOpen, setIsHoursOpen] = useState(false);
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true });
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
  const [sortOrder, setSortOrder] = useState('default');

  const weekHours = [
    { day: 'Poniedziałek', hours: '11:00-23:00' },
    { day: 'Wtorek', hours: '11:00-23:00' },
    { day: 'Środa', hours: '11:00-23:00' },
    { day: 'Czwartek', hours: '11:00-23:00' },
    { day: 'Piątek', hours: '11:00-23:00' },
    { day: 'Sobota', hours: '11:00-23:00' },
    { day: 'Niedziela', hours: '11:00-23:00' },
  ];

  const getCurrentDayHours = () => {
    const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    const currentDay = days[new Date().getDay()];
    return weekHours.find(item => item.day === currentDay)?.hours || '';
  };

  useEffect(() => {
    const handleSmoothScroll = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (anchor) {
        const targetID = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetID);
        if (targetElement) {
          event.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);

    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isInView]);

  return (
    <main>
      {/* Hero section z tłem */}
      <div className="relative h-[75vh]">
        {/* Tło */}
        <div className="absolute inset-0">
          <Image
            src="/slide-1.jpg"
            alt="Hero background"
            fill
            className="object-cover brightness-[0.5] contrast-[1.25] saturate-[1.54]"
            style={{
              filter: 'contrast(125%) brightness(75%)'
            }}
          />
          {/* Gradient nakładany na zdjęcie */}
          <div 
            className="absolute inset-0" 
            style={{
              background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(217,217,217,0) 100%)',
              height: '708px',
              marginTop: '38px'
            }}
          />
        </div>

        {/* Navbar */}
        <nav className="relative z-10 flex flex-col md:flex-row justify-between items-center px-4 md:px-32 py-4 md:py-16">
          <div className="flex justify-center md:justify-start w-full md:w-auto">
            <Image
              src="/logo.png"
              alt="Głodny Smok"
              width={147}
              height={66}
            />
          </div>
          
          <div className="flex items-center gap-4 md:gap-12 mt-4 md:mt-0">
            <div className="flex gap-4 md:gap-12 text-white">
              <a href="#about" className="hover:text-gray-300">O NAS</a>
              <a href="#" className="hover:text-gray-300">MENU</a>
              <a 
                href="https://www.facebook.com/GlodnySmok" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gray-300"
              >
                FACEBOOK
              </a>
            </div>
            <button className="bg-[#E8341A] text-white px-4 md:px-8 py-2 md:py-3 rounded-lg hover:bg-[#E8341A]/90">
              ZAMÓW ONLINE
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10  flex flex-col items-center justify-center mt-20">
          <motion.h1 
            className="text-8xl font-qwigley font-medium text-white text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Zapraszamy do zamówień online!
          </motion.h1>
          
          {/* Czerwona linia */}
          <div className="w-[1097px] h-[5px] bg-gradient-to-r my-4" />

          <motion.button 
            className="bg-[#E8341A] text-white px-12 py-3 rounded-lg hover:bg-[#E8341A]/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ZAMÓW ONLINE
          </motion.button>
        </div>
      </div>

      {/* Sekcja godzin otwarcia z białym tłem */}
      <div className="relative">
        {/* Biała fala na górze */}
        <div className="absolute -top-20 left-0 right-0 h-32 bg-white" style={{
          clipPath: 'ellipse(70% 100% at 50% 100%)'
        }} />

        {/* Zawartość na białym tle */}
        <div className="relative bg-white">
          <div className="flex justify-center items-center gap-14 px-32 py-16">
            {/* Logo */}
            <Image
              src="/logo2.png"
              alt="Głodny Smok"
              width={224}
              height={100}
            />

            {/* Pionowe linie */}
            <div className="h-[120px] w-[1px] bg-black/50" />

            {/* Godziny otwarcia */}
            <div className="flex flex-col">
              <h2 className="text-4xl font-semibold mb-4 text-black">Godziny otwarcia</h2>
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
                    <path 
                      d="M8 12L2 4L14 4L8 12Z" 
                      fill="#000000"
                    />
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
                            transition: { duration: 0.2 }
                          }}
                        >
                          <span className="font-medium">{item.day}:</span> {item.hours}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="w-[180px] h-[3px] mt-auto bg-gradient-to-r from-[#7D1E16]/50 via-[#E33729] to-[#B02A20]/50" />
            </div>

            {/* Druga pionowa linia */}
            <div className="h-[120px] w-[1px] bg-black/50" />

            {/* Kontakt */}
            <div className="flex flex-col">
              <h2 className="text-4xl font-semibold mb-4 text-black ">Kontakt</h2>
              <span className="text-black text-xl">+48 793 778 889</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sekcja O NAS */}
      <div id="about" ref={aboutRef} className="w-full bg-[#1D1A19] py-8 flex flex-col items-center gap-7 scroll-mt-24">
        {/* Tytuł */}
        <h2 className="text-[#F7F6F6] text-8xl font-medium font-qwigley">O nas</h2>
        
        {/* Czerwony gradient bar */}
        <div className="w-full h-[3px] bg-gradient-to-r from-[#7D1E16]/50 via-[#E33729] to-[#B02A20]/50" />
        
        {/* Tekst */}
        <p className="text-white text-center max-w-[573px] leading-relaxed">
          Doskonale wiemy jak ważny jest proces przygotowania jedzenia, to w nim kryje się tajemnica smaku, 
          dlatego w naszej restauracji robimy wszystko od podstaw i kurczowo trzymamy się każdego etapu. 
          Codziennie sami przygotowujemy wszystkie składniki do naszych potraw, które są podawane zaraz 
          po przyrządzeniu. Doskonale wiemy, że aby potrawy były smaczne i aromatyczne, to ważna jest 
          świeżość i jakość produktów
        </p>

        {/* Przycisk */}
        <motion.button 
          className="bg-[#E8341A] text-white px-8 py-3 rounded-lg mt-7 shadow-lg shadow-black/25"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ZOBACZ NASZE MENU
        </motion.button>
      </div>

      {/* Nowa sekcja menu restauracji */}
      <CartProvider>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <MenuHeader />
          <RecommendationsSlider products={products.filter(p => p.isBestseller)} />
          <CategoryDisplay category={selectedCategory} />
          <SubMenu 
            categories={[
              'Wszystkie', 'Chrupiące specjały', 'Kubełki', 'Przekąski', 'Z kurczakiem', 'Z wołowiną', 'Wege', 'Z krewetkami', 'Ryż smażony', 'Zupy', 'Thai Curry', 'Makarony', 'Pad Thai', 'Kebab', 'Sałatki', 'Napoje'
            ]}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <ProductGrid 
            products={products}
            selectedCategory={selectedCategory}
            sortOrder={sortOrder}
          />
        </div>
      </CartProvider>

      {/* Dodanie stopki */}
      <Footer />
    </main>
  );
}