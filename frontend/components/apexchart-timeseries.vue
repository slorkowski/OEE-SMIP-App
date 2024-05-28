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

const theme = useTheme();

const options: ComputedRef<ApexOptions> = computed(() => ({
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
    min: new Date().setHours(0)
      .valueOf(),
    max: new Date().setHours(24)
      .valueOf(),
  },
  yaxis: {
    labels: {
      formatter: function (val: number) {
        return `${val.toFixed(0)}%`;
      },
    },
    max: function (max: number) { return max > 100 ? max : 100; },
  },
  tooltip: {
    y: {
      shared: false,
      formatter: function (val: number) {
        return `${val.toFixed(0)}%`;
      },
    },
    x: {
      formatter: function (val: string) {
        return `${new Date(val).toLocaleTimeString()}`;
      },
    },
  },
  theme: {
    mode: theme.global.current.value.dark ? "dark" : "light",
  },
}));

const { series } = defineProps<Props>();

</script>
