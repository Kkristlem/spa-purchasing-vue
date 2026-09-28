<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { api } from '../api/client'
import type { ProcurementPlan } from '../types'

const months = ref(3)
const plan = ref<ProcurementPlan | null>(null)
const loading = ref(false)

watchEffect(async () => {
  loading.value = true
  plan.value = await api.procurementPlan(months.value)
  loading.value = false
})
</script>

<template>
  <section>
    <h2>План закупок</h2>
    <label>
      Горизонт:
      <select v-model.number="months">
        <option :value="1">1 мес.</option>
        <option :value="3">3 мес.</option>
        <option :value="6">6 мес.</option>
        <option :value="12">12 мес.</option>
      </select>
    </label>
    <p v-if="loading">Считаем план…</p>
    <template v-else-if="plan">
      <p>
        Итого: <strong>{{ plan.total_cost_rub.toLocaleString('ru-RU') }} ₽</strong>
        —
        <span :class="plan.within_budget ? 'badge badge-ok' : 'badge badge-error'">
          {{ plan.within_budget ? 'в рамках бюджета' : 'превышение бюджета' }}
        </span>
      </p>
      <table>
        <thead>
          <tr><th>Товар</th><th>Объём</th><th>Стоимость</th><th>Дата заказа</th></tr>
        </thead>
        <tbody>
          <tr v-for="item in plan.items" :key="item.product_id" :title="item.explanation">
            <td>{{ item.product_name }}</td>
            <td>{{ item.recommended_qty }} {{ item.unit }}</td>
            <td>{{ item.cost_rub.toLocaleString('ru-RU') }} ₽</td>
            <td>{{ item.order_date }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </section>
</template>
