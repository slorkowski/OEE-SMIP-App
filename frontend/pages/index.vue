<template>
  <v-container>
    <v-row class="ma-0 justify-center">
      <v-col cols="12" class="d-flex justify-end">
        <v-btn
          aria-label="Refresh Dashboard"
          density="compact"
          size="large"
          class="text-h5"
          border="md"
          @click="() => refresh()"
        >
          <v-icon icon="mdi-refresh"/>
        </v-btn>
      </v-col>
      <v-col v-if="status === 'pending'" class="d-flex flex-column align-center ga-4">
        <span>Loading Equipment...</span>
        <v-progress-circular :size="75" color="primary" indeterminate/>
      </v-col>
      <v-col v-else-if="status === 'error'" class="d-flex flex-column align-center ga-4">
        <v-alert
          title="Error Fetching Equipment"
          type="error"
          text="There was an unexpected error fetching equipment. Please try again."
        />
      </v-col>
      <v-col v-else-if="equipments && equipments.length > 0" cols="12">
        <v-row>
          <v-col
            v-for="equipment in equipments"
            :key="equipment.id"

            cols="12"
            md="6"
            xl="4"
          >
            <EquipmentCard
              :id="equipment.id"
              :equipment="equipment"
              @click="navigateTo(`/equipment/${equipment.id}`)"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col v-else cols="auto">
        <v-card class="text-center">
          <v-card-title>
            No Equipment Found
          </v-card-title>
          <v-card-subtitle>
            Please try refreshing.
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Dashboard",
});

const { data: equipments, refresh, status } = useAsyncEquipmentWithOEE();
</script>
