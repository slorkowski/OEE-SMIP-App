<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="dashboard-grid">
        <EquipmentCard
          v-for="equipment in equipments"
          :key="equipment.id"
          :equipment="equipment"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { range } from "remeda";

import type { MockEquipment } from "~/components/equipment-card.vue";



function createMockEquipment(id: number, color: ColorState): MockEquipment {
  const equipment: MockEquipment = {
    name: `Equipment ${id}`,
    id,
    availability: 1,
    quality: 1,
    performance: 1,
    get oee() {
      return (this.availability * this.quality * this.performance) / (Math.pow(100, 2));
    },
  };

  const  varyValue = id;

  switch (color) {
    case "success":
      equipment.availability = 90 + varyValue;
      equipment.quality = 93 + varyValue;
      equipment.performance = 93 + varyValue;
      break;
    case "warn":
      equipment.availability = 75 + varyValue;
      equipment.quality = 90 + varyValue;
      equipment.performance = 70 + varyValue;
      break;
    case "error":
      equipment.availability = 40 + varyValue;
      equipment.quality = 50 + varyValue;
      equipment.performance = 80 + varyValue;
  }

  return equipment;
}

function createMockData(success: number, warn: number, error: number): MockEquipment[] {
  const mockData: MockEquipment[] = [];

  const indexBounds = { min: 1, max: success + 1 };

  range(indexBounds.min, indexBounds.max).forEach((i) => {
    mockData.push(createMockEquipment(i, "success"));
  });

  indexBounds.min = indexBounds.min + success;
  indexBounds.max = indexBounds.max + warn;

  range(indexBounds.min, indexBounds.max).forEach((i) => {
    mockData.push(createMockEquipment(i, "warn"));
  });

  indexBounds.min = indexBounds.min + warn;
  indexBounds.max = indexBounds.max + error;

  range(indexBounds.min, indexBounds.max).forEach((i) => {
    mockData.push(createMockEquipment(i, "error"));
  });

  return mockData;
}

const equipments: MockEquipment[] = createMockData(3, 3, 3);

definePageMeta({
  title: "Dashboard",
});

</script>

<style>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
</style>
