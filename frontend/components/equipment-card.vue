<template>
  <v-card border="md" class="d-flex flex-row">
    <v-card-text class="border-e-md d-flex flex-column justify-space-between align-center">
      <h2 class="text-h6 text-center">
        {{ equipment.name }}
      </h2>
      <v-progress-circular
        :model-value="equipment.oee"
        size="150"
        width="20"
        :color="getColorState(equipment.oee)"
        class="text-h6 mt-2">
        <span>
          <span :style="{fontSize: '1rem'}" class="font-weight-medium d-block">OEE</span>
          {{Math.round(equipment.oee)}}%
        </span>
      </v-progress-circular>
    </v-card-text>

    <v-card-text class="pa-0">
      <v-card
        v-for="(metric, metricIndex) in metrics"
        :key="metric.label"
        class="pa-0 d-flex flex-column justify-center"
        :class="metricIndex +1 === metrics.length ? '' : 'border-b-md'"
        height="33.33%"
        flat
        tile
      >
        <v-sheet class="percent-bg" :color="getColorState(metric.value)" :style="{width: `${metric.value}%`}"/>

        <v-card-title class="text-subtitle-1 d-flex flex-row justify-space-between" >
          <span class="mr-4">{{ metric.label }}</span>
          <span>{{metric.value}}%</span>
        </v-card-title>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
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

const { equipment } = defineProps<Props>();
const metrics = computed(() => [
  { label: "Availability", value: equipment.availability },
  { label: "Performance", value: equipment.performance },
  { label: "Quality", value: equipment.quality },
]);

</script>

<style>
.percent-bg {
  position: absolute;

  height: 100%;
  z-index: -1;
  opacity: 0.5;
}
</style>
