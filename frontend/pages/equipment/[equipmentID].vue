<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-h5">
          {{equipment.name}} Details
        </h2>
      </v-col>

      <v-col cols="12" class="d-flex flex-row justify-space-around align-center">
        <MetricSelectCard :active="activeMetric === 'oee'" :metric="equipment.oee" @click="activeMetric = 'oee'"/>
        <v-icon icon="mdi-equal" size="50"/>
        <MetricSelectCard :active="activeMetric === 'availability'" :metric="equipment.availability" @click="activeMetric = 'availability'"/>
        <v-icon icon="mdi-close" size="50"/>
        <MetricSelectCard :active="activeMetric === 'quality'" :metric="equipment.quality" @click="activeMetric = 'quality'"/>
        <v-icon icon="mdi-close" size="50"/>
        <MetricSelectCard :active="activeMetric === 'performance'" :metric="equipment.performance" @click="activeMetric = 'performance'"/>
      </v-col>

      <v-col cols="12">
        <v-expansion-panels v-model="subcomponents" multiple>
          <!-- Math.round(activeMetric.length / 2) is just used for variation -->
          <v-expansion-panel
            v-for="n in (Math.round(activeMetric.length / 2))" :key="n" :value="n">
            <v-expansion-panel-title class="text-h6 pl-8">
              {{equipment[activeMetric].label}} Subcomponent {{n}}
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
import type { MetricKey } from "~/utils/equipment";



const route = useRoute();

// This will be replaced with query to db
const equipment = ref(
  createDefaultMockData()[Number.parseInt((route.params.equipmentID as string)) - 1],
);

const activeMetric: Ref<MetricKey> = ref("oee");

const subcomponents = ref();
</script>

