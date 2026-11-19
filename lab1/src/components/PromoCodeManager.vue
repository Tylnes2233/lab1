<script setup lang="ts">
import { ref } from 'vue'
import type { PromoCode } from '../types'

defineProps<{
  activePromo: PromoCode | null
}>()

const emit = defineEmits<{
  (e: 'apply-promo', code: string): boolean
  (e: 'clear-promo'): void
}>()

const inputCode = ref<string>('')
const errorMessage = ref<string>('')

const handleApply = () => {
  const trimmed = inputCode.value.trim().toUpperCase()
  if (!trimmed) {
    errorMessage.value = 'Введіть промокод'
    return
  }

  const success = emit('apply-promo', trimmed)
  if (!success) {
    errorMessage.value = 'Невірний промокод (спробуйте SALE10 або DRINK20)'
  } else {
    errorMessage.value = ''
    inputCode.value = ''
  }
}

const handleClear = () => {
  errorMessage.value = ''
  emit('clear-promo')
}
</script>

<template>
  <div class="promo-box">
    <h3>Промокод</h3>
    <div v-if="!activePromo" class="promo-form">
      <input
        v-model="inputCode"
        type="text"
        placeholder="Наприклад: SALE10"
        @keyup.enter="handleApply"
      />
      <button @click="handleApply">Застосувати</button>
    </div>

    <div v-else class="active-promo">
      <span>Активовано: <strong>{{ activePromo.code }}</strong> (-{{ activePromo.discountPercent }}%)</span>
      <button class="remove-btn" @click="handleClear">Скасувати</button>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.promo-box {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  color: #0f172a;
}

.promo-box h3 {
  margin: 0 0 12px;
  font-size: 16px;
}

.promo-form {
  display: flex;
  gap: 8px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #94a3b8;
  border-radius: 4px;
}

button {
  padding: 8px 14px;
  background: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.active-promo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #dcfce7;
  padding: 8px 12px;
  border-radius: 6px;
  color: #166534;
}

.remove-btn {
  background: #dc2626;
  padding: 4px 10px;
  font-size: 12px;
}

.error {
  color: #dc2626;
  font-size: 13px;
  margin: 8px 0 0;
}
</style>