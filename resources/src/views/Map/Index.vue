<template>
  <ContentWrap title="Biens immobiliers sur carte" message="Vue global des biens sur une carte">
    <el-row :gutter="20" class="mb-3">
      <el-col :span="6">
        <el-select v-model="fromID" class="m-2" placeholder="Départ" size="large" filterable>
          <el-option
            v-for="item in merchants"
            :key="item.id"
            :label="item.getLabel"
            :value="item.id"
          />
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="toID" class="m-2" placeholder="Arrivé" size="large" filterable>
          <el-option
            v-for="item in merchants"
            :key="item.id"
            :label="item.getLabel"
            :value="item.id"
          />
        </el-select>
      </el-col>
      <el-col :span="6" class="align-self-center">
        <el-button type="primary" size="large" :loading="loading" @click="distanceMatrix()"
          >Calculer la distance</el-button
        >
      </el-col>
      <el-col :span="6" class="align-self-center">
        <div class="text-black">
          <div v-for="route in foundRoutes" :key="route.distance" class="text item">
            {{ 'Distance: ' + Number.parseFloat((route.distance * 0.001).toString()).toFixed(2) }}
            Km
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="map-container">
      <ElSkeleton :loading="loading" animated :rows="2">
        <MapboxMap
          :accessToken="accessToken"
          :mapStyle="mapStyle"
          :flyToOptions="flyToOptions"
          @loaded="handleLoaded"
          :center="center"
          :zoom="zoom"
        >
          <mapbox-marker
            v-if="loaded"
            v-for="merchant in merchants"
            :key="merchant.id"
            :lngLat="[merchant.lng, merchant.lat]"
            :color="merchant.color"
          >
            <mapbox-popup>
              <div>{{ merchant.hp2 }} {{ merchant.groupName ?? '' }}</div>
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
import { computed, Ref, ref, unref } from 'vue'
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
      mapStyle: 'streets-v12',
      t
    }
  },
  setup() {
    const loading = ref(true)
    const loaded = ref(false)
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
    let zoom = ref(3)
    let center = ref([-6.9304543, 45.8660209])

    const getAllApi = async () => {
      await Promise.all([merchantStore.fetchMerchants()])
      loading.value = false
    }

    const handleLoaded = (map: any) => {
      mapInstance.value = map
      loaded.value = true
      // console.log(map)
      // map.zoomTo(4)
      try {
        // const merchant = merchants[0]
        const merchantsValue = unref(merchants)
        // center.value = [merchant.lng, merchant.lat]
        // flyToOptions.value = { maxDuration: 1000, speed: 1.2, center: [merchant.lng, merchant.lat] }
        const bbox = merchantsValue.map((p) => [p.lng, p.lat])
        map.fitBounds(bbox, {
          padding: { top: 10, bottom: 25, left: 15, right: 5 }
        })
      } catch (err) {
        console.log(err)
      }
    }

    async function distanceMatrix(): Promise<void> {
      // Display loader on button
      // loading.value = true

      const from = merchants.value.find((item) => item.id === fromID.value)!
      const to = merchants.value.find((item) => item.id === toID.value)!
      if (!from || !to) {
        ElNotification.error('Coordonnées introuvable')
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

            flyToOptions.value = { maxDuration: 1000, speed: 1.2, center: [from.lng, from.lat] }

            if (mapInstance.value == null) {
              loading.value = false
              return
            }

            // zoom.value = 12
            // center.value = [from.lng, from.lat]
            console.log(mapInstance)
            mapInstance.value.flyTo({
              center: [from.lng, from.lat],
              zoom: 9,
              speed: 0.2,
              curve: 1,
              easing(t) {
                return t
              }
            })

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
      // loading.value = false
    }

    getAllApi()

    return {
      merchants,
      loading,
      loaded,
      zoom,
      distanceMatrix,
      handleLoaded,
      accessToken,
      foundRoutes,
      fromID,
      toID,
      center,
      flyToOptions
    }
  }
}
</script>
<style>
.map-container {
  min-height: 500px;
}
.align-self-center {
  align-self: center;
}
</style>
