import { GetEquipmentDetailDocument } from "~/generated/graphql/operations";
import { parseEquipmentWithOEE   } from "~/lib/equipment";



export default function (id: string) {
  return useAsyncQuery(GetEquipmentDetailDocument, {
    id,
    now: new Date().toISOString(),
  },
  "default",
  { errorPolicy: "ignore" },
  { transform:
    (res) => { res.equipment ? parseEquipmentWithOEE(res.equipment) : undefined; },
  });
}
