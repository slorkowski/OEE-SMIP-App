<template>
  <v-progress-circular
    :model-value="equipment[metric].displayValue"
    size="150"
    width="20"
    :color="getColorState(equipment[metric].value)"
    class="text-h6 text-center mt-2"
  >
    <div>
      <h3 class="text-subtitle-1 font-weight-medium">{{ equipment[metric].label }}</h3>
      <span>{{equipment[metric].value.toFixed(1)}}%</span>
    </div>
  </v-progress-circular>
</template>

<script setup lang="ts">
import type { MetricKey, MockEquipment } from "~/utils/equipment";



interface Props {
  equipment: MockEquipment;
  metric: MetricKey;
}

// Unwrapped in template
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<Props>();
</script>
