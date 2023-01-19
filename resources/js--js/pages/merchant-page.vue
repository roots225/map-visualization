<template>
    <div>
        <el-table :data="merchants" style="width: 100%">
            <el-table-column prop="hp2" label="HP2" width="180" />
            <el-table-column prop="address" label="Adresse" width="180" />
            <el-table-column prop="postal_code" label="Code postale" />
        </el-table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, onBeforeMount, ComputedRef, ref } from "vue";
  import { genFileId, ElNotification } from "element-plus";
  import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
  import useMerchantsStore from "@/store/modules/merchants"
import Merchant from "@/models/Merchant";

  const merchantsStore = useMerchantsStore()
  const merchants: ComputedRef<Merchant[]> = computed(() => merchantsStore.getMerchants)


  onBeforeMount(() => {
    merchantsStore.fetchMerchants()
  })
  
  const handleError = (error: any) => {
    let message = "";
    try {
      const res = JSON.parse(error.message);
      message = res.message;
    } catch (e) {
      message = "Erreur inconnue";
    }
    ElNotification({
      title: "Erreur",
      message,
      type: "error",
    });
  };
  
  const handleSuccess = () => {
    ElNotification({
      title: "Succes",
      message: "Fichier charger avec succes",
      type: "success",
    });
  };
  </script>
  