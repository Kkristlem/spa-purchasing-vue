<script setup lang="ts">
import Catalog from './components/Catalog.vue'
import ProcurementPlan from './components/ProcurementPlan.vue'
import ChatMinimal from './components/ChatMinimal.vue'
</script>

<template>
  <main>
    <h1>Mountain &amp; Sea Spa — планирование закупок</h1>
    <Catalog />
    <ProcurementPlan />
    <ChatMinimal />
  </main>
</template>

<style>
main { max-width: 900px; margin: 0 auto; padding: 24px; font-family: system-ui, sans-serif; }
table { width: 100%; border-collapse: collapse; margin: 12px 0; }
th, td { border-bottom: 1px solid #ddd; padding: 8px; text-align: left; }
.badge { padding: 2px 8px; border-radius: 12px; font-size: 0.85em; }
.badge-ok { background: #dafbe1; color: #1a7f37; }
.badge-warning { background: #fff8c5; color: #9a6700; }
.badge-error { background: #ffebe9; color: #cf222e; }
@media (max-width: 600px) {
  main { padding: 12px; }
}
</style>
