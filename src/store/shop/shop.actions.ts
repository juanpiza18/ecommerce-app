import { AppDispatch } from "..";
import { getProducts } from "../../firebase/firebase.utils";
import {
  fetchCategories,
  fetchCategoriesFailed,
  fetchCategoriesStart,
} from "./shop.reducer";

export const fetchProducts = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchCategoriesStart());
      const categories = await getProducts();
      dispatch(fetchCategories(categories));
    } catch (e) {
      if (e instanceof Error) {
        dispatch(fetchCategoriesFailed(e.message));
      }
    }
  };
};
