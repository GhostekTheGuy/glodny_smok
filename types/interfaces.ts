export interface CutleryOption {
  id: string;
  name: string;
  price: number;
}

export interface CutlerySelectionOption {
  maxCount: number;
  maxFreeCount: number;
  details: CutleryOption;
  isDefault: boolean;
}

export interface PackagingSelectionOption {
  packagingId: string;
  maxCount: number;
  maxFreeCount: number;
  isDefault: boolean;
}

export interface IngredientSelectionGroup {
  id: string;
  name: string;
  maxCount: number;
  minCount: number;
  partable: boolean;
  ingredientSelectionOptions: IngredientSelectionOption[];
}

export interface IngredientSelectionOption {
  maxCount: number;
  defaultCount: number;
  details: {
    id: string;
    name: string;
    photoUrl: string;
    uom: string;
    value: number;
    price: number;
  };
}

export interface CrossSaleGroup {
  id: string;
  name: string | null;
  maxCount: number;
  items: CrossSaleItem[];
}

export interface CrossSaleItem {
  id: string;
  name: string;
  photoUrl: string;
  description: string;
  standalone: boolean;
  oos: boolean;
  price: number;
  temperature: string;
  dietetaryAttributes: string[];
}

export interface Variant {
  id: string;
  name: string;
  photoUrl: string;
  description: string;
  price: number;
}
//Product
export interface Product {
  id: string;
  name: string;
  photoUrl: string;
  description: string;
  standalone: boolean;
  oos: boolean;
  price: number;
  temperature: string;
  vatPercentage: number;
  dietetaryAttributes: string[];
  categories: Category[];
  cutlerySelection: CutlerySelectionOption[];
  packagingSelection: PackagingSelectionOption[];
  ingredientSelectionGroups?: IngredientSelectionGroup[];
  variants: Variant[];
  crossSaleGroups: CrossSaleGroup[];
}

export interface Category {
  id: string;
  name: string;
}
export interface Hours {
  id: string;
  Mon: boolean;
  Tue: boolean;
  Wed: boolean;
  Thu: boolean;
  Fri: boolean;
  Sat: boolean;
  Sun: boolean;
  startTime: string;
  endTime: string;
}
export interface Menu {
  id: string;
  name: string;
  hours: Hours[];
  products: Product[];
}

export interface CartItemSubItem {
  id: string;
  groupId: string;
  name: string;
  price: number;
  count: number;
  defaultCount: number;
}
export interface CartSelectedIngredients extends CartItemSubItem {
  uom: string;
  value: number;
}
