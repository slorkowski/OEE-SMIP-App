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
          {{equipment.data?.displayName}} Details
        </h2>
      </v-col>

      <v-col cols="12" class="d-flex flex-row justify-space-around align-center">
        <MetricSelectCard
          label="OEE"
          :active="activeMetricKey === 'summary'"
          :value="equipment.data?.oee.summary?.metric?.value"
          @click="() => setActiveMetric('summary')"
        />
        <v-icon icon="mdi-equal" size="50"/>
        <MetricSelectCard
          label="Availability"
          :active="activeMetricKey === 'availability'"
          :value="equipment.data?.oee.availability?.metric?.value"
          @click="() => setActiveMetric('availability')"
        />
        <v-icon icon="mdi-close" size="50"/>
        <MetricSelectCard
          label="Quality"
          :active="activeMetricKey === 'quality'"
          :value="equipment.data?.oee.quality?.metric?.value"
          @click="() => setActiveMetric('quality')"
        />
        <v-icon icon="mdi-close" size="50"/>
        <MetricSelectCard
          label="Performance"
          :active="activeMetricKey === 'performance'"
          :value="equipment.data?.oee.performance?.metric?.value"
          @click="() => setActiveMetric('performance')"
        />
      </v-col>

      <v-col cols="12">
        <v-expansion-panels v-model="subcomponents" multiple>
          <!-- Math.round(activeMetric.length / 2) is just used for variation -->
          <v-expansion-panel
            v-for="n in (Math.round(activeMetricKey.length / 2))" :key="n" :value="n">
            <v-expansion-panel-title class="text-h6 pl-8">
              {{activeMetricKey}} Subcomponent {{n}}
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
import type { OEEMetricKey } from "~/lib/equipment";
import { useEquipmentDetailWithOEE  } from "~/lib/equipment";



definePageMeta({
  title: "Equipment Details",
});

const route = useRoute();
const equipmentId = route.params.equipmentID as string;

// This will be replaced with query to db
const equipment = useEquipmentDetailWithOEE(equipmentId);

const activeMetricKey = ref<OEEMetricKey>("summary");

const subcomponents = ref();



function setActiveMetric(key: OEEMetricKey) {
  activeMetricKey.value = key;
}
</script>

