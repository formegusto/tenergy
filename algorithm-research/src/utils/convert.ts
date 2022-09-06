export function monthToSeason(month: number): "summer" | "other" {
  if (month === 7 || month === 8) return "summer";
  return "other";
}
