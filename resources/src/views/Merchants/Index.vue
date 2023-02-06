<template>
  <ContentWrap title="Liste des points enregistrés" message="Gestion des points enregistrés">
    <el-row :gutter="20" class="mb-3">
      <el-col :span="24" style="margin: 10px 0">
        <Table :columns="columns" :data="merchants" />
      </el-col>
    </el-row>
  </ContentWrap>
</template>
<script lang="ts">
import { MapboxMap, MapboxMarker, MapboxPopup } from 'vue-mapbox-ts'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { useMerchantStore } from '@/store/modules/merchant'
import { computed, Ref, ref } from 'vue'
import { Table } from '@/components/Table'
import { ElSkeleton, ElRow, ElCard, ElCol, ElSelect, ElOption, ElButton } from 'element-plus'

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
    ElButton,
    Table
  },
  data() {
    return {
      // mapStyle: "mapbox://styles/mapbox/streets-v12"
      mapStyle: 'streets-v12',
      t
    }
  },
  setup() {
    const merchantStore = useMerchantStore()
    const loading = ref(true)
    const merchants = computed(() => merchantStore.getAllMerchants)

    let columns: Ref<any[]> = ref([
      {
        field: 'hp2',
        label: 'HP2'
      },
      {
        field: 'groupName',
        label: 'Nom groupe'
      },
      {
        field: 'address',
        label: 'Adresse'
      },
      {
        field: 'postalCode',
        label: 'Code postale'
      },
      {
        field: 'lng',
        label: 'Longitude'
      },
      {
        field: 'lat',
        label: 'Latitude'
      },

      {
        field: 'action',
        label: 'Action'
      }
    ])

    const getAllApi = async () => {
      await Promise.all([merchantStore.fetchMerchants()])

      loading.value = false
    }

    getAllApi()

    return {
      merchants,
      columns
    }
  }
}
</script>
<style>
.map-container {
  min-height: 350px;
}
</style>
