import { initializeApp } from "firebase/app";
import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.apiKey as string,
    authDomain: config.public.authDomain as string,
    projectId: config.public.projectId as string,
    storageBucket: config.public.storageBucket as string,
    messagingSenderId: config.public.messagingSenderId as string,
    appId: config.public.appId as string,
    measurementId: config.public.measurementId as string,
  };

  const app = initializeApp(firebaseConfig);
  initUser();

  // nuxtApp.vueApp.provide("auth", auth);
  // nuxtApp.provide("auth", auth);
});
