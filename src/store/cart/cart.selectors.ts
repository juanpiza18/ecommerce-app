import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

const selectCart = (state: RootState) => state.cart;

export const SelectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const SelectCartCount = createSelector([SelectCartItems], (cartItems) =>
  cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0)
);

export const SelectCartTotal = createSelector(
  [SelectCartItems],
  (cartItems) => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }
);
