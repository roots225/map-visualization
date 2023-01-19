<template>
  <div>
    <h1>Welcome to map visualization</h1>
    <el-row :gutter="20" class="mb-3">
      <el-col :span="24" style="margin: 10px 0">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>Route disponible</span>
            </div>
          </template>
          <div v-for="route in routes" :key="route.distance" class="text item">
            {{ "Distance: " + route.distance * 0.001 }} Km
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-select
          v-model="fromID"
          class="m-2"
          placeholder="Départ"
          size="large"
          filterable
        >
          <el-option
            v-for="item in merchants"
            :key="item.id"
            :label="item.hp2"
            :value="item.id"
          />
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select
          v-model="toID"
          class="m-2"
          placeholder="Arrivé"
          size="large"
          filterable
        >
          <el-option
            v-for="item in merchants"
            :key="item.id"
            :label="item.hp2"
            :value="item.id"
          />
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button
          type="primary"
          size="large"
          :loading="loading"
          @click="distanceMatrix()"
          >Trouver la distance</el-button
        >
      </el-col>
    </el-row>

    <div class="map-container">
      <div ref="mapContainer"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { markerPoint } from "@/types";
import { MapHelper } from "@/utils/map-helper";
import { Console } from "console";
import mapboxgl from "mapbox-gl";
import {
  Ref,
  ComputedRef,
  ref,
  onMounted,
  computed,
  nextTick,
  onBeforeMount,
  onUpdated,
} from "vue";
import useMerchantsStore from "@/store/modules/merchants";
import Merchant from "@/models/Merchant";
import { ElNotification } from "element-plus";

export default {
  name: "map-widget",
  setup() {
    const mapContainer = ref(null);
    const client: Ref<any> = ref(null);
    const map: Ref<any> = ref(null);
    let loading: Ref<boolean> = ref(false);
    let routes: Ref<any[]> = ref([]);
    const merchantsStore = useMerchantsStore();
    // const merchants: Ref<Merchant[]> = ref(merchantsStore.getMerchants);
    const merchants: ComputedRef<Merchant[]> = computed(
      () => merchantsStore.getMerchants
    );

    const accessToken = ref(
      "pk.eyJ1Ijoicm9vdHMyMjUiLCJhIjoiY2psNmd2YzdyMHowaTN4cGJtMDlleHM1cSJ9.1VYqihb6zztfoxRct-F0Og"
    );

    onBeforeMount(() => {
      merchantsStore.fetchMerchants();
    });

    onMounted(() => {
      initMap();
    });

    onUpdated(() => {
      initMap();
    });

    let fromID: Ref<number | null> = ref(null);
    let toID: Ref<number | null> = ref(null);

    async function initMap() {
      await nextTick();
      /// Add marker on map
      const mapHelper = new MapHelper(mapContainer.value, accessToken.value);
      merchants.value.forEach((point, index) => {
        const option: any = point.color ? { color: point.color } : {};
        return mapHelper.addMarker(point, option);
      });
      mapHelper.setPoints(merchants.value);
      mapHelper.fitBounds();

      map.value = mapHelper.getMap();
      map.value.on("click", (event: any) => {
        // this.map.on("click", (event: any) => {
        const features = this.map.queryRenderedFeatures(event.point);
        if (!features.length) {
          return;
        }
        console.log(features);
        const feature = features[0];

        // const popup = new mapboxgl.Popup({ offset: [0, -15] })
        //     .setLngLat(feature.geometry.coordinates)
        //     .setHTML(
        //         `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
        //     )
        //     .addTo(this.map);
        // });
        console.log(event);
      });
    }

    async function distanceMatrix(): Promise<void> {
      // Display loader on button
      loading.value = true;

      const from = merchants.value.find((item) => item.id === fromID.value)!;
      const to = merchants.value.find((item) => item.id === toID.value)!;
      if (!from || !to) {
        ElNotification.error("coordonnées introuvable");
        loading.value = false;
        return;
      }

      const profiles = [
        "mapbox/driving-traffic",
        "mapbox/cycling",
        "mapbox/walking",
        "mapbox/driving",
      ];
      const selected = profiles[3];

      const bounds = [from, to];
      map.value.setMaxBounds(bounds);

      try {
        const res = await fetch(
          `https://api.mapbox.com/directions/v5/${selected}/${from.toPointString()};${to.toPointString()}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${
            accessToken.value
          }`
        );

        const data = await res.json();
        if (data.code === "Ok") {
          const { destinations, routes } = data;

          if (routes) {
            routes.value = routes;
            const data = routes[0];
            const route = data.geometry.coordinates;
            const geojson = {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: route,
              },
            };

            // if the route already exists on the map, we'll reset it using setData
            if (map.value.getSource("route")) {
              map.value.getSource("route").setData(geojson);
            }
            // otherwise, we'll make a new request
            else {
              map.value.addLayer({
                id: "route",
                type: "line",
                source: {
                  type: "geojson",
                  data: geojson,
                },
                layout: {
                  "line-join": "round",
                  "line-cap": "round",
                },
                paint: {
                  "line-color": "#3887be",
                  "line-width": 5,
                  "line-opacity": 0.75,
                },
              });
            }
          }
        }
      } catch (err) {
        console.log(err);
      }

      // Disable loader
      loading.value = false;
    }

    return {
      mapContainer,
      client,
      map,
      routes,
      accessToken,
      fromID,
      toID,
      loading,
      distanceMatrix,
      merchants,
    };
  },
};
</script>
<style lang="scss">
.distance-show {
  margin: 10px 15px;
  font-size: 18px;
  font-weight: bold;
}
.map-container {
  width: 100%;
  height: 500px;
  position: relative;
  .mapboxgl-map {
    position: relative;
    min-height: 100%;
    width: 100%;
  }
}
.mb-3 {
  margin-bottom: 3em;
}
</style>
