/*
	Installed from github/BarSwi/NomNomFrontSDK
*/

// Ingredient details
export type IngredientDetails = {
  id: string;
  name: string;
  photoUrl: string;
  uom: string;
  price: number;
  value: number;
  ingredientId: string;
};

// Ingredient selection
export type IngredientSelection = {
  defaultCount: number;
  maxCount: number;
  details: IngredientDetails;
};

// Ingredient selection group
export type IngredientSelectionOption = {
  ingredientSelections: IngredientSelection[];
  maxCount: number;
  name: string;
  partable: boolean;
};

// Cross-sale item
export type CrossSaleItem = {
  item: {
    itemId: string;
    type: string;
  };
  price: number;
};

// Cross-sale group
export type CrossSaleGroup = {
  id: string;
  name: string | null;
  maxCount: number;
  items: CrossSaleItem[];
};

// Cutlery details
export type CutleryDetails = {
  id: string;
  name: string;
  price: number;
};

// Cutlery option
export type CutlerySelectionOption = {
  maxCount: number;
  maxFreeCount: number;
  details: CutleryDetails;
  isDefault: boolean;
};

// Product variant
export type Variant = {
  itemId: string;
  type: string;
};
//Packaging selection
export type PackagingSelectionOption = {
  packagingId: string;
  maxCount: number;
  maxFreeCount: number;
  isDefault: boolean;
};
// Product
export type Product = {
  id: string;
  name: string;
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
};

// Category
export type Category = {
  id: string;
  name: string;
};

// Hours
export type Hours = {
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
};

// Menu
export type Menu = {
  id: string;
  name: string;
  hours: Hours[];
  products: Product[];
};

// Root structure
export type MenuResponse = {
  menus: Menu[];
};
//TODO: Change CartItem structure into CartProduct. CartMeal should be a combination of CartProducts?
export interface CartItem {
  cartItemId?: string;
  name: string;
  price: number;
  basePrice: number;
  quantity: number;
  photoUrl: string;
  selectedCutlery: CartItemSubItem[];
  crossSaleItems: CartItemSubItem[];
  // oos: boolean;
  type?: "PRODUCT" | "MEAL";
}
export interface CartProduct extends CartItem {
  productId: string;
  selectedIngredients: CartItemSubItem[];
}
export interface CartMeal extends CartItem {
  mealId: string;
  products: CartProduct[];
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

export type CartStorage = {
  items: (CartProduct | CartMeal)[];
  timestamp: number;
};
