<script setup lang="ts">
import { ref } from 'vue'
import type { Drink, PromoCode } from './types'
import DrinkItem from './components/DrinkItem.vue'
import PromoCodeManager from './components/PromoCodeManager.vue'
import Summary from './components/Summary.vue'

const drinks = ref<Drink[]>([
  { id: 1, name: 'Сік апельсиновий', pricePerLiter: 65, volume: 1 },
  { id: 2, name: 'Лимонад домашній', pricePerLiter: 55, volume: 2 },
  { id: 3, name: 'Мінеральна вода', pricePerLiter: 25, volume: 1.5 },
  { id: 4, name: 'Холодний чай', pricePerLiter: 45, volume: 1 }
])

const availablePromos: PromoCode[] = [
  { code: 'SALE10', discountPercent: 10 },
  { code: 'DRINK20', discountPercent: 20 },
  { code: 'VUE15', discountPercent: 15 }
]

const activePromo = ref<PromoCode | null>(null)

const handleUpdateVolume = (id: number, volume: number) => {
  const item = drinks.value.find((d) => d.id === id)
  if (item) {
    item.volume = volume
  }
}

const handleApplyPromo = (code: string): boolean => {
  const found = availablePromos.find((p) => p.code === code)
  if (found) {
    activePromo.value = found
    return true
  }
  return false
}

const handleClearPromo = () => {
  activePromo.value = null
}
</script>

<template>
  <div class="container">
    <h1>Калькулятор напоїв</h1>

    <div class="layout">
      <div class="drinks-list">
        <DrinkItem
          v-for="drink in drinks"
          :key="drink.id"
          :drink="drink"
          @update-volume="handleUpdateVolume"
        />
      </div>

      <div class="sidebar">
        <PromoCodeManager
          :active-promo="activePromo"
          @apply-promo="handleApplyPromo"
          @clear-promo="handleClearPromo"
        />
        <Summary :drinks="drinks" :active-promo="activePromo" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 24px;
}

.layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.drinks-list {
  flex: 1.4;
}

.sidebar {
  flex: 1;
}
</style>