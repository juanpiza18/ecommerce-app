import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  writeBatch,
  doc,
  getDoc,
  setDoc,
  where,
  updateDoc,
  DocumentReference,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { CartProduct } from "../store/cart/cart.types";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(firebaseApp);

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(newDocRef, obj);
  });
  await batch.commit();
  console.log("done");
};

export const getProducts = async () => {
  const categoriesCollection = collection(db, "products");
  const q = query(categoriesCollection);
  const categoriesSnapshot = await getDocs(q);
  console.log(categoriesSnapshot);
  const categoriesList = categoriesSnapshot.docs.map((doc) => doc.data());
  return categoriesList;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const createUserFromAuth = async (userAuth: any) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { email, displayName, address, secondAddress } = userAuth;
    const shippingAddresses = {
      mainAddress: address,
      secondAddress,
    };
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        shippingAddresses,
      });
    } catch (error) {
      console.log("Error creating the user document", error);
    }
  }
  return userDocRef;
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

export const getUserCartItemsFromFirebase = async (userId: string) => {
  const cartsRef = collection(db, "carts");
  const q = query(cartsRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    const cartDocRef = doc(cartsRef);
    await setDoc(cartDocRef, { userId, cartItems: [] });
    return cartDocRef;
  }
  return querySnapshot.docs[0].ref;
};

export const updateCartItems = async (
  cartRef: DocumentReference,
  newCartItems: CartProduct[]
) => {
  await updateDoc(cartRef, { cartItems: newCartItems });
};
