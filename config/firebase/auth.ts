// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useRuntimeConfig } from "nuxt/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = useRuntimeConfig();

const firebaseConfig = {
  apiKey: config.apiKey as string,
  authDomain: config.authDomain as string,
  projectId: config.projectId as string,
  storageBucket: config.storageBucket as string,
  messagingSenderId: config.messagingSenderId as string,
  appId: config.appId as string,
  measurementId: config.measurementId as string,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
