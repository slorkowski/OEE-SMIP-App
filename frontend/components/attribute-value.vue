

<template>
  <span v-if="attribute.value === undefined || attribute.value === null">
    <em>no value</em>
  </span>
  <v-chip v-else>
    <span v-if="attribute.dataType === ScalarTypeEnum.Datetime">
      {{ renderDateTime(attribute.value as string) }}
    </span>
    <span v-if="attribute.dataType === ScalarTypeEnum.Float">
      {{ typeof attribute.value === "number" ? attribute.value.toFixed(2) : attribute.value }}
      {{ attribute.maxValue === 100 ? '%' : ''}}
    </span>
    <span v-else>
      {{ attribute.value }}
    </span>
  </v-chip>
</template>

<script setup lang="ts">
import { ScalarTypeEnum } from "~/generated/graphql/operations";
import type { IAttribute } from "~/lib/equipment";



interface Props {
  attribute: IAttribute;
}
const { attribute } = defineProps<Props>();
</script>
