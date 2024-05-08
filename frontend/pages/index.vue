<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 ml-4"> Dashboard </h1>
      </v-col>


      <v-toolbar>
        <v-toolbar-items class="pl-8 align-center">
          <v-chip/>
        </v-toolbar-items>
      </v-toolbar>

      <v-col cols="12" class="px-6">
        <v-row>
          <v-col v-for="equipment in equipments" :key="equipment.id" cols="4">
            <EquipmentCard :equipment="equipment" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>


  </v-container>
</template>

<script setup lang="ts">
import type { MockEquipment } from "~/components/equipment-card.vue";

// import type { EquipmentOverviewFragment } from "~/generated/graphql/operations";


// const equipments: EquipmentOverviewFragment[] = [];
const equipments: MockEquipment[] = [
  {
    name: "Rohirrim Answering Service",
    id: 1,
    availability: 40,
    quality: 90,
    performance: 90,
    get oee() {
      return (this.availability * this.quality * this.performance) / (Math.pow(100, 2));
    },
    isPaused: false,
  },
  {
    name: "Augustus Gloop Memorial River",

    id: 1,
    availability: 40,
    quality: 90,
    performance: 90,
    get oee() {
      return (this.availability * this.quality * this.performance) / (Math.pow(100, 2));
    },
    isPaused: false,
  },
  {
    name: "Hobbit Surveillance",
    id: 1,
    availability: 80,
    quality: 90,
    performance: 90,
    get oee() {
      return (this.availability * this.quality * this.performance) / (Math.pow(100, 2));
    },
    isPaused: true,
  },
  {
    name: "Oompa Loompa HR",
    id: 1,
    availability: 80,
    quality: 90,
    performance: 90,
    get oee() {
      return (this.availability * this.quality * this.performance) / (Math.pow(100, 2));
    },
    isPaused: true,
  },
  {
    name: "Nut Sorting Room",
    id: 1,
    availability: 80,
    quality: 80,
    performance: 90,
    get oee() {
      return (this.availability * this.quality * this.performance) / (Math.pow(100, 2));
    },
    isPaused: false,
  },
  {
    name: "Nazgul Robe Pre-Shredder",
    id: 1,
    availability: 80,
    quality: 80,
    performance: 90,
    get oee() {
      return (this.availability * this.quality * this.performance) / (Math.pow(100, 2));
    },
    isPaused: false,
  },
  {
    name: "Un-blueberrifier",
    id: 1,
    availability: 100,
    quality: 90,
    performance: 90,
    get oee() {
      return (this.availability * this.quality * this.performance) / (Math.pow(100, 2));
    },
    isPaused: false,
  },

  {
    name: "Mt. Doom Rock Polisher",
    id: 1,
    availability: 100,
    quality: 90,
    performance: 90,
    get oee() {
      return (this.availability * this.quality * this.performance) / (Math.pow(100, 2));
    },
    isPaused: false,
  },



];

// const themeColors: CarbonyTheme = ref(genThemeColor("#161b22"));
</script>
