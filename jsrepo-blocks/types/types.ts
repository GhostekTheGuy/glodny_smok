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
export type UnpopulatedCrossSaleItem = {
  item: {
    itemId: string;
    type: string;
  };
  price: number;
};
export type PopulatedCrossSaleItem = {
  item: CrossSaleProduct;
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

export interface CutleryOption {
  maxCount: number;
  maxFreeCount: number;
  details: {
    id: string;
    name: string;
    price: number;
  };
}

// Cutlery option
export type CutlerySelectionOption = {
  maxCount: number;
  maxFreeCount: number;
  details: {
    id: string;
    name: string;
    price: number;
  };
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
  dietetaryAttributes: string[];
  categories: Category[];
  cutlerySelection: CutlerySelectionOption[];
  ingredientSelection: IngredientSelectionOption[];
  packagingSelection: PackagingSelectionOption[];
}

type CrossSaleProduct = {
  id: string;
  name: string;
  photoUrl: string;
  description: string;
  standalone: boolean;
  oos: boolean;
  price: number;
  temperature: string;
  dietetaryAttributes: string[];
  variants?: UnpopulatedVariant[];
  cutlerySelection: CutlerySelectionOption[];
  ingredientSelection?: IngredientSelectionOption[];
};
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
