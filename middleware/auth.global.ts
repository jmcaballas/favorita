import { defineNuxtRouteMiddleware } from "nuxt/app";
import { storeToRefs } from "pinia";
import { useFirebaseUserStore } from "@/store/firebaseUser";

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useFirebaseUserStore();
  const { firebaseUser } = storeToRefs(store);

  if (to.path === "/") {
    return;
  }

  if (!firebaseUser.value) {
    if (to.path === "/new-favorite" || to.path === "/edit-favorite") {
      return abortNavigation();
    }
  }
});
