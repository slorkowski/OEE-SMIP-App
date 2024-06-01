import type { AttributeValue, IAttribute, IEquipment, IEquipmentWithMetric, IEquipmentWithOEE, ScalarTypeMap } from "./types";
import type { AttributeOverviewFragment, EquipmentOverviewFragment, EquipmentWithOeeFragment, TimeSeriesValueFragment } from "~/generated/graphql/operations";
import { ScalarTypeEnum } from "~/generated/graphql/operations";



export type OEEMetricKey = "availability" | "performance" | "quality" | "summary";

export const OEEInterfaceNames: Record<OEEMetricKey, string> = {
  availability: "oee_availability_interface",
  performance: "oee_performance_interface",
  quality: "oee_quality_interface",
  summary: "oee_summary_interface",
};
export const OEEAttributeNames: Record<OEEMetricKey, string> = {
  availability: "daily_availability",
  performance: "daily_performance",
  quality: "daily_quality",
  summary: "oee_percent",
};



function parseAttributeValue(attribute: AttributeOverviewFragment): AttributeValue {
  switch (attribute.dataType) {
    case ScalarTypeEnum.Float:
      return attribute.floatValue;
    case ScalarTypeEnum.Int:
      return typeof attribute.intValue == "string" ? parseInt(attribute.intValue) : undefined;
    case ScalarTypeEnum.Bool:
      return attribute.boolValue;
    case ScalarTypeEnum.Datetime:
      return attribute.datetimeValue;
    case ScalarTypeEnum.String:
      return attribute.stringValue;
    default:
      console.warn(`Unsupported attribute type '${attribute.dataType}' on attribute '${attribute.displayName}' (ID#${attribute.id})`);
      return undefined;
  }
}
function parseTimeSeriesValue(attribute: AttributeOverviewFragment, ts: TimeSeriesValueFragment): AttributeValue {
  switch (attribute.dataType) {
    case ScalarTypeEnum.Float:
      return ts.floatvalue;
    case ScalarTypeEnum.Int:
      return typeof ts.intvalue == "string" ? parseInt(ts.intvalue) : undefined;
    case ScalarTypeEnum.Bool:
      return ts.boolvalue;
    case ScalarTypeEnum.Datetime:
      return ts.datetimevalue;
    case ScalarTypeEnum.String:
      return ts.stringvalue;
    default:
      console.warn(`Unsupported attribute type '${attribute.dataType}' on time series of attribute '${attribute.displayName}' (ID#${attribute.id})`);
      return undefined;
  }
}
function parseAttribute<T extends ScalarTypeEnum = ScalarTypeEnum>(attribute: AttributeOverviewFragment): IAttribute<T> {
  let value = parseAttributeValue(attribute);
  if((value === null || value === undefined) && attribute.getTimeSeries?.[0]) {
    value = parseTimeSeriesValue(attribute, attribute.getTimeSeries[0]);
  }


  return {
    id: attribute.id,
    displayName: attribute.displayName ?? undefined,
    relativeName: attribute.relativeName ?? undefined,
    dataType: attribute.dataType as T ?? undefined,
    updatedTimestamp: attribute.updatedTimestamp ? new Date(attribute.updatedTimestamp) : undefined,

    value: value as ScalarTypeMap[T],
    maxValue: attribute.maxValue ?? undefined,
    minValue: attribute.minValue ?? undefined,
    description: attribute.description ?? undefined,
  };
}

function parseEquipment(equipment: EquipmentOverviewFragment): IEquipment {
  return {
    id: equipment.id,
    displayName: equipment.displayName ?? undefined,
    description: equipment.description ?? undefined,
    attributes: equipment.attributes.map(parseAttribute),
  };
}
function parseEquipmentWithMetric(equipment: EquipmentOverviewFragment, key: OEEMetricKey): IEquipmentWithMetric {
  const attribute = equipment.attributes.find((attr) => attr.relativeName === OEEAttributeNames[key]);


  return {
    ...parseEquipment(equipment),
    metric: attribute && parseAttribute(attribute),
  };
}

function findEquipmentWithMetric(
  equipments: EquipmentOverviewFragment[],
  key: OEEMetricKey,
): IEquipmentWithMetric | undefined {
  const equipment = equipments.find((ce) => ce.type?.relativeName === OEEInterfaceNames[key]);

  return equipment && parseEquipmentWithMetric(equipment, key);
}

/**
 * @param equipment Equipment object returned from GraphQL in either expected OEE structure.
 * @returns A standard Equipment object.
 */
export function parseEquipmentWithOEE(equipment: EquipmentWithOeeFragment): IEquipmentWithOEE {
  const { childEquipment, ...rest } = equipment;

  let summary: IEquipmentWithMetric | undefined;
  if(rest.type?.relativeName === OEEInterfaceNames.summary) {
    // Structure #2
    // Set summary to a copy of the root equipment.
    summary = parseEquipmentWithMetric(rest, "summary");
    // Clear attributes since those are just OEE data points
    rest.attributes = [];
  } else {
    // Structure #1
    summary = findEquipmentWithMetric(childEquipment, "summary");
  }

  return {
    ...parseEquipment(rest),
    oee: {
      availability: findEquipmentWithMetric(childEquipment, "availability"),
      performance: findEquipmentWithMetric(childEquipment, "performance"),
      quality: findEquipmentWithMetric(childEquipment, "quality"),
      summary,
    },
  };
}
