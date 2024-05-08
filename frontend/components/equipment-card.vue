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
        <v-card-text class="fill-height justify-space-between d-flex flex-column px-0">
          <v-card
            class="border-b-md pa-0" :style="{background: progressGradient(getColorState(equipment.quality, equipment.isPaused), equipment.performance)}">
            <v-card-title class="text-subtitle-1 d-flex flex-row" >
              Quality
              <v-spacer/>
              {{equipment.quality}}%
            </v-card-title>
          </v-card>
          <v-card flat class="pa-0" :style="{background: progressGradient(getColorState(equipment.performance, equipment.isPaused), equipment.performance)}">
            <v-card-title class="text-subtitle-1 d-flex flex-row">
              Performance
              <v-spacer/>
              {{equipment.performance}}%
            </v-card-title>
          </v-card>
          <v-card
            flat class="border-t-md pa-0" :style="{background: progressGradient(getColorState(equipment.availability, equipment.isPaused), equipment.availability)}">
            <v-card-title class="text-subtitle-1 d-flex flex-row">
              Quality
              <v-spacer/>
              {{equipment.availability}}%
            </v-card-title>
          </v-card>
        </v-card-text>
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

function progressGradient(colorState: ColorState, percentage: number): string {
  const _enabled: boolean = true;
  if(_enabled === false) {
    return "";
  };

  return `linear-gradient(90deg, hsl(${hslToString(hexToHSL(theme.current.value.colors[colorState]))}) 0%, hsl(${hslToString(hexToHSL(theme.current.value.colors[colorState]))}) ${percentage}%, hsl(${hslToString(hexToHSL(theme.current.value.colors["surface"]))}) ${percentage}%)`;
};

</script>
