<template>
  <v-progress-circular
    :size="size"
    :width="width"
    class="text-h6 text-center mt-2"

    :model-value="progressValue"
    :color="typeof value === 'number' ? getColorState(value) : 'grey'"
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
import type { VProgressCircular } from "vuetify/components";



interface Props {
  // VProgressCircular Passthrough Props.
  size?: VProgressCircular["size"];
  width?: VProgressCircular["width"];

  // Value Props.
  label: string;
  value: unknown;
}
const { label, value, size, width } = withDefaults(defineProps<Props>(), {
  size: 150,
  width: 20,
});

const progressValue = computed(() => typeof value === "number"
  ? clamp(value, { min: 0,
    max: 100 })
  : 0);
</script>
