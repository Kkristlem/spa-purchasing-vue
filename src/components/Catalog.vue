<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { api } from '../api/client'
import type { ProductCard } from '../types'

const products = ref<ProductCard[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

function riskOf(p: ProductCard): string {
  if (p.alerts.some((a) => a.level === 'error')) return 'error'
  if (p.alerts.some((a) => a.level === 'warning')) return 'warning'
  return 'ok'
}

onMounted(async () => {
  try {
    products.value = await api.products()
  } catch (e) {
    error.value = (e as Error).message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section>
    <h2>Каталог товаров</h2>
    <p v-if="loading">Загружаем…</p>
    <p v-else-if="error" role="alert">{{ error }}</p>
    <table v-else>
      <thead>
        <tr><th>Товар</th><th>Категория</th><th>Остаток</th><th>Риск</th></tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id" :data-risk="riskOf(p)">
          <td>{{ p.name }}</td>
          <td>{{ p.category }}</td>
          <td>{{ p.total_stock }} {{ p.unit }}</td>
          <td>
            <span :class="'badge badge-' + riskOf(p)">
              {{ p.alerts.length ? p.alerts[0].message : 'норма' }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
