export interface Ingredient {
  id: string
  name: string
  price: number
  default: number
  max: number
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
  ingredients: Ingredient[]
  crossSaleGroups: any[]
  isBestseller?: boolean
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

