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
import { useFavoritesStore } from "@/store/favorites";

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
  const router = useRouter();

  const firebaseStore = useFirebaseUserStore();
  const favoritesStore = useFavoritesStore();
  const { firebaseUser, firebaseUserProfilePhoto } = storeToRefs(firebaseStore);
  const { setLoading, getFavorites } = favoritesStore;

  setLoading(true);
  firebaseUser.value = auth.currentUser;

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      await getFavorites();
      firebaseUserProfilePhoto.value =
        auth.currentUser?.providerData[0].photoURL || "";
      setLoading(false);
    } else {
      firebaseUserProfilePhoto.value = "";
      router.push("/");
    }

    firebaseUser.value = user;
  });
};

export const signOutUser = async () => {
  const nuxtApp = useNuxtApp();
  const auth = nuxtApp.$auth as Auth;

  const favoritesStore = useFavoritesStore();
  const { getFavorites } = favoritesStore;

  const result = await auth.signOut();
  await getFavorites();
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
