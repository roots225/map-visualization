<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
// import { ElButton } from 'element-plus'
import { genFileId, ElNotification } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { ref } from 'vue'

const { t } = useI18n()

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

const handleError = (error: any) => {
  let message = ''
  try {
    const res = JSON.parse(error.message)
    message = res.message
  } catch (e) {
    message = 'Erreur inconnue'
  }
  ElNotification({
    title: 'Erreur',
    message,
    type: 'error'
  })
}

const handleSuccess = () => {
  ElNotification({
    title: 'Succes',
    message: 'Fichier charger avec succes',
    type: 'success'
  })
}
</script>

<template>
  <ContentWrap :title="t('import.title')" :message="t('import.message')">
    <el-upload
      ref="upload"
      drag
      action="http://localhost:8000/api/import"
      :limit="1"
      :on-exceed="handleExceed"
      :headers="{
        accept: 'application/json'
      }"
      :auto-upload="false"
      name="data"
      :on-success="handleSuccess"
      :on-error="handleError"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <template #trigger>
        <div class="el-upload__text">Glisser deposer votre fichier ici</div>
      </template>

      <template #tip>
        <div class="el-upload__tip">Fichiers de type xls/xlsx</div>
      </template>
      <div class="text center" style="text-align: center">
        <el-button type="primary" size="large" @click="submitUpload">Charger le fichier</el-button>
      </div>
    </el-upload>
  </ContentWrap>
</template>
