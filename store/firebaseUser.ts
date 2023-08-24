import { User } from "firebase/auth";
import { defineStore } from "pinia";

export const useFirebaseUserStore = defineStore("firebaseUser", () => {
  const firebaseUser = ref<User | null>();

  return { firebaseUser };
});
