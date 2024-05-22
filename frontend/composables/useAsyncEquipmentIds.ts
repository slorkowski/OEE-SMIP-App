import { isNonNullish, unique } from "remeda";

import { GetOeeEquipmentTypesWithEquipmentIdsDocument } from "~/generated/graphql/operations";



export default function () {
  return useAsyncQuery(GetOeeEquipmentTypesWithEquipmentIdsDocument,
    {},
    "default",
    { errorPolicy: "ignore" }
    , {
      transform: (typeRes) => {
        const oeeEquipment = unique(
          typeRes.equipmentTypes?.flatMap((et) => et.equipments) || [],
        );

        const oeeEquipmentIds = new Set(oeeEquipment.map((e) => e.id));

        const oeeParentIds = unique(
          oeeEquipment.map((eq) => eq.partOfId).filter(isNonNullish),
        );

        const oeeEquipmentIdsWithOEEChildren = oeeParentIds
          .filter(
            (partOfId) => oeeEquipmentIds.has(partOfId),
          );

        // const oeeParentIdsWihoutOEEChildren = computed(() => unique(
        //   oeeEquipment.value.filter((eq) =>
        //   // Exclude the parent of equipment who are counted under structure #2.
        //     !oeeEquipmentIdsWithOEEChildren.value.includes(eq.id)
        //     // Exclude the equipment who are counted under structure #2.
        //     && (!eq.partOfId || !oeeEquipmentIdsWithOEEChildren.value.includes(eq.partOfId)),
        //   )
        //     .map((eq) => eq.partOfId)
        //     .filter(isNonNullish),
        // ));

        const oeeParentIdsWithoutOEEChildren = unique(
          oeeEquipment
            .filter(
              (eq) => !oeeEquipmentIdsWithOEEChildren.includes(eq.id) && (!eq.partOfId || !oeeEquipmentIdsWithOEEChildren.includes(eq.partOfId)),
            )
            .map((eq) => eq.partOfId)
            .filter(isNonNullish),
        );

        const equipmentIds = computed(() => unique([
          ...oeeEquipmentIdsWithOEEChildren,
          ...oeeParentIdsWithoutOEEChildren,
        ]));

        return equipmentIds.value;
      },
    });
}

