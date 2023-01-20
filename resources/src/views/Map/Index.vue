<template>
  <ContentWrap title="Points sur carte" message="Vue global des points sur une carte">
    <el-row :gutter="20" class="mb-3">
      <el-col :span="24" style="margin: 10px 0">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>Route disponible</span>
            </div>
          </template>
          <div class="text-black">
            <div v-for="route in foundRoutes" :key="route.distance" class="text item">
              {{ 'Distance: ' + Number.parseFloat((route.distance * 0.001).toString()).toFixed(2) }}
              Km
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-select v-model="fromID" class="m-2" placeholder="Départ" size="large" filterable>
          <el-option v-for="item in merchants" :key="item.id" :label="item.hp2" :value="item.id" />
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="toID" class="m-2" placeholder="Arrivé" size="large" filterable>
          <el-option v-for="item in merchants" :key="item.id" :label="item.hp2" :value="item.id" />
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="large" :loading="loading" @click="distanceMatrix()"
          >Trouver la distance</el-button
        >
      </el-col>
    </el-row>

    <div class="map-container">
      <ElSkeleton :loading="loading" animated :rows="2">
        <MapboxMap
          :accessToken="accessToken"
          :mapStyle="mapStyle"
          :flyToOptions="flyToOptions"
          @loaded="handleLoaded"
        >
          <mapbox-marker
            v-for="merchant in merchants"
            :key="merchant.id"
            :lngLat="[merchant.lng, merchant.lat]"
            :color="merchant.color"
          >
            <mapbox-popup>
              <div> Marchand avec le code : {{ merchant.hp2 }}</div>
            </mapbox-popup>
          </mapbox-marker>
        </MapboxMap>
      </ElSkeleton>
    </div>
  </ContentWrap>
</template>
<script lang="ts">
import { MapboxMap, MapboxMarker, MapboxPopup } from 'vue-mapbox-ts'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { useMerchantStore } from '@/store/modules/merchant'
import { computed, Ref, ref } from 'vue'
import {
  ElSkeleton,
  ElNotification,
  ElRow,
  ElCard,
  ElCol,
  ElSelect,
  ElOption,
  ElButton
} from 'element-plus'

const { t } = useI18n()

export default {
  components: {
    MapboxMap,
    ContentWrap,
    ElSkeleton,
    MapboxMarker,
    MapboxPopup,
    ElRow,
    ElCard,
    ElCol,
    ElSelect,
    ElOption,
    ElButton
  },
  data() {
    return {
      // mapStyle: "mapbox://styles/mapbox/streets-v12"
      mapStyle: 'streets-v12',
      t
    }
  },
  setup() {
    const loading = ref(true)
    const accessToken = ref(
      'pk.eyJ1Ijoicm9vdHMyMjUiLCJhIjoiY2psNmd2YzdyMHowaTN4cGJtMDlleHM1cSJ9.1VYqihb6zztfoxRct-F0Og'
    )
    const merchantStore = useMerchantStore()
    const merchants = computed(() => merchantStore.getAllMerchants)

    let foundRoutes: Ref<any[]> = ref([])
    let flyToOptions: Ref<{ maxDuration: number; speed: number; center: any[] }> = ref({
      maxDuration: 2000,
      speed: 1.2,
      center: []
    })

    /// Selected points
    let fromID = ref(0)
    let toID = ref(0)

    let mapInstance: any = ref(null)

    const getAllApi = async () => {
      await Promise.all([merchantStore.fetchMerchants()])
      loading.value = false
    }

    const handleLoaded = (map: any) => {
      mapInstance.value = map
      console.log(mapInstance)
    }

    async function distanceMatrix(): Promise<void> {
      // Display loader on button
      loading.value = true

      const from = merchants.value.find((item) => item.id === fromID.value)!
      const to = merchants.value.find((item) => item.id === toID.value)!
      if (!from || !to) {
        ElNotification.error('coordonnées introuvable')
        loading.value = false
        return
      }

      const profiles = [
        'mapbox/driving-traffic',
        'mapbox/cycling',
        'mapbox/walking',
        'mapbox/driving'
      ]
      const selected = profiles[3]

      // const bounds = [from, to]
      // map.value.setMaxBounds(bounds);

      try {
        const res = await fetch(
          `https://api.mapbox.com/directions/v5/${selected}/${from.toPointString()};${to.toPointString()}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${
            accessToken.value
          }`
        )

        const data = await res.json()
        if (data.code === 'Ok') {
          const { routes } = data

          if (routes) {
            foundRoutes.value = [routes[0]]
            const data = routes[0]
            const route = data.geometry.coordinates
            const geojson = {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: route
              }
            }

            flyToOptions.value = { maxDuration: 1000, speed: 1.2, center: [from.lng, from.lat] }

            if (mapInstance.value == null) {
              loading.value = false
              return
            }

            // if the route already exists on the map, we'll reset it using setData
            /*if (mapInstance.value?.getSource('route')) {
              mapInstance.value.getSource('route').setData(geojson)
            }
            // otherwise, we'll make a new request
            else {
              mapInstance.value?.addLayer({
                id: 'route',
                type: 'line',
                source: {
                  type: 'geojson',
                  data: geojson
                },
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round'
                },
                paint: {
                  'line-color': '#3887be',
                  'line-width': 5,
                  'line-opacity': 0.75
                }
              })
            }*/
          }
        }
      } catch (err) {
        console.log(err)
      }

      // Disable loader
      loading.value = false
    }

    getAllApi()

    return {
      merchants,
      loading,
      distanceMatrix,
      handleLoaded,
      accessToken,
      foundRoutes,
      fromID,
      toID,
      flyToOptions
    }
  }
}
</script>
<style>
.map-container {
  min-height: 350px;
}
</style>
