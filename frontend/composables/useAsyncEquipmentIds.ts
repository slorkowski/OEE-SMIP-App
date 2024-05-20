import { isNonNullish, unique } from "remeda";

import { GetOeeEquipmentTypesWithEquipmentIdsDocument } from "~/generated/graphql/operations";



export default function () {
  return useAsyncQuery(GetOeeEquipmentTypesWithEquipmentIdsDocument,
    {},
    "default",
    { errorPolicy: "ignore" }
    , {
      transform: (typeRes) => {
      /** All equipment with OEE `equipmentType`. */
        const oeeEquipment = computed(() => unique(
          typeRes.equipmentTypes?.flatMap((et) => et.equipments) || [],
        ));
        /** Set of equipment IDs with an OEE `equipmentType`. */
        const oeeEquipmentIds = computed(() => new Set(oeeEquipment.value.map((e) => e.id)));
        /** Equipment IDs that are the parent of at least one OEE Equipment. */
        const oeeParentIds = computed(() => unique(
          oeeEquipment.value
            .map((eq) => eq.partOfId)
            .filter(isNonNullish),
        ));
        /**
     * The OEE equipment IDs that have a child OEE equipment.
     * This represents a root equipment following structure #2 (see above).
     */
        const oeeEquipmentIdsWithOEEChildren = computed(() =>
          oeeParentIds.value.filter((partOfId) => oeeEquipmentIds.value.has(partOfId)),
        );
        const oeeParentIdsWihoutOEEChildren = computed(() => unique(
          oeeEquipment.value.filter((eq) =>
          // Exclude the parent of equipment who are counted under structure #2.
            !oeeEquipmentIdsWithOEEChildren.value.includes(eq.id)
            // Exclude the equipment who are counted under structure #2.
            && (!eq.partOfId || !oeeEquipmentIdsWithOEEChildren.value.includes(eq.partOfId)),
          )
            .map((eq) => eq.partOfId)
            .filter(isNonNullish),
        ));

        const equipmentIds = computed(() => unique([
          ...oeeEquipmentIdsWithOEEChildren.value,
          ...oeeParentIdsWihoutOEEChildren.value,
        ]));

        return equipmentIds.value;
      },
    });
}

