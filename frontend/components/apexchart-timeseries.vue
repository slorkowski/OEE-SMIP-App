<template>
  <ClientOnly>
    <apexchart
      type="line"
      :series="series"
      :options="options"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import type { ApexOptions } from "apexcharts";
import type VueApexCharts from "vue3-apexcharts";
import { useTheme } from "vuetify";



interface Props {
  series: typeof VueApexCharts["series"];
  xmin?: number;
  xmax?: number;
}

const {
  series,
  xmin,
  xmax,
} = defineProps<Props>();

const theme = useTheme();

function formatAsPercent(val: number) {
  return `${val.toFixed(1)}%`;
}

const options = computed<ApexOptions>(() => ({
  chart: {
    type: "line",
    zoom: {
      type: "x",
      enabled: true,
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: "zoom",
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    // Size of markers.
    // Currently 0 since there are a lot of data points.
    size: 0,
  },
  stroke: {
    // Width of lines on plot.
    width: 3,
  },
  xaxis: {
    type: "datetime",
    labels: {
      datetimeUTC: false,
    },
    min: xmin,
    max: xmax,
  },
  yaxis: {
    labels: {
      formatter: formatAsPercent,
    },
    min: 0,
    max: function (max: number) { return max > 100 ? Math.ceil(max + 5) : 100; },
    type: "numeric",
  },
  tooltip: {
    y: {
      shared: false,
      formatter: formatAsPercent,
    },
    x: {
      formatter: renderDateTime,
    },
  },
  theme: {
    mode: theme.global.current.value.dark ? "dark" : "light",
  },
  annotations: {
    yaxis: [
      {
        y: 100,
        borderColor: theme.global.current.value.colors.success,
        label: {
          text: "100%",
          borderColor: theme.global.current.value.colors.success,
          offsetY: 20,
          offsetX: -10,
          position: "right",
          textAnchor: "end",
          style: {
            color: theme.global.current.value.colors["on-surface"],
            background: theme.global.current.value.colors.surface,
          },
        },
      },
    ],
  },
}));



</script>
