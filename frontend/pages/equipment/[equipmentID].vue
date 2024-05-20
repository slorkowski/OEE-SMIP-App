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
          {{equipment.data?.displayName || "Equipment"}} Details
        </h2>


      </v-col>

      <v-col cols="4">
        <MetricProgressCircular label="OEE" :value="oeeSummary.value" :size="250"  />
      </v-col>

      <v-col>
        <v-card class="rounded-ts-0 fill-height">
          <v-card-text>
            <v-table>
              <thead>
                <th class="text-left">
                  Equipment Attribute
                </th>
                <th class="text-left">
                  Value
                </th>
              </thead>

              <tbody>
                <tr v-for="attr in equipment.data?.attributes" :key="attr.id">
                  <td>{{attr.displayName}}</td>
                  <td>{{attr.value}}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" class="pl-0 flex-grow-1">
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
                <v-table>
                  <thead>
                    <th class="text-left">
                      Attribute
                    </th>
                    <th class="text-left">
                      Value
                    </th>
                  </thead>

                  <tbody>
                    <tr v-for="attr in tab.equipment?.attributes" :key="attr.id">
                      <td>{{attr.displayName}}</td>
                      <td>{{attr.value}}</td>
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
      <v-col cols="6"/>

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
        </v-card>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useEquipmentDetailWithOEE  } from "~/lib/equipment";



definePageMeta({
  title: "Equipment Details",
});

const route = useRoute();
const equipmentId = route.params.equipmentID as string;
const equipment = useEquipmentDetailWithOEE(equipmentId);

console.log(equipment.value.data?.attributes);




const oeeSummary = computed(() => makePercentMetric("OEE", equipment.value.data?.oee.summary?.metric?.value));
const metricTabs = computed(() => [
  {
    label: "Availability",
    color: "purple",
    equipment: equipment.value.data?.oee.availability,
  },
  {
    label: "Quality",
    color: "indigo",
    equipment: equipment.value.data?.oee.quality,
  },
  {
    label: "Performance",
    color: "teal",
    equipment: equipment.value.data?.oee.performance,
  },
]);

const activeTabLabel = ref(metricTabs.value[0].label);
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
