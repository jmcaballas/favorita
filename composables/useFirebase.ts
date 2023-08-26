import {
  Auth,
  createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";
import { storeToRefs } from "pinia";
import { useFirebaseUserStore } from "@/store/firebaseUser";

export const createUser = async (email: string, password: string) => {
  const nuxtApp = useNuxtApp();
  const auth = nuxtApp.$auth as Auth;

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
  const nuxtApp = useNuxtApp();
  const auth = nuxtApp.$auth as Auth;

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
  const nuxtApp = useNuxtApp();
  const auth = nuxtApp.$auth as Auth;

  const store = useFirebaseUserStore();
  const { firebaseUser } = storeToRefs(store);

  firebaseUser.value = auth.currentUser;

  // const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
    } else {
      //if signed out
      // router.push("/");
    }

    firebaseUser.value = user;
  });
};

export const signOutUser = async () => {
  const nuxtApp = useNuxtApp();
  const auth = nuxtApp.$auth as Auth;

  const result = await auth.signOut();
  return result;
};

export const signInGoogle = async () => {
  const nuxtApp = useNuxtApp();
  const auth = nuxtApp.$auth as Auth;

  const provider = new GoogleAuthProvider();
  await signInWithRedirect(auth, provider);

  const credentials = await getRedirectResult(auth).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  return credentials;
};
