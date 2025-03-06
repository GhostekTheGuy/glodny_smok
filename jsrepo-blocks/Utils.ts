/*
	jsrepo 1.41.3
	Installed from github/BarSwi/NomNomFrontSDK
	5.03.2025
*/

import { OrderRequestGroupKey } from "./types/enums";
import { CartItem, CartProduct, Menu, Product } from "./types/types";

export class Utils {
  protected populateCrossSaleItems(menus: Menu[]) {
    const crossSaleProducts = this.createProductsHashMap(menus);
    menus.forEach((menu) => {
      menu.products?.forEach((product) => {
        product.crossSaleGroups?.forEach((csg) => {
          csg.items?.forEach((item) => {
            if (!item.item) return;
            const { itemId: id } = item?.item;
            const product = crossSaleProducts?.get(id);
            if (id && product) {
              const { crossSaleGroups, categories, ...mappedProduct } = product;

              Object.assign(item, mappedProduct);
              delete item.item;
            }
          });
        });
      });
    });

    return menus;
  }
  protected createProductsHashMap(menus: Menu[]) {
    var hashMap = new Map<string, Product>();
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
    return {
      id: cartProduct.productId,
      ingredientsGroups: this.groupItems(
        cartProduct.selectedIngredients,
        OrderRequestGroupKey.Ingredients,
      ),
      cutleryGroups: this.groupItems(
        cartProduct.selectedCutlery,
        OrderRequestGroupKey.Cutlery,
      ),
      crossSaleGroups: this.groupItems(
        cartProduct.crossSaleItems,
        OrderRequestGroupKey.Products,
      ),
    };
  }

  private groupItems<
    T extends { groupName: string; id: string; count: number },
  >(items: T[] | undefined, key: OrderRequestGroupKey) {
    if (!items || items.length === 0) return [];

    const groups: Record<
      string,
      { groupName: string } & {
        [OrderRequestGroupKey.Ingredients]?: any[];
        [OrderRequestGroupKey.Cutlery]?: any[];
        [OrderRequestGroupKey.Products]?: any[];
      }
    > = {};

    for (const item of items) {
      if (!groups[item.groupName]) {
        groups[item.groupName] = { groupName: item.groupName, [key]: [] };
      }

      (groups[item.groupName][key] as any[]).push({
        id: item.id,
        count: item.count,
        ...(key === OrderRequestGroupKey.Ingredients ? { part: 1 } : {}),
      });
    }

    return Object.values(groups);
  }
}
