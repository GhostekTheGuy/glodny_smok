export interface Ingredient {
  id: string
  name: string
  price: number
  default: number
  max: number
}

export interface IngredientGroup {
  name: string
  ingredients: Ingredient[]
}

export interface Product {
  id: string
  name: string
  note?: string
  photoUrl?: string
  description: string
  standalone: boolean
  oos: boolean
  price: number
  temperature: string
  dietetaryAttributes: string[]
  variants: { itemId: string; type: string; price: number }[]
  cutlerySelection?: { options: { maxCount: number; maxFreeCount: number; details: any }[] }
  ingredientGroups: IngredientGroup[]
  ingredientSelectionGroups: {
    name: string
    ingredientSelections: {
      defaultCount: number
      maxCount: number
      details: {
        id: string
        name: string
        note: string
        photo_url: string
        uom: string
        bundles: {
          note: string
          price: number
          value: number
        }[]
      }
    }[]
    maxCount: number
    partable: boolean
  }[]
  crossSaleGroups: any[]
}

export interface Menu {
  id: string
  name: string
  note: string
  hours: {
    id: string
    Mon: boolean
    Tue: boolean
    Wed: boolean
    Thu: boolean
    Fri: boolean
    Sat: boolean
    Sun: boolean
    startTime: string
    endTime: string
  }[]
  categories: {
    id: string
    name: string
    note: string
    products: Product[]
  }[]
}

