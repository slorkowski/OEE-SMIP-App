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
}

const { series } = defineProps<Props>();

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
    size: 0,
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    labels: {
      formatter: formatAsPercent,
    },
    max: function (max: number) { return max > 100 ? max : 100; },
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
}));



</script>
