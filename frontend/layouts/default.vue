<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        {{route.meta.title}}
      </v-app-bar-title>

      <v-btn icon @click="toggleTheme()">
        <v-icon icon="mdi-theme-light-dark"/>
      </v-btn>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";



const route = useRoute();
const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>
