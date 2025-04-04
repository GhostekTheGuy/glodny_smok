/*
	Installed from github/BarSwi/NomNomFrontSDK
*/

import { group } from "console";
import { OrderError, SdkError, SdkErrorKey } from "./errors";
import { OrderRequestGroupKey } from "./types/enums";
import {
  CartItem,
  CartItemCutlery,
  CartItemSubItem,
  CartProduct,
  PopulatedMenu,
  PopulatedProduct,
  UnpopulatedCrossSaleGroup,
  UnpopulatedMenu,
  UnpopulatedProduct,
} from "./types/types";

export class Utils {
  protected populateProductsDetails(menus: UnpopulatedMenu[]): PopulatedMenu[] {
    const additionalProducts = this.createProductsHashMap(menus);
    menus.forEach((menu) => {
      menu.products?.forEach((product: UnpopulatedProduct) => {
        product.crossSaleGroups?.forEach((csg: UnpopulatedCrossSaleGroup) => {
          csg.items?.forEach((item) => {
            if (!item) return;
            const product = additionalProducts?.get(item.id);
            if (product) {
              const {
                crossSaleGroups,
                categories,
                price,
                vatPercentage,
                variants,
                packagingSelection,
                cutlerySelection,
                ingredientSelectionGroups,
                ...mappedProduct
              } = product;

              const priceWithVAT =
                item.price + (item.price * vatPercentage) / 100;
              item.price = parseFloat(priceWithVAT.toFixed(2));
              Object.assign(item, mappedProduct);
            }
          });
        });

        //TODO: Leave only neccessary fields
        product.variants?.forEach((variant) => {
          const product = additionalProducts?.get(variant.itemId);

          if (product) {
            Object.assign(variant, {
              id: product.id,
              name: product.name,
              price: product.price,
              description: product.description,
              photoUrl: product.photoUrl,
              itemId: undefined,
              type: undefined,
            });
          }
        });
      });
    });

    return menus as any as PopulatedMenu[];
  }
  protected createProductsHashMap<
    T extends UnpopulatedProduct | PopulatedProduct
  >(menus: { products?: T[] }[]): Map<string, T> {
    const hashMap = new Map<string, T>();

    menus?.forEach((menu) => {
      menu.products?.forEach((product) => {
        hashMap.set(product.id, product);
      });
    });

    return hashMap;
  }

  protected areProductsEqual(
    firstProduct: CartProduct,
    secondProduct: CartProduct
  ) {
    return (
      firstProduct.productId === secondProduct.productId &&
      JSON.stringify(firstProduct.selectedIngredients) ===
        JSON.stringify(secondProduct.selectedIngredients) &&
      JSON.stringify(firstProduct.selectedCutlery) ===
        JSON.stringify(secondProduct.selectedCutlery) &&
      JSON.stringify(firstProduct.crossSaleItems) ===
        JSON.stringify(secondProduct.crossSaleItems)
    );
  }

  protected transformCartProduct(cartProduct: CartProduct) {
    const cutleryOptions = cartProduct.selectedCutlery.map(
      ({ name, defaultCount, price, ...rest }) => rest
    );

    return {
      id: cartProduct.productId,
      name: cartProduct.name,
      count: cartProduct.quantity,
      ingredientGroups: this.groupItems(
        cartProduct.selectedIngredients,
        OrderRequestGroupKey.Ingredients
      ),
      crossSaleGroups: this.groupItems(
        cartProduct.crossSaleItems,
        OrderRequestGroupKey.crossSaleItems
      ),
      cutleryOptions,
    };
  }

  private groupItems<T extends CartItemSubItem>(
    items: T[] | undefined,
    key: OrderRequestGroupKey
  ) {
    if (!items || items.length === 0) return [];

    const groups: Record<
      string,
      { groupId: string } & {
        [OrderRequestGroupKey.Ingredients]?: any[];
        [OrderRequestGroupKey.crossSaleItems]?: any[];
      }
    > = {};

    for (const item of items) {
      if (!groups[item.groupId]) {
        groups[item.groupId] = { groupId: item.groupId, [key]: [] };
      }

      (groups[item.groupId][key] as any[]).push({
        id: item.id,
        count: item.count,
        ...(key === OrderRequestGroupKey.Ingredients
          ? { parts: [1, 2, 3, 4] }
          : {}),
      });
    }

    return Object.values(groups);
  }
}

export const sanitizeCartProduct = (cartProduct: CartProduct): CartProduct => {
  return {
    ...cartProduct,
    selectedIngredients: cartProduct.selectedIngredients.filter(
      (ingredient) => ingredient.defaultCount !== ingredient.count
    ),
    crossSaleItems: cartProduct.crossSaleItems.filter((csi) => csi.count > 0),
    selectedCutlery: cartProduct.selectedCutlery.filter(
      (cutlery) => cutlery.defaultCount !== cutlery.count
    ),
  };
};

export const throwApiError = (
  key: SdkErrorKey,
  errorMessage: string,
  additionalData?: OrderError
) => {
  let formattedMessage = errorMessage;

  if (!additionalData) {
    throw new SdkError(key, formattedMessage);
  }

  const { productName, groupName, groupItemName } = additionalData;

  formattedMessage += groupItemName
    ? createItemErrorMessage(productName!, groupName!, groupItemName)
    : groupName
    ? createGroupErrorMessage(productName!, groupName)
    : productName
    ? createProductErrorMessage(productName)
    : "";

  throw new SdkError(key, formattedMessage);
};

//#region createProductErrorMessage
const createProductErrorMessage = (productName: string) => {
  return ` Produkt: ${productName}`;
};
//#endregion
//#region createGroupErrorMessage
const createGroupErrorMessage = (productName: string, groupName: string) => {
  return createProductErrorMessage(productName) + ` Kategoria: ${groupName}`;
};
//#endregion
//#region createItemErrorMessage
const createItemErrorMessage = (
  productName: string,
  groupName: string,
  itemName: string
) => {
  return createGroupErrorMessage(productName, groupName) + ` ${itemName}`;
};
//#endregion
