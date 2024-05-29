import { unique, isNonNullish } from "remeda";

import type { IEquipmentWithOEE } from "./types";
import { parseEquipmentWithOEE } from "./utils";
import { GetOeeEquipmentTypesWithEquipmentIdsDocument, GetEquipmentsDocument, GetEquipmentDetailDocument } from "~/generated/graphql/operations";



export interface EquipmentWithOEEHook {
  data: IEquipmentWithOEE[] | undefined;
}

/*
 * Two possible structures for OEE equipment to descend from an "actual" piece of equipment:
 *
 * 1)
 *    - Physical Equipment
 *      - OEE Summary (type OEE Summary)
 *      - OEE Availability (type OEE Availability)
 *      - OEE Performance (type OEE Performance)
 *      - OEE Quality (type OEE Quality)
 *
 * 2)
 *    - Physical Equipment (type OEE Summary)
 *      - OEE Availability (type OEE Availability)
 *      - OEE Performance (type OEE Performance)
 *      - OEE Quality (type OEE Quality)
 *
 * Can differentiate based on `type` and presence of children.
 */

/**
 * A hook to retrieve all equipment with OEE metrics.
 * Makes a couple GraphQL calls then transforms the returned equipment into a standard shape.
 */
export function useEquipmentWithOEE(): Ref<EquipmentWithOEEHook> {
  const { result: typeRes } = useQuery(
    GetOeeEquipmentTypesWithEquipmentIdsDocument,
    {},
    { errorPolicy: "ignore" },
  );

  /** All equipment with OEE `equipmentType`. */
  const oeeEquipment = computed(() => unique(
    typeRes.value?.equipmentTypes?.flatMap((et) => et.equipments) || [],
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
    oeeParentIds.value.filter((partOfId) => oeeEquipmentIds.value.has(partOfId)));

  const oeeParentIdsWihoutOEEChildren = computed(() => unique(
    oeeEquipment.value.filter((eq) =>
      // Exclude the parent of equipment who are counted under structure #2.
      !oeeEquipmentIdsWithOEEChildren.value.includes(eq.id)
      // Exclude the equipment who are counted under structure #2.
      && (!eq.partOfId || !oeeEquipmentIdsWithOEEChildren.value.includes(eq.partOfId)))
      .map((eq) => eq.partOfId)
      .filter(isNonNullish),
  ));

  const equipmentIds = computed(() => unique([
    ...oeeEquipmentIdsWithOEEChildren.value,
    ...oeeParentIdsWihoutOEEChildren.value,
  ]));

  const { result: eqRes } = useQuery(GetEquipmentsDocument, {
    filter: {
      id: { in: equipmentIds.value ?? [] },
    },
    now: new Date().toISOString(),
  }, {
    enabled: equipmentIds.value && equipmentIds.value.length > 0,
    errorPolicy: "ignore",
  });

  return computed<EquipmentWithOEEHook>(() => ({
    data: eqRes.value?.equipments?.map(parseEquipmentWithOEE),
  }));
}



export interface EquipmentDetailWithOEEHook {
  data: IEquipmentWithOEE | undefined;
}

export function useEquipmentDetailWithOEE(id: string): Ref<EquipmentDetailWithOEEHook> {
  const { result } = useQuery(GetEquipmentDetailDocument, {
    id,
    now: new Date().toISOString(),
  }, {
    errorPolicy: "ignore",
  });

  return computed(() => ({
    data: result.value?.equipment ? parseEquipmentWithOEE(result.value.equipment) : undefined,
  }));
}
