<template>
  <div>
    <h1>Welcome to map visualization</h1>
    <div class="map-container">
      <div ref="map-container"></div>
    </div>
  </div>
</template>
<script lang="ts">
import MapboxClient from "@mapbox/mapbox-sdk";
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
    // client.value = new MapboxClient({
    //   accessToken,
    // });
    // mapboxgl.accessToken = accessToken;

    return { container, client, map, accessToken };
  },
  mounted() {
    // const map = new this.client.Map({
    //   container: this.$refs["map-container"],
    // });
    this.map = new mapboxgl.Map({
      container: this.$refs["map-container"],
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/streets-v12",
      center: [12.550343, 55.665957],
      zoom: 8,
      accessToken: this.accessToken,
    });

    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker()
      .setLngLat([12.554729, 55.70651])
      .addTo(this.map);

    // Create a default Marker, colored black, rotated 45 degrees.
    const marker2 = new mapboxgl.Marker({ color: "black", rotation: 45 })
      .setLngLat([12.65147, 55.608166])
      .addTo(this.map);

    console.log(this.map);
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
