export interface Bundle {
  price: number;
  value: number;
}

export interface IngredientDetails {
  id: string;
  name: string;
  photoUrl: string;
  uom: string;
  value: number;
  price: number;
  ingredientId: string;
}

export interface IngredientSelection {
  defaultCount: number;
  maxCount: number;
  details: IngredientDetails;
}

export interface IngredientSelectionGroup {
  ingredientSelections: IngredientSelection[];
  maxCount: number;
  name: string;
  partable: boolean;
}

export interface CutleryOption {
  maxCount: number;
  maxFreeCount: number;
  details: {
    id: string;
    name: string;
    price: number;
  };
}

export interface Variant {
  id: string;
  name: string;
  photoUrl: string;
  description: string;
  price: number;
}

export interface CrossSaleItem {
  price: number;
  id: string;
  name: string;
  photoUrl: string;
  description: string;
  standalone: boolean;
  oos: boolean;
  temperature: string;
  dietetaryAttributes: string[];
  variants: Variant[] | null;
  cutlerySelection: CutlerySelectionOption[] | null;
  ingredientSelectionGroups: IngredientSelectionGroup[] | null;
}

export interface CrossSaleGroup {
  id: string;
  name: string;
  maxCount: number;
  items: CrossSaleItem[];
}

export interface Category {
  id: string;
  name: string;
}
export interface IngredientSelectionOption {
  ingredientSelections: IngredientSelection[];
  maxCount: number;
  name: string;
  partable: boolean;
}
export interface CutlerySelectionOption {
  maxCount: number;
  maxFreeCount: number;
  details: {
    id: string;
    name: string;
    price: number;
  };
}
export interface Product {
  id: string;
  name: string;
  photoUrl: string;
  description: string;
  standalone: boolean;
  oos: boolean;
  price: number;
  temperature: string;
  dietetaryAttributes: string[];
  variants?: Variant[];
  cutlerySelection: CutlerySelectionOption[];
  ingredientSelection: IngredientSelectionOption[];
  packagingSelection: PackagingSelectionOption[];
  crossSaleGroups: CrossSaleGroup[];
  categories: Category[];
}
export interface PackagingSelectionOption {
  packagingId: string;
  maxCount: number;
  maxFreeCount: number;
  isDefault: boolean;
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
  products: Product[];
  hours: Hours[];
}
