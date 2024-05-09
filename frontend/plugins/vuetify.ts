// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VBtn, VCard } from "vuetify/components";



export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: "carbony",
      themes: {
        carbony: {
          dark: true,
          colors: {
            success: "#4ba346",
            info: "#5871f5",
            warn: "#d8872b",
            error: "#d14053",
          },
        },
      },
      variations: {
        colors: [ "error", "success", "info" ],
        lighten: 5,
        darken: 5,
      },
    },
    aliases: {
      VSuperCard: VCard,
      VSubCard: VCard,
      VSquareBtn: VBtn,
    },
    defaults: {
      VToolbar: {
        color: "surface",
      },
      VCardTitle: {
        style: [ "text-wrap: wrap;" ],
      },
      VCardActions: {
        class: [ "justify-end" ],
      },
    },
  });
  app.vueApp.use(vuetify);
});
