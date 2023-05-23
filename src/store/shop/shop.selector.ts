import { createSelector } from "@reduxjs/toolkit";
import Fuse from "fuse.js";
import { RootState } from "..";
import { ShopState } from "./shop.reducer";
import { Category } from "./shop.types";

const options = {
  shouldSort: false,
  findAllMatches: true,
  threshold: 0.3,
  keys: ["name"],
};

const shopSelector = (state: RootState): ShopState => state.categories;

export const selectProducts = createSelector(
  [shopSelector],
  (product: ShopState) => product.products
);

export const selectFilter = createSelector(
  [shopSelector],
  (product) => product.filter
);

export const isFetchingProducts = createSelector(
  [shopSelector],
  (product: ShopState) => product.isFetching
);

// Creating one object with all the products the key will be the title of the products
export const selectProductsCategories = createSelector(
  [selectProducts],
  (products) => {
    return products.reduce((accumulator: Category, product) => {
      const { title, items } = product;
      accumulator[title.toLowerCase()] = items;
      return accumulator;
    }, {} as Category);
  }
);

export const selectProductsByCategory = (category: string) =>
  createSelector([selectProductsCategories], (products) => {
    return products ? products[category] : null;
  });

export const filterProductsCategoryBySearch = (
  category: string,
  search: string
) =>
  createSelector([selectProductsCategories], (products) => {
    const productsByCategory = products ? products[category] : null;
    if (productsByCategory) {
      const fuse = new Fuse(productsByCategory, options);
      const filterData = fuse.search(search).map((data: any) => data.item);
      return filterData;
    }
    return [];
  });

export const selectProductById = (category: string, id: string) =>
  createSelector([selectProductsCategories], (products) => {
    const productsByCategory = products ? products[category] : null;
    if (productsByCategory) {
      return productsByCategory.find((product) => product.id === id);
    }
    return {};
  });
