import { range, mapValues } from "remeda";



export interface IMockEquipment {
  name: string;
  id: number;

  availability: number;
  quality: number;
  performance: number;
  oee: number;
}



/** Seeds used to generate mock data. A variance is added to these beginning metrics. */
const METRIC_SEEDS = {
  success: {
    availability: 90,
    quality: 93,
    performance: 93,
  },
  warn: {
    availability: 75,
    quality: 90,
    performance: 70,
  },
  error: {
    availability: 40,
    quality: 50,
    performance: 80,
  },
};

export type MachineState = "success" | "warn" | "error";

function createMockEquipment(id: number, state: MachineState): IMockEquipment {
  const  varyValue = id;

  return {
    name: `Equipment ${id}`,
    id,
    ...mapValues(METRIC_SEEDS[state], (seed) => seed + varyValue),
    get oee() {
      return (this.availability * this.quality * this.performance) / (Math.pow(100, 2));
    },
  };
}

function createMockData(success: number, warn: number, error: number): IMockEquipment[] {
  return [
    ...range(0, success)
      .map((i) => createMockEquipment(i + 1, "success")),
    ...range(success, success + warn)
      .map((i) => createMockEquipment(i + 1, "warn")),
    ...range(success + warn, success + warn + error)
      .map((i) => createMockEquipment(i + 1, "error")),
  ];
}



const SUCCESSFUL_COUNT = 3;
const WARNING_COUNT = 3;
const ERROR_COUNT = 3;

// Only for dev, setting values here makes sure equipment has matching equipment detail page
// TODO: Doesn't matter for right now but returning ref here may break reactivity, I'm not sure. Info probably in here: https://nuxt.com/docs/guide/concepts/auto-imports
export function useMockEquipment(): Ref<IMockEquipment[]> {
  return ref(createMockData(SUCCESSFUL_COUNT, WARNING_COUNT, ERROR_COUNT));
}
export function useMockEquipmentById(id: string) {
  return computed(() => createMockData(SUCCESSFUL_COUNT, WARNING_COUNT, ERROR_COUNT)[parseInt(id) - 1]);
}
