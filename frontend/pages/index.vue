<template>
  <v-container>
    <v-row class="ma-0">
      <v-col cols="12" class="dashboard-grid">
        <EquipmentCard
          v-for="equipment in equipments.data"
          :key="equipment.id"
          :equipment="equipment"
          @click="navigateTo(`/equipment/${equipment.id}`)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useGraphQLUser } from "~/lib/auth";
import { useEquipmentWithOEE } from "~/lib/equipment";



const user = useGraphQLUser();
const equipments = useEquipmentWithOEE();

effect(() => {
  if(!user.value) {
    // Redirect if not logged in.
    navigateTo("/login");
  }
});

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
