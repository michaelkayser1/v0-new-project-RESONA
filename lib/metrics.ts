// Every QOTE metric is a unit score in [0, 1]. Anything else is treated as
// unavailable rather than coerced, so the UI never shows NaN, Infinity, or an
// invented 0%.

export function toUnitMetric(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null
  if (value < 0 || value > 1) return null
  return Math.round(value * 10000) / 10000
}

export function safeRatio(numerator: number, denominator: number): number | null {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return null
  const ratio = numerator / denominator
  return Number.isFinite(ratio) ? ratio : null
}

export function formatPercent(value: unknown): string {
  const metric = toUnitMetric(value)
  return metric === null ? "Unavailable" : `${Math.round(metric * 100)}%`
}

export function formatCount(value: unknown): string {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 ? String(value) : "Unavailable"
}

export function formatDecimal(value: unknown): string {
  const metric = toUnitMetric(value)
  return metric === null ? "unavailable" : metric.toFixed(2)
}
