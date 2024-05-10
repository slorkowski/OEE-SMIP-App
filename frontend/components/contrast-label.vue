<template>
  <v-sheet class="contrast-label" rounded>
    <slot>
      {{ label }}
    </slot>
  </v-sheet>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
}

const { label } = defineProps<Props>();
</script>

<style scoped lang="scss">
.contrast-label {
  background-color: rgba($color: var(--v-theme-surface), $alpha: 0.5);

  padding: 2px 4px;
}
</style>
