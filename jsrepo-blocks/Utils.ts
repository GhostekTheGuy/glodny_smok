/*
	Installed from github/BarSwi/NomNomFrontSDK
*/

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
                variants,
                packagingSelection,
                cutlerySelection,
                ingredientSelectionGroups,
                ...mappedProduct
              } = product;

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
    T extends UnpopulatedProduct | PopulatedProduct,
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
    secondProduct: CartProduct,
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
      ({ name, defaultCount, price, ...rest }) => rest,
    );

    return {
      id: cartProduct.productId,
      ingredientsGroups: this.groupItems(
        cartProduct.selectedIngredients,
        OrderRequestGroupKey.Ingredients,
      ),
      crossSaleGroups: this.groupItems(
        cartProduct.crossSaleItems,
        OrderRequestGroupKey.Products,
      ),
      cutleryOptions,
    };
  }

  private groupItems<T extends CartItemSubItem>(
    items: T[] | undefined,
    key: OrderRequestGroupKey,
  ) {
    if (!items || items.length === 0) return [];

    const groups: Record<
      string,
      { groupId: string } & {
        [OrderRequestGroupKey.Ingredients]?: any[];
        [OrderRequestGroupKey.Products]?: any[];
      }
    > = {};

    for (const item of items) {
      if (!groups[item.groupId]) {
        groups[item.groupId] = { groupId: item.groupId, [key]: [] };
      }

      (groups[item.groupId][key] as any[]).push({
        id: item.id,
        count: item.count,
        ...(key === OrderRequestGroupKey.Ingredients ? { part: 1 } : {}),
      });
    }

    return Object.values(groups);
  }
}
