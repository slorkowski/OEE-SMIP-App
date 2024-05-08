// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VBtn, VCard } from "vuetify/components";

// import { genThemeColor } from "#imports";
// const themeColors: CarbonyTheme = genThemeColor("#161b22");

// const purpley = {
//   background: "#1c1a27",
//   surface: "#312f3f",
//   success: "#4ba346",
//   info: "#5871f5",
//   warn: "#d8872b",
//   error: "#d14053",
// };

// const githubyDark = {
//   background: "#010409",
//   surface: "#0d1117",
//   primary: "#161b22",
//   success: "#4ba346",
//   info: "#5871f5",
//   warn: "#d8872b",
//   error: "#d14053",
// };

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
      VCardActions: {
        class: [ "justify-end" ],
        VBtn: { variant: "elevated" },
      },
    },
  });
  app.vueApp.use(vuetify);
});
