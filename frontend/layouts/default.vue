<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        {{route.meta.title}}
      </v-app-bar-title>

      <v-toolbar-items class="mr-4">
        <v-switch v-model="theme.global.name.value" icon false-value="light" true-value="dark">
          <template #prepend>
            <v-icon icon="mdi-weather-sunny"/>
          </template>
          <template #append>
            <v-icon icon="mdi-weather-night"/>
          </template>
        </v-switch>
      </v-toolbar-items>
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

</script>
