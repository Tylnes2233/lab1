<script setup>
import { ref } from 'vue'
import ThemeManager from './ThemeManager.vue'
import Preview from './Preview.vue'

const theme = ref({
  bgColor: '#f8fafc',
  textColor: '#1e293b',
  primaryColor: '#3b82f6',
  fontSize: 16,
  borderRadius: 8,
  borderStyle: 'solid'
})

const updateTheme = (key, value) => {
  theme.value[key] = value
}
</script>

<template>
  <div class="app-wrapper">
    <h1>Менеджер теми та стилів</h1>
    
    <div class="main-layout">
      <ThemeManager :theme="theme" @update-theme="updateTheme" />
      <Preview :theme="theme" />
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  font-family: Arial, sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.main-layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  margin-top: 20px;
}
</style>