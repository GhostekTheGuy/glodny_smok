import type { Menu, Product } from "./interfaces"

// Previous imports and interfaces remain the same...

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
          ingredientSelectionGroups: [
            {
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
              name: "Dodatki",
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
          ingredientSelectionGroups: [
            {
              ingredientSelections: [
                {
                  defaultCount: 0,
                  maxCount: 1,
                  details: {
                    id: "a36a7bce-66d6-4419-b756-8c2059a704ce",
                    name: "Dodatkowe krewetki",
                    note: "Świeże krewetki tygrysie",
                    photo_url: "https://example.com/shrimp.jpg",
                    uom: "porcja",
                    bundles: [
                      {
                        note: "3 sztuki",
                        price: 6.0,
                        value: 1,
                      },
                    ],
                  },
                },
                {
                  defaultCount: 0,
                  maxCount: 1,
                  details: {
                    id: "b36a7bce-66d6-4419-b756-8c2059a704cf",
                    name: "Dodatkowe grzyby",
                    note: "Mieszanka grzybów azjatyckich",
                    photo_url: "https://example.com/mushrooms.jpg",
                    uom: "porcja",
                    bundles: [
                      {
                        note: "Porcja",
                        price: 4.0,
                        value: 1,
                      },
                    ],
                  },
                },
              ],
              maxCount: 2,
              name: "Dodatki do zupy",
              partable: true,
            },
          ],
          crossSaleGroups: [],
        },
      ],
    },
    {
      id: "36b895ed-7970-42e6-a21b-01347e0ab154",
      name: "Dania główne",
      note: "Nasze specjalności",
      products: [
        {
          id: "6151e756-1e38-4dae-ba66-10c22ae69bd7",
          name: "Pad Thai",
          note: "",
          photoUrl:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pad_thai-JrVf1cffUoEIDe7uOvNGBsG0N4gtED.png",
          description: "Smażony makaron ryżowy z tofu, jajkiem, orzeszkami ziemnymi i kiełkami fasoli",
          standalone: true,
          oos: false,
          price: 26.99,
          temperature: "HOT",
          dietetaryAttributes: ["VEGETARIAN"],
          variants: [
            {
              itemId: "5043be72-f629-4551-85f4-c173da3e383f",
              type: "Wegetariański",
              price: 26.99,
            },
            {
              itemId: "6043be72-f629-4551-85f4-c173da3e383g",
              type: "Z kurczakiem",
              price: 29.99,
            },
            {
              itemId: "7043be72-f629-4551-85f4-c173da3e383h",
              type: "Z krewetkami",
              price: 32.99,
            },
          ],
          cutlerySelection: {
            options: [
              {
                maxCount: 2,
                maxFreeCount: 1,
                details: {
                  id: "c8fb02b7-f4f6-4cd2-b06e-4363cf6e15b6",
                  name: "Pałeczki",
                  note: "Bambusowe pałeczki",
                  price: 1.0,
                },
              },
              {
                maxCount: 1,
                maxFreeCount: 1,
                details: {
                  id: "d8fb02b7-f4f6-4cd2-b06e-4363cf6e15b7",
                  name: "Widelec",
                  note: "Stalowy widelec",
                  price: 0,
                },
              },
            ],
          },
          ingredientSelectionGroups: [
            {
              ingredientSelections: [
                {
                  defaultCount: 1,
                  maxCount: 2,
                  details: {
                    id: "c36a7bce-66d6-4419-b756-8c2059a704cg",
                    name: "Orzeszki ziemne",
                    note: "Prażone orzeszki ziemne",
                    photo_url: "https://example.com/peanuts.jpg",
                    uom: "porcja",
                    bundles: [
                      {
                        note: "Standardowa porcja",
                        price: 0,
                        value: 1,
                      },
                      {
                        note: "Podwójna porcja",
                        price: 2.0,
                        value: 2,
                      },
                    ],
                  },
                },
                {
                  defaultCount: 1,
                  maxCount: 2,
                  details: {
                    id: "d36a7bce-66d6-4419-b756-8c2059a704ch",
                    name: "Limonka",
                    note: "Świeża limonka",
                    photo_url: "https://example.com/lime.jpg",
                    uom: "kawałek",
                    bundles: [
                      {
                        note: "1 kawałek",
                        price: 0,
                        value: 1,
                      },
                      {
                        note: "2 kawałki",
                        price: 1.0,
                        value: 2,
                      },
                    ],
                  },
                },
              ],
              maxCount: 4,
              name: "Dodatki",
              partable: true,
            },
          ],
          crossSaleGroups: [],
        },
        {
          id: "7151e756-1e38-4dae-ba66-10c22ae69bd8",
          name: "Zielone Curry",
          note: "",
          photoUrl:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zielone_curry-unLaFrub3kgr0cJgcnaql51tVfCATI.png",
          description: "Kremowe zielone curry z mleczkiem kokosowym, warzywami i ryżem jaśminowym",
          standalone: true,
          oos: false,
          price: 28.99,
          temperature: "HOT",
          dietetaryAttributes: ["SPICY", "GLUTEN_FREE"],
          variants: [
            {
              itemId: "8043be72-f629-4551-85f4-c173da3e383i",
              type: "Wegetariańskie",
              price: 28.99,
            },
            {
              itemId: "9043be72-f629-4551-85f4-c173da3e383j",
              type: "Z kurczakiem",
              price: 31.99,
            },
            {
              itemId: "1143be72-f629-4551-85f4-c173da3e383k",
              type: "Z krewetkami",
              price: 34.99,
            },
          ],
          cutlerySelection: {
            options: [
              {
                maxCount: 2,
                maxFreeCount: 1,
                details: {
                  id: "e8fb02b7-f4f6-4cd2-b06e-4363cf6e15b8",
                  name: "Łyżka",
                  note: "Ceramiczna łyżka",
                  price: 1.0,
                },
              },
              {
                maxCount: 1,
                maxFreeCount: 1,
                details: {
                  id: "f8fb02b7-f4f6-4cd2-b06e-4363cf6e15b9",
                  name: "Widelec",
                  note: "Stalowy widelec",
                  price: 0,
                },
              },
            ],
          },
          ingredientSelectionGroups: [
            {
              ingredientSelections: [
                {
                  defaultCount: 1,
                  maxCount: 2,
                  details: {
                    id: "e36a7bce-66d6-4419-b756-8c2059a704ci",
                    name: "Dodatkowe warzywa",
                    note: "Mieszanka świeżych warzyw",
                    photo_url: "https://example.com/mixed-vegetables.jpg",
                    uom: "porcja",
                    bundles: [
                      {
                        note: "Standardowa porcja",
                        price: 0,
                        value: 1,
                      },
                      {
                        note: "Podwójna porcja",
                        price: 3.0,
                        value: 2,
                      },
                    ],
                  },
                },
                {
                  defaultCount: 0,
                  maxCount: 1,
                  details: {
                    id: "f36a7bce-66d6-4419-b756-8c2059a704cj",
                    name: "Dodatkowy ryż",
                    note: "Ryż jaśminowy",
                    photo_url: "https://example.com/jasmine-rice.jpg",
                    uom: "porcja",
                    bundles: [
                      {
                        note: "Mała porcja",
                        price: 2.0,
                        value: 1,
                      },
                    ],
                  },
                },
              ],
              maxCount: 3,
              name: "Dodatki",
              partable: true,
            },
          ],
          crossSaleGroups: [],
        },
      ],
    },
    {
      id: "46b895ed-7970-42e6-a21b-01347e0ab155",
      name: "Desery",
      note: "Słodkie zakończenie",
      products: [
        {
          id: "8151e756-1e38-4dae-ba66-10c22ae69bd9",
          name: "Mango Sticky Rice",
          note: "",
          photoUrl:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mango_sticky_rice-aWuMvgfV88dOOHXtQrZ2DLwb0h7yCq.png",
          description: "Słodki kleisty ryż z dojrzałym mango i sosem kokosowym",
          standalone: true,
          oos: false,
          price: 14.99,
          temperature: "COLD",
          dietetaryAttributes: ["VEGETARIAN", "GLUTEN_FREE"],
          variants: [],
          cutlerySelection: {
            options: [
              {
                maxCount: 1,
                maxFreeCount: 1,
                details: {
                  id: "g8fb02b7-f4f6-4cd2-b06e-4363cf6e15c0",
                  name: "Łyżeczka",
                  note: "Deserowa łyżeczka",
                  price: 0,
                },
              },
            ],
          },
          ingredientSelectionGroups: [
            {
              ingredientSelections: [
                {
                  defaultCount: 1,
                  maxCount: 2,
                  details: {
                    id: "g36a7bce-66d6-4419-b756-8c2059a704ck",
                    name: "Sos kokosowy",
                    note: "Słodki sos z mleczka kokosowego",
                    photo_url: "https://example.com/coconut-sauce.jpg",
                    uom: "porcja",
                    bundles: [
                      {
                        note: "Standardowa porcja",
                        price: 0,
                        value: 1,
                      },
                      {
                        note: "Dodatkowa porcja",
                        price: 2.0,
                        value: 2,
                      },
                    ],
                  },
                },
              ],
              maxCount: 2,
              name: "Dodatki",
              partable: true,
            },
          ],
          crossSaleGroups: [],
        },
      ],
    },
    {
      id: "burger-category",
      name: "Burgery",
      note: "Klasyczne burgery",
      products: [
        {
          id: "burger-id",
          name: "Burger Klasyczny",
          note: "Burger z wołowiną",
          photoUrl:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/burger1-Rgv2foKPCUkoPT4VLCYMoavP6SWDwA.png",
          description: "Klasyczny burger z sosem, sałatą, pomidorem, cebulą i ogórkiem.",
          standalone: true,
          oos: false,
          price: 24.99,
          temperature: "HOT",
          dietetaryAttributes: [],
          variants: [
            {
              itemId: "burger-classic",
              type: "Klasyczny",
              price: 24.99,
            },
            {
              itemId: "burger-double",
              type: "Podwójny",
              price: 29.99,
            },
          ],
          cutlerySelection: {
            options: [
              {
                maxCount: 1,
                maxFreeCount: 1,
                details: {
                  id: "burger-cutlery",
                  name: "Zestaw sztućców",
                  note: "Nóż i widelec",
                  price: 0,
                },
              },
            ],
          },
          ingredientSelectionGroups: [
            {
              ingredientSelections: [
                {
                  defaultCount: 0,
                  maxCount: 2,
                  details: {
                    id: "extra-patty",
                    name: "Dodatkowe mięso",
                    note: "Dodatkowy kotlet wołowy",
                    photo_url: "https://example.com/beef-patty.jpg",
                    uom: "sztuka",
                    bundles: [
                      {
                        note: "1 kotlet",
                        price: 8.0,
                        value: 1,
                      },
                    ],
                  },
                },
                {
                  defaultCount: 0,
                  maxCount: 2,
                  details: {
                    id: "extra-cheese",
                    name: "Dodatkowy ser",
                    note: "Plastry sera cheddar",
                    photo_url: "https://example.com/cheese.jpg",
                    uom: "plaster",
                    bundles: [
                      {
                        note: "1 plaster",
                        price: 2.0,
                        value: 1,
                      },
                    ],
                  },
                },
                {
                  defaultCount: 0,
                  maxCount: 1,
                  details: {
                    id: "bacon",
                    name: "Bekon",
                    note: "Chrupiący bekon",
                    photo_url: "https://example.com/bacon.jpg",
                    uom: "porcja",
                    bundles: [
                      {
                        note: "2 plastry",
                        price: 4.0,
                        value: 1,
                      },
                    ],
                  },
                },
                {
                  defaultCount: 0,
                  maxCount: 1,
                  details: {
                    id: "jalapenos",
                    name: "Jalapeños",
                    note: "Marynowane papryczki jalapeños",
                    photo_url: "https://example.com/jalapenos.jpg",
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
              maxCount: 6,
              name: "Dodatki",
              partable: true,
            },
            {
              ingredientSelections: [
                {
                  defaultCount: 1,
                  maxCount: 2,
                  details: {
                    id: "mayo",
                    name: "Majonez",
                    note: "Klasyczny majonez",
                    photo_url: "https://example.com/mayo.jpg",
                    uom: "porcja",
                    bundles: [
                      {
                        note: "Standardowa porcja",
                        price: 0,
                        value: 1,
                      },
                      {
                        note: "Podwójna porcja",
                        price: 1.0,
                        value: 2,
                      },
                    ],
                  },
                },
                {
                  defaultCount: 1,
                  maxCount: 2,
                  details: {
                    id: "ketchup",
                    name: "Ketchup",
                    note: "Ketchup pomidorowy",
                    photo_url: "https://example.com/ketchup.jpg",
                    uom: "porcja",
                    bundles: [
                      {
                        note: "Standardowa porcja",
                        price: 0,
                        value: 1,
                      },
                      {
                        note: "Podwójna porcja",
                        price: 1.0,
                        value: 2,
                      },
                    ],
                  },
                },
                {
                  defaultCount: 0,
                  maxCount: 2,
                  details: {
                    id: "mustard",
                    name: "Musztarda",
                    note: "Musztarda Dijon",
                    photo_url: "https://example.com/mustard.jpg",
                    uom: "porcja",
                    bundles: [
                      {
                        note: "Standardowa porcja",
                        price: 0,
                        value: 1,
                      },
                      {
                        note: "Podwójna porcja",
                        price: 1.0,
                        value: 2,
                      },
                    ],
                  },
                },
                {
                  defaultCount: 0,
                  maxCount: 1,
                  details: {
                    id: "garlic-sauce",
                    name: "Sos czosnkowy",
                    note: "Domowy sos czosnkowy",
                    photo_url: "https://example.com/garlic-sauce.jpg",
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
              maxCount: 7,
              name: "Sosy",
              partable: true,
            },
          ],
          crossSaleGroups: [],
          customizableIngredients: [
            { id: "lettuce", name: "Sałata", default: true },
            { id: "tomato", name: "Pomidor", default: true },
            { id: "onion", name: "Cebula", default: true },
            { id: "pickle", name: "Ogórek", default: true },
            { id: "cheese", name: "Ser", default: true },
          ],
        },
      ],
    },
  ],
}

export type { Menu, Product }

