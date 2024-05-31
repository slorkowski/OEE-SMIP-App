

<template>
  <template v-if="attribute.value !== null && attribute.value !== undefined">
    <v-chip v-if="attribute.dataType === ScalarTypeEnum.Datetime">
      {{ renderDateTime(attribute.value as string) }}
    </v-chip>

    <v-chip v-else-if="attribute.dataType === ScalarTypeEnum.Float">
      {{ typeof attribute.value === "number" ? attribute.value.toFixed(2) : attribute.value }}
      {{ attribute.maxValue === 100 ? '%' : ''}}
    </v-chip>

    <v-chip v-else>
      {{attribute.value}}
    </v-chip>
  </template>

  <em v-else>
    No Value
  </em>


</template>

<script setup lang="ts">
import { ScalarTypeEnum } from "~/generated/graphql/operations";
import type { IAttribute } from "~/lib/equipment";



interface Props {
  attribute: IAttribute;
}
const { attribute } = defineProps<Props>();
</script>
