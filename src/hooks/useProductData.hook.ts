import GlobalStateManager from "../store/config";
import { fetchProducts } from "../store/shop/shop.actions";
import { setFilter } from "../store/shop/shop.reducer";
import {
  filterProductsCategoryBySearch,
  isFetchingProducts,
  selectFilter,
  selectProductById,
  selectProducts,
  selectProductsByCategory,
  selectProductsCategories,
} from "../store/shop/shop.selector";
import { Category, Product, ProductItem } from "../store/shop/shop.types";

export const useProductData = (category?: string, productId?: string) => {
  const products: Product[] = GlobalStateManager.getState(selectProducts);
  const isLoading: boolean = GlobalStateManager.getState(isFetchingProducts);
  const productCategories: Category = GlobalStateManager.getState(
    selectProductsCategories
  );
  const filter = GlobalStateManager.getState(selectFilter);
  const categoryProductsFilterBySearch = GlobalStateManager.getState(
    filterProductsCategoryBySearch(category ?? "", filter)
  );
  const productsByCategory: Category[string] = GlobalStateManager.getState(
    selectProductsByCategory(category ?? "")
  );

  const productByCategoryAndId: ProductItem = GlobalStateManager.getState(
    selectProductById(category ?? "", productId ?? "")
  );

  return {
    products,
    isLoading,
    productCategories,
    productsByCategory,
    categoryProductsFilterBySearch,
    filter,
    productByCategoryAndId,
  };
};

export const useProductActions = () => {
  const appDispatch = GlobalStateManager.setState();
  const getProducts = () => appDispatch(fetchProducts());
  const setFilterValue = (filter: string) => appDispatch(setFilter(filter));
  return {
    getProducts,
    setFilterValue,
  };
};
