<script setup lang="ts">
import { computed } from 'vue'
import type { Drink } from '../types'

const props = defineProps<{
  drink: Drink
}>()

const emit = defineEmits<{
  (e: 'update-volume', id: number, volume: number): void
}>()

const isInvalid = computed(() => {
  return props.drink.volume < 0.25 || props.drink.volume > 100 || Number.isNaN(props.drink.volume)
})

const itemTotal = computed(() => {
  if (isInvalid.value) return 0
  return props.drink.pricePerLiter * props.drink.volume
})

const onVolumeInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const val = parseFloat(target.value)
  emit('update-volume', props.drink.id, Number.isNaN(val) ? 0 : val)
}
</script>

<template>
  <div class="drink-card" :class="{ invalid: isInvalid }">
    <div class="drink-info">
      <h3>{{ drink.name }}</h3>
      <span class="price">{{ drink.pricePerLiter }} грн / л</span>
    </div>

    <div class="drink-controls">
      <label>Об'єм (л):</label>
      <input
        type="number"
        step="0.25"
        min="0.25"
        max="100"
        :value="drink.volume"
        @input="onVolumeInput"
      />
      <span class="subtotal">{{ itemTotal.toFixed(2) }} грн</span>
    </div>

    <p v-if="isInvalid" class="error-msg">
      Об'єм має бути від 0.25 л до 100 л
    </p>
  </div>
</template>

<style scoped>
.drink-card {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  color: #0f172a;
}

.drink-card.invalid {
  border-color: #ef4444;
  background: #fef2f2;
}

.drink-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.drink-info h3 {
  margin: 0;
  font-size: 16px;
}

.price {
  font-weight: 600;
  color: #475569;
}

.drink-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

input {
  width: 90px;
  padding: 6px;
  border: 1px solid #94a3b8;
  border-radius: 4px;
}

.subtotal {
  margin-left: auto;
  font-weight: bold;
}

.error-msg {
  color: #dc2626;
  font-size: 13px;
  margin: 8px 0 0;
}
</style>