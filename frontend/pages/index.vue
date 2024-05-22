<template>
  <v-container>
    <v-row class="ma-0 justify-center">
      <v-col cols="12" class="d-flex flex-row">
        <v-spacer/>
        <v-btn
          density="compact"
          size="large"
          class="text-h5"
          border="md"
          @click="refresh()"
        >
          <v-icon icon="mdi-refresh"/>
        </v-btn>

      </v-col>
      <v-col v-if="equipments" cols="12" class="dashboard-grid">
        <EquipmentCard
          v-for="equipment in equipments"
          :id="equipment.id"
          :key="equipment.id"
          :equipment="equipment"
          @click="navigateTo(`/equipment/${equipment.id}`)"
        />
      </v-col>

      <v-col v-else cols="auto">
        <v-card class="text-center" @click="refresh()">
          <v-card-title>
            No Equipment Found
          </v-card-title>
          <v-card-subtitle>
            Click to Refresh
          </v-card-subtitle>
          <v-card-text class="text-h4">
            <v-icon size="x-large" icon="mdi-refresh"/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Dashboard",
});

const { data: equipments, refresh } = await useAsyncEquipmentWithOEE();
</script>

<style>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
</style>
