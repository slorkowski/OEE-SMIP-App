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
  displayValue: string | undefined;
  progressValue: number;
}

export type MetricKey = "availability" | "quality" | "performance" | "oee";



export function makePercentMetric(label: string, value: unknown): Metric {
  if(value === undefined || value === null) {
    return { label, value: 0, displayValue: undefined, progressValue: 0 };
  }
  if(typeof value !== "number") {
    // Default undefined metric
    console.warn(`Unsupported metric type for metric '${label}': '${typeof value}'`);
    return { label, value: 0, displayValue: "unknown", progressValue: 0 };
  }
  return {
    label,
    value,
    displayValue: `${value.toFixed(1)}%`,
    progressValue: clamp(value, { min: 0, max: 100 }),
  };
}
