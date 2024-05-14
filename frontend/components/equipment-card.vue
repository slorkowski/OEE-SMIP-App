<template>
  <v-card border="md" class="d-flex flex-row">
    <v-card-text class="d-flex flex-column justify-space-between align-center">
      <h2 class="text-h6 text-center">
        {{ equipment.name }}
      </h2>
      <metric-progress-circular :metric="oeeSummary"/>
    </v-card-text>

    <v-card-text class="border-s-md pa-0 d-flex flex-column">
      <v-card
        v-for="metric in metrics"
        :key="metric.label"
        class="pa-0 flex-grow-1 metric-card"
        flat
        tile
      >
        <v-sheet class="percent-bg" :color="getColorState(metric.value)" :style="{width: `${metric.displayValue}%`}"/>

        <v-card-title class="text-subtitle-1 d-flex flex-row justify-space-between align-center h-100" >
          <ContrastLabel class="mr-4" :label="metric.label"/>
          <ContrastLabel>{{metric.value.toFixed(1)}}%</ContrastLabel>
        </v-card-title>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import ContrastLabel from "./contrast-label.vue";
import type { IMockEquipment } from "~/utils/equipment";



interface Props {
  equipment: IMockEquipment;
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
