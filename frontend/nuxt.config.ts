import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";



// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: [ "vuetify" ],
  },
  app: {
    head: {
      charset: "utf-8",
      title: "CESMII OEE Dashboard",
    },
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins!.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxt/eslint",
    "@nuxtjs/apollo",
  ],
  apollo: {
    autoImports: true,
    clients: {
      default: {
        httpEndpoint: "https://east.cesmii.net/graphql",
        authHeader: "Authorization",
        authType: "Bearer",
        tokenStorage: "cookie",
        tokenName: "graphql-token",
      },
      noauth: {
        httpEndpoint: "https://east.cesmii.net/graphql",
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
