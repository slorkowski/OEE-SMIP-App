<template>
  <v-container>
    <v-row>
      <v-col v-if="activeEquipment" cols="10" class="border-e-md">
        <EquipmentDetails :equipment="activeEquipment"/>
      </v-col>


      <v-col :cols="activeEquipment ? 2 : 12" class="pa-0">
        <v-row class="ma-0">
          <v-col
            v-for="equipment in equipments"
            :key="equipment.id"
            :cols="activeEquipment ? 12 : 4"
          >

            <EquipmentCard
              :equipment="equipment"
              :show-stats="activeEquipment ? false : true"
              @click="selectEquipment(equipment)"
            />

          </v-col>
        </v-row>
      </v-col>


    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { range, mapValues } from "remeda";

import { MockEquipment } from "~/utils/equipment";



const activeEquipment: Ref<MockEquipment | null> = ref(null);

function selectEquipment(equipment: MockEquipment): void {
  if(activeEquipment.value !== null && equipment.id === activeEquipment.value.id) {
    activeEquipment.value = null;
  } else {
    activeEquipment.value = equipment;
  }
}

type MachineState = "success" | "warn" | "error";

/** Seeds used to generate mock data. A variance is added to these beginning metrics. */
const METRIC_SEEDS = {
  success: {
    availability: 90,
    quality: 93,
    performance: 93,
  },
  warn: {
    availability: 75,
    quality: 90,
    performance: 70,
  },
  error: {
    availability: 40,
    quality: 50,
    performance: 80,
  },
};

function createMockEquipment(id: number, state: MachineState): MockEquipment {
  const  varyValue = id;

  return new MockEquipment({
    name: `Equipment ${id}`,
    id,
    ...mapValues(METRIC_SEEDS[state], (seed) => seed + varyValue),
    get oee() {
      return (this.availability * this.quality * this.performance) / (Math.pow(100, 2));
    },
  });
}

function createMockData(success: number, warn: number, error: number): MockEquipment[] {
  return [
    ...range(0, success)
      .map((i) => createMockEquipment(i + 1, "success")),
    ...range(success, success + warn)
      .map((i) => createMockEquipment(i + 1, "warn")),
    ...range(success + warn, success + warn + error)
      .map((i) => createMockEquipment(i + 1, "error")),
  ];
}

const equipments: MockEquipment[] = createMockData(3, 3, 3);

definePageMeta({
  title: "Dashboard",
});

</script>
