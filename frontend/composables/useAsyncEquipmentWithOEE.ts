import { GetEquipmentsDocument } from "~/generated/graphql/operations";
import { parseEquipmentWithOEE } from "~/lib/equipment";



export default function useAsyncEquipmentWithOEE() {
  const { data: equipmentIds, refresh, status: idStatus } = useAsyncEquipmentIds();

  const now = new Date();
  now.setDate(now.getDate() - 1);

  const res = useAsyncQuery(GetEquipmentsDocument, {
    filter: {
      id: { in: equipmentIds.value ?? [] },
    },
    now: now.toISOString(),
  }, "default", {
    enabled: equipmentIds.value && equipmentIds.value.length > 0,
    errorPolicy: "ignore",
  }, {
    transform: (eqRes) => {
      return eqRes.equipments?.map(parseEquipmentWithOEE);
    },
  });

  // Compound status involving both queries.
  const status = computed(() => idStatus.value === "success" ? res.status.value : idStatus.value);

  return {
    ...res,
    status,
    refresh,
  };
}
