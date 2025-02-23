export interface Bundle {
  note: string
  price: number
  value: number
}

export interface IngredientDetails {
  id: string
  name: string
  note: string
  photo_url: string
  uom: string
  bundles: Bundle[]
}

export interface IngredientSelection {
  defaultCount: number
  maxCount: number
  details: IngredientDetails
}

export interface IngredientSelectionGroup {
  ingredientSelections: IngredientSelection[]
  maxCount: number
  name: string
  partable: boolean
}

export interface CutleryDetails {
  id: string
  name: string
  note: string
  price: number
}

export interface CutleryOption {
  maxCount: number
  maxFreeCount: number
  details: CutleryDetails
}

export interface CutlerySelection {
  options: CutleryOption[]
}

export interface Variant {
  itemId: string
  type: string
}

export interface CrossSaleItem {
  item: Product
  price: number
}

export interface CrossSaleGroup {
  id: string
  name: string
  note: string | null
  maxCount: number
  items: CrossSaleItem[]
}

export interface Category {
  id: string
  name: string
  note: string
}

export interface Product {
  id: string
  name: string
  note?: string
  photoUrl: string
  description: string
  standalone: boolean
  oos: boolean
  price: number
  temperature: "HOT" | "COLD"
  dietetaryAttributes: string[]
  variants: Variant[] | null
  cutlerySelection: CutlerySelection | null
  ingredientSelectionGroups: IngredientSelectionGroup[] | null
  crossSaleGroups: CrossSaleGroup[] | null
  categories: Category[]
}

export interface Hours {
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
}

export interface Menu {
  id: string
  name: string
  note: string
  products: Product[]
  hours: Hours[]
}

