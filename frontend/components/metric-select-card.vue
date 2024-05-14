<template>
  <v-card :border="active ? 'highlight lg opacity-100' : 'md'">
    <v-card-text>
      <metric-progress-circular :metric="metric"/>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  active: boolean;
  metric: Metric;
}

const { metric } = defineProps<Props>();
</script>
