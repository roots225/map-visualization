<script setup lang="ts">
import PanelGroup from './components/PanelGroup.vue'
import { ref, computed } from 'vue'
import { useMerchantStore } from '@/store/modules/merchant'

// const { t } = useI18n()
const merchantStore = useMerchantStore()

const loading = ref(true)
const merchants = computed(() => merchantStore.getAllMerchants)

const getAllApi = async () => {
  await Promise.all([merchantStore.fetchMerchants()])
  loading.value = false
}

getAllApi()
</script>

<template>
  <PanelGroup :merchants="merchants" iconSymbol="ep:house" />
</template>
