<template>
  <div>
    <h1>Welcome to map visualization</h1>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-select
          v-model="fromPoint"
          class="m-2"
          placeholder="Départ"
          size="large"
          filterable
        >
          <el-option
            v-for="item in points"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select
          v-model="toPoint"
          class="m-2"
          placeholder="Arrivé"
          size="large"
          filterable
        >
          <el-option
            v-for="item in points"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button
          type="primary"
          :loading="loading"
          @click="
            () =>
              fromPoint != null && toPoint != null
                ? distanceMatrix(fromPoint, toPoint)
                : null
          "
          >Trouver la distance</el-button
        >
      </el-col>
    </el-row>
    <div class="distance-show">{{ foundDistance }}</div>
    <div class="map-container">
      <div ref="map-container"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { markerPoint } from "@/types";
import { MapHelper } from "@/utils/map-helper";
import { Console } from "console";
import mapboxgl from "mapbox-gl";
import { Ref, ref } from "vue";

export default {
  name: "map-widget",
  setup() {
    const container = ref("map-container");
    const client: Ref<any> = ref(null);
    const map: Ref<any> = ref(null);
    let loading: Ref<boolean> = ref(false);

    const accessToken = ref(
      "pk.eyJ1Ijoicm9vdHMyMjUiLCJhIjoiY2psNmd2YzdyMHowaTN4cGJtMDlleHM1cSJ9.1VYqihb6zztfoxRct-F0Og"
    );
    const points = ref([
      {
        id: 1,
        name: "point 1",
        lat: 5.3701077,
        lng: -3.9977695,
      },
      {
        id: 2,
        name: "point 2",
        lat: 5.3154868,
        lng: -4.0172199,
      },
    ]);

    let fromPoint: Ref<markerPoint> | Ref<null> = ref(null);
    let toPoint: Ref<markerPoint> | Ref<null> = ref(null);
    let foundDistance = ref(0);

    async function distanceMatrix(
      point1: number,
      point2: number
    ): Promise<void> {
      console.log(point1, point2);
      const position = toPointString(
        points.value.find((item) => item.id === point1)
      );
      const destination = toPointString(
        points.value.find((item) => item.id === point2)
      );

      const profiles = [
        "mapbox/driving-traffic",
        "mapbox/cycling",
        "mapbox/walking",
        "mapbox/driving",
      ];
      const selected = profiles[3];

      // Show loader
      loading.value = true;
      // const res = await fetch(
      //   `https://api.mapbox.com/directions-matrix/v1/${selected}/${position};${destination}?access_token=${accessToken.value}`
      // );
      const res = await fetch(
        `https://api.mapbox.com/directions/v5/${selected}/${position};${destination}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${accessToken.value}`
      );

      const data = await res.json();
      if (data.code === "Ok") {
        const { destinations } = data;
        const destination = destinations[0];
        foundDistance.value = destination.distance;
        console.log(destination);
      }

      // Disable loader
      loading.value = false;
    }

    function toPointString(point: any): string {
      return `${point.lng},${point.lat}`;
    }

    return {
      container,
      client,
      map,
      accessToken,
      points,
      fromPoint,
      toPoint,
      loading,
      foundDistance,
      distanceMatrix,
    };
  },
  mounted() {
    const mapHelper = new MapHelper(
      this.$refs["map-container"],
      this.accessToken
    );

    this.map = mapHelper.getMap();

    this.points.forEach((point, index) => {
      const option: any = index === 1 ? { color: "black", rotation: 45 } : {};
      return mapHelper.addMarker(point, option);
    });
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
</style>
