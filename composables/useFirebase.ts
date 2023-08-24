//https://firebase.google.com/docs/auth/web/start

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { storeToRefs } from "pinia";
import { useFirebaseUserStore } from "@/store/firebaseUser";

export const createUser = async (email: string, password: string) => {
  const auth = getAuth();
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  return credentials;
};

export const signInUser = async (email: string, password: string) => {
  const auth = getAuth();
  const credentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  return credentials;
};

export const initUser = async () => {
  const auth = getAuth();
  const store = useFirebaseUserStore();
  const { firebaseUser } = storeToRefs(store);

  firebaseUser.value = auth.currentUser;

  // const userCookie = useCookie("userCookie");

  // const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log("Auth changed", user);
    } else {
      //if signed out
      // router.push("/");
      console.log("Auth changed", user);
    }

    firebaseUser.value = user;

    // @ts-ignore
    // userCookie.value = user; //ignore error because nuxt will serialize to json

    // $fetch("/api/auth", {
    //   method: "POST",
    //   body: { user },
    // });
  });
};

export const signOutUser = async () => {
  const auth = getAuth();
  const result = await auth.signOut();
  return result;
};