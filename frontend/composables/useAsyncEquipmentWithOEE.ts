import type { VariablesOf } from "@graphql-typed-document-node/core";

import { GetEquipmentsDocument } from "~/generated/graphql/operations";
import { parseEquipmentWithOEE } from "~/lib/equipment";



export default function useAsyncEquipmentWithOEE() {
  const {
    data: equipmentIds,
    refresh: idRefresh,
    status: idStatus,
    pending: idPending,
  } = useAsyncEquipmentIds();

  // TODO: Use equipment timezone instead of user timezone.
  const startTime = new Date();
  startTime.setHours(0, 0, 0, 0);
  const endTime = new Date(startTime);
  endTime.setDate(startTime.getDate() + 1);

  // Making this `computed` so the query is reactive to changes in `equipmentIds`.
  const variables = computed<VariablesOf<typeof GetEquipmentsDocument>>(() => ({
    filter: {
      id: { in: equipmentIds.value ?? [] },
    },
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
  }));

  const res = useAsyncQuery(
    GetEquipmentsDocument,
    variables,
    "default",
    {
      errorPolicy: "ignore",
    },
    {
      transform: (eqRes) => {
        return eqRes.equipments?.map(parseEquipmentWithOEE);
      },
    },
  );

  // Compound status involving both queries.
  const status = computed(() => idStatus.value === "success" ? res.status.value : idStatus.value);
  const pending = computed(() => idPending.value || res.pending.value);

  return {
    ...res,
    status,
    pending,
    refresh: () => idRefresh().then(() => res.refresh()),
  };
}
