<template>
  <v-progress-circular
    :model-value="metric.displayValue"
    size="150"
    width="20"
    :color="getColorState(metric.value)"
    class="text-h6 text-center mt-2"
  >
    <div>
      <h3 class="text-subtitle-1 font-weight-medium">{{ metric.label }}</h3>
      <span>{{metric.value.toFixed(1)}}%</span>
    </div>
  </v-progress-circular>
</template>

<script setup lang="ts">
import type { Metric } from "~/utils/equipment";



interface Props {
  metric: Metric;
}

const { metric } = defineProps<Props>();
</script>
