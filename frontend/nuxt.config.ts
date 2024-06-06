import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

import { GRAPHL_TOKEN_KEY } from "./lib/consts";



const DESCRIPTION = "CESMII's OEE app provides a glanceable view of a KPI used in many manufacturing environments, and works where ever the OEE Profile is implemented";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: [ "vuetify" ],
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "CESMII OEE Dashboard",
      meta: [
        { name: "description", content: DESCRIPTION },
        // TODO: add theme color.
      ],
      link: [
        // TODO: add icon and apple-touch-icon.
      ],
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
    "@vite-pwa/nuxt",
  ],
  pwa: {
    registerType: "autoUpdate",
    devOptions: {
      enabled: true,
    },
    manifest: {
      name: "CESMII OEE Dashboard",
      short_name: "OEEApp",
      description: DESCRIPTION,
      // TODO: add theme_color and icons.
    },
  },
  apollo: {
    autoImports: true,
    clients: {
      default: {
        httpEndpoint: "https://east.cesmii.net/graphql",
        authHeader: "Authorization",
        authType: "Bearer",
        tokenStorage: "cookie",
        tokenName: GRAPHL_TOKEN_KEY,
        cookieAttributes: {
          sameSite: "strict",
          httpOnly: false,
        },
        inMemoryCacheOptions: {
          typePolicies: {
            AttributesGetTimeSeriesRecord: {
              keyFields: false,
            },
          },
        },
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
