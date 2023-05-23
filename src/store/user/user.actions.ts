import { getDoc } from "firebase/firestore";
import { AppDispatch } from "..";
import {
  auth,
  createAuthUserWithEmailAndPassword,
  createUserFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
} from "../../firebase/firebase.utils";
import { checkCartItemsFromFirebase } from "../cart/cart.actions";
import {
  login,
  loginOrLogoutFailure,
  logout,
  setIsLoading,
} from "./user.reducer";

const setUserSnapshot = async (userData: any) => {
  const userRef = await createUserFromAuth(userData);
  if (userRef) {
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    if (userData) {
      const { displayName, email, shippingAddresses } = userData;
      return { id: userSnapshot.id, displayName, email, shippingAddresses };
    } else {
      return null;
    }
  }
  return null;
};

export const checkUserSession = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const userAuth: any = await getCurrentUser();
      if (!userAuth) return;
      const user = await setUserSnapshot(userAuth);
      dispatch(login(user));
    } catch (err) {
      alert(err);
    }
  };
};

export const signOut = () => {
  return async (dispatch: AppDispatch) => {
    await auth.signOut();
    dispatch(logout());
  };
};

export const signIn = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const userCredential = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      if (userCredential) {
        const { user } = userCredential;
        const userData = await setUserSnapshot(user);
        dispatch(login(userData));
        if (userData) {
          dispatch(checkCartItemsFromFirebase(userData));
        }
      }
    } catch (e) {
      alert(e);
    }
  };
};

// Todo: Define Typescript Types
export const signUp = (userData: any) => {
  return async (dispatch: AppDispatch) => {
    const { email, password, displayName, address, secondAddress } = userData;
    const getUserAuthCreated = async () => {
      let userCompleteData = {};
      const userCreedentials = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      if (userCreedentials) {
        const { user } = userCreedentials;
        userCompleteData = {
          ...user,
          displayName,
          address,
          secondAddress,
        };
      }
      return userCompleteData;
    };
    const createUserSnapshot = async () => {
      const userData = await getUserAuthCreated();
      const userRef = await createUserFromAuth(userData);
      if (userRef) {
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
        if (userData) {
          const { displayName, email, shippingAddresses } = userData;
          dispatch(
            login({
              id: userSnapshot.id,
              displayName,
              email,
              shippingAddresses,
            })
          );
        }
      }
    };
    try {
      dispatch(setIsLoading(true));
      await createUserSnapshot();
      dispatch(setIsLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(setIsLoading(false));
      if (err instanceof Error) {
        dispatch(loginOrLogoutFailure(err.message));
      }
    }
  };
};
