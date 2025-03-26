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
// export type IngredientSelection = {
//   defaultCount: number;
//   maxCount: number;
//   details: IngredientDetails;
// };

// Ingredient selection group
export interface BaseIngredientSelectionGroup {
  id: string;
  name: string;
  maxCount: number;
  partable: boolean;
  ingredientSelectionOptions: BaseIngredientSelectionOption[];
}

type BaseIngredientSelectionOption = {
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
};
// Cross-sale item
type PopulatedCrossSaleItem = {
  id: string;
  name: string;
  photoUrl: string;
  description: string;
  standalone: boolean;
  oos: boolean;
  price: number;
  temperature: string;
  dietetaryAttributes: string[];
};

export type UnpopulatedCrossSaleItem = {
  id: string;
  type: string;
  price: number;
};

export type CrossSaleItem = {
  item: {
    itemId: string;
    type: string;
  };
  price: number;
};

// Cross-sale group
export interface CrossSaleGroup {
  id: string;
  name: string | null;
  maxCount: number;
}
export interface UnpopulatedCrossSaleGroup extends CrossSaleGroup {
  items: UnpopulatedCrossSaleItem[];
}
export interface PopulatedCrossSaleGroup extends CrossSaleGroup {
  items: PopulatedCrossSaleItem[];
}

// Cutlery option
export interface CutleryOption {
  id: string;
  name: string;
  price: number;
}

export type CutlerySelectionOption = {
  maxCount: number;
  maxFreeCount: number;
  details: CutleryOption;
  isDefault: boolean;
};

// Product variant
export type UnpopulatedVariant = {
  itemId: string;
  type: string;
};

export type PopulatedVariant = {
  id: string;
  name: string;
  photoUrl: string;
  description: string;
  price: number;
};
//Packaging selection
export type PackagingSelectionOption = {
  packagingId: string;
  maxCount: number;
  maxFreeCount: number;
  isDefault: boolean;
};
// Product
interface Product {
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
  ingredientSelectionGroups?: BaseIngredientSelectionGroup[];
}
export interface UnpopulatedProduct extends Product {
  variants: UnpopulatedVariant[];
  crossSaleGroups: UnpopulatedCrossSaleGroup[];
}

export interface PopulatedProduct extends Product {
  variants: PopulatedVariant[];
  crossSaleGroups: PopulatedCrossSaleGroup[];
}
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
export interface Menu {
  id: string;
  name: string;
  hours: Hours[];
  products: Product[];
}
export interface PopulatedMenu {
  id: string;
  name: string;
  hours: Hours[];
  products: PopulatedProduct[];
}

export interface UnpopulatedMenu {
  id: string;
  name: string;
  hours: Hours[];
  products: UnpopulatedProduct[];
}

// Root structure
export type MenuResponse = {
  menus: UnpopulatedMenu[];
  lastUpdate: number;
  validUntill: number;
};
//TODO: Change CartItem structure into CartProduct. CartMeal should be a combination of CartProducts?
export interface CartItem {
  cartItemId?: string;
  name: string;
  price: number;
  basePrice: number;
  quantity: number;
  photoUrl: string;
  selectedCutlery: CartItemCutlery[];
  crossSaleItems: CartItemSubItem[];
  // oos: boolean;
  type?: "PRODUCT" | "MEAL";
}

export interface CartItemCutlery {
  id: string;
  defaultCount: number;
  name: string;
  price: number;
  count: number;
}
export interface CartProduct extends CartItem {
  productId: string;
  selectedIngredients: CartSelectedIngredients[];
}
export interface CartMeal extends CartItem {
  mealId: string;
  products: CartProduct[];
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
export type CartStorage = {
  items: (CartProduct | CartMeal)[];
  timestamp: number;
};

export type CustomerDetails = {
  firstName: string;
  email: string;
  phoneNumber: string;
};

export type DeliveryDetails = {
  city: string;
  streetName: string;
  streetNumber: string;
  method: string;
};
