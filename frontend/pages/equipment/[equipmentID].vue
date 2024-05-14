<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex align-center">
        <!-- Back Button -->
        <v-btn
          to="/"
          icon="mdi-chevron-left"
          variant="text"
          density="compact"
          size="large"
          class="text-h5"
        />
        <h2 class="text-h5 d-inline ml-2">
          {{equipment.name}} Details
        </h2>
      </v-col>

      <v-col cols="12" class="d-flex flex-row justify-space-around align-center">
        <MetricSelectCard :active="activeMetric.label === oeeSummary.label" :metric="oeeSummary" @click="() => setActiveMetric(oeeSummary)"/>
        <v-icon icon="mdi-equal" size="50"/>
        <MetricSelectCard :active="activeMetric.label === availability.label" :metric="availability" @click="() => setActiveMetric(availability)"/>
        <v-icon icon="mdi-close" size="50"/>
        <MetricSelectCard :active="activeMetric.label === quality.label" :metric="quality" @click="() => setActiveMetric(quality)"/>
        <v-icon icon="mdi-close" size="50"/>
        <MetricSelectCard :active="activeMetric.label === performance.label" :metric="performance" @click="() => setActiveMetric(performance)"/>
      </v-col>

      <v-col cols="12">
        <v-expansion-panels v-model="subcomponents" multiple>
          <!-- Math.round(activeMetric.length / 2) is just used for variation -->
          <v-expansion-panel
            v-for="n in (Math.round(activeMetric.label.length / 2))" :key="n" :value="n">
            <v-expansion-panel-title class="text-h6 pl-8">
              {{activeMetric.label}} Subcomponent {{n}}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Graphics here
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
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
const equipment = useMockEquipmentById(equipmentId);

const oeeSummary = computed(() => makeMetric("OEE", equipment.value.oee));
const availability = computed(() => makeMetric("Availability", equipment.value.availability));
const performance = computed(() => makeMetric("Performance", equipment.value.performance));
const quality = computed(() => makeMetric("Quality", equipment.value.quality));

const activeMetric = ref<Metric>(oeeSummary.value);

const subcomponents = ref();



function setActiveMetric(metric: Metric) {
  activeMetric.value = metric;
}
</script>

