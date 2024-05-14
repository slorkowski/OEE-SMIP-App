import { clamp } from "remeda";



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

