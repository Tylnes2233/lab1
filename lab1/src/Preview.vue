<script setup>
defineProps(['theme'])
</script>

<template>
  <div 
    class="preview-area"
    :style="{
      '--bg-color': theme.bgColor,
      '--text-color': theme.textColor,
      '--primary-color': theme.primaryColor,
      '--font-size': theme.fontSize + 'px',
      '--border-radius': theme.borderRadius + 'px',
      '--border-style': theme.borderStyle
    }"
  >
    <div class="preview-card">
      <h2>Попередній перегляд</h2>
      <p>
        Цей демонстраційний блок миттєво змінює свій вигляд. Спробуйте покрутити
        повзунки або вибрати інший колір ліворуч — реактивність Vue автоматично
        оновить CSS-змінні.
      </p>
      <button class="preview-btn">Тестова кнопка</button>
    </div>
  </div>
</template>

<style scoped>
.preview-area {
  flex: 1.5;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-size: var(--font-size);
  border-radius: var(--border-radius);
  border: 3px var(--border-style) var(--primary-color);
  padding: 24px;
  transition: all 0.15s ease;
}

.preview-card h2 {
  margin-top: 0;
  color: var(--primary-color);
}

.preview-btn {
  margin-top: 10px;
  background-color: var(--primary-color);
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: var(--font-size);
  border-radius: var(--border-radius);
  cursor: pointer;
}
</style>