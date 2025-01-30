/*
	jsrepo 1.29.1
	Installed from github/BarSwi/NomNomFrontSDK
	30.01.2025
*/

import { Menu, Product } from "./types";

export class Utils {
  protected populateCrossSaleItems(menus: Menu[]) {
    const crossSaleProducts = this.createProductsHashMap(menus);
    menus.forEach((menu) => {
      menu.categories?.forEach((category) => {
        category.products?.forEach((product) => {
          product.crossSaleGroups?.forEach((csg) => {
            csg.items?.forEach((item) => {
              const id = item.item.itemId;
              const product = crossSaleProducts?.get(id);
              if (id && product) {
                const { variants, crossSaleGroups, ...mappedProduct } = product;

                (item.item as any) = mappedProduct;
              }
            });
          });
        });
      });
    });

    return menus;
  }
  protected createProductsHashMap(menus: Menu[]) {
    var hashMap = new Map<string, Product>();
    menus?.forEach((menu) => {
      menu.categories?.forEach((category) => {
        category.products?.forEach((product) => {
          hashMap.set(product.id, product);
        });
      });
    });

    return hashMap;
  }
}
