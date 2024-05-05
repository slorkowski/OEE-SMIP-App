<script setup lang="ts">
import { onBeforeMount } from "vue";

import { useEquipmentWithOEE } from "~/lib/equipment";



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
    <section class="ma-4">
        <h1>GraphQL Test Page</h1>
        <p>
            In order for this page to work, you'll have to request a header token from your GraphQL server and set an environment variable to it.
        </p>
        <p>
            Specifically, if using the CESMII East instance, go to <a href="https://east.cesmii.net/">https://east.cesmii.net/</a>, open the dropdown for "Developer" and select "Request Header Token".
        </p>
        <p>
            Then create a <code>.env</code> file in the <code>frontend</code> directory and add the following line:
        </p>
        <pre class="mt-4">
    VITE_APP_GRAPHQL_TOKEN=&lt;token value, excluding "Bearer"&gt;
        </pre>
        <p>
            This token expires relatively quickly, so you might have to update this if you're testing this page for a bit.
        </p>
        <p>
            You should then see the content below:
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
