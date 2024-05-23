import { GetEquipmentsDocument } from "~/generated/graphql/operations";
import { parseEquipmentWithOEE } from "~/lib/equipment";



export default function useAsyncEquipmentWithOEE() {
  const { data: equipmentIds, refresh: idRefresh, status: idStatus } = useAsyncEquipmentIds();

  // TODO: Use equipment timezone instead of user timezone.
  const startTime = new Date();
  startTime.setHours(0, 0, 0, 0);
  const endTime = new Date(startTime);
  endTime.setDate(startTime.getDate() + 1);


  const res = useAsyncQuery(GetEquipmentsDocument, {
    filter: {
      id: { in: equipmentIds.value ?? [] },
    },
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
  }, "default", {
    enabled: equipmentIds.value && equipmentIds.value.length > 0,
    errorPolicy: "ignore",
  }, {
    watch: [ equipmentIds ],
    transform: (eqRes) => {
      return eqRes.equipments?.map(parseEquipmentWithOEE);
    },
  });

  // Compound status involving both queries.
  const status = computed(() => idStatus.value === "success" ? res.status.value : idStatus.value);

  return {
    ...res,
    status,
    refresh: () => idRefresh().then(() => res.refresh()),
  };
}
