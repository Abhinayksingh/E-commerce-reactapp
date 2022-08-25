import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailandPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  connectFirestoreEmulator,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDX2P2bATq5ZSnGgRwZR1SLdvbO7eJo7qA",
  authDomain: "fashion-clothing-db-750a3.firebaseapp.com",
  projectId: "fashion-clothing-db-750a3",
  storageBucket: "fashion-clothing-db-750a3.appspot.com",
  messagingSenderId: "694494961915",
  appId: "1:694494961915:web:de18df7f9b69ffc2be905e",
};
const firebaseapp = initializeApp(firebaseConfig);

const googleprovider = new GoogleAuthProvider();
googleprovider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleprovider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleprovider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  filed = "title"
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "cotegories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;

    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "user", userAuth.uid);

  const userSnapsShort = await getDoc(userDocRef);

  if (!userSnapsShort.exists()) {
    const { displayName, email } = userAuth;

    const createtAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createtAt });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
  // if user data exist

  // create

  //return userDocref
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createAuthUserWithEmailAndPassword(auth, email, password);
};

export const signInWithUserEmailandPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithUserEmailandPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangeListener = (callback) =>
  onAuthStateChanged(auth, callback);
