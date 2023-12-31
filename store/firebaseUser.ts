import { User } from "firebase/auth";
import { defineStore } from "pinia";

export const useFirebaseUserStore = defineStore("firebaseUser", () => {
  const firebaseUser = ref<User | null>();
  const firebaseUserProfilePhoto = ref<string>();
  const firebaseUserDisplayName = ref<string>();

  return { firebaseUser, firebaseUserProfilePhoto, firebaseUserDisplayName };
});
