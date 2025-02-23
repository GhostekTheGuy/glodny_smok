export const menu = [
  {
    id: "98b56c5e-3b91-4542-9e03-d7be95675f9e",
    name: "Pierwsze menu",
    note: "",
    products: [
      {
        id: "38ff5964-3564-4efe-b947-0c703435991f",
        name: "Pizza kebab",
        note: "Pizza kebab notatka.",
        photoUrl: "https://example.com/product-image.jpg",
        description: "Pizza kebab opis",
        standalone: true,
        oos: false,
        price: 9.99,
        temperature: "COLD",
        dietetaryAttributes: ["VEGAN", "GLUTEN_FREE"],
        variants: [
          {
            itemId: "1043be72-f629-4551-85f4-c173da3e383b",
            type: "PRODUCT",
          },
          {
            itemId: "1043be72-f629-4551-85f4-c173da3e383b",
            type: "PRODUCT",
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
                note: "note",
                price: 16,
              },
            },
            {
              maxCount: 3,
              maxFreeCount: 2,
              details: {
                id: "a8fb02b7-f4f6-4cd2-b06e-4363cf6e15b4",
                name: "Nóż",
                note: "note",
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
                  id: "936a7bce-66d6-4419-b756-8c2059a704cd",
                  name: "Pomidor",
                  note: "Fresh organic tomatoes",
                  photo_url: "https://example.com/tomato.jpg",
                  uom: "kg",
                  bundles: [
                    {
                      note: "Small pack",
                      price: 2.5,
                      value: 1,
                    },
                    {
                      note: "Large pack",
                      price: 10,
                      value: 5,
                    },
                  ],
                },
              },
              {
                defaultCount: 2,
                maxCount: 3,
                details: {
                  id: "936a7bce-66d6-4419-b756-8c2059a704cd",
                  name: "Pomidor",
                  note: "Fresh organic tomatoes",
                  photo_url: "https://example.com/tomato.jpg",
                  uom: "kg",
                  bundles: [
                    {
                      note: "Small pack",
                      price: 2.5,
                      value: 1,
                    },
                    {
                      note: "Large pack",
                      price: 10,
                      value: 5,
                    },
                  ],
                },
              },
            ],
            maxCount: 3,
            name: "Toppings",
            partable: true,
          },
        ],
        crossSaleGroups: [
          {
            id: "d2170be3-e7ed-42a4-ab73-7a4399347319",
            name: "Sosy",
            note: null,
            maxCount: 5,
            items: [
              {
                item: {
                  id: "2558aabe-b7f7-45b3-9b45-7d1918b4e3eb",
                  name: "Sos czosnkowy",
                  note: "Sos czosnkowy notatka.",
                  photoUrl: "https://example.com/product-image.jpg",
                  description: "Sos czosnkowy do pizzy",
                  standalone: false,
                  oos: false,
                  price: 9.99,
                  temperature: "COLD",
                  dietetaryAttributes: [],
                  variants: null,
                  cutlerySelection: null,
                  ingredientSelectionGroups: null,
                },
                price: 5,
              },
              {
                item: {
                  id: "b5bb762a-d1c0-46fa-8aaa-6fda535ba970",
                  name: "Sos bbq",
                  note: "Sos bbq notatka.",
                  photoUrl: "https://example.com/product-image.jpg",
                  description: "Sos bbq do pizzy",
                  standalone: false,
                  oos: false,
                  price: 9.99,
                  temperature: "COLD",
                  dietetaryAttributes: [],
                  variants: null,
                  cutlerySelection: null,
                  ingredientSelectionGroups: null,
                },
                price: 6,
              },
            ],
          },
        ],
        categories: [],
      },
      {
        id: "5151e756-1e38-4dae-ba66-10c22ae69bd6",
        name: "Pepperoni",
        note: "This is a seasonal special.",
        photoUrl: "https://example.com/product-image.jpg",
        description: "Pizza pepperoni opis",
        standalone: true,
        oos: false,
        price: 9.99,
        temperature: "COLD",
        dietetaryAttributes: ["VEGAN", "GLUTEN_FREE"],
        variants: [
          {
            itemId: "1043be72-f629-4551-85f4-c173da3e383b",
            type: "PRODUCT",
          },
          {
            itemId: "1043be72-f629-4551-85f4-c173da3e383b",
            type: "PRODUCT",
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
                note: "note",
                price: 16,
              },
            },
            {
              maxCount: 3,
              maxFreeCount: 2,
              details: {
                id: "a8fb02b7-f4f6-4cd2-b06e-4363cf6e15b4",
                name: "Nóż",
                note: "note",
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
                  id: "936a7bce-66d6-4419-b756-8c2059a704cd",
                  name: "Pomidor",
                  note: "Fresh organic tomatoes",
                  photo_url: "https://example.com/tomato.jpg",
                  uom: "kg",
                  bundles: [
                    {
                      note: "Small pack",
                      price: 2.5,
                      value: 1,
                    },
                    {
                      note: "Large pack",
                      price: 10,
                      value: 5,
                    },
                  ],
                },
              },
              {
                defaultCount: 2,
                maxCount: 3,
                details: {
                  id: "936a7bce-66d6-4419-b756-8c2059a704cd",
                  name: "Pomidor",
                  note: "Fresh organic tomatoes",
                  photo_url: "https://example.com/tomato.jpg",
                  uom: "kg",
                  bundles: [
                    {
                      note: "Small pack",
                      price: 2.5,
                      value: 1,
                    },
                    {
                      note: "Large pack",
                      price: 10,
                      value: 5,
                    },
                  ],
                },
              },
            ],
            maxCount: 3,
            name: "Toppings",
            partable: true,
          },
        ],
        crossSaleGroups: [
          {
            id: "6e208486-17ac-4729-b1b4-4a37aaf4c027",
            name: "Dodatkowa pizza",
            note: null,
            maxCount: 3,
            items: [
              {
                item: {
                  id: "93b323fa-ae50-4679-b043-8e2b02680e12",
                  name: "Hawajska",
                  note: "This is a seasonal special.",
                  photoUrl: "https://example.com/product-image.jpg",
                  description: "Pizza hawajska opis",
                  standalone: true,
                  oos: false,
                  price: 9.99,
                  temperature: "COLD",
                  dietetaryAttributes: ["VEGAN", "GLUTEN_FREE"],
                  cutlerySelection: {
                    options: [
                      {
                        maxCount: 2,
                        maxFreeCount: 1,
                        details: {
                          id: "a8fb02b7-f4f6-4cd2-b06e-4363cf6e15b4",
                          name: "Nóż",
                          note: "note",
                          price: 16,
                        },
                      },
                      {
                        maxCount: 3,
                        maxFreeCount: 2,
                        details: {
                          id: "a8fb02b7-f4f6-4cd2-b06e-4363cf6e15b4",
                          name: "Nóż",
                          note: "note",
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
                            id: "936a7bce-66d6-4419-b756-8c2059a704cd",
                            name: "Pomidor",
                            note: "Fresh organic tomatoes",
                            photo_url: "https://example.com/tomato.jpg",
                            uom: "kg",
                            bundles: [
                              {
                                note: "Small pack",
                                price: 2.5,
                                value: 1,
                              },
                              {
                                note: "Large pack",
                                price: 10,
                                value: 5,
                              },
                            ],
                          },
                        },
                        {
                          defaultCount: 2,
                          maxCount: 3,
                          details: {
                            id: "936a7bce-66d6-4419-b756-8c2059a704cd",
                            name: "Pomidor",
                            note: "Fresh organic tomatoes",
                            photo_url: "https://example.com/tomato.jpg",
                            uom: "kg",
                            bundles: [
                              {
                                note: "Small pack",
                                price: 2.5,
                                value: 1,
                              },
                              {
                                note: "Large pack",
                                price: 10,
                                value: 5,
                              },
                            ],
                          },
                        },
                      ],
                      maxCount: 3,
                      name: "Toppings",
                      partable: true,
                    },
                  ],
                },
                price: 5,
              },
              {
                item: {
                  id: "93b323fa-ae50-4679-b043-8e2b02680e12",
                  name: "Hawajska",
                  note: "This is a seasonal special.",
                  photoUrl: "https://example.com/product-image.jpg",
                  description: "Pizza hawajska opis",
                  standalone: true,
                  oos: false,
                  price: 9.99,
                  temperature: "COLD",
                  dietetaryAttributes: ["VEGAN", "GLUTEN_FREE"],
                  cutlerySelection: {
                    options: [
                      {
                        maxCount: 2,
                        maxFreeCount: 1,
                        details: {
                          id: "a8fb02b7-f4f6-4cd2-b06e-4363cf6e15b4",
                          name: "Nóż",
                          note: "note",
                          price: 16,
                        },
                      },
                      {
                        maxCount: 3,
                        maxFreeCount: 2,
                        details: {
                          id: "a8fb02b7-f4f6-4cd2-b06e-4363cf6e15b4",
                          name: "Nóż",
                          note: "note",
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
                            id: "936a7bce-66d6-4419-b756-8c2059a704cd",
                            name: "Pomidor",
                            note: "Fresh organic tomatoes",
                            photo_url: "https://example.com/tomato.jpg",
                            uom: "kg",
                            bundles: [
                              {
                                note: "Small pack",
                                price: 2.5,
                                value: 1,
                              },
                              {
                                note: "Large pack",
                                price: 10,
                                value: 5,
                              },
                            ],
                          },
                        },
                        {
                          defaultCount: 2,
                          maxCount: 3,
                          details: {
                            id: "936a7bce-66d6-4419-b756-8c2059a704cd",
                            name: "Pomidor",
                            note: "Fresh organic tomatoes",
                            photo_url: "https://example.com/tomato.jpg",
                            uom: "kg",
                            bundles: [
                              {
                                note: "Small pack",
                                price: 2.5,
                                value: 1,
                              },
                              {
                                note: "Large pack",
                                price: 10,
                                value: 5,
                              },
                            ],
                          },
                        },
                      ],
                      maxCount: 3,
                      name: "Toppings",
                      partable: true,
                    },
                  ],
                },
                price: 5,
              },
            ],
          },
        ],
        categories: [
          {
            id: "26b895ed-7970-42e6-a21b-01347e0ab153",
            name: "Pizza",
            note: "",
          },
        ],
      },
      {
        id: "93b323fa-ae50-4679-b043-8e2b02680e12",
        name: "Hawajska",
        note: "This is a seasonal special.",
        photoUrl: "https://example.com/product-image.jpg",
        description: "Pizza hawajska opis",
        standalone: true,
        oos: false,
        price: 9.99,
        temperature: "COLD",
        dietetaryAttributes: ["VEGAN", "GLUTEN_FREE"],
        variants: [
          {
            itemId: "1043be72-f629-4551-85f4-c173da3e383b",
            type: "PRODUCT",
          },
          {
            itemId: "1043be72-f629-4551-85f4-c173da3e383b",
            type: "PRODUCT",
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
                note: "note",
                price: 16,
              },
            },
            {
              maxCount: 3,
              maxFreeCount: 2,
              details: {
                id: "a8fb02b7-f4f6-4cd2-b06e-4363cf6e15b4",
                name: "Nóż",
                note: "note",
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
                  id: "936a7bce-66d6-4419-b756-8c2059a704cd",
                  name: "Pomidor",
                  note: "Fresh organic tomatoes",
                  photo_url: "https://example.com/tomato.jpg",
                  uom: "kg",
                  bundles: [
                    {
                      note: "Small pack",
                      price: 2.5,
                      value: 1,
                    },
                    {
                      note: "Large pack",
                      price: 10,
                      value: 5,
                    },
                  ],
                },
              },
              {
                defaultCount: 2,
                maxCount: 3,
                details: {
                  id: "936a7bce-66d6-4419-b756-8c2059a704cd",
                  name: "Pomidor",
                  note: "Fresh organic tomatoes",
                  photo_url: "https://example.com/tomato.jpg",
                  uom: "kg",
                  bundles: [
                    {
                      note: "Small pack",
                      price: 2.5,
                      value: 1,
                    },
                    {
                      note: "Large pack",
                      price: 10,
                      value: 5,
                    },
                  ],
                },
              },
            ],
            maxCount: 3,
            name: "Toppings",
            partable: true,
          },
        ],
        crossSaleGroups: [],
        categories: [
          {
            id: "26b895ed-7970-42e6-a21b-01347e0ab153",
            name: "Pizza",
            note: "",
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

