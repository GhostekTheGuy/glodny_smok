export const localMenuData = [
  {
    id: "98b56c5e-3b91-4542-9e03-d7be95675f9e",
    name: "Menu Głodnego Smoka",
    note: "Odkryj smaki Dalekiego Wschodu",
    products: [
      {
        id: "38ff5964-3564-4efe-b947-0c703435991f",
        name: "Pizza Kebab",
        note: "Bestseller",
        photoUrl:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pizza-kebab-4Wd5qqbPxPxPPBPPPPPPPP.jpg",
        description:
          "Soczyste mięso kebab, świeże warzywa, oryginalny sos czosnkowy i czerwona cebula na cienkim cieście",
        standalone: true,
        oos: false,
        price: 32.99,
        temperature: "HOT",
        dietetaryAttributes: [],
        variants: [
          {
            itemId: "kebab-small",
            type: "30 cm",
            price: 32.99,
          },
          {
            itemId: "kebab-large",
            type: "40 cm",
            price: 42.99,
          },
        ],
        cutlerySelection: {
          options: [
            {
              maxCount: 2,
              maxFreeCount: 1,
              details: {
                id: "pizza-cutter",
                name: "Nóż do pizzy",
                note: "Jednorazowy nóż do pizzy",
                price: 1.0,
              },
            },
          ],
        },
        ingredientSelectionGroups: [
          {
            name: "Składniki podstawowe",
            ingredientSelections: [
              {
                defaultCount: 1,
                maxCount: 2,
                details: {
                  id: "kebab-meat",
                  name: "Mięso kebab",
                  note: "Dodatkowa porcja mięsa",
                  photo_url: "/placeholder.svg",
                  uom: "porcja",
                  bundles: [
                    {
                      note: "Porcja",
                      price: 8.0,
                      value: 1,
                    },
                  ],
                },
              },
              {
                defaultCount: 1,
                maxCount: 2,
                details: {
                  id: "onion",
                  name: "Cebula czerwona",
                  note: "Świeża czerwona cebula",
                  photo_url: "/placeholder.svg",
                  uom: "porcja",
                  bundles: [
                    {
                      note: "Porcja",
                      price: 2.0,
                      value: 1,
                    },
                  ],
                },
              },
            ],
            maxCount: 4,
            partable: true,
          },
        ],
        crossSaleGroups: [
          {
            id: "sauces",
            name: "Sosy",
            note: "Dodatkowe sosy do pizzy",
            maxCount: 5,
            items: [
              {
                item: {
                  id: "sauce-garlic",
                  name: "Sos czosnkowy",
                  note: "Oryginalny sos czosnkowy",
                  photoUrl: "/placeholder.svg",
                  description: "Kremowy sos czosnkowy",
                  standalone: false,
                  oos: false,
                  price: 4.0,
                  temperature: "COLD",
                  dietetaryAttributes: [],
                },
                price: 4.0,
              },
              {
                item: {
                  id: "sauce-spicy",
                  name: "Sos ostry",
                  note: "Pikantny sos chili",
                  photoUrl: "/placeholder.svg",
                  description: "Ostry sos na bazie chili",
                  standalone: false,
                  oos: false,
                  price: 4.0,
                  temperature: "COLD",
                  dietetaryAttributes: ["SPICY"],
                },
                price: 4.0,
              },
            ],
          },
        ],
        categories: [
          {
            id: "pizza",
            name: "Pizza",
            note: "Nasze pizze",
          },
        ],
      },
      {
        id: "5151e756-1e38-4dae-ba66-10c22ae69bd6",
        name: "Spring Rolls",
        note: "Bestseller",
        photoUrl:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/springrolls-StpiGd5fsedpfZrQzbdGtWmnPeUggw.png",
        description:
          "Chrupiące sajgonki z warzywami, podawane z sosem słodko-kwaśnym",
        standalone: true,
        oos: false,
        price: 18.99,
        temperature: "HOT",
        dietetaryAttributes: ["VEGETARIAN"],
        variants: [
          {
            itemId: "spring-rolls-4",
            type: "4 sztuki",
            price: 18.99,
          },
          {
            itemId: "spring-rolls-6",
            type: "6 sztuk",
            price: 26.99,
          },
        ],
        cutlerySelection: {
          options: [
            {
              maxCount: 2,
              maxFreeCount: 1,
              details: {
                id: "chopsticks",
                name: "Pałeczki",
                note: "Bambusowe pałeczki",
                price: 1.0,
              },
            },
          ],
        },
        ingredientSelectionGroups: [
          {
            name: "Sosy",
            ingredientSelections: [
              {
                defaultCount: 1,
                maxCount: 2,
                details: {
                  id: "sweet-sour-sauce",
                  name: "Sos słodko-kwaśny",
                  note: "Klasyczny sos do sajgonek",
                  photo_url: "/placeholder.svg",
                  uom: "porcja",
                  bundles: [
                    {
                      note: "Porcja",
                      price: 0,
                      value: 1,
                    },
                  ],
                },
              },
              {
                defaultCount: 0,
                maxCount: 1,
                details: {
                  id: "chili-sauce",
                  name: "Sos chili",
                  note: "Ostry sos chili",
                  photo_url: "/placeholder.svg",
                  uom: "porcja",
                  bundles: [
                    {
                      note: "Porcja",
                      price: 2.0,
                      value: 1,
                    },
                  ],
                },
              },
            ],
            maxCount: 3,
            partable: true,
          },
        ],
        crossSaleGroups: [],
        categories: [
          {
            id: "starters",
            name: "Przystawki",
            note: "Nasze przystawki",
          },
        ],
      },
      {
        id: "93b323fa-ae50-4679-b043-8e2b02680e12",
        name: "Pad Thai",
        note: "Pikantne 🌶️",
        photoUrl:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pad-thai-4Wd5qqbPxPxPPBPPPPPPPP.jpg",
        description:
          "Klasyczny makaron pad thai z tofu, kiełkami fasoli, orzechami ziemnymi i limonką",
        standalone: true,
        oos: false,
        price: 32.99,
        temperature: "HOT",
        dietetaryAttributes: ["VEGETARIAN", "SPICY"],
        variants: [
          {
            itemId: "pad-thai-vege",
            type: "Wegetariański",
            price: 32.99,
          },
          {
            itemId: "pad-thai-chicken",
            type: "Z kurczakiem",
            price: 36.99,
          },
          {
            itemId: "pad-thai-shrimp",
            type: "Z krewetkami",
            price: 42.99,
          },
        ],
        cutlerySelection: {
          options: [
            {
              maxCount: 2,
              maxFreeCount: 1,
              details: {
                id: "chopsticks",
                name: "Pałeczki",
                note: "Bambusowe pałeczki",
                price: 1.0,
              },
            },
          ],
        },
        ingredientSelectionGroups: [
          {
            name: "Dodatki",
            ingredientSelections: [
              {
                defaultCount: 1,
                maxCount: 2,
                details: {
                  id: "peanuts",
                  name: "Orzeszki ziemne",
                  note: "Prażone orzeszki ziemne",
                  photo_url: "/placeholder.svg",
                  uom: "porcja",
                  bundles: [
                    {
                      note: "Porcja",
                      price: 2.0,
                      value: 1,
                    },
                  ],
                },
              },
              {
                defaultCount: 1,
                maxCount: 2,
                details: {
                  id: "lime",
                  name: "Limonka",
                  note: "Świeża limonka",
                  photo_url: "/placeholder.svg",
                  uom: "porcja",
                  bundles: [
                    {
                      note: "Porcja",
                      price: 1.0,
                      value: 1,
                    },
                  ],
                },
              },
            ],
            maxCount: 4,
            partable: true,
          },
        ],
        crossSaleGroups: [
          {
            id: "drinks",
            name: "Napoje",
            note: "Orzeźwiające napoje",
            maxCount: 3,
            crossSaleSelection: [
              {
                item: {
                  id: "thai-tea",
                  name: "Thai Tea",
                  note: "Tajska herbata z mlekiem",
                  photoUrl: "/placeholder.svg",
                  description: "Tradycyjna tajska herbata z mlekiem",
                  standalone: true,
                  oos: false,
                  price: 12.99,
                  temperature: "COLD",
                  dietetaryAttributes: [],
                },
                price: 12.99,
              },
            ],
          },
        ],
        categories: [
          {
            id: "main-courses",
            name: "Dania główne",
            note: "Nasze dania główne",
          },
          {
            id: "noodles",
            name: "Makarony",
            note: "Nasze makarony",
          },
        ],
      },
    ],
    hours: [
      {
        id: "52163cdf-db20-4bf2-b3d5-bc1c4cdd2c20",
        Mon: true,
        Tue: true,
        Wed: true,
        Thu: true,
        Fri: true,
        Sat: true,
        Sun: true,
        startTime: "11:00",
        endTime: "22:00",
      },
    ],
  },
];
