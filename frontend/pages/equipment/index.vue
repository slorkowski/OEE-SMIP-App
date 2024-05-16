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
          <v-tab v-for="metric in metrics" :key="metric.label" :value="metric" class="bg-surface metric-card" :class="activeTab.label === metric.label ? '' : 'border-e-md'">
            {{metric.label}}
          </v-tab>
        </v-tabs>
      </v-col>

      <v-col cols="auto" class="pl-0 flex-grow-1">
        <v-tabs-window v-model="activeTab">
          <v-tabs-window-item v-for="metric in metrics" :key="metric.label" :value="metric">
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

          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>

    <v-row class="ma-0">
      <v-col cols="5">
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

      <v-col cols="7" class="pl-6">
        <v-card
          class="d-flex flex-grow-1 fill-height">
          <v-card-text>
            <v-sparkline
              :model-value="activeTab.timeline"
              color="white"
              line-width="2"
              :style="{position: 'absolute'}"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">

import { useMockEquipment } from "~/mocks/equipment";



definePageMeta({
  title: "Equipment Details",
});

const route = useRoute();
const equipmentId = route.params.equipmentID as string;

// This will be replaced with query to db
const equipment: Ref<IMockEquipment> = ref(useMockEquipment().value[4]);

function makeMetricSubcomponents(metricLabel: string, quantity: number): IMetricSubcomponent[] {
  const subcomponents: IMetricSubcomponent[] = [];

  for(let index = 0; index < quantity; index++) {
    subcomponents.push({ name: `${metricLabel} Subcomponent ${index}`, value: index * 10 });
  }
  return subcomponents;
}

function makeMetricTimeline(value: number) {
  return [
    value - 10,
    value + 5,
    value - 15,
    value + 10,
    value - 10,
    value + 5,
    value - 15,
    value + 10,
    value,
  ];
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
