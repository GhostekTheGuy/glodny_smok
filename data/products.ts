import type { Menu, Product } from "./interfaces"

export const menu: Menu = {
  id: "98b56c5e-3b91-4542-9e03-d7be95675f9e",
  name: "Menu Głodnego Smoka",
  note: "Odkryj smaki Dalekiego Wschodu",
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
  categories: [
    {
      id: "26b895ed-7970-42e6-a21b-01347e0ab153",
      name: "Przystawki",
      note: "Idealne na początek",
      products: [
        {
          id: "5151e756-1e38-4dae-ba66-10c22ae69bd6",
          name: "Spring Rolls",
          note: "Bestseller",
          photoUrl:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/springrolls-StpiGd5fsedpfZrQzbdGtWmnPeUggw.png",
          description: "Chrupiące sajgonki z warzywami, podawane z sosem słodko-kwaśnym",
          standalone: true,
          oos: false,
          price: 12.99,
          temperature: "HOT",
          dietetaryAttributes: ["VEGETARIAN"],
          variants: [
            {
              itemId: "1043be72-f629-4551-85f4-c173da3e383b",
              type: "4 sztuki",
              price: 12.99,
            },
            {
              itemId: "2043be72-f629-4551-85f4-c173da3e383c",
              type: "6 sztuk",
              price: 18.99,
            },
          ],
          cutlerySelection: {
            options: [
              {
                maxCount: 2,
                maxFreeCount: 1,
                details: {
                  id: "a8fb02b7-f4f6-4cd2-b06e-4363cf6e15b4",
                  name: "Pałeczki",
                  note: "Bambusowe pałeczki",
                  price: 1.0,
                },
              },
            ],
          },
          ingredientGroups: [
            {
              name: "Składniki podstawowe",
              ingredients: [
                { id: "wrapper", name: "Papier ryżowy", price: 1.0, default: 1, max: 1 },
                { id: "noodles", name: "Makaron vermicelli", price: 2.0, default: 1, max: 2 },
              ],
            },
            {
              name: "Warzywa",
              ingredients: [
                { id: "carrots", name: "Marchewka", price: 1.0, default: 1, max: 2 },
                { id: "cabbage", name: "Kapusta", price: 1.0, default: 1, max: 2 },
                { id: "bean-sprouts", name: "Kiełki fasoli", price: 1.5, default: 1, max: 2 },
                { id: "mushrooms", name: "Grzyby mun", price: 2.0, default: 1, max: 2 },
              ],
            },
            {
              name: "Białko",
              ingredients: [{ id: "tofu", name: "Tofu", price: 3.0, default: 0, max: 2 }],
            },
            {
              name: "Zioła",
              ingredients: [
                { id: "mint", name: "Mięta", price: 1.0, default: 1, max: 2 },
                { id: "coriander", name: "Kolendra", price: 1.0, default: 1, max: 2 },
              ],
            },
          ],
          ingredientSelectionGroups: [
            {
              name: "Sosy podstawowe",
              ingredientSelections: [
                {
                  defaultCount: 1,
                  maxCount: 2,
                  details: {
                    id: "936a7bce-66d6-4419-b756-8c2059a704cd",
                    name: "Sos słodko-kwaśny",
                    note: "Klasyczny sos do sajgonek",
                    photo_url: "https://example.com/sweet-sour-sauce.jpg",
                    uom: "porcja",
                    bundles: [
                      {
                        note: "Mała porcja",
                        price: 0,
                        value: 1,
                      },
                      {
                        note: "Duża porcja",
                        price: 2.0,
                        value: 2,
                      },
                    ],
                  },
                },
              ],
              maxCount: 2,
              partable: true,
            },
            {
              name: "Sosy premium",
              ingredientSelections: [
                {
                  defaultCount: 0,
                  maxCount: 1,
                  details: {
                    id: "936a7bce-66d6-4419-b756-8c2059a704ce",
                    name: "Sos orzechowy",
                    note: "Kremowy sos z orzeszków ziemnych",
                    photo_url: "https://example.com/peanut-sauce.jpg",
                    uom: "porcja",
                    bundles: [
                      {
                        note: "Porcja",
                        price: 3.0,
                        value: 1,
                      },
                    ],
                  },
                },
                {
                  defaultCount: 0,
                  maxCount: 1,
                  details: {
                    id: "936a7bce-66d6-4419-b756-8c2059a704cf",
                    name: "Sos sriracha",
                    note: "Ostry sos chili",
                    photo_url: "https://example.com/sriracha-sauce.jpg",
                    uom: "porcja",
                    bundles: [
                      {
                        note: "Porcja",
                        price: 2.5,
                        value: 1,
                      },
                    ],
                  },
                },
              ],
              maxCount: 2,
              partable: true,
            },
          ],
          crossSaleGroups: [],
        },
        {
          id: "93b323fa-ae50-4679-b043-8e2b02680e12",
          name: "Zupa Tom Yum",
          note: "Ostra i aromatyczna",
          photoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tomyum-FdA0aA97ahN6gACwbmYOtpnh9sLogx.png",
          description: "Pikantna tajska zupa z krewetkami, grzybami i trawą cytrynową",
          standalone: true,
          oos: false,
          price: 18.99,
          temperature: "HOT",
          dietetaryAttributes: ["SPICY", "CONTAINS_SHELLFISH"],
          variants: [
            {
              itemId: "3043be72-f629-4551-85f4-c173da3e383d",
              type: "Mała",
              price: 18.99,
            },
            {
              itemId: "4043be72-f629-4551-85f4-c173da3e383e",
              type: "Duża",
              price: 24.99,
            },
          ],
          cutlerySelection: {
            options: [
              {
                maxCount: 1,
                maxFreeCount: 1,
                details: {
                  id: "b8fb02b7-f4f6-4cd2-b06e-4363cf6e15b5",
                  name: "Łyżka",
                  note: "Ceramiczna łyżka do zupy",
                  price: 0,
                },
              },
            ],
          },
          ingredientGroups: [
            {
              name: "Baza zupy",
              ingredients: [
                { id: "broth", name: "Bulion krewetkowy", price: 3.0, default: 1, max: 1 },
                { id: "coconut-milk", name: "Mleko kokosowe", price: 2.0, default: 1, max: 1 },
              ],
            },
            {
              name: "Owoce morza",
              ingredients: [{ id: "shrimp", name: "Krewetki", price: 6.0, default: 2, max: 4 }],
            },
            {
              name: "Warzywa",
              ingredients: [
                { id: "mushrooms", name: "Grzyby", price: 3.0, default: 1, max: 3 },
                { id: "tomatoes", name: "Pomidorki koktajlowe", price: 2.0, default: 1, max: 2 },
                { id: "onion", name: "Cebula czerwona", price: 1.0, default: 1, max: 2 },
              ],
            },
            {
              name: "Przyprawy i zioła",
              ingredients: [
                { id: "chili", name: "Papryczki chili", price: 1.0, default: 1, max: 3 },
                { id: "lemongrass", name: "Trawa cytrynowa", price: 1.0, default: 1, max: 2 },
                { id: "kaffir", name: "Liście kafiru", price: 1.0, default: 1, max: 2 },
                { id: "galangal", name: "Galangal", price: 1.0, default: 1, max: 2 },
                { id: "lime", name: "Limonka", price: 1.0, default: 1, max: 2 },
                { id: "coriander", name: "Kolendra", price: 1.0, default: 1, max: 2 },
              ],
            },
          ],
          ingredientSelectionGroups: [
            {
              name: "Dodatki premium",
              ingredientSelections: [
                {
                  defaultCount: 0,
                  maxCount: 1,
                  details: {
                    id: "a36a7bce-66d6-4419-b756-8c2059a704ce",
                    name: "Dodatkowe krewetki tygrysie",
                    note: "Świeże krewetki tygrysie",
                    photo_url: "https://example.com/shrimp.jpg",
                    uom: "porcja",
                    bundles: [
                      {
                        note: "3 sztuki",
                        price: 12.0,
                        value: 1,
                      },
                    ],
                  },
                },
              ],
              maxCount: 1,
              partable: true,
            },
            {
              name: "Dodatki warzywne",
              ingredientSelections: [
                {
                  defaultCount: 0,
                  maxCount: 1,
                  details: {
                    id: "b36a7bce-66d6-4419-b756-8c2059a704cf",
                    name: "Mix grzybów azjatyckich",
                    note: "Shiitake, enoki, boczniaki",
                    photo_url: "https://example.com/mushrooms.jpg",
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
                  defaultCount: 0,
                  maxCount: 1,
                  details: {
                    id: "c36a7bce-66d6-4419-b756-8c2059a704cg",
                    name: "Pak choi",
                    note: "Świeża kapusta pak choi",
                    photo_url: "https://example.com/pakchoi.jpg",
                    uom: "porcja",
                    bundles: [
                      {
                        note: "Porcja",
                        price: 5.0,
                        value: 1,
                      },
                    ],
                  },
                },
              ],
              maxCount: 2,
              partable: true,
            },
          ],
          crossSaleGroups: [],
        },
        {
          id: "c4b323fa-ae50-4679-b043-8e2b02680e13",
          name: "Sałatka Azjatycka",
          note: "Lekka i orzeźwiająca",
          photoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/salad-FdA0aA97ahN6gACwbmYOtpnh9sLogx.png",
          description: "Świeża sałatka z mieszanką sałat, mango, orzechami nerkowca i dressingiem sezamowym",
          standalone: true,
          oos: false,
          price: 15.99,
          temperature: "COLD",
          dietetaryAttributes: ["VEGETARIAN", "GLUTEN_FREE"],
          variants: [
            {
              itemId: "5043be72-f629-4551-85f4-c173da3e383f",
              type: "Mała",
              price: 15.99,
            },
            {
              itemId: "6043be72-f629-4551-85f4-c173da3e383g",
              type: "Duża",
              price: 21.99,
            },
          ],
          ingredientGroups: [
            {
              name: "Składniki podstawowe",
              ingredients: [
                { id: "mixed-greens", name: "Mieszanka sałat", price: 2.0, default: 1, max: 2 },
                { id: "mango", name: "Mango", price: 3.0, default: 1, max: 2 },
                { id: "cashews", name: "Orzechy nerkowca", price: 2.5, default: 1, max: 2 },
              ],
            },
          ],
          ingredientSelectionGroups: [
            {
              name: "Dodatki",
              ingredientSelections: [
                {
                  defaultCount: 0,
                  maxCount: 1,
                  details: {
                    id: "d36a7bce-66d6-4419-b756-8c2059a704cg",
                    name: "Kurczak grillowany",
                    note: "Dodatkowe białko",
                    photo_url: "https://example.com/grilled-chicken.jpg",
                    uom: "porcja",
                    bundles: [
                      {
                        note: "Porcja",
                        price: 6.0,
                        value: 1,
                      },
                    ],
                  },
                },
              ],
              maxCount: 1,
              partable: true,
            },
          ],
          crossSaleGroups: [],
        },
      ],
    },
  ],
}

export type { Menu, Product }

