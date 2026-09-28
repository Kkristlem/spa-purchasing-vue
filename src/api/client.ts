import type { Alert, ChatAnswer, ProcurementPlan, ProductCard } from '../types'

const BASE_URL = 'http://localhost:8000'

async function get<T>(path: string): Promise<T> {
  const res = await fetch(BASE_URL + path)
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status}`)
  return res.json()
}

export const api = {
  products: () => get<ProductCard[]>('/api/catalog/products'),
  alerts: () => get<Alert[]>('/api/planning/alerts'),
  procurementPlan: (months: number) => get<ProcurementPlan>(`/api/planning/procurement-plan?months=${months}`),
  ask: async (question: string): Promise<ChatAnswer> => {
    const res = await fetch(BASE_URL + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    })
    if (!res.ok) throw new Error(`POST /api/chat -> ${res.status}`)
    return res.json()
  }
}
