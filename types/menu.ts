// export interface Bundle {
//   note: string;
// }

export interface IngredientDetails {
  id: string;
  name: string;
  photoUrl: string;
  uom: string;
  price: number;
  value: number;
}

export interface IngredientSelection {
  defaultCount: number;
  maxCount: number;
  details: IngredientDetails;
}

export interface IngredientSelectionGroup {
  name: string;
  ingredientSelections: IngredientSelection[];
  maxCount: number;
  partable: boolean;
}
export type PackagingSelectionOption = {
  packagingId: string;
  maxCount: number;
  maxFreeCount: number;
  isDefault: boolean;
};

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
  itemId: string;
  type: string;
}

export interface CrossSaleProduct {
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
  cutlerySelection?: {
    options: CutleryOption[];
  };
  ingredientSelectionGroups?: IngredientSelectionGroup[];
}

export interface CrossSaleItem {
  item: CrossSaleProduct;
  price: number;
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
  note: string;
}

export type CutleryDetails = {
  id: string;
  name: string;
  note: string;
  price: number;
};

export type CutlerySelectionOption = {
  maxCount: number;
  maxFreeCount: number;
  details: CutleryDetails;
  isDefault: boolean;
};

export type IngredientSelectionOption = {
  ingredientSelections: IngredientSelection[];
  maxCount: number;
  name: string;
  partable: boolean;
};
export interface Product {
  id: string;
  name: string;
  note: string;
  photoUrl: string;
  description: string;
  standalone: boolean;
  oos: boolean;
  price: number;
  temperature: string;
  dietetaryAttributes: string[];
  variants: Variant[];
  cutlerySelection: CutlerySelectionOption[];
  ingredientSelection: IngredientSelectionOption[];
  packagingSelection: PackagingSelectionOption[];
  crossSaleGroups: CrossSaleGroup[];
  categories: Category[];
}

export interface MenuHours {
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
  note: string;
  products: Product[];
  hours: MenuHours[];
}

export type CartItemSubItem = {
  id: string;
  //TODO: Change for groupId
  groupName?: string;
  name: string;
  price: number;
  count: number;
  defaultCount?: number;
};
