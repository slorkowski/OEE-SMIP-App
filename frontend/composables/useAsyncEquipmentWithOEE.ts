import { GetEquipmentsDocument } from "~/generated/graphql/operations";
import { parseEquipmentWithOEE } from "~/lib/equipment";



export default function () {
  const { data: equipmentIds } = useAsyncEquipmentIds();

  return useAsyncQuery(GetEquipmentsDocument, {
    filter: {
      id: { in: equipmentIds.value ?? [] },
    },
    now: new Date().toISOString(),
  }, "default", {
    enabled: equipmentIds.value && equipmentIds.value.length > 0,
    errorPolicy: "ignore",
  }, { transform: (eqRes) => {
    return eqRes.equipments?.map(parseEquipmentWithOEE);
  } });
}
