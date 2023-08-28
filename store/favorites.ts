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

        const snapshot = await getDocs(colRef);

        const docs: Favorites[] = Array.from(snapshot.docs).map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            tags: doc.data().tags,
            photo: doc.data().photo,
            location: doc.data().location,
            timestamp: doc.data().timestamp,
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
    const storage = nuxtApp.$storage as FirebaseStorage;

    try {
      const photoRef = storageRef(storage, file.name);
      await uploadBytes(photoRef, file);
      const photoUrl = await getDownloadURL(photoRef);

      return photoUrl;
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
          timestamp: serverTimestamp(),
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

  async function editFavorite(docId: string, updatedFavorite: Favorites) {
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

        const updatedFavoriteWithTimestamp = {
          ...updatedFavorite,
          timestamp: serverTimestamp(),
        };

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
    getFavorites,
    uploadPhoto,
    addFavorite,
    editFavorite,
    deleteFavorite,
  };
});
