import { isNonNullish, unique } from "remeda";

import type { EquipmentWithOeeFragment } from "~/generated/graphql/operations";
import { GetEquipmentsDocument, GetOeeEquipmentTypesWithEquipmentIdsDocument  } from "~/generated/graphql/operations";



export interface EquipmentWithOEEHook {
  data: EquipmentWithOeeFragment[] | null | undefined;
}

export function useEquipmentWithOEE(): Ref<EquipmentWithOEEHook> {
  const { result: typeRes } = useQuery(
    GetOeeEquipmentTypesWithEquipmentIdsDocument,
    {},
    { errorPolicy: "ignore" },
  );

  const equipmentIds = computed(() => unique(
    typeRes.value?.equipmentTypes?.flatMap((et) =>
      et.equipments.map((eq) => eq.partOfId),
    ).filter(isNonNullish) || [],
  ));

  const { result: eqRes } = useQuery(GetEquipmentsDocument, {
    filter: {
      id: { in: equipmentIds.value ?? [] },
    },
  }, {
    enabled: equipmentIds.value && equipmentIds.value.length > 0,
    errorPolicy: "ignore",
  });

  return computed<EquipmentWithOEEHook>(() => ({
    data: eqRes.value?.equipments,
  }));
}
