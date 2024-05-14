<template>
  <v-card :border="activeMetric === metric ? 'highlight lg opacity-100' : 'md'" @click="emit('select', metric)">
    <v-card-text>
      <metric-progress-circular :equipment="equipment" :metric="metric"/>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { MetricKey, MockEquipment } from "~/utils/equipment";



interface Props {
  equipment: MockEquipment;
  activeMetric: MetricKey;
  metric: MetricKey;
}

// Unwrapped in template
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<Props>();

interface Emits {
  (e: "select", value: MetricKey): void;
}

const emit = defineEmits<Emits>();
</script>
