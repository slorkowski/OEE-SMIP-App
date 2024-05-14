<template>
  <v-row>
    <v-col cols="12">
      <h2 class="text-h5">
        {{equipment.name}} Details
      </h2>
    </v-col>

    <v-col cols="12" class="d-flex flex-row justify-space-around align-center">
      <MetricSelectCard :equipment="equipment" :active-metric="activeMetric" :metric="'oee'" @select="activeMetric = $event"/>
      <v-icon icon="mdi-equal" size="50"/>
      <MetricSelectCard :equipment="equipment" :active-metric="activeMetric" :metric="'availability'" @select="activeMetric = $event"/>
      <v-icon icon="mdi-close" size="50"/>
      <MetricSelectCard :equipment="equipment" :active-metric="activeMetric" :metric="'quality'" @select="activeMetric = $event"/>
      <v-icon icon="mdi-close" size="50"/>
      <MetricSelectCard :equipment="equipment" :active-metric="activeMetric" :metric="'performance'" @select="activeMetric = $event"/>
    </v-col>

    <v-col cols="12">
      <v-expansion-panels v-model="subcomponents" multiple>
        <v-expansion-panel
          v-for="n in 6" :key="n" :value="n">
          <v-expansion-panel-title class="text-h6 pl-8">
            {{metricTitle}} Subcomponent {{n}}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            Graphics here
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { range } from "remeda";

import type { MetricKey, MockEquipment } from "~/utils/equipment";



interface Props {
  equipment: MockEquipment;
}

// Unwrapped in template
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<Props>();

const activeMetric: Ref<MetricKey> = ref("oee");

const metricTitle = computed(() => {
  let _metricTitle = "OEE";

  switch (activeMetric.value) {
    case "oee":
      _metricTitle = "OEE";
      break;
    case "availability":
      _metricTitle = "Availability";
      break;
    case "quality":
      _metricTitle = "Quality";
      break;
    case "performance":
      _metricTitle = "Performance";
      break;
  }

  return _metricTitle;
});

const subcomponents = ref(range(1, 7));
</script>

