<template>
  <v-progress-circular
    :size="size"
    :width="width"
    class="text-center mt-2"

    :model-value="progressValue"
    :color="typeof value === 'number' ? getColorState(value) : 'grey'"
  >
    <div :class="labelClass">
      <h3 class="font-weight-medium">{{ label }}</h3>
      <span v-if="typeof value === 'number'">{{value.toFixed(1)}}%</span>
      <span v-else-if="typeof value === null">null</span>
      <span v-else-if="value === undefined">undefined</span>
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
  labelClass?: string;
  value: unknown;
}
const { label, labelClass, value, size, width } = withDefaults(defineProps<Props>(), {
  size: 150,
  width: 20,
  labelClass: "text-subtitle-1",
});

const progressValue = computed(
  () => typeof value === "number"
    ? clamp(value, { min: 0, max: 100 })
    : 0,
);
</script>
