// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
  ],
  googleFonts: {
    download: false,
    families: {
      Roboto: true,
      "Libre Baskerville": {
        wght: [700],
      },
    },
  },
  runtimeConfig: {
    public: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },
  app: {
    head: {
      title: "Favorita - Repository For Your Favorite Food",
      meta: [
        {
          name: "description",
          content:
            "Add, edit, and delete your favorite food with Favorita. Keep track of your own gastronomic adventures.",
        },
      ],
      link: [
        {
          rel: "canonical",
          href: "https://jmcaballas-favorita.vercel.app/",
        },
      ],
    },
  },
});
