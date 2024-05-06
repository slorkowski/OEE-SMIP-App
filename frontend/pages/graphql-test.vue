<script setup lang="ts">
import { useEquipmentWithOEE } from "~/lib/equipment";



const eqRef = useEquipmentWithOEE();
</script>

<template>
  <section class="ma-4">
    <h1>GraphQL Test Page</h1>
    <p>
      In order for this page to work, you'll have to <a href="/login">login</a>.
    </p>
    <p>
      Specifically, if using the CESMII East instance, go to <a href="https://east.cesmii.net/">https://east.cesmii.net/</a>, open the dropdown for "Developer" and select "Authentication Management" to generate a new authenticator to login with.
    </p>
    <p>
      You should then be able to navigate back to this page and see the content below:
    </p>
    <v-list v-if="eqRef" class="border-lg mt-4">
      <v-list-item
        v-for="et in eqRef.data"
        :key="et.id"
        :title="et.displayName ?? 'Unknown Type'"
      >
        <v-list-item-subtitle>
          <v-chip
            v-for="oee_metric in et.childEquipment"
            :key="oee_metric.id"
            :text="oee_metric.displayName || 'unknown metric'"
          />
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </section>
</template>
