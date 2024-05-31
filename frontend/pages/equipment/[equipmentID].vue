<template>
  <v-container>
    <v-row class="ma-0">
      <v-col cols="12" class="d-flex flex-row">
        <!-- Back Button -->
        <v-btn
          to="/"
          density="compact"
          size="large"
          class="text-h5"
          border="md"
        >
          <v-icon icon="mdi-arrow-left-bold"/>
        </v-btn>

        <h2 class="text-h5 d-inline ml-4">
          {{equipment?.displayName || "Equipment"}} Details
        </h2>
      </v-col>

      <v-col
        cols="12"
        md="4"
        class="d-flex justify-center align-center"
      >
        <MetricProgressCircular
          label="OEE"
          label-class="text-h4"
          :value="oeeSummary.value"
          :size="250"
        />
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="rounded-ts-0 fill-height">
          <v-card-text>
            <attribute-table :attributes="equipment?.attributes" :loading="pending"/>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="pl-0 flex-grow-1">
        <v-tabs v-model="activeTabLabel"  hide-slider>
          <v-tab
            v-for="tab in metricTabs"
            :key="tab.label"

            :value="tab.label"
            class="metric-card"
            :class="activeTabLabel === tab.label ? `bg-${tab.color}` : 'bg-surface'"
          >
            <ContrastLabel :label="tab.label"/>
          </v-tab>
        </v-tabs>
        <v-tabs-window v-model="activeTabLabel">
          <v-tabs-window-item
            v-for="tab in metricTabs"
            :key="tab.label"
            :value="tab.label"
          >
            <v-card :class="`rounded-ts-0 fill-height border-md border-${tab.color} border-opacity-100`">
              <v-card-text>
                <attribute-table :attributes="tab.equipment?.attributes" :loading="pending"/>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-text>
            <apexchart-timeseries
              v-if="!timeSeriesPending"
              :series="series"
              :xmin="dayStart.getTime()"
              :xmax="dayEnd.getTime()"
            />
            <v-alert
              type="info"
            >
              The chart begins at the machine's start time, but times are shown in <em>your</em> local timezone.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { isNonNullish } from "remeda";
import { useTheme } from "vuetify";

import { GetAttributesTimeSeriesDocument } from "~/generated/graphql/operations";
import { timezoneOffsetToString } from "~/lib/datetime";
import { OEEInterfaceNames } from "~/lib/equipment";



definePageMeta({
  title: "Equipment Details",
});

const theme = useTheme();
const route = useRoute();
const equipmentId = route.params.equipmentID as string;
const { data: equipment, pending } = useAsyncEquipmentDetailWithOEE(equipmentId);



/**
 * IDs for the metric attributes (i.e. Daily OEE, Availability, Quality, and Performance).
 * Used to fetch time series data for all four.
 */
const metricAttributeIds = computed<string[]>(() => {
  if(!equipment.value?.oee) {
    return [];
  }

  return Object.values(equipment.value.oee)
    .map((eq) => eq.metric?.id)
    .filter(isNonNullish);
});

/**
 * The start of the machine's day.
 * Used to set the lower bound for the time series chart.
 */
const dayStart = computed(() => {
  const now = new Date();

  const tzoffsetAttr = equipment.value?.oee.summary?.attributes.find((attr) => attr.relativeName === "tzoffset");
  const daystartAttr = equipment.value?.oee.summary?.attributes.find((attr) => attr.relativeName === "daystart");
  if(typeof tzoffsetAttr?.value !== "number" || typeof daystartAttr?.value !== "string") {
    now.setHours(0, 0, 0, 0);
    // Default to the beginning of the user's day.
    // Okay while data is loading or non-existant.
    return now;
  }

  const nowStr = now.toISOString();
  const nowDate = nowStr.split("T")[0];

  const tzoffset = timezoneOffsetToString(tzoffsetAttr.value);
  const dayStartIso = `${nowDate}T${daystartAttr.value}:00.000${tzoffset}`;
  console.log(dayStartIso);
  return new Date(dayStartIso);
});
const dayEnd = computed(() => {
  const end = new Date(dayStart.value);
  end.setDate(end.getDate() + 1);
  return end;
});

const { data: timeSeriesData, pending: timeSeriesPending } = useAsyncQuery({
  query: GetAttributesTimeSeriesDocument,
  variables: {
    filter: {
      id: { in: metricAttributeIds },
    },
    startTime: dayStart.value.toISOString(),
    endTime: dayEnd.value.toISOString(),
  },
});


const oeeSummary = computed(() => makePercentMetric("OEE", equipment.value?.oee.summary?.metric?.value));
const metricTabs = computed(() => [
  {
    label: "Availability",
    color: "purple",
    equipment: equipment.value?.oee.availability,
  },
  {
    label: "Quality",
    color: "indigo",
    equipment: equipment.value?.oee.quality,
  },
  {
    label: "Performance",
    color: "teal",
    equipment: equipment.value?.oee.performance,
  },
]);

const activeTabLabel = ref(metricTabs.value[0].label);

interface DataSeries {
  name: string;
  color: string;
  data: {
    x: number;
    y: number;
  }[];
}

function hasTimeSeriesFields(ts: unknown): ts is { ts: string; floatvalue: number } {
  return !!ts && typeof ts === "object"
    && "ts" in ts && typeof ts.ts === "string"
    && "floatvalue" in ts && typeof ts.floatvalue === "number";
}

function relativeNameToSeriesConfig(relativeName: string | null | undefined): { name: string; color: string } {
  switch (relativeName) {
    case OEEInterfaceNames.availability:
      return {
        name: "Availability",
        color: theme.current.value.colors.purple,
      };
    case OEEInterfaceNames.quality:
      return {
        name: "Quality",
        color: theme.current.value.colors.indigo,
      };
    case OEEInterfaceNames.performance:
      return {
        name: "Performance",
        color: theme.current.value.colors.teal,
      };
    case OEEInterfaceNames.summary:
      return {
        name: "OEE",
        color: theme.current.value.colors.success,
      };
    default:
      return {
        name: "Unknown",
        color: "#777777",
      };
  }
}

const series = computed<DataSeries[]>(() => {
  if(!timeSeriesData.value?.attributes) {
    return [];
  }

  return timeSeriesData.value.attributes
    .filter((attr) => attr.getTimeSeries && attr.getTimeSeries.length > 0)
    .map((attr) => ({
      ...relativeNameToSeriesConfig(attr.onEquipment?.type?.relativeName),
      data: attr.getTimeSeries
        ?.filter(hasTimeSeriesFields)
        .map((ts) => {
          return {
            x: new Date(ts.ts).getTime(),
            y: ts.floatvalue,
          };
        }) ?? [],
    }));
});
</script>


<style lang="scss">
@use "~/node_modules/vuetify/_styles.scss";

.metric-card:not(:last-child) {
  @extend .border-b-md;
}

.percent-bg {
  position: absolute;

  height: 100%;
  z-index: -1;
  opacity: 0.5;
}
</style>
