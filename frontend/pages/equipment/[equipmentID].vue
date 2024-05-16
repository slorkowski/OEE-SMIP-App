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
          <v-icon   icon="mdi-arrow-left-bold"/>
        </v-btn>

        <h2 class="text-h5 d-inline ml-4">
          {{equipment.name}} Details
        </h2>
      </v-col>

      <v-col cols="4">
        <MetricProgressCircular :metric="oeeSummary" :size="250" :style="{marginLeft: '78px'}" />
      </v-col>

      <v-col cols="auto" class="pr-0">
        <v-tabs v-model="activeTab" direction="vertical" class="border-md border-e-0">
          <v-tab v-for="metric in metrics" :key="metric.label" :value="metric" class="metric-card" :class="activeTab.label === metric.label ? `bg-${labelColors(metric.label)}` : 'bg-surface'">
            <ContrastLabel :label="metric.label"/>
          </v-tab>
        </v-tabs>
      </v-col>

      <v-col cols="auto" class="pl-0 flex-grow-1">
        <v-tabs-window v-model="activeTab">
          <v-tabs-window-item v-for="metric in metrics" :key="metric.label" :value="metric">
            <v-card :class="`rounded-ts-0 fill-height border-md`" :style="{borderColor: `$labelColors(metric.label)}} !important`}">
              <v-card-text>
                <v-table>
                  <thead>
                    <th class="text-left">
                      Name
                    </th>
                    <th class="text-left">
                      Value
                    </th>
                  </thead>

                  <tbody>
                    <tr v-for="subcomponent in activeTab.subcomponents" :key="subcomponent.name">
                      <td> {{subcomponent.name}} </td>
                      <td> {{subcomponent.value}} </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card>

          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>

    <v-row class="ma-0">
      <v-col cols="12">
        <v-card class="rounded-ts-0 fill-height">
          <v-card-text>
            <v-table>
              <thead>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Value
                </th>
              </thead>

              <tbody>
                <tr v-for="subcomponent in activeTab.subcomponents" :key="subcomponent.name">
                  <td> {{subcomponent.name}} </td>
                  <td> {{subcomponent.value}} </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- <v-col cols="7" class="pl-6">
        <v-card
          class="d-flex flex-grow-1 fill-height">
          <v-card-text>
            <v-sparkline
              v-for="metric in metrics" :key="metric.label"
              :model-value="metric.timeline"
              :color="labelColors(metric.label)"
              line-width="1"
              min="0"
              :style="{position: 'absolute'}"
            />
          </v-card-text>
        </v-card> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">

import { useMockEquipmentById } from "~/mocks/equipment";



definePageMeta({
  title: "Equipment Details",
});

const route = useRoute();
const equipmentId = route.params.equipmentID as string;

// This will be replaced with query to db
const equipment: Ref<IMockEquipment> = useMockEquipmentById(equipmentId);

function makeMetricSubcomponents(metricLabel: string, quantity: number): IMetricSubcomponent[] {
  const subcomponents: IMetricSubcomponent[] = [];

  for(let index = 0; index < quantity; index++) {
    subcomponents.push({ name: `${metricLabel} Subcomponent ${index}`, value: index * 10 });
  }
  return subcomponents;
}

function makeMetricTimeline(value: number) {
  return [
    Math.random() * value,
    Math.random() * value,
    Math.random() * value,
    Math.random() * value,
    Math.random() * value,
    Math.random() * value,
    Math.random() * value,
    value,
  ];
}

function labelColors(label: string) {
  if(label === "Availability") return "purple";
  if(label === "Performance") return "teal";
  if(label === "Quality") return "yellow";
}

const oeeSummary = computed(() => makeMetric("OEE", equipment.value.oee));
const metrics = computed(() => [
  { ...makeMetric("Availability", equipment.value.availability), subcomponents: makeMetricSubcomponents("Availability", 6), timeline: makeMetricTimeline(equipment.value.availability) },
  { ...makeMetric("Performance", equipment.value.performance), subcomponents: makeMetricSubcomponents("Performance", 6), timeline: makeMetricTimeline(equipment.value.performance) },
  { ...makeMetric("Quality", equipment.value.quality), subcomponents: makeMetricSubcomponents("Quality", 6), timeline: makeMetricTimeline(equipment.value.quality) },
]);

interface IMetricSubcomponent {
  name: string;
  value: number;
}




const activeTab = ref(metrics.value[0]);
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
