<template>
  <v-container>
    <v-row class="ma-0">
      <v-col
        v-for="equipment in equipments"
        :key="equipment.id"
        cols="4"
      >
        <EquipmentCard
          :equipment="equipment"
          @click="navigateTo(`/equipment/${equipment.id}`)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { MockEquipment } from "~/utils/equipment";



const equipments: MockEquipment[] = createDefaultMockData();

definePageMeta({
  title: "Dashboard",
});

</script>
