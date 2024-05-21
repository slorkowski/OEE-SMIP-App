import { GetEquipmentsDocument } from "~/generated/graphql/operations";
import { parseEquipmentWithOEE } from "~/lib/equipment";



export default function () {
  const { data: equipmentIds } = useAsyncEquipmentIds();

  const now = new Date();
  now.setDate(now.getDate() - 1);

  return useAsyncQuery(GetEquipmentsDocument, {
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
}
