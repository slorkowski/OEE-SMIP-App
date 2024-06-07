import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

import { GRAPHL_TOKEN_KEY } from "./lib/consts";



const DESCRIPTION = "CESMII's OEE app provides a glanceable view of a KPI used in many manufacturing environments, and works where ever the OEE Profile is implemented";
const THEME_COLOR = "#212121";
const BACKGROUND_COLOR = "#000000";

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
        { name: "theme-color", content: THEME_COLOR },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
        { rel: "apple-touch-icon", href: "/icon-180-bg-black.png" },
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
      theme_color: THEME_COLOR,
      background_color: BACKGROUND_COLOR,

      icons: [
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
        { src: "/icon-512-bg-black.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-64.png", sizes: "64x64", type: "image/png" },
      ],
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
