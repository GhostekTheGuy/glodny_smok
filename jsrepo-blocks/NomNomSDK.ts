/*
	Installed from github/BarSwi/NomNomFrontSDK
*/

/*
	Installed from github/BarSwi/NomNomFrontSDK
*/

/*
	Installed from github/BarSwi/NomNomFrontSDK
*/

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { sanitizeCartProduct, throwApiError, Utils } from "./Utils";
import {
  CartItem,
  CartMeal,
  CartProduct,
  CartStorage,
  CustomerDetails,
  DeliveryDetails,
  Menu,
  MenuResponse,
  PopulatedMenu,
  PopulatedProduct,
  UnpopulatedMenu,
} from "./types/types";
import { ItemType } from "./types/enums";

export class NomNomSDK extends Utils {
  private client: AxiosInstance;
  private fetchedMenus: PopulatedMenu[] = [];
  private fetchedStore: any = null;
  private productsMap: Map<string, PopulatedProduct> = new Map();
  private localStorageKey: string = "currentCart";
  constructor(baseURL: string = "http://localhost:8000/api") {
    super();
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getStore(restaurantId: string): Promise<any> {
    if (this.fetchedStore) return this.fetchedStore;
    try {
      const response: AxiosResponse<any> = await this.client.get(
        `/store-settings-and-status?store=${restaurantId}`
      );
      this.fetchedStore = response.data;
      console.log(this.fetchedStore);
      return this.fetchedStore;
    } catch (error) {
      this.handleError(error);
    }
  }
  /**
   * Fetches the current menus for a specified restaurant.
   *
   * This method sends a GET request to the `/menus/current` endpoint with the `store`
   * query parameter set to the provided restaurant ID. It retrieves a list of menus
   * that are currently active for the given restaurant.
   *
   * @param {string} restaurandId - The unique identifier of the restaurant for which to fetch current menus.
   *
   * @returns {Promise<any[]>} A promise that resolves to an array of current menus. Each menu object in the array
   * may contain details such as the menu name, items, availability, and other metadata.
   *
   * @throws {Error} Throws an error if the API request fails. The error may include details
   * from the server or a general error message if the request could not be completed.
   *
   * @example
   * const sdk = new ApiSDK();
   *
   * sdk.getCurrentMenus("restaurant123")
   *   .then((menus) => {
   *     console.log("Current Menus:", menus);
   *   })
   *   .catch((error) => {
   *     console.error("Error fetching current menus:", error);
   *   });
   */
  async getCurrentMenus(restaurantId: string): Promise<PopulatedMenu[]> {
    if (typeof window === "undefined") return [];
    if (this.fetchedMenus?.length > 0) return this.fetchedMenus;
    try {
      const storedMenusData = localStorage.getItem("currentMenus");
      const menusData = storedMenusData ? JSON.parse(storedMenusData) : null;

      const now = Date.now();
      const timestamp = await this.getMenusTimestamp(restaurantId);
      const isStale =
        !menusData ||
        menusData.validUntill <= now ||
        menusData.timestamp <= timestamp;

      if (isStale) {
        const { data }: AxiosResponse<MenuResponse> = await this.client.get(
          `/menus/current?store=${restaurantId}`
        );

        const updatedMenus = {
          menus: data.menus,
          timestamp,
          validUntill: data.validUntill,
        };

        localStorage.setItem("currentMenus", JSON.stringify(updatedMenus));
        this.fetchedMenus = this.populateProductsDetails(data.menus);
      } else {
        this.fetchedMenus = this.populateProductsDetails(menusData.menus);
      }

      this.productsMap = this.createProductsHashMap(this.fetchedMenus);
      return this.fetchedMenus;
    } catch (error) {
      this.handleError(error);
    }
  }
  /**
   * Adds a product to the cart. If the product already exists, it increments the quantity by 1.
   * If the product doesn't exist, it adds a new product to the cart with a unique ID.
   *
   * @param {CartProduct} cartProduct - The product to be added to the cart.
   * @returns {void}
   *
   * @example
   * const cartProduct: CartProduct = {
   *   productId: "123",
   *   name: "Sample Product",
   *   price: 10.99,
   *   basePrice: 10.99,
   *   quantity: 1,
   *   photoUrl: "https://example.com/photo.jpg",
   *   type: "PRODUCT",
   *   selectedIngredients: [{ id: "ing1", name: "Cheese", price: 0.5, count: 1 }],
   *   selectedCutlery: [{ id: "cut1", name: "Fork", price: 0, count: 1 }],
   *   crossSaleItems: [{ id: "cross1", name: "Drink", price: 2.99, count: 1 }]
   * };
   *
   * cart.addProductToCart(cartProduct);
   */

  addProductToCart(cartProduct: CartProduct) {
    let storedData = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '{"items": []}'
    );

    const sanitisedProduct = sanitizeCartProduct(cartProduct);

    const existingItemIndex = storedData.items?.findIndex((item) =>
      this.areProductsEqual(item, sanitisedProduct)
    );

    if (existingItemIndex > -1) {
      storedData.items[existingItemIndex].quantity += 1;
    } else {
      sanitisedProduct.cartItemId = crypto.randomUUID();
      sanitisedProduct.type = ItemType.PRODUCT;
      storedData.items.push(sanitisedProduct);
    }

    storedData.timestamp = new Date().toISOString();
    localStorage.setItem(this.localStorageKey, JSON.stringify(storedData));
  }

  /**
   * Edits a product in the cart by replacing it with a new cart product.
   * Updates the cart's timestamp to reflect the change.
   *
   * @param {string} cartItemId - The ID of the cart item to be edited.
   * @param {CartProduct} cartProduct - The new product data to replace the existing cart item.
   * @returns {void}
   *
   * @example
   * const updatedCartProduct: CartProduct = {
   *   productId: "123",
   *   name: "Updated Product",
   *   price: 11.99,
   *   basePrice: 11.99,
   *   quantity: 2,
   *   photoUrl: "https://example.com/photo.jpg",
   *   type: "PRODUCT",
   *   selectedIngredients: [{ id: "ing1", name: "Cheese", price: 0.5, count: 1 }]
   * };
   *
   * cart.editProductInCart("cartItemId123", updatedCartProduct);
   */

  updateProductInCart(cartItemId: string, cartProduct: CartProduct) {
    let storedData = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '{"items": []}'
    );
    if (!storedData) return;

    const sanitisedProduct = sanitizeCartProduct(cartProduct);

    const itemIndex = storedData.items?.findIndex(
      (item: CartProduct) => item.cartItemId === cartItemId
    );

    if (itemIndex !== -1) {
      const itemToChange = storedData.items[itemIndex];

      storedData.items[itemIndex] = {
        ...itemToChange,
        ...sanitisedProduct,
        cartItemId,
        quantity: itemToChange.quantity,
      };
      storedData.timestamp = new Date().toISOString();
      localStorage.setItem(this.localStorageKey, JSON.stringify(storedData));
    }

    return storedData.items;
  }

  /**
   * Removes an item from the cart based on its ID. Updates the cart's timestamp after removal.
   *
   * @param {string} cartItemId - The ID of the cart item to be removed.
   * @returns {void}
   *
   * @example
   * cart.removeItemFromCart("cartItemId123");
   */
  removeItemFromCart(cartItemId: string) {
    let storedData = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '{"items": []}'
    );
    if (!storedData) return;

    storedData.items = storedData.items.filter(
      (item: CartProduct) => item.cartItemId !== cartItemId
    );

    storedData.timestamp = new Date().toISOString();
    localStorage.setItem(this.localStorageKey, JSON.stringify(storedData));
    //@ts-ignore
    window.dispatchEvent(new Event("cart-update"));
  }

  /**
   * Retrieves all meals from the cart, filtering the items by type 'MEAL'.
   *
   * @returns {CartMeal[]} - An array of CartMeal objects found in the cart.
   *
   * @example
   * const meals = cart.getMealsFromCart();
   * console.log(meals);
   */
  getMealsFromCart() {
    const items = this.getItemsFromCart();
    return items?.filter((item) => item.type === ItemType.MEAL) as CartMeal[];
  }

  /**
   * Retrieves all products from the cart, filtering the items by type 'PRODUCT'.
   *
   * @returns {CartProduct[]} - An array of CartProduct objects found in the cart.
   *
   * @example
   * const products = cart.getProductsFromCart();
   * console.log(products);
   */
  getProductsFromCart() {
    const items = this.getItemsFromCart();
    return items?.filter(
      (item) => item.type === ItemType.PRODUCT
    ) as CartProduct[];
  }

  /**
   * Retrieves all items from the cart, whether products or meals.
   *
   * @returns {(CartProduct | CartMeal)[]} - An array of CartProduct or CartMeal objects from the cart.
   *
   * @example
   * const items = cart.getItemsFromCart();
   * console.log(items);
   */
  getItemsFromCart(): (CartProduct | CartMeal)[] {
    let storedData = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '{"items": []}'
    );
    return storedData ? storedData.items : [];
  }

  /**
   * Updates the quantity of a specific item in the cart.
   * The cart's timestamp is updated to reflect the quantity change.
   *
   * @param {string} cartItemId - The ID of the cart item whose quantity will be updated.
   * @param {number} newQuantity - The new quantity for the cart item.
   * @returns {void}
   *
   * @example
   * cart.updateItemQuantity("cartItemId123", 3);
   */
  updateItemQuantity(cartItemId: string, newQuantity: number) {
    let storedData = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '{"items": []}'
    );
    if (!storedData) return;

    const itemIndex = storedData.items?.findIndex(
      (item: CartProduct) => item.cartItemId === cartItemId
    );

    if (itemIndex !== -1) {
      storedData.items[itemIndex].quantity = newQuantity;
      storedData.timestamp = new Date().toISOString();
      localStorage.setItem(this.localStorageKey, JSON.stringify(storedData));
    }
    //@ts-ignore
    window.dispatchEvent(new Event("cart-update"));
  }

  async placeOrder(
    restaurandId: string,
    customerDetails: CustomerDetails,
    paymentMethod: string,
    deliveryMethod: string,
    deliveryDetails?: DeliveryDetails
  ) {
    //TODO: Compare timestamps and perform additional frontend validation.
    if (!this.fetchedMenus)
      this.fetchedMenus = await this.getCurrentMenus(restaurandId);
    const cartStorage = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '{"items": []}'
    );
    if (cartStorage.items.length == 0) return;

    const requestData = { meals: [{ id: "ALONE", products: [] as any }] };
    cartStorage.items?.forEach((cartItem) => {
      if (cartItem.type == ItemType.PRODUCT) {
        //meals[0] is hardcoded index of meals that contains standalone produuctss
        requestData.meals[0].products.push(
          this.transformCartProduct(cartItem as CartProduct)
        );
      }
    });

    try {
      const response: AxiosResponse<any> = await this.client.post(
        `/create-order`,
        {
          ...requestData,
          store: restaurandId,
          deliveryMethod,
          deliveryDetails:
            deliveryMethod != "DELIVERY" ? null : deliveryDetails,
          customerDetails,
          paymentMethod,
        }
      );

      return response;
    } catch (error: any) {
      throwApiError(error.response?.data?.key, error.response?.data?.message);
    }
  }

  getProductById(productId: string) {
    return this.productsMap.get(productId);
  }

  async getAvailablePaymentMethods(
    storeId: string = "TODO dodac polaczenie z konkretnymi lokalami"
  ) {
    const response: AxiosResponse<any> = await this.client.get(`/paymethods`);

    return response.data;
  }

  async getMenusTimestamp(storeId: string) {
    const response: AxiosResponse<any> = await this.client.get(
      `/menus/timestamp?store=${storeId}`
    );

    console.log(response);
    return response.data?.timestamp;
  }
  /**
   * Error handler for Axios requests.
   * @param error - The error object.
   */
  private handleError(error: any): void {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || error.message);
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}
