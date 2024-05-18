import type { ScalarTypeEnum } from "~/generated/graphql/operations";



export interface ScalarTypeMap {
  [ScalarTypeEnum.Float]: number;
  [ScalarTypeEnum.Int]: number;
  [ScalarTypeEnum.Bool]: boolean;
  [ScalarTypeEnum.String]: string;
  // TODO: parse Date.
  [ScalarTypeEnum.Datetime]: string;

  [ScalarTypeEnum.Enumeration]: never;
  [ScalarTypeEnum.Geopoint]: never;
  [ScalarTypeEnum.Interval]: never;
  [ScalarTypeEnum.Object]: never;
  [ScalarTypeEnum.Reference]: never;
}
export type AttributeValue = string | number | boolean | null | undefined;

export interface IAttribute<T extends ScalarTypeEnum = ScalarTypeEnum> {
  id: string;
  displayName?: string;
  relativeName?: string;
  updatedTimestamp?: Date;
  dataType?: T;

  value?: ScalarTypeMap[T];
}



export interface IEquipment {
  id: string;
  displayName?: string;
  description?: string;

  attributes: IAttribute[];
}

export interface IEquipmentWithMetric extends IEquipment {
  metric?: IAttribute<ScalarTypeEnum.Float>;
}

export interface IEquipmentWithOEE extends IEquipment {
  oee: {
    availability?: IEquipmentWithMetric;
    performance?: IEquipmentWithMetric;
    quality?: IEquipmentWithMetric;
    summary?: IEquipmentWithMetric;
  };
}
