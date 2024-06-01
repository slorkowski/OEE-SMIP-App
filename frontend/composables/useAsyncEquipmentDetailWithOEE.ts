import { GetEquipmentDetailDocument } from "~/generated/graphql/operations";
import { parseEquipmentWithOEE   } from "~/lib/equipment";



export default function useAsyncEquipmentDetailWithOEE(id: string) {
  // TODO: Use equipment timezone instead of user timezone.
  const startTime = new Date();
  startTime.setHours(0, 0, 0, 0);
  const endTime = new Date(startTime);
  endTime.setDate(startTime.getDate() + 1);

  return useAsyncQuery(
    GetEquipmentDetailDocument,
    {
      id,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    },
    "default",
    {  },
    {
      transform: (res) => {
        return res.equipment ? parseEquipmentWithOEE(res.equipment) : undefined;
      },
    },
  );
}
