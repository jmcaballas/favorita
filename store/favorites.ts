import { ref } from "vue";
import { defineStore } from "pinia";
import { Auth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  FirebaseStorage,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { Favorites } from "@/types/types";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref<Favorites[]>([]);

  const allTags = computed(() => {
    const tagsSet = new Set<string>();

    favorites.value.forEach((favorite) => {
      if (favorite.tags) {
        favorite.tags.forEach((tag) => tagsSet.add(tag));
      }
    });

    return tagsSet;
  });

  async function getFavorites() {
    const nuxtApp = useNuxtApp();
    const auth = nuxtApp.$auth as Auth;
    const firestore = nuxtApp.$firestore as Firestore;

    try {
      if (auth.currentUser) {
        const colRef = collection(
          firestore,
          "users",
          auth.currentUser.uid,
          "favorites"
        );

        const snapshot = await getDocs(
          query(colRef, orderBy("updatedTimestamp", "desc"))
        );

        const docs: Favorites[] = Array.from(snapshot.docs).map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            tags: doc.data().tags,
            photo: doc.data().photo,
            location: doc.data().location,
            createdTimestamp: doc.data().createdTimestamp,
            updatedTimestamp: doc.data().updatedTimestamp,
          };
        });

        favorites.value = docs;
      } else {
        favorites.value = [];
      }
    } catch (e) {
      console.error("Error retrieving document: ", e);
    }
  }

  async function uploadPhoto(file: File) {
    const nuxtApp = useNuxtApp();
    const auth = nuxtApp.$auth as Auth;
    const storage = nuxtApp.$storage as FirebaseStorage;

    try {
      if (auth.currentUser) {
        const fileNameWithoutExtension = file.name.replace(/\.[^.]+$/, "");
        const fileNameWithUidDate = `${
          auth.currentUser.uid
        }/[${Date.now()}]${fileNameWithoutExtension}`;
        const photoRef = storageRef(storage, fileNameWithUidDate);
        await uploadBytes(photoRef, file);
        const photoUrl = await getDownloadURL(photoRef);

        return photoUrl;
      }
    } catch (e) {
      console.error("Error uploading photo: ", e);
    }
  }

  async function addFavorite(newFavorite: Favorites, file: File | null) {
    const nuxtApp = useNuxtApp();
    const auth = nuxtApp.$auth as Auth;
    const firestore = nuxtApp.$firestore as Firestore;

    try {
      if (auth.currentUser) {
        const colRef = collection(
          firestore,
          "users",
          auth.currentUser.uid,
          "favorites"
        );

        let newFavoriteWithTimestamp = {
          ...newFavorite,
          createdTimestamp: serverTimestamp(),
          updatedTimestamp: serverTimestamp(),
        };

        if (file) {
          const photoUrl = await uploadPhoto(file);
          newFavoriteWithTimestamp = {
            ...newFavoriteWithTimestamp,
            photo: photoUrl,
          };
        }

        const docRef = await addDoc(colRef, newFavoriteWithTimestamp);
        getFavorites();

        return docRef;
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function editFavorite(
    docId: string,
    updatedFavorite: Favorites,
    file: File | null
  ) {
    const nuxtApp = useNuxtApp();
    const auth = nuxtApp.$auth as Auth;
    const firestore = nuxtApp.$firestore as Firestore;

    try {
      if (auth.currentUser) {
        const favoriteRef = doc(
          firestore,
          "users",
          auth.currentUser.uid,
          "favorites",
          docId
        );

        let updatedFavoriteWithTimestamp = {
          ...updatedFavorite,
          updatedTimestamp: serverTimestamp(),
        };

        if (file) {
          const photoUrl = await uploadPhoto(file);
          updatedFavoriteWithTimestamp = {
            ...updatedFavoriteWithTimestamp,
            photo: photoUrl,
          };
        }

        const docRef = await updateDoc(
          favoriteRef,
          updatedFavoriteWithTimestamp
        );
        getFavorites();

        return docRef;
      }
    } catch (e) {
      console.error("Error editing document: ", e);
    }
  }

  async function deleteFavorite(docId: string) {
    const nuxtApp = useNuxtApp();
    const auth = nuxtApp.$auth as Auth;
    const firestore = nuxtApp.$firestore as Firestore;

    try {
      if (auth.currentUser) {
        const favoriteRef = doc(
          firestore,
          "users",
          auth.currentUser.uid,
          "favorites",
          docId
        );

        const docRef = await deleteDoc(favoriteRef);
        getFavorites();

        return docRef;
      }
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  return {
    favorites,
    allTags,
    getFavorites,
    uploadPhoto,
    addFavorite,
    editFavorite,
    deleteFavorite,
  };
});
