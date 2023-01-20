<template>
    <div>
      <MapboxMap :accessToken="accessToken" :mapStyle="mapStyle"/>
    </div>
</template>
<script lang="ts">
import { MapboxMap } from "vue-mapbox-ts";

export default {
  components: { MapboxMap },
  data() {
    return {
      accessToken: "pk.eyJ1Ijoicm9vdHMyMjUiLCJhIjoiY2psNmd2YzdyMHowaTN4cGJtMDlleHM1cSJ9.1VYqihb6zztfoxRct-F0Og",
      // mapStyle: "mapbox://styles/mapbox/streets-v12"
      mapStyle: "streets-v12"
    };
  },
  setup() {

  }
};

</script>