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
      Pacifico: true,
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
      htmlAttrs: { lang: "en" },
      meta: [
        {
          name: "description",
          content:
            "Add, edit, and delete your favorite food with Favorita. Keep track of your own gastronomic adventures.",
        },
        {
          property: "og:url",
          content: "https://jmcaballas-favorita.vercel.app/",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:title",
          content: "Favorita - Repository For Your Favorite Food",
        },
        {
          property: "og:description",
          content:
            "Add, edit, and delete your favorite food with Favorita. Keep track of your own gastronomic adventures.",
        },
        {
          property: "og:image",
          content:
            "https://firebasestorage.googleapis.com/v0/b/jmcaballas-favorita.appspot.com/o/dOWV16i2pzTAAkYC7kIaZ3L5PlD2%2F%5B1693919399570%5DDSC03451?alt=media&token=07b565cd-f459-47d5-bcc7-f0d98ec92d90",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          property: "twitter:domain",
          content: "jmcaballas-favorita.vercel.app",
        },
        {
          property: "twitter:url",
          content: "https://jmcaballas-favorita.vercel.app/",
        },
        {
          name: "twitter:title",
          content: "Favorita - Repository For Your Favorite Food",
        },
        {
          name: "twitter:description",
          content:
            "Add, edit, and delete your favorite food with Favorita. Keep track of your own gastronomic adventures.",
        },
        {
          name: "twitter:image",
          content:
            "https://firebasestorage.googleapis.com/v0/b/jmcaballas-favorita.appspot.com/o/dOWV16i2pzTAAkYC7kIaZ3L5PlD2%2F%5B1693919399570%5DDSC03451?alt=media&token=07b565cd-f459-47d5-bcc7-f0d98ec92d90",
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
