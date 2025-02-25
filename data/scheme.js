export const menu = [
  {
    id: "98b56c5e-3b91-4542-9e03-d7be95675f9e",
    name: "Pierwsze menu",
    products: [
      {
        id: "2558aabe-b7f7-45b3-9b45-7d1918b4e3eb",
        name: "Sos czosnkowy",
        photoUrl: "/placeholder.svg?height=400&width=400",
        description: "Sos czosnkowy do pizzy",
        standalone: false,
        oos: false,
        price: 9.99,
        temperature: "COLD",
        dietetaryAttributes: [],
        variants: null,
        cutlerySelection: null,
        ingredientSelectionGroups: null,
        crossSaleGroups: [],
        categories: [],
      },
      {
        id: "2d9a512d-f291-4d66-93ec-ddf04c276707",
        name: "Pizza kebab",
        photoUrl: "/placeholder.svg?height=400&width=400",
        description: "Pizza kebab opis",
        standalone: true,
        oos: false,
        price: 9.99,
        temperature: "COLD",
        dietetaryAttributes: ["VEGAN", "GLUTEN_FREE"],
        variants: [
          {
            itemId: "1043be72-f629-4551-85f4-c173da3e383b",
            type: "Standard",
            price: 9.99,
          },
          {
            itemId: "2043be72-f629-4551-85f4-c173da3e383c",
            type: "Duża",
            price: 14.99,
          },
        ],
        cutlerySelection: {
          options: [
            {
              maxCount: 2,
              maxFreeCount: 1,
              details: {
                id: "a8fb02b7-f4f6-4cd2-b06e-4363cf6e15b4",
                name: "Nóż",
                price: 16,
              },
            },
            {
              maxCount: 3,
              maxFreeCount: 2,
              details: {
                id: "b8fb02b7-f4f6-4cd2-b06e-4363cf6e15b5",
                name: "Widelec",
                price: 16,
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
                  id: "50c32771-e1ec-492c-b3c8-5c61cd969732",
                  value: 10,
                  price: 15,
                  name: "Pomidor",
                  photo_url: "/placeholder.svg?height=100&width=100",
                  uom: "kg",
                  ingredientId: "936a7bce-66d6-4419-b756-8c2059a704cd",
                },
              },
              {
                defaultCount: 2,
                maxCount: 3,
                details: {
                  id: "60c32771-e1ec-492c-b3c8-5c61cd969733",
                  value: 5,
                  price: 10,
                  name: "Cebula",
                  photo_url: "/placeholder.svg?height=100&width=100",
                  uom: "kg",
                  ingredientId: "836a7bce-66d6-4419-b756-8c2059a704ce",
                },
              },
            ],
            maxCount: 3,
            name: "Składniki",
            partable: true,
          },
        ],
        crossSaleGroups: [
          {
            id: "d2170be3-e7ed-42a4-ab73-7a4399347319",
            name: "Sosy",
            maxCount: 5,
            items: [
              {
                price: 5.99,
                id: "2558aabe-b7f7-45b3-9b45-7d1918b4e3eb",
                name: "Sos czosnkowy",
                photoUrl: "/placeholder.svg?height=100&width=100",
                description: "Sos czosnkowy do pizzy",
                standalone: false,
                oos: false,
                temperature: "COLD",
                dietetaryAttributes: [],
                variants: null,
                cutlerySelection: null,
                ingredientSelectionGroups: null,
              },
              {
                price: 5.99,
                id: "b5bb762a-d1c0-46fa-8aaa-6fda535ba970",
                name: "Sos bbq",
                photoUrl: "/placeholder.svg?height=100&width=100",
                description: "Sos bbq do pizzy",
                standalone: false,
                oos: false,
                temperature: "COLD",
                dietetaryAttributes: [],
                variants: null,
                cutlerySelection: null,
                ingredientSelectionGroups: null,
              },
            ],
          },
        ],
        categories: [
          {
            id: "26b895ed-7970-42e6-a21b-01347e0ab153",
            name: "Pizza",
          },
        ],
      },
      {
        id: "7dc9f4c3-e6c3-4554-9b83-73856eb8a53a",
        name: "Hawajska",
        photoUrl: "/placeholder.svg?height=400&width=400",
        description: "Pizza hawajska opis",
        standalone: true,
        oos: false,
        price: 9.99,
        temperature: "COLD",
        dietetaryAttributes: ["VEGAN", "GLUTEN_FREE"],
        variants: [
          {
            itemId: "3043be72-f629-4551-85f4-c173da3e383d",
            type: "Standard",
            price: 9.99,
          },
          {
            itemId: "4043be72-f629-4551-85f4-c173da3e383e",
            type: "Duża",
            price: 14.99,
          },
        ],
        cutlerySelection: {
          options: [
            {
              maxCount: 2,
              maxFreeCount: 1,
              details: {
                id: "a8fb02b7-f4f6-4cd2-b06e-4363cf6e15b4",
                name: "Nóż",
                price: 16,
              },
            },
            {
              maxCount: 3,
              maxFreeCount: 2,
              details: {
                id: "b8fb02b7-f4f6-4cd2-b06e-4363cf6e15b5",
                name: "Widelec",
                price: 16,
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
                  id: "70c32771-e1ec-492c-b3c8-5c61cd969734",
                  value: 8,
                  price: 12,
                  name: "Ananas",
                  photo_url: "/placeholder.svg?height=100&width=100",
                  uom: "kg",
                  ingredientId: "736a7bce-66d6-4419-b756-8c2059a704cf",
                },
              },
              {
                defaultCount: 2,
                maxCount: 3,
                details: {
                  id: "80c32771-e1ec-492c-b3c8-5c61cd969735",
                  value: 7,
                  price: 18,
                  name: "Szynka",
                  photo_url: "/placeholder.svg?height=100&width=100",
                  uom: "kg",
                  ingredientId: "636a7bce-66d6-4419-b756-8c2059a704cg",
                },
              },
            ],
            maxCount: 3,
            name: "Składniki",
            partable: true,
          },
        ],
        crossSaleGroups: [
          {
            id: "6e208486-17ac-4729-b1b4-4a37aaf4c027",
            name: "Dodatkowa pizza",
            maxCount: 3,
            items: [
              {
                price: 9.99,
                id: "2d9a512d-f291-4d66-93ec-ddf04c276707",
                name: "Pizza kebab",
                photoUrl: "/placeholder.svg?height=400&width=400",
                description: "Pizza kebab opis",
                standalone: true,
                oos: false,
                temperature: "COLD",
                dietetaryAttributes: ["VEGAN", "GLUTEN_FREE"],
                variants: [
                  {
                    itemId: "1043be72-f629-4551-85f4-c173da3e383b",
                    type: "Standard",
                    price: 9.99,
                  },
                  {
                    itemId: "2043be72-f629-4551-85f4-c173da3e383c",
                    type: "Duża",
                    price: 14.99,
                  },
                ],
                cutlerySelection: null,
                ingredientSelectionGroups: null,
              },
            ],
          },
        ],
        categories: [
          {
            id: "26b895ed-7970-42e6-a21b-01347e0ab153",
            name: "Pizza",
          },
        ],
      },
      {
        id: "a4144caf-5373-42cf-aadd-41571ca63c0f",
        name: "Pepperoni",
        photoUrl: "/placeholder.svg?height=400&width=400",
        description: "Pizza pepperoni opis",
        standalone: true,
        oos: false,
        price: 9.99,
        temperature: "COLD",
        dietetaryAttributes: ["VEGAN", "GLUTEN_FREE"],
        variants: [
          {
            itemId: "5043be72-f629-4551-85f4-c173da3e383f",
            type: "Standard",
            price: 9.99,
          },
          {
            itemId: "6043be72-f629-4551-85f4-c173da3e383g",
            type: "Duża",
            price: 14.99,
          },
        ],
        cutlerySelection: {
          options: [
            {
              maxCount: 2,
              maxFreeCount: 1,
              details: {
                id: "a8fb02b7-f4f6-4cd2-b06e-4363cf6e15b4",
                name: "Nóż",
                price: 16,
              },
            },
            {
              maxCount: 3,
              maxFreeCount: 2,
              details: {
                id: "b8fb02b7-f4f6-4cd2-b06e-4363cf6e15b5",
                name: "Widelec",
                price: 16,
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
                  id: "90c32771-e1ec-492c-b3c8-5c61cd969736",
                  value: 6,
                  price: 20,
                  name: "Pepperoni",
                  photo_url: "/placeholder.svg?height=100&width=100",
                  uom: "kg",
                  ingredientId: "536a7bce-66d6-4419-b756-8c2059a704ch",
                },
              },
              {
                defaultCount: 1,
                maxCount: 2,
                details: {
                  id: "50c32771-e1ec-492c-b3c8-5c61cd969732",
                  value: 10,
                  price: 15,
                  name: "Ser",
                  photo_url: "/placeholder.svg?height=100&width=100",
                  uom: "kg",
                  ingredientId: "936a7bce-66d6-4419-b756-8c2059a704cd",
                },
              },
            ],
            maxCount: 3,
            name: "Składniki",
            partable: true,
          },
        ],
        crossSaleGroups: [
          {
            id: "d2170be3-e7ed-42a4-ab73-7a4399347319",
            name: "Sosy",
            maxCount: 5,
            items: [
              {
                price: 5.99,
                id: "2558aabe-b7f7-45b3-9b45-7d1918b4e3eb",
                name: "Sos czosnkowy",
                photoUrl: "/placeholder.svg?height=100&width=100",
                description: "Sos czosnkowy do pizzy",
                standalone: false,
                oos: false,
                temperature: "COLD",
                dietetaryAttributes: [],
                variants: null,
                cutlerySelection: null,
                ingredientSelectionGroups: null,
              },
              {
                price: 5.99,
                id: "b5bb762a-d1c0-46fa-8aaa-6fda535ba970",
                name: "Sos bbq",
                photoUrl: "/placeholder.svg?height=100&width=100",
                description: "Sos bbq do pizzy",
                standalone: false,
                oos: false,
                temperature: "COLD",
                dietetaryAttributes: [],
                variants: null,
                cutlerySelection: null,
                ingredientSelectionGroups: null,
              },
            ],
          },
        ],
        categories: [
          {
            id: "26b895ed-7970-42e6-a21b-01347e0ab153",
            name: "Pizza",
          },
        ],
      },
      {
        id: "b5144caf-5373-42cf-aadd-41571ca63c0g",
        name: "Burger Deluxe",
        photoUrl: "/placeholder.svg?height=400&width=400",
        description: "Wyjątkowy burger z trzema rodzajami dodatków do wyboru",
        standalone: true,
        oos: false,
        price: 24.99,
        temperature: "HOT",
        dietetaryAttributes: [],
        variants: [
          {
            itemId: "7043be72-f629-4551-85f4-c173da3e383h",
            type: "Standard",
            price: 24.99,
          },
          {
            itemId: "8043be72-f629-4551-85f4-c173da3e383i",
            type: "Duży",
            price: 29.99,
          },
        ],
        cutlerySelection: {
          options: [
            {
              maxCount: 2,
              maxFreeCount: 1,
              details: {
                id: "c8fb02b7-f4f6-4cd2-b06e-4363cf6e15b6",
                name: "Nóż",
                price: 16,
              },
            },
            {
              maxCount: 3,
              maxFreeCount: 2,
              details: {
                id: "d8fb02b7-f4f6-4cd2-b06e-4363cf6e15b7",
                name: "Widelec",
                price: 16,
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
                  id: "a0c32771-e1ec-492c-b3c8-5c61cd969737",
                  value: 6,
                  price: 8,
                  name: "Sałata",
                  photo_url: "/placeholder.svg?height=100&width=100",
                  uom: "szt",
                  ingredientId: "436a7bce-66d6-4419-b756-8c2059a704ci",
                },
              },
              {
                defaultCount: 1,
                maxCount: 2,
                details: {
                  id: "b0c32771-e1ec-492c-b3c8-5c61cd969738",
                  value: 4,
                  price: 6,
                  name: "Pomidor",
                  photo_url: "/placeholder.svg?height=100&width=100",
                  uom: "szt",
                  ingredientId: "336a7bce-66d6-4419-b756-8c2059a704cj",
                },
              },
            ],
            maxCount: 4,
            name: "Warzywa",
            partable: true,
          },
          {
            ingredientSelections: [
              {
                defaultCount: 1,
                maxCount: 2,
                details: {
                  id: "c0c32771-e1ec-492c-b3c8-5c61cd969739",
                  value: 5,
                  price: 12,
                  name: "Ser cheddar",
                  photo_url: "/placeholder.svg?height=100&width=100",
                  uom: "plaster",
                  ingredientId: "236a7bce-66d6-4419-b756-8c2059a704ck",
                },
              },
              {
                defaultCount: 0,
                maxCount: 2,
                details: {
                  id: "d0c32771-e1ec-492c-b3c8-5c61cd969740",
                  value: 3,
                  price: 14,
                  name: "Ser pleśniowy",
                  photo_url: "/placeholder.svg?height=100&width=100",
                  uom: "plaster",
                  ingredientId: "136a7bce-66d6-4419-b756-8c2059a704cl",
                },
              },
            ],
            maxCount: 4,
            name: "Sery",
            partable: true,
          },
          {
            ingredientSelections: [
              {
                defaultCount: 1,
                maxCount: 2,
                details: {
                  id: "e0c32771-e1ec-492c-b3c8-5c61cd969741",
                  value: 2,
                  price: 10,
                  name: "Ketchup",
                  photo_url: "/placeholder.svg?height=100&width=100",
                  uom: "porcja",
                  ingredientId: "036a7bce-66d6-4419-b756-8c2059a704cm",
                },
              },
              {
                defaultCount: 1,
                maxCount: 2,
                details: {
                  id: "f0c32771-e1ec-492c-b3c8-5c61cd969742",
                  value: 2,
                  price: 10,
                  name: "Majonez",
                  photo_url: "/placeholder.svg?height=100&width=100",
                  uom: "porcja",
                  ingredientId: "936a7bce-66d6-4419-b756-8c2059a704cn",
                },
              },
              {
                defaultCount: 0,
                maxCount: 2,
                details: {
                  id: "g0c32771-e1ec-492c-b3c8-5c61cd969743",
                  value: 2,
                  price: 12,
                  name: "Sos BBQ",
                  photo_url: "/placeholder.svg?height=100&width=100",
                  uom: "porcja",
                  ingredientId: "836a7bce-66d6-4419-b756-8c2059a704co",
                },
              },
            ],
            maxCount: 6,
            name: "Sosy",
            partable: true,
          },
        ],
        crossSaleGroups: [
          {
            id: "e2170be3-e7ed-42a4-ab73-7a4399347320",
            name: "Dodatki",
            maxCount: 5,
            items: [
              {
                price: 9.99,
                id: "c558aabe-b7f7-45b3-9b45-7d1918b4e3ec",
                name: "Frytki",
                photoUrl: "/placeholder.svg?height=100&width=100",
                description: "Chrupiące frytki",
                standalone: false,
                oos: false,
                temperature: "HOT",
                dietetaryAttributes: [],
                variants: null,
                cutlerySelection: null,
                ingredientSelectionGroups: null,
              },
              {
                price: 7.99,
                id: "d5bb762a-d1c0-46fa-8aaa-6fda535ba971",
                name: "Napój",
                photoUrl: "/placeholder.svg?height=100&width=100",
                description: "Cola, Sprite lub Fanta",
                standalone: false,
                oos: false,
                temperature: "COLD",
                dietetaryAttributes: [],
                variants: null,
                cutlerySelection: null,
                ingredientSelectionGroups: null,
              },
            ],
          },
        ],
        categories: [
          {
            id: "36b895ed-7970-42e6-a21b-01347e0ab154",
            name: "Burgery",
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
        startTime: "00:00",
        endTime: "23:30",
      },
    ],
  },
]

export default menu

