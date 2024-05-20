<template>
  <v-container>
    <v-row class="ma-0">
      <v-col cols="12" class="dashboard-grid">
        <template v-if="equipments">
          <EquipmentCard
            v-for="equipment in equipments"
            :key="equipment.id"
            :equipment="equipment"
            @click="navigateTo(`/equipment/${equipment.id}`)"
          />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Dashboard",
});

const { data: equipments } = await useAsyncEquipmentWithOEE();
</script>

<style>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
</style>
