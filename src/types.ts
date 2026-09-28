export interface Alert {
  level: 'error' | 'warning'
  code: string
  product_id: string
  message: string
}

export interface ProductCard {
  id: string
  name: string
  sku: string
  category: string
  unit: string
  total_stock: number
  safety_stock: number
  min_stock: number
  avg_monthly_consumption: number
  days_of_stock: number | null
  alerts: Alert[]
}

export interface PurchaseRecommendation {
  product_id: string
  product_name: string
  unit: string
  recommended_qty: number
  cost_rub: number
  order_date: string
  supplier: string
  explanation: string
}

export interface ProcurementPlan {
  period_months: number
  horizon: string
  items: PurchaseRecommendation[]
  total_cost_rub: number
  budget_limit_rub: number
  within_budget: boolean
}

export interface ChatAnswer {
  question: string
  answer_text: string
  data: Record<string, unknown> | null
  assumptions: string[]
  as_of: string
}
