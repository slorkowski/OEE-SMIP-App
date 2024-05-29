<template>
  <div v-if="loading" class="d-flex flex-column align-center ga-4">
    <span>Loading Attributes...</span>
    <v-progress-circular :size="75" color="primary" indeterminate/>
  </div>
  <div v-else>
    <v-table>
      <thead>
        <th class="text-left">
          Attribute
        </th>
        <th class="text-left">
          Value
        </th>
        <th class="text-left">
          Type
        </th>
        <th class="text-left">
          Updated
        </th>
      </thead>

      <tbody>
        <tr v-for="attr in attributes" :key="attr.id">
          <td>{{attr.displayName}}</td>
          <td>
            <attribute-value :attribute="attr"/>
          </td>
          <td>
            {{ attr.dataType }}
          </td>
          <td>
            <span v-if="attr.updatedTimestamp">
              {{ renderDateTime(attr.updatedTimestamp) }}
            </span>
            <em v-else>unknown</em>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div class="text-center">
      <div v-if="attributes?.length === 0" class="mt-4">
        <em>No Attributes</em>
      </div>
      <div v-if="!attributes" class="mt-4">
        <em>Could Not Retrieve Attributes</em>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IAttribute } from "~/lib/equipment";



interface Props {
  attributes: IAttribute[] | null | undefined;
  loading?: boolean;
}
const { attributes, loading } = defineProps<Props>();
</script>
