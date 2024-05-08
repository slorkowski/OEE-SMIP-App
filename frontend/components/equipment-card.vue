<template>
  <v-card border="md" @click="console.log()">
    <v-row class="ma-0 fill-height">
      <v-col cols="7" class="border-e-md d-flex flex-column justify-space-between align-center">
        <h2 class="text-h6 text-center">
          {{ equipment.name }}
        </h2>
        <v-progress-circular :model-value="equipment.oee" size="150" width="20" :color="getColorState(equipment.oee, equipment.isPaused)" class="text-h6">
          {{equipment.oee}}%
        </v-progress-circular>
      </v-col>

      <v-col cols="5" class="pa-0">
        <div class="fill-height justify-space-around d-flex flex-column px-2">
          <v-card
            v-for="metric in metrics"
            :key="metric.label"
            class="border-b-md pa-0" :style="{background: progressGradient(getColorState(equipment.quality, equipment.isPaused), equipment.performance)}"
          >
            <v-card-title class="text-subtitle-1 d-flex justify-space-between" >
              <span class="mr-4">{{ metric.label }}</span>
              <span>{{metric.value}}%</span>
            </v-card-title>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";



export interface MockEquipment {
  name: string;
  id: number;
  availability: number;
  quality: number;
  performance: number;
  oee: number;
  isPaused: boolean;
};

const theme = useTheme();

interface Props {
  equipment: MockEquipment;
}

const { equipment } = defineProps<Props>();
const metrics = computed(() => [
  { label: "Availabilty", value: equipment.availability },
  { label: "Performance", value: equipment.performance },
  { label: "Quality", value: equipment.quality },
]);

function progressGradient(colorState: ColorState, percentage: number): string {
  const _enabled: boolean = true;
  if(_enabled === false) {
    return "";
  };

  return `linear-gradient(90deg, hsl(${hslToString(hexToHSL(theme.current.value.colors[colorState]))}) 0%, hsl(${hslToString(hexToHSL(theme.current.value.colors[colorState]))}) ${percentage}%, hsl(${hslToString(hexToHSL(theme.current.value.colors["surface"]))}) ${percentage}%)`;
};

</script>
