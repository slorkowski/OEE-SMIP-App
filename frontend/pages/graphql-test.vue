<script setup lang="ts">
import { onBeforeMount } from "vue";

import { useEquipmentWithOEE } from "~/lib/graphql/equipment";



const { onLogin } = useApollo();

const eqRef = useEquipmentWithOEE();



onBeforeMount(() => {
    const token = import.meta.env.VITE_APP_GRAPHQL_TOKEN;
    console.log(`Setting token to ${token}`);
    onLogin(token)
        .then(() => console.log("token set"));
});
</script>

<template>
    <v-list v-if="eqRef">
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
</template>
