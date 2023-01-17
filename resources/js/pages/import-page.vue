<template>
    <el-upload
      ref="upload"
      class="upload-demo"
      action="http://localhost:8000/api/import"
      :limit="1"
      :on-exceed="handleExceed"
      :auto-upload="false"
      :headers="{'Content-Type': 'application/json', 'accet': 'application/json'}"
    >
      <template #trigger>
        <el-button type="primary">Choisir un fichier</el-button>
      </template>
      <el-button class="ml-3" type="success" @click="submitUpload">
        Charger
      </el-button>
    </el-upload>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { genFileId } from 'element-plus'
  import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
  
  const upload = ref<UploadInstance>()
  
  const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
  }
  
  const submitUpload = () => {
    upload.value!.submit()
  }
  </script>
  