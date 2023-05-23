import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./shop.types";

export type ShopState = {
  isFetching: boolean;
  products: Product[];
  filter: string;
  error: string | null;
};

export const SHOP_INITIAL_STATE: ShopState = {
  isFetching: false,
  products: [],
  error: null,
  filter: "",
};

export const shopSlice = createSlice({
  name: "shop",
  initialState: SHOP_INITIAL_STATE,
  reducers: {
    fetchCategoriesStart(state) {
      state.isFetching = true;
    },
    fetchCategories(state, action) {
      state.products = action.payload;
      state.isFetching = false;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    fetchCategoriesFailed(state, action) {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCategories,
  setFilter,
  fetchCategoriesFailed,
  fetchCategoriesStart,
} = shopSlice.actions;

export default shopSlice.reducer;
