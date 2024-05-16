<template>
  <v-container>
    <v-row class="ma-0">
      <v-col cols="4" class="d-flex align-center justify-left">
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

        <h2 class="text-h5 d-inline ml-2">
          {{equipment.name}} Details
        </h2>

        <span class="d-inline-block">
          <MetricProgressCircular :metric="oeeSummary" :size="250"/>
        </span>
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
const metrics = computed(() => [
  makeMetric("Availability", equipment.value.availability),
  makeMetric("Performance", equipment.value.performance),
  makeMetric("Quality", equipment.value.quality),
]);

const activeTab = ref(metrics.value[0]);
</script>

