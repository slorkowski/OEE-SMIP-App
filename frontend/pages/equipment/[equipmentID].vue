<template>
  <v-container>
    <v-row class="ma-0">
      <v-col cols="12" class="d-flex flex-row">
        <!-- Back Button -->
        <v-btn
          to="/"
          density="compact"
          size="large"
          class="text-h5"
          border="md"
        >
          <v-icon icon="mdi-arrow-left-bold"/>
        </v-btn>

        <h2 class="text-h5 d-inline ml-4">
          {{equipment?.displayName || "Equipment"}} Details
        </h2>
      </v-col>

      <v-col
        cols="12"
        md="4"
        class="d-flex justify-center align-center"
      >
        <MetricProgressCircular
          label="OEE"
          label-class="text-h4"
          :value="oeeSummary.value"
          :size="250"
        />
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="rounded-ts-0 fill-height">
          <v-card-text>
            <attribute-table :attributes="equipment?.attributes" :loading="pending"/>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="pl-0 flex-grow-1">
        <v-tabs v-model="activeTabLabel"  hide-slider>
          <v-tab
            v-for="tab in metricTabs"
            :key="tab.label"

            :value="tab.label"
            class="metric-card"
            :class="activeTabLabel === tab.label ? `bg-${tab.color}` : 'bg-surface'"
          >
            <ContrastLabel :label="tab.label"/>
          </v-tab>
        </v-tabs>
        <v-tabs-window v-model="activeTabLabel">
          <v-tabs-window-item
            v-for="tab in metricTabs"
            :key="tab.label"
            :value="tab.label"
          >
            <v-card :class="`rounded-ts-0 fill-height border-md border-${tab.color} border-opacity-100`">
              <v-card-text>
                <attribute-table :attributes="tab.equipment?.attributes" :loading="pending"/>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-text>
            <apexchart-timeseries :series="series"/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";

import type { IEquipmentWithMetric } from "~/lib/equipment";



definePageMeta({
  title: "Equipment Details",
});

const theme = useTheme();
const route = useRoute();
const equipmentId = route.params.equipmentID as string;
const { data: equipment, pending } = useAsyncEquipmentDetailWithOEE(equipmentId);



const oeeSummary = computed(() => makePercentMetric("OEE", equipment.value?.oee.summary?.metric?.value));
const metricTabs = computed(() => [
  {
    label: "Availability",
    color: "purple",
    equipment: equipment.value?.oee.availability,
  },
  {
    label: "Quality",
    color: "indigo",
    equipment: equipment.value?.oee.quality,
  },
  {
    label: "Performance",
    color: "teal",
    equipment: equipment.value?.oee.performance,
  },
]);

const activeTabLabel = ref(metricTabs.value[0].label);

function mockTimeseries(metric: IEquipmentWithMetric["metric"]): { x: number; y: number }[] {
  const mock: { x: number; y: number }[] = [];

  const maxValues = 5;

  for(let index = maxValues; index > 0; index--) {
    const element = {
      x: new Date((metric?.updatedTimestamp?.valueOf() || 0) - (index * 5 * 60 * 1000)).valueOf(),
      y: Math.random() * (metric?.value || 0),
    };

    mock.push(element);
  }

  mock.push({ x: new Date(metric?.updatedTimestamp?.valueOf() || 0).valueOf(), y: metric?.value || 0 });

  return mock;
}

const series = computed(() => [
  {
    name: "OEE",
    data: mockTimeseries(equipment.value?.oee.summary?.metric),
    color: theme.current.value.colors.success,
  },
  {
    name: "Availability",
    data: mockTimeseries(equipment.value?.oee.availability?.metric),
    color: theme.current.value.colors.purple,
  },
  {
    name: "Quality",
    data: mockTimeseries(equipment.value?.oee.quality?.metric),
    color: theme.current.value.colors.indigo,
  },
  {
    name: "Performance",
    data: mockTimeseries(equipment.value?.oee.performance?.metric),
    color: theme.current.value.colors.teal,
  },
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
