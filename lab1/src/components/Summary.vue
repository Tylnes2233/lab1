<script setup lang="ts">
import { computed } from 'vue'
import type { Drink, PromoCode } from '../types'

const props = defineProps<{
  drinks: Drink[]
  activePromo: PromoCode | null
}>()

const hasValidationErrors = computed(() => {
  return props.drinks.some((d) => d.volume < 0.25 || d.volume > 100 || Number.isNaN(d.volume))
})

const totalVolume = computed(() => {
  return props.drinks.reduce((sum, d) => {
    if (d.volume < 0.25 || d.volume > 100 || Number.isNaN(d.volume)) return sum
    return sum + d.volume
  }, 0)
})

const rawTotal = computed(() => {
  return props.drinks.reduce((sum, d) => {
    if (d.volume < 0.25 || d.volume > 100 || Number.isNaN(d.volume)) return sum
    return sum + d.pricePerLiter * d.volume
  }, 0)
})

const discountAmount = computed(() => {
  if (!props.activePromo) return 0
  return (rawTotal.value * props.activePromo.discountPercent) / 100
})

const finalTotal = computed(() => {
  return rawTotal.value - discountAmount.value
})
</script>

<template>
  <div class="summary-card">
    <h3>Підсумок замовлення</h3>

    <div class="row">
      <span>Загальний об'єм:</span>
      <strong>{{ totalVolume.toFixed(2) }} л</strong>
    </div>

    <div class="row">
      <span>Сума без знижки:</span>
      <span>{{ rawTotal.toFixed(2) }} грн</span>
    </div>

    <div v-if="activePromo" class="row discount">
      <span>Знижка ({{ activePromo.code }}):</span>
      <span>-{{ discountAmount.toFixed(2) }} грн</span>
    </div>

    <hr />

    <div class="row total">
      <span>До сплати:</span>
      <strong>{{ finalTotal.toFixed(2) }} грн</strong>
    </div>

    <p v-if="hasValidationErrors" class="warning">
      Увага: деякі напої мають некоректний об'єм і не враховані в сумі.
    </p>
  </div>
</template>

<style scoped>
.summary-card {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 20px;
  color: #0f172a;
}

.summary-card h3 {
  margin: 0 0 16px;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 15px;
}

.discount {
  color: #16a34a;
  font-weight: 600;
}

.total {
  font-size: 18px;
  margin-top: 12px;
}

hr {
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 12px 0;
}

.warning {
  margin-top: 12px;
  font-size: 13px;
  color: #d97706;
}
</style>