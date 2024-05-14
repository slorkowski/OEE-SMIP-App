import { clamp, range, mapValues } from "remeda";



export interface IMockEquipment {
  name: string;
  id: number;
  availability: number;
  quality: number;
  performance: number;
  get oee(): number;
}

export interface Metric {
  label: string;
  value: number;
  displayValue: number;
}

export type MetricKey = "availability" | "quality" | "performance" | "oee";

export class MockEquipment {
  data: IMockEquipment;

  constructor(equipment: IMockEquipment) {
    this.data = equipment;
  }

  makeMetric(label: string, value: number): Metric {
    return {
      label,
      value,
      get displayValue() { return clamp(this.value, { min: 0, max: 100 }); },
    };
  }

  get name(): string { return this.data.name; }
  get id(): number { return this.data.id; }
  get availability(): Metric { return this.makeMetric("Availability", this.data.availability); }
  get quality(): Metric { return this.makeMetric("Quality", this.data.quality); }
  get performance(): Metric { return this.makeMetric("Performance", this.data.performance); }
  get oee(): Metric { return this.makeMetric("OEE", this.data.oee); }
};

type MachineState = "success" | "warn" | "error";

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

function createMockEquipment(id: number, state: MachineState): MockEquipment {
  const  varyValue = id;

  return new MockEquipment({
    name: `Equipment ${id}`,
    id,
    ...mapValues(METRIC_SEEDS[state], (seed) => seed + varyValue),
    get oee() {
      return (this.availability * this.quality * this.performance) / (Math.pow(100, 2));
    },
  });
}

function createMockData(success: number, warn: number, error: number): MockEquipment[] {
  return [
    ...range(0, success)
      .map((i) => createMockEquipment(i + 1, "success")),
    ...range(success, success + warn)
      .map((i) => createMockEquipment(i + 1, "warn")),
    ...range(success + warn, success + warn + error)
      .map((i) => createMockEquipment(i + 1, "error")),
  ];
}

// Only for dev, setting values here makes sure equipment has matching equipment detail page
// Did this to avoid a 3+ parameter path when it'll eventually just switch to querying db
export function createDefaultMockData() {
  return createMockData(3, 3, 3);
}
