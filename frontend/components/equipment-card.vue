<template>
  <v-card border="md" @click="console.log()">
    <v-row class="ma-0">
      <v-col cols="7" class="pa-0 border-e-md">
        <v-card-title class="text-h6 text-center">
          {{ equipment.name }}
        </v-card-title>
        <v-card-text class="d-flex flex-row">
          <v-progress-circular :model-value="equipment.oee" size="150" width="20" :color="getColorState(equipment.oee, equipment.isPaused)" class="mx-auto text-h6">
            {{equipment.oee}}%
          </v-progress-circular>
        </v-card-text>
      </v-col>



      <v-col cols="5" class="pa-0">
        <div class="fill-height justify-space-around d-flex flex-column px-2">
          <div v-for="metric in metrics" :key="metric.label" class="text-center">
            <h3>{{metric.label}}</h3>
            <v-progress-circular :model-value="metric.value" size="75" width="10" :color="getColorState(metric.value, false)">
              {{equipment.oee}}%
            </v-progress-circular>
          </div>
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
