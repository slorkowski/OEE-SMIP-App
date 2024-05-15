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
import { range, mapValues } from "remeda";

import type { MockEquipment } from "~/components/equipment-card.vue";
import { useGraphQLUser } from "~/lib/auth";



const user = useGraphQLUser();

effect(() => {
  console.log({ user: user.value });
  if(!user.value) {
    // Redirect if not logged in.
    navigateTo("/login");
  }
});

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

  return {
    name: `Equipment ${id}`,
    id,
    ...mapValues(METRIC_SEEDS[state], (seed) => seed + varyValue),
    get oee() {
      return (this.availability * this.quality * this.performance) / (Math.pow(100, 2));
    },
  };
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

<style>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
</style>
