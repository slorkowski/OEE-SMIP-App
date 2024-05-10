<template>
  <v-card border="md" class="d-flex flex-row">
    <v-card-text class="border-e-md d-flex flex-column justify-space-between align-center">
      <h2 class="text-h6 text-center">
        {{ equipment.name }}
      </h2>
      <v-progress-circular
        :model-value="oeeSummary.displayValue"
        size="150"
        width="20"
        :color="getColorState(oeeSummary.value)"
        class="text-h6 text-center mt-2"
      >
        <div>
          <h3 class="text-subtitle-1 font-weight-medium">{{ oeeSummary.label }}</h3>
          <span>{{oeeSummary.value.toFixed(1)}}%</span>
        </div>
      </v-progress-circular>
    </v-card-text>

    <v-card-text class="pa-0 d-flex flex-column">
      <v-card
        v-for="metric in metrics"
        :key="metric.label"
        class="pa-0 flex-grow-1 metric-card"
        flat
        tile
      >
        <v-sheet class="percent-bg" :color="getColorState(metric.value)" :style="{width: `${metric.displayValue}%`}"/>

        <v-card-title class="text-subtitle-1 d-flex flex-row justify-space-between align-center h-100" >
          <span class="mr-4">{{ metric.label }}</span>
          <span>{{metric.value.toFixed(1)}}%</span>
        </v-card-title>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { clamp } from "remeda";



export interface MockEquipment {
  name: string;
  id: number;
  availability: number;
  quality: number;
  performance: number;
  oee: number;
};

interface Props {
  equipment: MockEquipment;
}

interface Metric {
  label: string;
  value: number;
  displayValue: number;
}
function makeMetric(label: string, value: number): Metric {
  return {
    label,
    value,
    get displayValue() { return clamp(this.value, { min: 0, max: 100 }); },
  };
}

const { equipment } = defineProps<Props>();

const oeeSummary = computed(() => makeMetric("OEE", equipment.oee));
const metrics = computed(() => [
  makeMetric("Availability", equipment.availability),
  makeMetric("Performance", equipment.performance),
  makeMetric("Quality", equipment.quality),
]);

</script>

<style lang="scss">
@use "~/node_modules/vuetify/_styles.scss";

.metric-card:not(:last-child) {
  @extend .border-b-md;
}

.percent-bg {
  position: absolute;

  height: 100%;
  z-index: -1;
  opacity: 0.5;
}
</style>
