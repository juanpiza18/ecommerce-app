import { getDoc } from "firebase/firestore";
import store, { AppDispatch } from "..";
import {
  getUserCartItemsFromFirebase,
  updateCartItems,
} from "../../firebase/firebase.utils";
import { ProductItem } from "../shop/shop.types";
import { selectCurrentUser } from "../user/user.selector";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
  updateCartFromFirebase,
} from "./cart.reducer";
import { SelectCartItems } from "./cart.selectors";
import { CartProduct } from "./cart.types";

export const updateCartItemsInFirebase = async () => {
  try {
    const currentUser = selectCurrentUser(store.getState());
    if (currentUser) {
      const cartRef = await getUserCartItemsFromFirebase(currentUser.id);
      const cartItems = SelectCartItems(store.getState());
      await updateCartItems(cartRef, cartItems);
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      alert(e.message);
    }
  }
};

export const checkCartItemsFromFirebase = (useData: any) => {
  return async (dispatch: AppDispatch) => {
    const cartRef = await getUserCartItemsFromFirebase(useData.id);
    const cartSnapshot = await getDoc(cartRef);
    if (cartSnapshot.exists()) {
      dispatch(updateCartFromFirebase(cartSnapshot.data().cartItems));
    }
  };
};

export const addProductCartItem = (product: CartProduct | ProductItem) => {
  return async (dispatch: AppDispatch) => {
    dispatch(addItemToCart(product));
    await updateCartItemsInFirebase();
  };
};

export const removeProductCartItem = (product: CartProduct | ProductItem) => {
  return async (dispatch: AppDispatch) => {
    dispatch(removeItemFromCart(product));
    await updateCartItemsInFirebase();
  };
};

export const clearProductFromCart = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(clearItemFromCart(id));
    await updateCartItemsInFirebase();
  };
};
