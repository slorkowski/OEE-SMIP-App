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


export function makeMetric(label: string, value: number): Metric {
  return {
    label,
    value,
    get displayValue() { return clamp(this.value, { min: 0, max: 100 }); },
  };
}
