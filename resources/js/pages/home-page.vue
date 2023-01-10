<template>
  <div>
    <h1>Welcome to map visualization</h1>
    <div class="map-container">
      <div ref="map-container"></div>
      <button type="button" @click="distanceMatrix(point1, point2)">
        get distance
      </button>
    </div>
  </div>
</template>
<script lang="ts">
// import MapboxClient from "@mapbox/mapbox-sdk/services/matrix.js";
import mapboxgl from "mapbox-gl";
import { Ref, ref } from "vue";

export default {
  name: "map-widget",
  setup() {
    const container = ref("map-container");
    const client: Ref<any> = ref(null);
    const map: Ref<any> = ref(null);
    const accessToken = ref(
      "pk.eyJ1Ijoicm9vdHMyMjUiLCJhIjoiY2psNmd2YzdyMHowaTN4cGJtMDlleHM1cSJ9.1VYqihb6zztfoxRct-F0Og"
    );
    const point1 = ref("-3.9977695,5.3701077");
    const point2 = ref("-4.0172199,5.3154868");

    async function distanceMatrix(
      position: string,
      destination: string
    ): Promise<void> {
      const profiles = [
        "mapbox/driving-traffic",
        "mapbox/cycling",
        "mapbox/walking",
        "mapbox/driving",
      ];
      const selected = profiles[3];
      const res = await fetch(
        `https://api.mapbox.com/directions-matrix/v1/${selected}/${position};${destination}?access_token=${accessToken.value}`
      );
      console.log(res);
    }

    return {
      container,
      client,
      map,
      accessToken,
      point1,
      point2,
      distanceMatrix,
    };
  },
  mounted() {
    // const map = new this.client.Map({
    //   container: this.$refs["map-container"],
    // });
    this.map = new mapboxgl.Map({
      container: this.$refs["map-container"],
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-3.9977695, 5.3701077],
      zoom: 8,
      accessToken: this.accessToken,
    });

    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker()
      .setLngLat([-4.0172199, 5.3154868])
      .addTo(this.map);

    // Create a default Marker, colored black, rotated 45 degrees.
    const marker2 = new mapboxgl.Marker({ color: "black", rotation: 45 })
      .setLngLat([-3.9977695, 5.3701077])
      .addTo(this.map);

    // this.distanceMatrix(this.point1, this.point2);
  },
};
</script>
<style lang="scss">
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
