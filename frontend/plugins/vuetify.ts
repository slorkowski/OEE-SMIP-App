// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VBtn, VCard } from "vuetify/components";
import colors from "vuetify/util/colors";



export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: "dark",
      themes: {
        dark: {
          dark: true,
          colors: {
            success: "#4ba346",
            info: "#5871f5",
            warn: "#d8872b",
            error: "#d14053",
            highlight: "#FFEB3B",
            amber: colors.amber.base,
            purple: colors.purple.base,
            teal: colors.teal.base,
            pink: colors.pink.base,
            lime: colors.lime.base,
            blue: colors.blue.base,
            indigo: colors.indigo.base,
          },
        },
        light: {
          dark: false,
          colors: {
            success: "#4ba346",
            info: "#5871f5",
            warn: "#d8872b",
            error: "#d14053",
            highlight: "#FFEB3B",
            amber: colors.amber.base,
            purple: colors.purple.base,
            teal: colors.teal.base,
            pink: colors.pink.base,
            lime: colors.lime.base,
            blue: colors.blue.base,
            indigo: colors.indigo.base,
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
