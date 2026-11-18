<script setup>
defineProps(['theme'])

const emit = defineEmits(['update-theme'])

const onInput = (key, event) => {
  emit('update-theme', key, event.target.value)
}
</script>

<template>
  <div class="manager-panel">
    <h3>Налаштування</h3>

    <div class="control-item">
      <label>Колір фону:</label>
      <input 
        type="color" 
        :value="theme.bgColor" 
        @input="onInput('bgColor', $event)" 
      />
    </div>

    <div class="control-item">
      <label>Колір тексту:</label>
      <input 
        type="color" 
        :value="theme.textColor" 
        @input="onInput('textColor', $event)" 
      />
    </div>

    <div class="control-item">
      <label>Акцентний колір (кнопки та рамки):</label>
      <input 
        type="color" 
        :value="theme.primaryColor" 
        @input="onInput('primaryColor', $event)" 
      />
    </div>

    <div class="control-item">
      <label>Розмір шрифту: {{ theme.fontSize }}px</label>
      <input 
        type="range" 
        min="12" 
        max="26" 
        :value="theme.fontSize" 
        @input="onInput('fontSize', $event)" 
      />
    </div>

    <div class="control-item">
      <label>Заокруглення кутів: {{ theme.borderRadius }}px</label>
      <input 
        type="range" 
        min="0" 
        max="30" 
        :value="theme.borderRadius" 
        @input="onInput('borderRadius', $event)" 
      />
    </div>

    <div class="control-item">
      <label>Стиль рамки:</label>
      <select :value="theme.borderStyle" @change="onInput('borderStyle', $event)">
        <option value="solid">Суцільна (solid)</option>
        <option value="dashed">Пунктирна (dashed)</option>
        <option value="dotted">Точкова (dotted)</option>
        <option value="double">Подвійна (double)</option>
        <option value="none">Без рамки (none)</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.manager-panel {
  flex: 1;
  background: #f1f5f9;
  color: #1e293b;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}

.manager-panel h3 {
  margin-top: 0;
  color: #0f172a;
}

.control-item {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-size: 14px;
  font-weight: bold;
  color: #1e293b;
}
</style>