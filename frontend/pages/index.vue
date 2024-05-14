<template>
  <v-container>
    <v-row class="ma-0">
      <v-col cols="12" class="dashboard-grid">
        <EquipmentCard
          v-for="equipment in equipments"
          :key="equipment.id"
          :equipment="equipment"
          @click="navigateTo(`/equipment/${equipment.id}`)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useMockEquipment } from "~/mocks/equipment";



const equipments = useMockEquipment();

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
