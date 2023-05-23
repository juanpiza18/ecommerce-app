import { createSlice } from "@reduxjs/toolkit";
import { CartProduct } from "./cart.types";
import { addItemCart, removeItem } from "./cartUtils";

export type CartState = {
  cartItems: CartProduct[];
};

export const CART_INITIAL_STATE: CartState = {
  cartItems: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    addItemToCart(state, action) {
      state.cartItems = addItemCart(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeItem(state.cartItems, action.payload);
    },
    clearItemFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload
      );
    },
    clearCart(state, action) {
      state.cartItems = [];
    },
    updateCartFromFirebase(state, action) {
      state.cartItems = action.payload;
    },
  },
});

export const {
  addItemToCart,
  clearCart,
  clearItemFromCart,
  removeItemFromCart,
  updateCartFromFirebase,
} = CartSlice.actions;

export default CartSlice.reducer;
