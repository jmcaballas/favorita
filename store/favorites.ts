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
  const favorites = ref<Favorites[]>([
    {
      id: "0",
      name: "El Born Cheesecake",
      description: "Burnt Basque Cheesecake",
      tags: ["dessert", "catalan", "mediterranean"],
      photo:
        "https://ik.imagekit.io/jmcaballasfavorita/o/dOWV16i2pzTAAkYC7kIaZ3L5PlD2%2F%5B1693919399570%5DDSC03451?alt=media&token=07b565cd-f459-47d5-bcc7-f0d98ec92d90&tr=w-800,ll",
      location: "El Born",
      createdTimestamp: new Date(),
      updatedTimestamp: new Date(),
    },
    {
      id: "1",
      name: "Kurobuta Pork Belly",
      description:
        "Robata grilled Kurobuta pork belly marinated in honey miso, hoisin sauce, tare sauce",
      tags: ["kushiyaki", "japanese"],
      photo:
        "https://ik.imagekit.io/jmcaballasfavorita/o/dOWV16i2pzTAAkYC7kIaZ3L5PlD2%2F%5B1693919515955%5DDSC03416?alt=media&token=c6d234ec-28bd-4090-a5fa-6865ff892b8e&tr=w-800,ll",
      location: "Nikkei Robata",
      createdTimestamp: new Date(),
      updatedTimestamp: new Date(),
    },
  ]);
  const loading = ref<boolean>(false);

  const allTags = computed(() => {
    const tagsSet = new Set<string>();

    favorites.value.forEach((favorite) => {
      if (favorite.tags) {
        favorite.tags.forEach((tag) => tagsSet.add(tag));
      }
    });

    return Array.from(tagsSet).sort();
  });

  function setLoading(state: boolean) {
    loading.value = state;
  }

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
    loading,
    setLoading,
    allTags,
    getFavorites,
    uploadPhoto,
    addFavorite,
    editFavorite,
    deleteFavorite,
  };
});
