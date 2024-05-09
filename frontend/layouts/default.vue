<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        {{route.meta.title}}
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
