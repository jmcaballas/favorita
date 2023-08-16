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
    families: {
      Roboto: true,
      "Libre Baskerville": {
        wght: [700],
      },
    },
  },
});
