<script setup lang="ts">
import { ref } from 'vue'
import { api } from '../api/client'

const question = ref('')
const answer = ref<string | null>(null)
const loading = ref(false)

async function ask() {
  if (!question.value.trim()) return
  loading.value = true
  try {
    const res = await api.ask(question.value)
    answer.value = res.answer_text
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section>
    <h2>Чат (упрощённый)</h2>
    <!-- TODO: показывать res.data как таблицу/карточку, не успел -->
    <form @submit.prevent="ask">
      <input v-model="question" placeholder="Задайте вопрос помощнику" />
      <button type="submit" :disabled="loading">{{ loading ? 'Считаем…' : 'Спросить' }}</button>
    </form>
    <p v-if="answer">{{ answer }}</p>
  </section>
</template>
