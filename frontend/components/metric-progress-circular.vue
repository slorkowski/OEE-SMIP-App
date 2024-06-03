<template>
  <v-progress-circular
    :size="props.size"
    :width="props.width"
    class="text-center mt-2"

    :model-value="progressValue"
    :color="typeof props.value === 'number' ? getColorState(props.value) : 'grey'"
  >
    <div :class="props.labelClass">
      <h3 class="font-weight-medium">{{ props.label }}</h3>
      <span v-if="typeof props.value === 'number'">{{props.value.toFixed(1)}}%</span>
      <span v-else-if="typeof props.value === null || props.value === undefined">No Value</span>
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
  value: number | undefined | null;
}
const props = withDefaults(defineProps<Props>(), {
  size: 150,
  width: 20,
  labelClass: "text-subtitle-1",
});

const progressValue = computed(
  () => typeof props.value === "number"
    ? clamp(props.value, { min: 0, max: 100 })
    : 0,
);
</script>
