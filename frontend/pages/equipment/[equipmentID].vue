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

        <v-spacer/>

        <v-btn
          density="compact"
          size="large"
          class="text-h5"
          border="md"
          @click="() => refresh()"
        >
          <v-icon icon="mdi-refresh"/>
        </v-btn>
      </v-col>

      <v-col
        cols="12"
        md="4"
        class="d-flex justify-center"
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
            <v-table>
              <thead>
                <th class="text-left">
                  Equipment Attribute
                </th>
                <th class="text-left">
                  Value
                </th>
              </thead>

              <tbody>
                <tr v-for="attr in equipment?.attributes" :key="attr.id">
                  <td>{{attr.displayName}}</td>
                  <td>{{attr.value}}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" class="pl-0 flex-grow-1">
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
                <v-table>
                  <thead>
                    <th class="text-left">
                      Attribute
                    </th>
                    <th class="text-left">
                      Value
                    </th>
                  </thead>

                  <tbody>
                    <tr v-for="attr in tab.equipment?.attributes" :key="attr.id">
                      <td>{{attr.displayName}}</td>
                      <td>{{attr.value}}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card>

          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">



definePageMeta({
  title: "Equipment Details",
});

const route = useRoute();
const equipmentId = route.params.equipmentID as string;
const { data: equipment, refresh } = useAsyncEquipmentDetailWithOEE(equipmentId);



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
