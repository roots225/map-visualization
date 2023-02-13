<template>
  <ContentWrap title="Liste des biens enregistrés" message="Gestion des biens enregistrés">
    <el-row :gutter="20" class="mb-3">
      <el-col :span="24" style="margin: 10px 0">
        <el-card>
          <template #header>
            <el-form label-position="top" :model="merchantFilterOption" label-width="120px">
              <el-row :gutter="20">
                <el-col :span="6" v-for="item in Object.keys(merchantFilterOption)" :key="item">
                  <el-form-item :label="getFilterLabel(item)">
                    <el-input v-model="merchantFilterOption[item]" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-button type="primary" @click.prevent="handleFilter"
                    >Filtrer</el-button
                  ></el-col
                >
              </el-row>
            </el-form>
          </template>

          <Table
            :columns="columns"
            :data="merchants"
            :currentPage="merchantsObject.currentPage"
            :pagination="pagination"
            :loading="loading"
            @update:currentPage="updateCurrentPage"
            @update:pageSize="updatePageSize"
          />
        </el-card>
      </el-col>
    </el-row>
  </ContentWrap>
</template>
<script lang="ts" setup>
import { ContentWrap } from '@/components/ContentWrap'
import { useMerchantStore } from '@/store/modules/merchant'
import { computed, Ref, ref, watch } from 'vue'
import { Table } from '@/components/Table'

const merchantStore = useMerchantStore()
const loading = ref(true)
const merchants = computed(() => merchantStore.getAllMerchants)
const merchantFilterOption = ref({})

watch(
  () => merchantStore.merchants,
  (prev) => {
    for (const item of Object.keys(merchantStore.getMerchantJsonData)) {
      merchantFilterOption.value[item] = ''
      columns.value.push({
        field: item,
        label: item.toUpperCase(),
        fixed: item === 'hp2' ? true : false,
        width: '150px'
      })
    }
  }
)

const handleFilter = async () => {
  await merchantStore.filterPaginatedMerchants(merchantFilterOption.value)
}

const merchantsObject = computed(() => merchantStore.getOriginalData)
const pagination = computed(() => ({
  background: true,
  layout: 'sizes, prev, pager, next',
  total: merchantStore.getOriginalData.total,
  'page-size': merchantStore.getOriginalData.perPage,
  'page-count': merchantStore.getOriginalData.lastPage,
  'page-sizes': [5, 10, 15, 20, 25, 50]
}))

const getFilterLabel = (name: string) => {
  return name.toUpperCase().replaceAll('_', ' ')
}

const updateCurrentPage = async (v) => {
  loading.value = true
  await merchantStore.fetchPaginatedMerchants(v)
  loading.value = false
}

const updatePageSize = async (v) => {
  loading.value = true
  await merchantStore.updatePageSize(v)
  loading.value = false
}

let columns: Ref<any[]> = ref([
  {
    field: 'action',
    label: 'Action',
    width: '120px',
    fixed: 'right'
  }
])

const getAllApi = async () => {
  await Promise.all([merchantStore.fetchPaginatedMerchants()])

  loading.value = false
}

getAllApi()
</script>
<style>
.map-container {
  min-height: 350px;
}
</style>
