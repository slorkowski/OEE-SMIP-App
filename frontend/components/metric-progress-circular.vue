<template>
  <v-progress-circular
    :model-value="progressValue"
    size="150"
    width="20"
    :color="value === undefined ? 'black' : getColorState(value)"
    class="text-h6 text-center mt-2"
  >
    <div>
      <h3 class="text-subtitle-1 font-weight-medium">{{ label }}</h3>
      <span v-if="typeof value === 'number'">{{value.toFixed(1)}}%</span>
      <span v-else>??</span>
    </div>
  </v-progress-circular>
</template>

<script setup lang="ts">
import { clamp } from "remeda";



interface Props {
  label: string;
  value?: number;
}
const { label, value } = defineProps<Props>();

const progressValue = computed(() => typeof value === "number" ? clamp(value, { min: 0, max: 100 }) : 0);
</script>
