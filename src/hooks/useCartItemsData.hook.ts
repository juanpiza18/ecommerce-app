import GlobalStateManager from "../store/config";
import {
  SelectCartCount,
  SelectCartItems,
  SelectCartTotal,
} from "../store/cart/cart.selectors";
// import {
//   addItemToCart,
//   removeItemFromCart,
//   clearCart,
//   clearItemFromCart,
// } from "../store/cart/cart.reducer";
import { CartProduct } from "../store/cart/cart.types";
import { ProductItem } from "../store/shop/shop.types";
import {
  addProductCartItem,
  clearProductFromCart,
  removeProductCartItem,
} from "../store/cart/cart.actions";

export const useCartItemsData = () => {
  const cartItems = GlobalStateManager.getState(SelectCartItems);
  const cartTotal = GlobalStateManager.getState(SelectCartTotal);
  const cartCount = GlobalStateManager.getState(SelectCartCount);
  return {
    cartItems,
    cartTotal,
    cartCount,
  };
};

export const useCartItemsActions = () => {
  const appDispatch = GlobalStateManager.setState();
  // const addCartItem = (product: CartProduct | ProductItem) =>
  //   appDispatch(addItemToCart(product));
  // const removeItem = (product: CartProduct | ProductItem) =>
  //   appDispatch(removeItemFromCart(product));
  // const clearCartItem = (id: string) => appDispatch(clearItemFromCart(id));
  // const clearAllCart = () => appDispatch(clearCart);

  const addCartItem = (product: CartProduct | ProductItem) =>
    appDispatch(addProductCartItem(product));
  const removeItem = (product: CartProduct | ProductItem) =>
    appDispatch(removeProductCartItem(product));
  const clearCartItem = (id: string) => appDispatch(clearProductFromCart(id));

  return {
    addCartItem,
    removeItem,
    clearCartItem,
  };
};
