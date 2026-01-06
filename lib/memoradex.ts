import type { MemoraDEX } from "@/lib/memoraIntel"
function normalizeDex(source?: string): MemoraDEX {
  if (!source) return "unknown"

  const s = source.toLowerCase()

  if (s.includes("pump")) return "pumpfun"
  if (s.includes("bonk")) return "bonk"
  if (s.includes("bag")) return "bags"
  if (s.includes("axiom")) return "axiom"
  if (s.includes("gmgn")) return "gmgn"
  if (s.includes("padre")) return "padre"

  return "unknown"
}
